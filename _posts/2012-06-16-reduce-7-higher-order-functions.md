---
layout: post
title: "Reduce - 7 higher order functions"
description:
date: 2012-06-16 10:24:00
assets: assets/posts/2012-06-16-reduce-7-higher-order-functions
image: 
---

Fourth blog post in this series is about Reduce, a pattern I heard of first with Map/Reduce, that I will be revisiting later  on. At the moment let's focus on Reduce. What is it?

* [map](/2012/06/03/map-7-higher-order-functions)
* [fold](/2012/06/06/fold-7-higher-order-functions)
* [partition](/2012/06/10/partition-7-higher-order-functions)
* [reduce](/2012/06/16/reduce-7-higher-order-functions)
* [expand](/2012/06/19/expand-7-higher-order-functions)
* [collect](/2012/06/21/collect-7-higher-order-functions)
* [scan](/2012/06/23/scan-7-higher-order-functions)

## Reduce

The function signature of Reduce is very much like Fold but without the seed value.

```
U Fold<T, U>(Func<U, T, U> fn, U init, IEnumerable<T> list)
T Reduce<T>(Func<T, T, T> fn, IEnumerable<T> list
```

No seed value and same result type as list type. Otherwise pretty much the same.

### Examples

Easiest example to show is summing up a list of ints.

{% gist miklund/3b103e33357610ad896d Sum.cs %}

And we could do the same with functions like Max or Min. This is not very useful. We've been able to do that before. Let's say we want to collect all outgoing links from this blog.

{% gist miklund/3b103e33357610ad896d Links.cs %}

Thanks to Map uses yield, we're only traversing the list of links once.

### Implementation

The implementation is straight forward. One difference between Fold and Reduce, is that Reduce requires at least one item in the list. You cannot reduce an empty list.

{% gist miklund/3b103e33357610ad896d Reduce.cs %}

Because I need to get the first item in the list separately, and start the reduce iteration from second item, I've chosen to use the enumerator directly, and not the foreach syntactic sugar.

### Conclusion

Reduce is one of those functions that is hard to put into a context. With out Map, its really just another Sum/Max/Min aggregate function, but together with map you have a lot of possibilities. I hope this sheared some light as to when and how, reduce should be used.
