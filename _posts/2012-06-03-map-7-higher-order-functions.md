---
layout: post
title: "Map - 7 higher order functions"
description:
date: 2012-06-03 10:27:00
assets: assets/posts/2012-06-03-map-7-higher-order-functions
image: 
---

This is the first blog post in a series of posts that will talk about higher order functions. We'll start off easy with a function called Map that I hope everyone has encountered and are using regularly.

* [map](/2012/06/03/map-7-higher-order-functions)
* [fold](/2012/06/06/fold-7-higher-order-functions)
* [partition](/2012/06/10/partition-7-higher-order-functions)
* [reduce](/2012/06/16/reduce-7-higher-order-functions)
* [expand](/2012/06/19/expand-7-higher-order-functions)
* [collect](/2012/06/21/collect-7-higher-order-functions)
* [scan](/2012/06/23/scan-7-higher-order-functions)

## Map

The most common higher order function is map, which is also called [collect in Ruby](http://www.ruby-doc.org/core-1.9.3/Array.html#method-i-collect), [array map in PHP](http://php.net/manual/en/function.array-map.php) and [select in C#](http://msdn.microsoft.com/en-us/library/bb548891.aspx). Map takes a function that is run on every item in a collection, then returns the changed collection.

### Examples

```csharp
Map(i => i * 2, new [] {1, 2, 3});
```

An array [1, 2, 3] run the lambda i => i * 2 on every item in the list. This returns a list [1, 4, 6]. We can extract the lambda function to make it more readable and easily testable.

{% gist miklund/139c93a005595933334c Double.cs %}

## Implementation

The implementation of map in C# is quite straight forward.

{% gist miklund/139c93a005595933334c Map.cs %}

## Realistic example

In .NET Framework you have Map as an extension method on IEnumerable<T> called Select, as a part of LINQ. You should use that instead of rolling your own. In a more realistic example, you've gotten a list of people from data source, and would like to extract their names.

{% gist miklund/139c93a005595933334c Select.cs %}

### Conclusion

If you have a list that needs to be transformed, you should be using a Map function. It will compose code that you've probably written hundreds of times into a nice pattern that is well understood other developers. Less code, more love!
