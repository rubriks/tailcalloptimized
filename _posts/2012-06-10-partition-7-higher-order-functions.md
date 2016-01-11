---
layout: post
title: "Partition - 7 higher order functions"
description:
date: 2012-06-10 12:20:00
assets: assets/posts/2012-06-10-partition-7-higher-order-functions
image: 
---

Here's my third blog post in my serie about higher order functions. Partition is one of those higher order functinos that I always forget about and unnecessarily reinvent the wheel.

* [map](/2012/06/03/map-7-higher-order-functions)
* [fold](/2012/06/06/fold-7-higher-order-functions)
* [partition](/2012/06/10/partition-7-higher-order-functions)
* [reduce](/2012/06/16/reduce-7-higher-order-functions)
* [expand](/2012/06/19/expand-7-higher-order-functions)
* [collect](/2012/06/21/collect-7-higher-order-functions)
* [scan](/2012/06/23/scan-7-higher-order-functions)

## Partition

This higher order function splits a list into several lists using a function to discriminate what list item goes in what list. It is basically a bucket sort. This doesn't exist in the .NET Framework by default, as far as I know. If you want this functionality you may copy/paste my implementation below.

### Examples

You have a list of people and want to display them in age groups.

{% gist miklund/c552de57bb1e8c2547d4 People.cs %}

This function is build into F# and there returns a touple. This makes it extremely slick to handle the partition result.

{% gist miklund/c552de57bb1e8c2547d4 Evens.fs %}

What happens, is that partition returns a tuple of the two parts, and F# automatically divides the tuple into two values for us. Not only beautiful, but also very useful.

### Implementation

With C# I find it more useful to return an array with parts, instead of a tuple, because the tuple isn't very well implemented in C#.

{% gist miklund/c552de57bb1e8c2547d4 Partition.cs %}

The real problem here is expanding the array, because we don't know how many parts we're intending to return. We could use a predicate function and lock the result down to two parts, but that wouldn't be as useful as this.

### Conclusion

When you need to split a list into several lists by some discriminating value, the partition function is your friend, simply because it is shorter than throwing out the foreach. It communicates the purpose of your code and makes it clearer to your readers.
