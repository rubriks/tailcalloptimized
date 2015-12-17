---
layout: post
title: "Run your unit tests on the web"
description:
date: 2009-03-24 07:08:32
assets: assets/posts/2009-03-24-run-your-unit-tests-on-the-web
image: 
---

<p>How do you show a client what unit tests are, and what they are good for? Sure, you can lecture them in all the time and money they will save by not hunting for bugs, but it will still be an abstract thing for them. They will never get in touch with the unit tests.  I was thinking about this while going home through Uppsala on my bike. What if there was a UnitTestDataSource that could run all your unit tests. Then it would be easy to just hook up a Repeater and display the results in any way you want to.  I coded most of the DataSourceControl there on the bike, in my head and just typed it down when I came home. This is the result:  <a href="http://litemedia.info/media/Default/Mint/UnitTestDataSource.cs">UnitTestDataSource.cs</a> This includes the following:</p>
<ul>
<li>NUnit test runner</li>
<li>Support for ExpectedExceptionAttribute</li>
<li>Support for IgnoreAttribute</li>
</ul>
<p>Not included in this release</p>
<ul>
<li>TestFixtureSetup/TestFixtureTeardown</li>
<li>TestSetup/TestTearDown</li>
<li>Category</li>
</ul>
<p>Usage:  You will probably need to add this to your web.config.</p>
<pre class="brush: xml"><system.web>
    <pages>
      <controls>
        <add tagPrefix="litemedia" namespace="LiteMedia.Utils.Web" assembly="LiteMedia.Utils" />
      </controls>
    </pages>  
</system.web></pre>
<p>And this is an example of how it could be used in ASP.NET markup.</p>
<pre class="xml"><litemedia:UnitTestDataSource runat="server" ID="UnitTestDataSource" AssemblyName="LiteMedia.Mint.UnitTests" OnLoad="DataBind" />
<asp:Repeater runat="server" DataSourceID="UnitTestDataSource" OnLoad="DataBind">
    <HeaderTemplate><ul></HeaderTemplate>
    <ItemTemplate>
        <li class="<%# GetSuccessClass(Container.DataItem) %>">
            <span class="name"><%# Container.DataItem %></span>
            <p class="exception <%# GetSuccessClass(Container.DataItem) %>">
                <%# GetException(Container.DataItem) %>
            </p>
        </li>
    </ItemTemplate>
    <FooterTemplate></ul></FooterTemplate>
</asp:Repeater></pre>
