---
layout: post
title: "Connect to Toggl API with .NET"
description: Here is how you can connect to the Toggl API in order to extract timesheet data.
tags: Toggl, API, timesheet, integration
date: 2010-06-21 20:04:17
assets: assets/posts/2010-06-21-connect-to-toggl-api-with-net
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

Here's the quick and dirty way to extract information out of Toggl API with .NET. You will need [NewtonSoft JSON.NET](http://james.newtonking.com/projects/json-net.aspx) for the JSON parsing, otherwise it's just cut/paste/run and have fun! Enjoy!

{% gist miklund/4bcb5cf0a1cf494243de Program.cs %}

And the result should look like this.

![api integration with toggl](/assets/posts/2010-06-21-connect-to-toggl-api-with-net/toggl.png)
