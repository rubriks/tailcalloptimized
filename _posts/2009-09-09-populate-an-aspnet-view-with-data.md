---
layout: post
title: "Populate an ASP.NET view with data"
description:
date: 2009-09-09 20:26:44
assets: assets/posts/2009-09-09-populate-an-aspnet-view-with-data
image: 
---

<p>I've found four ways to populate an ASP.NET view with data.</p>
<ol>
<li>Databind from Page_Load in code behind</li>
<li>OnLoad event on the databinding control</li>
<li>Fetching data from a method with databound expression</li>
<li>DataSourceControl</li>
</ol>
<h2>Databind from Page_Load in code behind</h2>
<p>When I see this happening I automatically removes it and blame the developer who ever put it there. My Page_Load should be as clean as possible. If there is a way to remove code from the Page_Load I will attempt to do it.</p>
<pre class="brush:csharp">protected void Page_Load(object sender, EventArgs e)
{
    ColorsDropDownList.DataSource = new[] { "Blue", "Green", "Blue" };
    this.DataBind();
}</pre>
<p>This is a big no no!</p>
<h2>OnLoad event on the databinding control</h2>
<p>There is a method where you use the OnLoad-event to databind the control. The good thing about this is a clear separation of concern between the control being databound and the data that is bound.</p>
<pre class="brush:csharp"><asp:DropDownList runat="server" ID="NamesDropDownList" 
OnLoad="Names_DataBind" />

protected void Names_DataBind(object sender, EventArgs e)
{
    var control = (BaseDataBoundControl)sender;
    control.DataSource = new[] { "James", "Joe", "Jimmy" };
    control.DataBind();
}</pre>
<p>I find this much neater. The method responsible for finding the data has no idea on what control is used for databinding.</p>
<h2>Fetching data from a method with databound expression</h2>
<p>Here comes something similar to the previous example. We act at the event OnLoad and databind the control itself with a databoundexpression.</p>
<pre class="brush:csharp"><asp:DropDownList runat="server" ID="FlowersDropDownList" 
DataSource="<%# GetFlowers() %>" OnLoad="DataBind" />

protected void DataBind(object sender, EventArgs e)
{
    ((Control)sender).DataBind();
}

protected string[] GetFlowers()
{
    return new[] { "Rose", "Lily", "Dragonflower" };
}</pre>
<p>In this example I would place the DataBind callback method in a common PageBase or UserControlBase where it could be reused all over the application.  The power of this method of databinding is reusing dataproviding method with only changing arguments to the method from markup. This is something that is not possible with our previous method of databinding. You should beware of putting logic in the databound expression since it is inline code in markup.</p>
<h2>DataSourceControl</h2>
<p>The most powerful method of databinding is implementing a DataSourceControl. This is useful when you have a common data store that you want to get data from, and use different views to display parts of that data. This is the most concern separated application here, but also the most time consuming and complex. Use this when you notice that you query the same data in more than three different ways or from three different places in your code.</p>
<pre class="brush:xml"><asp:XmlDataSource runat="server" ID="CmsPages" DataFile="~/App_Data/cms.xml" />
<asp:Repeater runat="server" DataSourceID="CmsPages">
    <HeaderTemplate><ul></HeaderTemplate>
    <ItemTemplate>
        <li>
            <a href="<%# Eval("url") %>"><%# Eval("title") %></a>
        </li>
    </ItemTemplate>
    <FooterTemplate></ul></FooterTemplate>
</asp:Repeater></pre>
