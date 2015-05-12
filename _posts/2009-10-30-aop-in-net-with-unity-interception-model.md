---
layout: migratedpost
title: "AOP in .NET with Unity Interception Model"
description:
date: 2009-10-30 06:39:57
assets: assets/posts/2009-10-30-aop-in-net-with-unity-interception-model
image: 
---

<p>AOP is a buzzword or acronym from a couple of years back, that never really took wind in the world of .NET or statically typed languages. It is a programming model where you try to move out all infrastructure logic from the main flow of the program into aspects that should be deployed solution wide.  This is very hard to accomplish in a statically typed language and that is the main reason for its failure, but the theory of AOP has lived on through academics and professional technologists.  When Microsoft released version 1.2 of its dependency injection framework Unity, they also supplied support for AOP and they called it Policy Injection, in Enterprise Library 4, or plainly "interception" as a standalone Unity extension.</p>
<h2>Building dependency chains</h2>
<p><img class="size-full wp-image-562" title="dependencyChain" src="http://litemedia.info/media/Default/Mint/dependencyChain.png" alt="dependencyChain" width="625" height="71" style="display: block;" />Unity is great at building dependency chains, because it was designed to do just that. By registering the dependency chain into a container you can simply ask that container to build you a CustomerRepository without the fuzz of creating a CustomerDataAccess and knowing where to find your instance of IDataFactory. This is also a great base to build our AOP model on.</p>
<pre class="brush:csharp">var repository = Container.Instance.Resolve<CustomerRepository>();
var customer = repository.GetCustomerById(1);</pre>
<h2>The problem</h2>
<p>A lot of our code may get repetitive where we use extensive logging that we would like to extract away from our code, since it is only noise. Please reflect over this example.</p>
<pre class="brush:csharp">public Customer GetById(int id)
{
    System.Diagnostics.Debug.WriteLine("CustomerDataAccess.GetById(" + id + ")"); // Noise
    Customer result = null;

    using (var connection = dataFactory.OpenConnection())
    {
        var command = connection.CreateCommand();
        command.CommandText = "SELECT * FROM Customer WHERE id=" + id; // Beware of SQL injection

        var reader = command.ExecuteReader();
        result = reader.GetCustomer();
    }

    System.Diagnostics.Debug.WriteLine("CustomerDataAccess.GetById(" + id + ") -> " + result);
    return result;
}</pre>
<p>Wouldn't it be great if we could extract these log messages and place them outside the method?</p>
<h2>Unity interception</h2>
<p>With interception we can define what we would like to do before the call of a method, and after the call of a method. This way we can put the noise that is not business logic outside the method which will make the code much easier to read. We start by creating a call handler that will handle the call to the method we would like to intercept.</p>
<pre class="brush:csharp">public class LogCallHandler : ICallHandler
{
    public IMethodReturn Invoke(IMethodInvocation input, GetNextHandlerDelegate getNext)
    {
        string className = input.MethodBase.DeclaringType.Name;
        string methodName = input.MethodBase.Name;
        string arguments = GetArgumentList(input.Arguments);

        /* CustomerDataAccess.GetById(123) */
        string preMethodMessage = string.Format("{0}.{1}({2})", className, methodName, arguments);
        System.Diagnostics.Debug.WriteLine(preMethodMessage);

        /* Call the method that was intercepted */
        IMethodReturn msg = getNext()(input, getNext);

        string postMethodMessage = string.Format("{0}.{1}() -> {2}", className, methodName, msg.ReturnValue);
        System.Diagnostics.Debug.WriteLine(postMethodMessage);

        return msg;
    }

    public int Order { get; set; }
}</pre>
<p>The call handler is a class that implements the ICallHandler from the Microsoft.Practices.Unity.InterceptionExtension assembly, where the Invoke method will be the method interrupting the call to our method. The method will not be run until we execute the following statement.</p>
<ul>
<li>getNext()(input, getNext);</li>
</ul>
<p>The next thing you need is logic that will decide when a method should be interrupted. You can see this as a filter as every method that can be resolved through unity will be target for interception unless you filter it away. The implementation looks like this.</p>
<pre class="brush:csharp">public class AnyMatchingRule : IMatchingRule
{
    public bool Matches(MethodBase member)
    {
        return true;
    }
}</pre>
<p>I've written the easiest and dumbest matching rule ever. It will just match anything that comes in its way, and that will be enough for this simple example. If you need total control you might want a register of what method you should interrupt and match the MethodBase to that register. Just a thought.  Now we only have to connect the dots. It looks like this.</p>
<pre class="brush:csharp">public class Container : UnityContainer
{
    public void Configure()
    {
        /* Register types into the container */
        RegisterType<IDataFactory, StubDataFactory>();
        RegisterType<IDataAccess<Customer>, CustomerDataAccess>();

        /* Register our matching rule and call handler */
        RegisterType<IMatchingRule, AnyMatchingRule>("AnyMatchingRule");
        RegisterType<ICallHandler, LogCallHandler>("LogCallHandler");

        /* Create a new policy and reference the matching rule and call handler by name */
        AddNewExtension<Interception>();
        Configure<Interception>().AddPolicy("LogPolicy")
            .AddMatchingRule("AnyMatchingRule")
            .AddCallHandler("LogCallHandler");

        /* Make IDataAccess interface elegible for interception */
        Configure<Interception>().SetInterceptorFor(typeof(IDataAccess<>), new TransparentProxyInterceptor());
    }
}</pre>
<p>In the first two lines we register our dependencies as usual. Then we also register the matching rule and the call handier that we've just created. You could create your own instances of these, but why when you have a container that can handle them.  After that the interception configuration comes. It starts with adding the extension to the container. Then we register a new policy and add our matching rule and call handler to that policy. Last, we tell the container what type to intercept, and here we choose to intercept an open generic of the IDataAccess interface. That means that we will intercept any implementation of the IDataAccess, no matter if its generic class of Customer or something else.  When we run the following code</p>
<pre class="brush:csharp">var container = new Container();
container.Configure();

var dataAccess = container.Resolve<IDataAccess<Customer>>();
dataAccess.GetById(1);</pre>
<p>We get this output</p>
<pre>IDataAccess`1<AopExample.Customer>.GetById(1)
IDataAccess`1<AopExample.Customer>.GetById() -> Customer { Id = 1, Name = John Doe }</pre>
<p>Where the logging actually comes from the LogCallHandler and not from the data access code. Neat huh? You can download the full example from <a href="http://mint.litemedia.se/wp-content/uploads/AopExample.zip">here</a>.</p>
