---
layout: post
title: "Map - 7 higher order functions"
description:
date: 2012-06-03 10:27:00
assets: assets/posts/2012-06-03-map-7-higher-order-functions
image: 
---

<p>This is the first blog post in a series of posts that will talk about higher order functions. We'll start off easy with a function called Map that I hope everyone has encountered and are using regularly.</p>
<ul>
<li><a href="http://litemedia.info/map-7-higher-order-functions#map">map</a></li>
<li><a href="http://litemedia.info/fold-7-higher-order-functions#fold">fold</a></li>
<li><a href="http://litemedia.info/partition-7-higher-order-functions#partition">partition</a></li>
<li><a href="http://litemedia.info/reduce-7-higher-order-functions#reduce">reduce</a></li>
<li><a href="http://litemedia.info/expand-7-higher-order-functions#expand">expand</a></li>
<li><a href="http://litemedia.info/collect-7-higher-order-functions#collect">collect</a></li>
<li><a href="http://litemedia.info/scan-7-higher-order-functions#scan">scan</a></li>
</ul>
<h2 id="map">Map</h2>
<p>The most common higher order function is map, which is also called <a href="http://www.ruby-doc.org/core-1.9.3/Array.html#method-i-collect">collect in Ruby</a>, <a href="http://php.net/manual/en/function.array-map.php">array_map in PHP</a> and <a href="http://msdn.microsoft.com/en-us/library/bb548891.aspx">select in C#</a>. Map takes a function that is run on every item in a collection, then returns the changed collection.</p>
<h3>Examples</h3>
<pre class="brush:csharp;gutter:false">Map(i => i * 2, new [] {1, 2, 3});</pre>
<p>An array [1, 2, 3] run the lambda i => i * 2 on every item in the list. This returns a list [1, 4, 6]. We can extract the lambda function to make it more readable and easily testable.</p>
<pre class="brush:csharp">private int Double(int i)
{
  return i * 2;
}

Map(Double, new [] {1, 2, 3});</pre>
<h3>Implementation</h3>
<p>The implementation of map in C# is quite straight forward.</p>
<pre class="brush:csharp">public static IEnumerable<U> Map<T, U>(Func<T, U> fn, IEnumerable<T> list)
{
    if (fn == null)
    {
        throw new ArgumentNullException("fn", "Supplied function to Map is not allowed to be null");
    }

    if (list == null)
    {
        throw new ArgumentNullException("list", "Supplied list to Map is not allowed to be null");
    }

    foreach (var item in list)
    {
        yield return fn(item);
    }
}

Map(i => i.ToString(), new[] {1, 2, 3})
-> ["1", "2", "3"]</pre>
<h3>Realistic example</h3>
<p>In .NET Framework you have Map as an extension method on IEnumerable<T> called Select, as a part of LINQ. You should use that instead of rolling your own. In a more realistic example, you've gotten a list of people from data source, and would like to extract their names.</p>
<pre class="brush:csharp">var people = new[]
{
    new Person { FirstName = "Mikael", Surname = "Lundin" },
    new Person { FirstName = "John", Surname = "Doe" },
    new Person { FirstName = "Foo", Surname = "Bar" },
};

var names = people.Select(p => p.FirstName + " " + p.Surname);

/*
	=> new [] {
		"Mikael Lundin",
		"John Doe",
		"Foo Bar"
	}
*/</pre>
<h3>Conclusion</h3>
<p>If you have a list that needs to be transformed, you should be using a Map function. It will compose code that you've probably written hundreds of times into a nice pattern that is well understood other developers. Less code, more love!</p>
