---
layout: post
title: "Scan - 7 higher order functions"
description: Implementation and usage of scan, a higher order function.
tags: functional programming
date: 2012-06-23 09:47:30
assets: assets/posts/2012-06-23-scan-7-higher-order-functions
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

This is the last function in the blog series about higher order functions. I hope that you've enjoyed it so far.

* [map](/2012/06/03/map-7-higher-order-functions.html)
* [fold](/2012/06/06/fold-7-higher-order-functions.html)
* [partition](/2012/06/10/partition-7-higher-order-functions.html)
* [reduce](/2012/06/16/reduce-7-higher-order-functions.html)
* [expand](/2012/06/19/expand-7-higher-order-functions.html)
* [collect](/2012/06/21/collect-7-higher-order-functions.html)
* [scan](/2012/06/23/scan-7-higher-order-functions.html)

## Scan

Scan is very much like a map, but it will take an accumulator through the list. The function signature looks like this.

```csharp
IEnumerable<U> Scan<T, U>(Func<U, T, U> fn, U state, IEnumerable<T> list)
```

For each element in the list, we use fn to calculate a new value and update the state. This will become much clearer if we look at an example.

### Examples

I've taken this example straight from [the F# version of this function](http://msdn.microsoft.com/en-us/library/ee370366.aspx). We have an account with an initial balance, and then we have transactions. We would like to get the account history as well as the current balance after the transactions has been made.

{% gist miklund/21b3c13421ed67a1c0b4 Balance.cs %}

We use the state variable initialBalance that we bring through the computation of each value, that will result in the transaction history. Quite neat.

My bus to the city departs at alternating 10/20 minutes intervals. I would like a time table that tells me of each departs from now, 10 departs forward.

{% gist miklund/21b3c13421ed67a1c0b4 Departures.cs %}

### Implementation

The implementation is extremely simple. There is a result variable that is accumulated through the computation, but aside from that, this is nearly identical to Map.

{% gist miklund/21b3c13421ed67a1c0b4 Scan.cs %}

### Conclusion

Scan is one of those odd cases when you think that you need to take to a for loop, but really just want to remember your higher order functions. If your peers don't know about Scan, they'll have to look it up, but that is a better way to communicate intent with your code than custom hacking inline for loops.
