---
layout: migratedpost
title: "Using the Toggl API continued..."
description:
date: 2010-06-24 04:35:15
assets: assets/posts/2010-06-24-using-the-toggl-api-continued
image: 
---

<p>This is a follow up on<a href="/connect-to-toggl-api-with-net/"> my previous post</a> where I showed you how to connect to Toggl API with .NET and extract registered tasks.</p>
<p><img class="alignnone size-full wp-image-738" title="toggltimetrack" src="http://litemedia.info/media/Default/Mint/toggltimetrack.png" width="475" height="385" /></p>
<p>If we take that data and devide it into weeks, we could plot the amount of work spent each week in a chart with a library like <a href="http://zedgraph.org/wiki/index.php?title=Main_Page">ZedGraph</a>.</p>
<p><img class="alignnone size-full wp-image-734" title="togglgraph" src="http://litemedia.info/media/Default/Mint/togglgraph.png" width="512" height="384" /></p>
<p>As you can see, I started to register my time last week and this week is not finished. By scheduling this chart generation and make sure that the output image is available from an external URL, I can place a chart that displays my activity on the CodePlex dashboard.  I usually look at the commits to see if the project is active, but this would also be a perfect tool. It gives the visitor a hunch how much time was spent during the last five weeks on this project.  <a href="http://litemedia.info/media/Default/Mint/TogglChart.zip">The source code is all available here.</a></p>
