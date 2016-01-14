---
layout: post
title: "Extending types in F#"
description: In C# you have extension methods to add a function as a method to a class. In F# you can extend whole classes with functionality in a similiar way.
tags: F#, functional programming, type extensions
date: 2011-07-25 05:08:43
assets: assets/posts/2011-07-25-extending-types-in-fsharp
image: 
---

Just as you can extend existing types in C# with extension methods you can do the same in F# with [type extensions](http://msdn.microsoft.com/en-us/library/dd233211.aspx "MSDN Type Extensions (F#)"). The difference is that extending types in F# helps you work in a functional matter with object orientation. Consider the following discriminated union that could be used for a card game.

{% gist miklund/7d244612c466b09b22ed model.fs %}

We would like to expose a hand as a type. In this type we can do all the object oriented behavior things like limiting number of cards in hand to 5, making sure that we don't have duplicate cards and so on. Great, but the problem is working with the type members we always need to reevaluate the type as we're changing member functions.

{% gist miklund/7d244612c466b09b22ed hand.fs %}

So we keep the Hand type as simple as possible, and then we extend with functionality.

{% gist miklund/7d244612c466b09b22ed isRoyalStraightFlush.fs %}

The function isRoyalStraightFlush can be written and tested individually without any connection to the Hand object, and then we can extend the hand with this functionality like this.

{% gist miklund/7d244612c466b09b22ed handExtended.fs %}

I really like this way of working with object orientation in a functional manner.
