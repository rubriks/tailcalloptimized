---
layout: post
title: "Custom Performance Counters in Alive"
description:
date: 2011-12-08 16:41:04
assets: assets/posts/2011-12-08-custom-performance-counters-in-alive
image: 
---

If you've missed previous posts about Alive, you can read more about it at

* [Introducing Alive](/2011/11/28/introducing-alive.html)

The real power of Alive, is when it comes to custom performance counters. In your application you have events that would be nice to track in real time. A new order is put, someone paid with their credit card, a user logged in.  For this you can create custom performance counters.

![Test application for creating custom performance counters](/assets/posts/2011-12-08-custom-performance-counters-in-alive/custom_counter_test_application.png)

## Create a new performance counter

It is easy to create a new performance counter on your development machine. Open up server explorer in Visual Studio. Right click on Performance Counters and select "Create New Category".

![Create a new performance counter category in Server Explorer](/assets/posts/2011-12-08-custom-performance-counters-in-alive/server_explorer.png)

This gives you a slick interface where you can create your new counter.

![Create a new performance counter category interface](/assets/posts/2011-12-08-custom-performance-counters-in-alive/create_new_countery_category.png)

Create a new web application and include Alive.

```fsharp
Install-Package LiteMediaAlive
```

Edit your web.config so Alive configuration looks like following.

{% gist miklund/664ce9c665e69469b42c Alive.config.xml %}

Create a new ASPX page.

{% gist miklund/664ce9c665e69469b42c Index.aspx %}

We bind the button to a method in code behind that increases the counter.

{% gist miklund/664ce9c665e69469b42c Index.aspx.cs %}

Bam! You're done! You can download the whole example from here.

[LiteMedia.Alive.CustomPerformanceCounter.zip](/assets/posts/2011-12-08-custom-performance-counters-in-alive/LiteMedia.Alive.CustomPerformanceCounter.zip)

There are a lot of [performance counter types](http://msdn.microsoft.com/en-us/library/system.diagnostics.performancecountertype.aspx) to explore. There's an [excellent article on The Code Project](http://www.codeproject.com/KB/dotnet/perfcounter.aspx) about performance counters.

## Create performance counters in your production environment

It is a common scenario that you can't reach the production environment from your development machine. In that case I use this piece of F# to create my performance counters.

{% gist miklund/664ce9c665e69469b42c create.fs %}

Compile it into a runnable exe and execute on your production environment like this.

```
CreateCounter.exe "New orders" "Increments when new orders are added to the system"
```

This will give you a performance category on the server called "New orders" and it will contain the following counters.

* \# operations executed
* \# operations / sec
* average time per operation

This is a really simple way to keep an eye on the production environment and that you're recieving new orders in the rate that you should.
