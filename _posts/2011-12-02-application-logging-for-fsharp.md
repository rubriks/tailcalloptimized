---
layout: migratedpost
title: "Application logging for F#"
description:
date: 2011-12-02 05:38:35
assets: assets/posts/2011-12-02-application-logging-for-fsharp
image: 
---

<p>Using existing log frameworks with F# is easy enough. Here's an example with log4net.</p>
<pre class="brush:fsharp;gutter:false">let log = log4net.LogManager.GetLogger("litemedia")
log.DebugFormat("Hello {0}, you are {1} years old", [|"Mikael", 30|])</pre>
<p>Not very F#-ish now, is it. Looks like I've written C# in F# syntax. I would like to have a more Printf style of my logging messages.</p>
<pre class="brush:fsharp;gutter:false">Log.debug "Hello %s, you are %i years old" "Mikael" 30</pre>
<p>We can easily accomplish this by wrapping the logging functionality in a module.</p>
<pre class="brush:fsharp">module Log =
  let private _log = log4net.LogManager.GetLogger("litemedia")
  let debug format = Printf.ksprintf _log.Debug format</pre>
<p><a href="http://msdn.microsoft.com/en-us/library/ee370231.aspx">ksprintf</a> sends the result of <a href="http://msdn.microsoft.com/en-us/library/ee370455.aspx">sprintf</a> into the _log.Debug method. This is pretty simple stuff, but useful when you know how.</p>
