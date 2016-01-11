---
layout: post
title: "Fold - 7 higher order functions"
description:
date: 2012-06-06 11:45:00
assets: assets/posts/2012-06-06-fold-7-higher-order-functions
image: 
---

This is the second blog post in a series about higher order functions. Fold is one of my most commonly used higher order function.

* [map](/2012/06/03/map-7-higher-order-functions)
* [fold](/2012/06/06/fold-7-higher-order-functions)
* [partition](/2012/06/10/partition-7-higher-order-functions)
* [reduce](/2012/06/16/reduce-7-higher-order-functions)
* [expand](/2012/06/19/expand-7-higher-order-functions)
* [collect](/2012/06/21/collect-7-higher-order-functions)
* [scan](/2012/06/23/scan-7-higher-order-functions)

## Fold

Fold lets you run an aggregate function over the items in a list to return an aggregated result. This is extremely useful in many scenarios where you wouldn't even think about it. This function already exists in the .NET Framework as part of LINQ, called [Aggregate](http://msdn.microsoft.com/en-us/library/bb549218.aspx).

### Examples

In this example we have a couple of cats from the database and we would like to aggregate their ages. We could map out their age to a list, and then run sum, but that would be traversing the list twice. Using fold is more appropriate here.

{% gist miklund/f0ed0514f54cd6d96b3d Cats.cs %}

Here's another less trivial example. Let's say we have a sequence that should be transformed to an array. Sure, the LINQ framework [already has this functionality](http://msdn.microsoft.com/en-us/library/bb298736.aspx), but it would be interesting to investigate how we could accomplish this with Fold.

{% gist miklund/f0ed0514f54cd6d96b3d GrowArray.cs %}

Disclaimer: Don't do this at home. List already has a ToArray function. This was made to illustrate an example with Fold.

### Implementation

The implementation of the fold function is pretty straight forward.

{% gist miklund/f0ed0514f54cd6d96b3d Fold.cs %}

Loop through the list and accumulate an result.

### Conclusion

Both map and fold can take you far, writing code that is easy to test and read by extracting essential logic into their own functions. I've seen so many foreach accumulate code snippets that would be a fold one liner in my days, and I hope this will help anyone to shorten their code and clarify its purpose.
