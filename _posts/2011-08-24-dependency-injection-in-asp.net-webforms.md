---
layout: migratedpost
title: "Dependency Injection in ASP.NET WebForms"
description:
date: 2011-08-24 12:46:43
assets: assets/posts/2011-08-24-dependency-injection-in-asp.net-webforms
image: 
---

<p>To me, any webforms solution is legacy code. Sadly, most of my consultancy happens to be maintenance of these webforms behemoths. Even so, that doesn't stop me from trying to improve my own work process and the applications that I'm working with.</p>
<p>One huge improvement have been dependency injection into webforms page object. This has made the asp pages much easier to unit test. Here's a small guide on how to do dependency injection in a legacy webforms application with Unity.</p>
<h2>Unity HttpModule</h2>
<p>The trick is to hook into ASP.NET life cycle when the page tree structure is built up. We can do this with an HttpModule.</p>
<pre class="brush:csharp">public class UnityHttpModule : IHttpModule
{
 private const string NamespacePrefix = "DIWebFormsExample";
 
 public void Init(HttpApplication context)
 {
  context.PreRequestHandlerExecute += OnPreRequestHandlerExecute;
 }

 public void Dispose()
 {
  // Nothing to dispose
 }

 // Get the controls in the page's control tree excluding the page itself
 private static IEnumerable GetControlTree(Control root)
 {
  foreach (Control child in root.Controls)
  {
   yield return child;
   foreach (Control c in GetControlTree(child))
   {
    yield return c;
   }
  }
 }

 private static void OnPreRequestHandlerExecute(object sender, EventArgs e)
 {
  /* Static content */
  if (HttpContext.Current.Handler == null)
  {
   return;
  }

  var handler = HttpContext.Current.Handler;
  Unity.Instance.Container.BuildUp(handler.GetType(), handler);

  // User Controls are ready to be built up after the page initialization is complete
  var page = HttpContext.Current.Handler as Page;
  if (page != null)
  {
   page.InitComplete += OnPageInitComplete;
  }
 }

 // Build up each control in the page's control tree
 private static void OnPageInitComplete(object sender, EventArgs e)
 {
  var page = (Page)sender;
  foreach (Control c in GetControlTree(page))
  {
   var typeFullName = c.GetType().FullName ?? string.Empty;
   var baseTypeFullName = c.GetType().FullName ?? string.Empty;

   // Filter on namespace to avoid build up of System.Web components
   if (typeFullName.StartsWith(NamespacePrefix) || 
    baseTypeFullName.StartsWith(NamespacePrefix))
   {
    Unity.Instance.Container.BuildUp(c.GetType(), c);
   }
  }
 }
}</pre>
<p>Please notice that we define the namespace on line 3 as a filter, because we don't want to have Unity build up controls that belongs to the .NET Framework.</p>
<p>We register this module in web.config as following.</p>
<pre class="brush:xml"><configuration>
 <!-- IIS 6.0 and below -->
    <system.web>
      <httpModules>
        <add name="UnityHttpModule" type="DIWebFormsExample.Lib.UnityHttpModule, DIWebFormsExample.Lib"/>
      </httpModules>
    </system.web>

 <!-- IIS 7.0 and above -->
    <system.webServer>
      <modules>
        <remove name="UnityHttpModule"/>
        <add name="UnityHttpModule" type="DIWebFormsExample.Lib.UnityHttpModule, DIWebFormsExample.Lib"/>
      </modules>
    </system.webServer>
</configuration></pre>
<p>This simply allows us to inject our dependencies through property injection. Here's our product page.</p>
<pre class="brush:xml"><form id="form1" runat="server">
<div>
    <h1>Products</h1>
    <h2>Electronics</h2>
    <asp:DataGrid 
        runat="server" 
        DataSource='<%# GetByType("Electronics") %>' 
        AutoGenerateColumns="true" OnLoad="DataBind" />
    <h2>Candy</h2>
    <asp:DataGrid 
        runat="server" 
        DataSource='<%# GetByType("Candy") %>' 
        AutoGenerateColumns="true" OnLoad="DataBind" />
</div>
</form></pre>
<pre class="brush:csharp">public partial class ProductList : System.Web.UI.Page
{
 [Dependency]
 public IRepository<Product> Repository { get; set; }

 protected void Page_Load(object sender, EventArgs e)
 {
 }

 protected IEnumerable<Product> GetByType(string type)
 {
  return Repository.Get(p => p.Type == type);
 }

 protected void DataBind(object sender, EventArgs e)
 {
  ((Control) sender).DataBind();
 }
}</pre>
<p>On line 4 we inject our dependency through property injection by adding the attribute [Dependency] to the property. Unity will then resolve this dependency during BuildUp. I have registered this to my container as following:</p>
<pre class="brush:csharp;gutter:false">container.RegisterType<IRepository<Product>, ProductRepository>();</pre>
<h2>Testing</h2>
<p>How does this relate to testing? It makes it much easier to unit test our webforms code behind.</p>
<pre class="brush:csharp">[TestFixture]
public class ProductListCodeBehindShould
{
 private class Template : ProductList
 {
  public Template()
  {
   Repository = new StubRepository();
  }

  public new IEnumerable<Product> GetByType(string type)
  {
   return base.GetByType(type);
  }

  private class StubRepository : IRepository<Product>
  {
   public IEnumerable<Product> Get(Func<Product, bool> criteria)
   {
    return new[]
    {
     new Product("Stereo", 120.0, "Electronics"),
     new Product("Candy bar", 1.2, "Candy"),
     new Product("Soda", 1.8, "Candy"),
     new Product("Deep fried snickers bar", 0.2, "Candy")
    }.Where(criteria);
   }
  }
 }

 [TestCase("Electronics", 120.0)]
 [TestCase("Candy", 3.2)]
 public void GetProductsBySpecifiedType(string type, double totalPrice)
 {
  /* Setup */
  var template = new Template();

  /* Test */
  var products = template.GetByType(type);

  /* Assert */
  Assert.That(products.Sum(p => p.Price), Is.EqualTo(totalPrice));
 }
}</pre>
<p>What happens here? I create an sub class to the ASP.NET page code behind that I want to test, because I want to reach protected methods like GetByType(string type). My test makes sure that type is properly translated into a correct lambda expression, without touching the real ProductRepository. This is exactly what we need in order to test our code behind properly.</p>
<h2>Summary</h2>
<p>What I like about this approach is...</p>
<ul>
<li>It's unobtrusive. Most testing approaches require you to apply a pattern like MVP in order to reap benefits of testing your UI layer. This might require you to rewrite a large part of your application. My DI module will not affect old code, but enable testability of any new code you write. Later on, you may refactor old code with dependency injection to improve testability.<br /><br />This means that the initial cost is very small.</li>
<li>It works also for ASCX (user controls) and ASHX (handlers). </li>
</ul>
<p>Go <a href="http://litemedia.info/media/Default/BlogPost/blog/DIWebFormsExample.zip">download a full sample here</a>.</p>
