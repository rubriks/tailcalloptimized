---
layout: post
title: "Using the Toggl API continued..."
description: Connecting to the Toggl API in order to extract timesheet data and create a graph.
tags: Toggl, API, .NET, integration
date: 2010-06-24 04:35:15
assets: assets/posts/2010-06-24-using-the-toggl-api-continued
image: 
---

This is a follow up on [my previous post](/2010/06/21/connect-to-toggl-api-with-net.html) where I showed you how to connect to Toggl API with .NET and extract registered tasks.

![toggl time track](/assets/posts/2010-06-24-using-the-toggl-api-continued/toggltimetrack.png)

If we take that data and devide it into weeks, we could plot the amount of work spent each week in a chart with a library like [ZedGraph](http://zedgraph.org/wiki/index.php?title=Main_Page).

![toggl graph](/assets/posts/2010-06-24-using-the-toggl-api-continued/togglgraph.png)

As you can see, I started to register my time last week and this week is not finished. By scheduling this chart generation and make sure that the output image is available from an external URL, I can place a chart that displays my activity on the CodePlex dashboard.  I usually look at the commits to see if the project is active, but this would also be a perfect tool. It gives the visitor a hunch how much time was spent during the last five weeks on this project.

[The source code is all available here.](/assets/posts/2010-06-24-using-the-toggl-api-continued/TogglChart.zip)
