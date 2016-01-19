---
layout: post
title: "Part 5: Easy error handling with ELMAH"
description: Errors have a way of going into a logfile that is never opened. Elmah is a dashboard for errors happening in your ASP.NET application. It it a great tool when troubleshooting why errors happens on your website.
tags: Elmah, exceptions, asp.net, error handling
date: 2009-05-27 22:00:23
assets: assets/posts/2009-05-27-part-5-easy-error-handling-with-elmah
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

This post will describe how error handling works within [Kino](/2009/05/23/kino-everything-to-rss.html). If you haven’t already you can download the source from [here](/kino/ "Kino"), play around and tell me what you think.  As a consultant, my job is often to produce as many functions as possible, in as little time as possible with as high quality as possible. We all know that this a a big lie and that you have to spend time on quality to save time. But we're also selling a service which is really about what the customer wants, and that we'll give them even if it is an impossible task. The result will vary on how well the developers can handle stress.

## Non-functional requirements

The most important requirements are often forgotten about in these stressful hunts for more functions. Following a logging strategy or measure that the performance of this application is good, is actually something that often is put aside. The same goes with error handling.  I have more than once tried to talk the clients into ordering an error page. "There won't be any errors on our page" is what they're thinking and they won't spend money on something that will not return value.  As long as we haven't figured out how to write bug free systems, you will need error handling. You'll need to present the error to the users in a meaningful and respectful way. You will need to monitor errors so that you get them at the same time as the users, and you will need to follow up on errors that happen, so they won't happen again.  Have you ever stared into a log file and noticed that most of the messages are junk and completely useless? There is no clear strategy and debug messages are logged as error all over the place.

## Error logging modules and handlers

[ELMAH](http://code.google.com/p/elmah/) is a plugin (if you'd like to call it that) to ASP.NET and it will help you monitor those errors in a consistent fashion. Anywhere on your website where a yellow screen of death occurs you will get an entry into [ELMAH](http://code.google.com/p/elmah/). You can choose to follow [ELMAH](http://code.google.com/p/elmah/) by an RSS feed or just get the errors e-mailed to you. This is very useful as when the user calls in and reports the error, you already have it on your screen. Instead of getting the error explained to you (it was yellow, red with a lot of text) you can read it for yourself.

![ELMAH user interface](/assets/posts/2009-05-28-part-5-easy-error-handling-with-elmah/elmahaxd.png)

I would say that the most usefulness would be in development as you add this tool to your application the first thing you do, and then you show it to your client on the acceptance test environment. Not because they will find it useful to monitor their own errors, but they will be aware that this is important. They will get to see what errors are thrown in the application, question them and make sure that there are proper error handling in place.

## How to set it up

Add the following to your web.config in each corresponding section.

{% gist miklund/71730313857b8a88cb15 Web.config.xml %}

Make sure that you have elmah.dll in your bin-folder and point your browser to `http://[host]/elmah.axd`

## Download and read more here

* [http://code.google.com/p/elmah/](http://code.google.com/p/elmah/)
* [http://dotnetslackers.com/articles/aspnet/ErrorLoggingModulesAndHandlers.aspx](http://dotnetslackers.com/articles/aspnet/ErrorLoggingModulesAndHandlers.aspx)
