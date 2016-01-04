---
layout: post
title: "Interception with Unity"
description:
date: 2010-09-23 15:15:43
assets: assets/posts/2010-09-23-interception-with-unity
image: 
---

I've already written about this [here](/2009/10/30/aop-in-net-with-unity-interception-model.html "AOP in .NET with Unity Interception Model") but this is such a obscure topic that it really doesn't hurt with some more examples.  In this example we have a bookstore with two repositories defined as below.

{% gist miklund/f6306706eb7756a4c868 Repositories.cs %}

I would like to measure how long these calls take, but I don't want to change the implementation. This can be done with AOP and interception.

## ICallHandler

We create a class that implements ICallHandler. This is the code that will intercept the calls.

{% gist miklund/f6306706eb7756a4c868 MeasureLatencyCallHandler.cs %}

The strange call `getNext()(input, getNext)` is the actual call to the method that is intercepted. The Order property controls the inner order of interceptions.

## IMatchingRule

Interception is done by putting a proxy class on top of the class/interface that should be intercepted. But how do we control that only some methods on that class/interface should be interrupted? We implement a IMatchingRule.

{% gist miklund/f6306706eb7756a4c868 AnyMatchingRule.cs %}

This matching rule always returns true, which means that we want to intercept everything on that class/interface. Otherwise we could use the MethodBase argument to return true or false.

## Container configuration

Last, but not least, we have to tell the Unity container to intercept these interfaces with out MeasureLatencyCallHandler filtering the methods with our AnyMatchingRule.

{% gist miklund/f6306706eb7756a4c868 Container.cs %}

![example output](/assets/posts/2010-09-23-interception-with-unity/output.png)

That's it! You will find the [source here](https://bitbucket.org/bokmal/litemedia.bookstore.unity "LiteMedia.BookStore.Unity on BitBucket repository"), or you can download [as a zip archive](/assets/posts/2010-09-23-interception-with-unity/7e1787751971.zip "LiteMedia.BookStore.Unity as zip archive").
