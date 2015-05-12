---
layout: migratedpost
title: "Partition - 7 higher order functions"
description:
date: 2012-06-10 12:20:00
assets: assets/posts/2012-06-10-partition-7-higher-order-functions
image: 
---

<p>Here's my third blog post in my serie about higher order functions. Partition is one of those higher order functinos that I always forget about and unnecessarily reinvent the wheel.</p>
<ul>
<li><a href="http://litemedia.info/map-7-higher-order-functions#map">map</a></li>
<li><a href="http://litemedia.info/fold-7-higher-order-functions#fold">fold</a></li>
<li><a href="http://litemedia.info/partition-7-higher-order-functions#partition">partition</a></li>
<li><a href="http://litemedia.info/reduce-7-higher-order-functions#reduce">reduce</a></li>
<li><a href="http://litemedia.info/expand-7-higher-order-functions#expand">expand</a></li>
<li><a href="http://litemedia.info/collect-7-higher-order-functions#collect">collect</a></li>
<li><a href="http://litemedia.info/scan-7-higher-order-functions#scan">scan</a></li>
</ul>
<h2 id="partition">Partition</h2>
<p>This higher order function splits a list into several lists using a function to discriminate what list item goes in what list. It is basically a bucket sort. This doesn't exist in the .NET Framework by default, as far as I know. If you want this functionality you may copy/paste my implementation below.</p>
<h3>Examples</h3>
<p>You have a list of people and want to display them in age groups.</p>
<pre class="brush:csharp">var people = new List<Person>
{
    new Person(name: "A", age: 12),
    new Person(name: "B", age: 23),
    new Person(name: "C", age: 43),
    new Person(name: "D", age: 65),
    new Person(name: "E", age: 33),
};

var parts = people.Partition(p => p.Age < 25 ? 0 : 1);

var under25 = parts[0]; // A, B
var over25 = parts[1]; // C, D, E</pre>
<p>This function is build into F# and there returns a touple. This makes it extremely slick to handle the partition result.</p>
<pre class="brush:fsharp">let evens, odds = [1..10] |> List.partition (fun i -> i % 2 = 0)

val odds : int list = [1; 3; 5; 7; 9]
val evens : int list = [2; 4; 6; 8; 10]</pre>
<p>What happens, is that partition returns a tuple of the two parts, and F# automatically divides the tuple into two values for us. Not only beautiful, but also very useful.</p>
<h3>Implementation</h3>
<p>With C# I find it more useful to return an array with parts, instead of a tuple, because the tuple isn't very well implemented in C#.</p>
<pre class="brush:csharp">public static IEnumerable<T>[] Partition<T>(Func<T, int> fn, IEnumerable<T> list)
{
    if (list == null)
    {
        throw new ArgumentNullException("list", "Supplied list to Partition is not allowed to be null");
    }

    if (fn == null)
    {
        throw new ArgumentNullException("fn", "Supplied function to Partition is not allowed to be null");
    }

    // Expand the array arr to fit index i
    Func<IList<T>[], int, IList<T>[]> expand = (arr, i) =>
    {
        var newArray = new IList<T>[i + 1];
        Array.Copy(arr, newArray, arr.Length);

        // Initialize new array
        for (var k = arr.Length; k < newArray.Length; k++)
        {
            newArray[k] = new List<T>();
        }

        return newArray;
    };

    var result = new IList<T>[0];
    foreach (var item in list)
    {
        var index = fn(item);
        if (index < 0)
        {
            throw new IndexOutOfRangeException("Your partition function returned index less than 0");
        }

        // new index
        if (index > result.Length - 1)
        {
            // expand array
            result = expand(result, index);
        }

        result[index].Add(item);
    }

    return result;
}

public static IEnumerable<T>[] Partition<T>(this IEnumerable<T> list, Func<T, int> fn)
{
    return Partition(fn, list);
}</pre>
<p>The real problem here is expanding the array, because we don't know how many parts we're intending to return. We could use a predicate function and lock the result down to two parts, but that wouldn't be as useful as this.</p>
<h3>Conclusion</h3>
<p>When you need to split a list into several lists by some discriminating value, the partition function is your friend, simply because it is shorter than throwing out the foreach. It communicates the purpose of your code and makes it clearer to your readers.</p>
