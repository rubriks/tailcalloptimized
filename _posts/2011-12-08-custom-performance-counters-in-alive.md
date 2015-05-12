---
layout: migratedpost
title: "Custom Performance Counters in Alive"
description:
date: 2011-12-08 16:41:04
assets: assets/posts/2011-12-08-custom-performance-counters-in-alive
image: 
---

<p>If you've missed previous posts about Alive, you can read more about it at</p>
<ul>
<li><a href="http://litemedia.info/introducing-alive">Introducing Alive</a></li>
<li><a href="http://litemedia.info/alive-demo">Alive demo</a></li>
</ul>
<p>The real power of Alive, is when it comes to custom performance counters. In your application you have events that would be nice to track in real time. A new order is put, someone paid with their credit card, a user logged in.  For this you can create custom performance counters.</p>
<p><img src="http://litemedia.info/media/Default/BlogPost/blog/custom-performance-counters-in-alive/custom_counter_test_application.png" alt="Test application for creating custom performance counters" width="585" height="408" /></p>
<h2>Create a new performance counter</h2>
<p>It is easy to create a new performance counter on your development machine. Open up server explorer in Visual Studio. Right click on Performance Counters and select "Create New Category".</p>
<p><img src="http://litemedia.info/media/Default/BlogPost/blog/custom-performance-counters-in-alive/server_explorer.png" alt="Create a new performance counter category in Server Explorer" width="483" height="389" /></p>
<p>This gives you a slick interface where you can create your new counter.</p>
<p><img src="http://litemedia.info/media/Default/BlogPost/blog/custom-performance-counters-in-alive/create_new_countery_category.png" alt="Create a new performance counter category interface" width="546" height="517" /></p>
<p>Create a new web application and include Alive.</p>
<pre class="brush:plain;gutter:false">PM> Install-Package LiteMediaAlive</pre>
<p>Edit your web.config so Alive configuration looks like following.</p>
<pre class="brush:xml">  <Alive>
    <settings columns="3" />
    <counters>
      <groups>
        <group name="Test" updateLatency="1000">
          <counter name="Test" categoryName="Test Category" counterName="Test Increment" />
        </group>
      </groups>
    </counters>
  </Alive></pre>
<p>Create a new ASPX page.</p>
<pre class="brush:xml"><%@ Page Language="C#" AutoEventWireup="true" CodeBehind="Index.aspx.cs" Inherits="LiteMedia.Alive.Web.Test.Index" %>
<!DOCTYPE html5>
<html>
    <head>
        <title>Alive custom performance counter</title>
        <style>
            div { display: block; }
            iframe { width: 100%; height: 500px; border: none; }
        </style>
    </head>
    <body>
        <form runat="server">
        <div>
            <h1>Press the button to increment the counter</h1>
            <asp:ScriptManager runat="server">
            </asp:ScriptManager>
            <asp:UpdatePanel runat="server">
                <ContentTemplate>
                    <asp:Button runat="server" Text="Press me" OnClick="IncreaseCounter" />
                </ContentTemplate>
            </asp:UpdatePanel>
            <iframe src="/Alive.axd/" />
        </div>
        </form>
    </body>
</html></pre>
<p>We bind the button to a method in code behind that increases the counter.</p>
<pre class="brush:csharp">protected void IncreaseCounter(object sender, EventArgs e)
{
    using (var counter = new PerformanceCounter("Test Category", "Test Increment", readOnly: false))
    {
        counter.Increment();
    }
}</pre>
<p>Bam! You're done! You can download the whole example from here.</p>
<ul>
<li><a href="http://litemedia.info/media/Default/BlogPost/blog/custom-performance-counters-in-alive/LiteMedia.Alive.CustomPerformanceCounter.zip">LiteMedia.Alive.CustomPerformanceCounter.zip</a></li>
</ul>
<p>There are a lot of <a href="http://msdn.microsoft.com/en-us/library/system.diagnostics.performancecountertype.aspx">performance counter types</a> to explore. There's an <a href="http://www.codeproject.com/KB/dotnet/perfcounter.aspx">excellent article on The Code Project</a> about performance counters.</p>
<h2>Create performance counters in your production environment</h2>
<p>It is a common scenario that you can't reach the production environment from your development machine. In that case I use this piece of F# to create my performance counters.</p>
<pre class="brush:fsharp">open System.Diagnostics

let args = System.Environment.GetCommandLineArgs()

printf "LiteMedia, Mikael Lundin\n"
printf "Create performance counters\n"

if args.Length <> 3 then
  printf "Usage: CreatePerfmon [category name] [category description] "

else
  let name = args.[1]
  let description = args.[2]
  
  let counterCreation = new CounterCreationDataCollection()

  let create name description counterType =
    new CounterCreationData(name, description, counterType)

  create "# operations executed" "Number of total operations executed" PerformanceCounterType.NumberOfItems32
    |> counterCreation.Add
    |> ignore

  create "# operations / sec" "Number of operations executed per second" PerformanceCounterType.RateOfCountsPerSecond32 
    |> counterCreation.Add 
    |> ignore

  create "average time per operation" "Average duration per operation execution" PerformanceCounterType.AverageTimer32
    |> counterCreation.Add
    |> ignore

  create "average time per operation base" "Average duration per operation execution base" PerformanceCounterType.AverageBase
    |> counterCreation.Add
    |> ignore
  
  PerformanceCounterCategory.Create(name, description, PerformanceCounterCategoryType.MultiInstance, counterCreation) |> ignore</pre>
<p>Compile it into a runnable exe and execute on your production environment like this.</p>
<pre class="brush:plain;gutter:false">CreateCounter.exe "New orders" "Increments when new orders are added to the system"</pre>
<p>This will give you a performance category on the server called "New orders" and it will contain the following counters.</p>
<ul>
<li># operations executed</li>
<li># operations / sec</li>
<li>average time per operation</li>
</ul>
<p>This is a really simple way to keep an eye on the production environment and that you're recieving new orders in the rate that you should.</p>
