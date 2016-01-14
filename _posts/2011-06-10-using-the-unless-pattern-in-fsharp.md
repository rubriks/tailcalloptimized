---
layout: post
title: "Using the unless pattern in F#"
description: An experiment on how to implement the unless pattern from Ruby in F#.
tags: ruby, F#
date: 2011-06-10 10:01:32
assets: assets/posts/2011-06-10-using-the-unless-pattern-in-fsharp
image: 
---

Functional programming is wonderful. It really tries to encourage you to step away from your if-then-else and find alternative means of controlling flow. But sometimes you need to execute a function, only when a specific condition is valid. How can we manage to do this in an expressive way and not by imperative control flow?

## Enter the world of unless

```
do {task} unless {condition}
```

### Examples

* do createDatabase unless databaseAlreadyCreated
* do saveToFile unless pathDoesNotExist
* do getTwitterFeed unless noConnectivity

What do these examples have in common? They are all expensive operations that we don't want to execute, unless our condition is met.

## Implementation in F#

Usage of the unless operation would look like this:

```fsharp
lazy(createDatabase dbName) |> unless (databaseAlreadyCreated dbName)
```

I wan't to make it obvious that createDatabase won't be called unless we have to. By decorating that call with lazy, we communicate in the code that this function call will not neccessarly be executed.

Here's another usecase:

```fsharp
match lazy(getTwitterFeed) |> unless noConnectivity with
| Some feed -> formatToHtml feed
| None -> failwith "No connectivity with Twitter.com"
```

First check if we have connectivity, then get feed from twitter. If expression returns some feed, it will be formatted to html otherwise we fail with an exception.

### The unless implementation

The implementation of unless is not much of a fuzz.

```fhsarp
let unless success (fn_run : Lazy<'a>) = 
    if not success then Some(fn_run.Force()) else None
```

First argument is a bool. If that bool is false, we execute the function and return as some value. Otherwise we return None.
