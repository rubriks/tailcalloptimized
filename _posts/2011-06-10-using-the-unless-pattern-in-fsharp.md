---
layout: migratedpost
title: "Using the unless pattern in F#"
description:
date: 2011-06-10 10:01:32
assets: assets/posts/2011-06-10-using-the-unless-pattern-in-fsharp
image: 
---

<p>Functional programming is wonderful. It really tries to encourage you to step away from your if-then-else and find alternative means of controlling flow. But sometimes you need to execute a function, only when a specific condition is valid. How can we manage to do this in an expressive way and not by imperative control flow?</p>
<h2>Enter the world of unless</h2>
<p>do {task} unless {condition}</p>
<h3>Examples</h3>
<ul>
<li>do createDatabase unless databaseAlreadyCreated</li>
<li>do saveToFile unless pathDoesNotExist</li>
<li>do getTwitterFeed unless noConnectivity</li>
</ul>
<p>What do these examples have in common? They are all expensive operations that we don't want to execute, unless our condition is met.</p>
<h2>Implementation in F#</h2>
<p>Usage of the unless operation would look like this:</p>
<pre class="brush:fsharp">lazy(createDatabase dbName) |> unless (databaseAlreadyCreated dbName)</pre>
<p>I wan't to make it obvious that createDatabase won't be called unless we have to. By decorating that call with lazy, we communicate in the code that this function call will not neccessarly be executed.</p>
<p>Here's another usecase:</p>
<pre class="brush:fsharp">match lazy(getTwitterFeed) |> unless noConnectivity with
| Some feed -> formatToHtml feed
| None -> failwith "No connectivity with Twitter.com"
</pre>
<p>First check if we have connectivity, then get feed from twitter. If expression returns some feed, it will be formatted to html otherwise we fail with an exception.</p>
<h3>The unless implementation</h3>
<p>The implementation of unless is not much of a fuzz.</p>
<pre class="brush:fsharp">let unless success (fn_run : Lazy<'a>) = 
    if not success then Some(fn_run.Force()) else None</pre>
<p>First argument is a bool. If that bool is false, we execute the function and return as some value. Otherwise we return None.</p>
