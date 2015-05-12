---
layout: migratedpost
title: "Fold - 7 higher order functions"
description:
date: 2012-06-06 11:45:00
assets: assets/posts/2012-06-06-fold-7-higher-order-functions
image: 
---

<p>This is the second blog post in a series about higher order functions. Fold is one of my most commonly used higher order function.</p>
<ul>
<li><a href="http://litemedia.info/map-7-higher-order-functions#map">map</a></li>
<li><a href="http://litemedia.info/fold-7-higher-order-functions#fold">fold</a></li>
<li><a href="http://litemedia.info/partition-7-higher-order-functions#partition">partition</a></li>
<li><a href="http://litemedia.info/reduce-7-higher-order-functions#reduce">reduce</a></li>
<li><a href="http://litemedia.info/expand-7-higher-order-functions#expand">expand</a></li>
<li><a href="http://litemedia.info/collect-7-higher-order-functions#collect">collect</a></li>
<li><a href="http://litemedia.info/scan-7-higher-order-functions#scan">scan</a></li>
</ul>
<h2 id="fold">Fold</h2>
<p>Fold lets you run an aggregate function over the items in a list to return an aggregated result. This is extremely useful in many scenarios where you wouldn't even think about it. This function already exists in the .NET Framework as part of LINQ, called <a href="http://msdn.microsoft.com/en-us/library/bb549218.aspx">Aggregate</a>.</p>
<h3>Examples</h3>
<p>In this example we have a couple of cats from the database and we would like to aggregate their ages. We could map out their age to a list, and then run sum, but that would be traversing the list twice. Using fold is more appropriate here.</p>
<pre class="brush:csharp">var cats = new[]
{
    new Cat(name : "Miss Marple", age : 4),
    new Cat(name : "Mr. Quincy", age : 12),
    new Cat(name : "Darcy", age : 8)
};

cats.Fold((acc, cat) => acc + cat.Age, 0);
// => 24</pre>
<p>Here's another less trivial example. Let's say we have a sequence that should be transformed to an array. Sure, the LINQ framework <a href="http://msdn.microsoft.com/en-us/library/bb298736.aspx">already has this functionality</a>, but it would be interesting to investigate how we could accomplish this with Fold.</p>
<pre class="brush:csharp">private T[] GrowArray<T>(T[] acc, T item)
{
    var newArray = new T[acc.Length + 1];
    acc.CopyTo(newArray, 0);
    newArray[acc.Length] = item;

    return newArray;
}

var list = new List<int> { 1, 2, 3 };
list.Fold(GrowArray, new int[0]);
// => [1, 2, 3]</pre>
<p>Disclaimer: Don't do this at home. List already has a ToArray function. This was made to illustrate an example with Fold.</p>
<h3>Implementation</h3>
<p>The implementation of the fold function is pretty straight forward.</p>
<pre class=""brush:csharp">public static U Fold<T, U>(Func<U, T, U> fn, IEnumerable<T> list, U init)
{
    if (fn == null)
    {
        throw new ArgumentNullException("fn", "Supplied function to Fold is not allowed to be null");
    }
            
    if (list == null)
    {
        throw new ArgumentNullException("list", "Supplied list to Fold is not allowed to be null");
    }

    var result = init;
    foreach (var item in list)
    {
        result = fn(result, item);
    }

    return result;
}

public static U Fold<T, U>(this IEnumerable<T> list, Func<U, T, U> fn, U init)
{
    return Fold(fn, list, init);
}</pre>
<p>Loop through the list and accumulate an result.</p>
<h3>Conclusion</h3>
<p>Both map and fold can take you far, writing code that is easy to test and read by extracting essential logic into their own functions. I've seen so many foreach accumulate code snippets that would be a fold one liner in my days, and I hope this will help anyone to shorten their code and clarify its purpose.</p>
