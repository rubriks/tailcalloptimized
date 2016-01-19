---
layout: post
title: "Application logging for F#"
description: Using log4net in F# can look pretty bad unless you do something about it and create nice wrapper functions.
tags: F#, logging, log4net, ksprintf
date: 2011-12-02 05:38:35
assets: assets/posts/2011-12-02-application-logging-for-fsharp
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

Using existing log frameworks with F# is easy enough. Here's an example with log4net.

```fsharp
let log = log4net.LogManager.GetLogger("litemedia")
log.DebugFormat("Hello {0}, you are {1} years old", [|"Mikael", 30|])
```

Not very F#-ish now, is it. Looks like I've written C# in F# syntax. I would like to have a more Printf style of my logging messages.

```fsharp
Log.debug "Hello %s, you are %i years old" "Mikael" 30
```

We can easily accomplish this by wrapping the logging functionality in a module.

```fsharp
module Log =
  let private _log = log4net.LogManager.GetLogger("litemedia")
  let debug format = Printf.ksprintf _log.Debug format
```

[ksprintf](http://msdn.microsoft.com/en-us/library/ee370231.aspx) sends the result of [sprintf](http://msdn.microsoft.com/en-us/library/ee370455.aspx) into the `_log.Debug` method. This is pretty simple stuff, but useful when you know how.
