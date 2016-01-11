---
layout: post
title: "Collect - 7 higher order functions"
description:
date: 2012-06-21 17:36:00
assets: assets/posts/2012-06-21-collect-7-higher-order-functions
image: 
---

This is my sixth post in a series about higher order functions in C#. Here are the other ones.

* [map](/2012/06/03/map-7-higher-order-functions.html)
* [fold](/2012/06/06/fold-7-higher-order-functions.html)
* [partition](/2012/06/10/partition-7-higher-order-functions.html)
* [reduce](/2012/06/16/reduce-7-higher-order-functions.html)
* [expand](/2012/06/19/expand-7-higher-order-functions.html)
* [collect](/2012/06/21/collect-7-higher-order-functions.html)
* [scan](/2012/06/23/scan-7-higher-order-functions.html)

## Collect

The collect function is mostly used as an intelligent "flatten", as you use it to flatten out data structures. Here's the function signature.

```csharp
IEnumerable<U> Collect<T, U>(Func<T, IEnumerable<U>> fn, IEnumerable<T> list)
```

For each item in the list, we produce a list, and in that list every item is yielded. This becomes much clearer with an example.

### Examples

{% gist miklund/6bbcb6ac19c2e444cf77 Numbers.cs %}

Almost so simple it's stupid. It just flattens out the array. Let's do something closer to home. Each blog post has comments, and I would like to collect all the comments.

{% gist miklund/6bbcb6ac19c2e444cf77 BlogPost.cs %}

When you think of it, this is also a "flatten", but with the selected property Comments. Once you understand how to use it, this higher order function is extremely useful.

### Implementation

The implementation of Collect is dead simple.

{% gist miklund/6bbcb6ac19c2e444cf77 Collect.cs %}

This loops through the list, selecting the property that should be collecting, and yielding all items in those child lists. Pretty simple.

### Conclusion

We have taken a look on collect and how to use it to flatten, not only multi leveled collections, but also object graphs. This becomes very useful in situations where the value you have is a 1..N relation with the value you really want.
