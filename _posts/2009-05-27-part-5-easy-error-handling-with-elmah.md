---
layout: migratedpost
title: "Part 5: Easy error handling with ELMAH"
description:
date: 2009-05-27 22:00:23
assets: assets/posts/2009-05-27-part-5-easy-error-handling-with-elmah
image: 
---

<p><img class="alignright size-full wp-image-329" style="float: right;" title="kino" src="http://litemedia.info/media/Default/Mint/kino.jpg" alt="kino" width="182" height="184" />This post will describe how error handling works within <a href="http://mint.litemedia.se/2009/05/23/kino-everything-to-rss/">Kino</a>. If you haven’t already you can download the source from <a href="http://mint.litemedia.se/kino/">here</a>, play around and tell me what you think.  As a consultant, my job is often to produce as many functions as possible, in as little time as possible with as high quality as possible. We all know that this a a big lie and that you have to spend time on quality to save time. But we're also selling a service which is really about what the customer wants, and that we'll give them even if it is an impossible task. The result will vary on how well the developers can handle stress.</p>
<h2>Non-functional requirements</h2>
<p>The most important requirements are often forgotten about in these stressful hunts for more functions. Following a logging strategy or measure that the performance of this application is good, is actually something that often is put aside. The same goes with error handling.  I have more than once tried to talk the clients into ordering an error page. "There won't be any errors on our page" is what they're thinking and they won't spend money on something that will not return value.  As long as we haven't figured out how to write bug free systems, you will need error handling. You'll need to present the error to the users in a meaningful and respectful way. You will need to monitor errors so that you get them at the same time as the users, and you will need to follow up on errors that happen, so they won't happen again.  Have you ever stared into a log file and noticed that most of the messages are junk and completely useless? There is no clear strategy and debug messages are logged as error all over the place.</p>
<h2>Error logging modules and handlers</h2>
<p><a href="http://code.google.com/p/elmah/">ELMAH</a> is a plugin (if you'd like to call it that) to ASP.NET and it will help you monitor those errors in a consistent fashion. Anywhere on your website where a yellow screen of death occurs you will get an entry into <a href="http://code.google.com/p/elmah/">ELMAH</a>. You can choose to follow <a href="http://code.google.com/p/elmah/">ELMAH</a> by an RSS feed or just get the errors e-mailed to you. This is very useful as when the user calls in and reports the error, you already have it on your screen. Instead of getting the error explained to you (it was yellow, red with a lot of text) you can read it for yourself.  <img class="alignleft size-full wp-image-409" style="margin-right: 100%;" title="elmahaxd" src="http://litemedia.info/media/Default/Mint/elmahaxd.png" alt="elmahaxd" width="550" height="292" /> I would say that the most usefulness would be in development as you add this tool to your application the first thing you do, and then you show it to your client on the acceptance test environment. Not because they will find it useful to monitor their own errors, but they will be aware that this is important. They will get to see what errors are thrown in the application, question them and make sure that there are proper error handling in place.</p>
<h2>How to set it up</h2>
<p>Add the following to your web.config in each corresponding section.</p>
<pre class="brush:xml"><?xml version="1.0"?>
<configuration>
 <configSections>
  <sectionGroup name="elmah">
    <section name="security" requirePermission="false" type="Elmah.SecuritySectionHandler, Elmah"/>
    <section name="errorLog" requirePermission="false" type="Elmah.ErrorLogSectionHandler, Elmah" />
    <section name="errorMail" requirePermission="false" type="Elmah.ErrorMailSectionHandler, Elmah" />
    <section name="errorFilter" requirePermission="false" type="Elmah.ErrorFilterSectionHandler, Elmah"/>
  </sectionGroup>
 </configSections>

 <elmah>
  <errorLog type="Elmah.XmlFileErrorLog, Elmah" logPath="~/App_Data" />
 </elmah>
 <system.web>
  <httpHandlers>
   <add verb="POST,GET,HEAD" path="elmah.axd" type="Elmah.ErrorLogPageFactory, Elmah" />
  </httpHandlers>
  <httpModules>
   <add name="ErrorLog" type="Elmah.ErrorLogModule, Elmah" />
  </httpModules>
 </system.web>
</configuration></pre>
<p>Make sure that you have elmah.dll in your bin-folder and point your browser to <a href="http://[host]/elmah.axd">http://[host]/elmah.axd</a></p>
<h2>Download and read more here</h2>
<p><a href="http://code.google.com/p/elmah/">http://code.google.com/p/elmah/</a> <a href="http://dotnetslackers.com/articles/aspnet/ErrorLoggingModulesAndHandlers.aspx">http://dotnetslackers.com/articles/aspnet/ErrorLoggingModulesAndHandlers.aspx</a></p>
