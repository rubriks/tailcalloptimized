---
layout: post
title: "Expand - 7 higher order functions"
description:
date: 2012-06-19 18:25:00
assets: assets/posts/2012-06-19-expand-7-higher-order-functions
image: 
---

This is my fifth post in a series about higher order functions and I'm starting to see the end of it. This one was the hardest to write, because I didn't have any good material or practical experience, but I think that it went decent anyway.

* [map](/2012/06/03/map-7-higher-order-functions.html)
* [fold](/2012/06/06/fold-7-higher-order-functions.html)
* [partition](/2012/06/10/partition-7-higher-order-functions.html)
* [reduce](/2012/06/16/reduce-7-higher-order-functions.html)
* [expand](/2012/06/19/expand-7-higher-order-functions.html)
* [collect](/2012/06/21/collect-7-higher-order-functions.html)
* [scan](/2012/06/23/scan-7-higher-order-functions.html)

## Expand

My previous post described Reduce, a function to aggregate values in a list. Expand is the opposite of reduce, where you take a value, and expand it onto a list. Here's the function signature.

```
IEnumerable<T> Expand<T>(Func<T, T> yield_fn, Predicate<T> while_fn, T init)
```

It takes a yield function, for yielding new values in the list. It takes a predicate function that determines when the result list stops generate. If set to always return true, the IEnumerable will be infinite. That could be useful when taken advantage of or devestating for the careless. The init argument is where the calculation starts.

### Examples

Here the obvious butt stupid example.

{% gist miklund/98ace841dd1867cfafd0 Numbers.cs %}

Expands a list from 1 up to infinity. I'm not sure what uses that have, except debugging.

{% gist miklund/98ace841dd1867cfafd0 Fibonacci.cs %}

Talking of useless applications. Fibonacci is an obvious number series when you start from a base value and want to expand it. This uses a state variable `previous` outside the lambda.

Let's say we have a list of employees and they all have salaries. We would like a table of employee salaries over 3 years, calculated on a 3% raise.

{% gist miklund/98ace841dd1867cfafd0 Employees.cs %}

The yield functionality of both map and expand plays nicely here, making sure that no values are calculated until we request them.

### Implementation

The implementation is pretty straight forward. I use an overload to provide an extension method that does gives infinite lists as default value to while\_fn.

{% gist miklund/98ace841dd1867cfafd0 Expand.cs %}

### Conclusion

Expand is perfect when you need to generate data on demand. The beautiful thing is that each new value is lazily evaluated, meaning you will only calculate as much as needed, and expanded result may be performance expensive. We could get a directory from the filesystem, and expand this directories subdirectories or files. They wouldn't be requested until enumerated upon.

I see some great functionality originating from my understanding of Expand, and I hope I will remember to use it next time there is an opportunity.
