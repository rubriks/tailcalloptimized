---
layout: migratedpost
title: "Expand - 7 higher order functions"
description:
date: 2012-06-19 18:25:00
assets: assets/posts/2012-06-19-expand-7-higher-order-functions
image: 
---

<p>This is my fifth post in a series about higher order functions and I'm starting to see the end of it. This one was the hardest to write, because I didn't have any good material or practical experience, but I think that it went decent anyway.</p>
<ul>
<li><a href="http://litemedia.info/map-7-higher-order-functions#map">map</a></li>
<li><a href="http://litemedia.info/fold-7-higher-order-functions#fold">fold</a></li>
<li><a href="http://litemedia.info/partition-7-higher-order-functions#partition">partition</a></li>
<li><a href="http://litemedia.info/reduce-7-higher-order-functions#reduce">reduce</a></li>
<li><a href="http://litemedia.info/expand-7-higher-order-functions#expand">expand</a></li>
<li><a href="http://litemedia.info/collect-7-higher-order-functions#collect">collect</a></li>
<li><a href="http://litemedia.info/scan-7-higher-order-functions#scan">scan</a></li>
</ul>
<h2 id="expand">Expand</h2>
<p>My previous post described Reduce, a function to aggregate values in a list. Expand is the opposite of reduce, where you take a value, and expand it onto a list. Here's the function signature.</p>
<pre class="brush:csharp;gutter:false">IEnumerable<T> Expand<T>(Func<T, T> yield_fn, Predicate<T> while_fn, T init)</pre>
<p>It takes a yield function, for yielding new values in the list. It takes a predicate function that determines when the result list stops generate. If set to always return true, the IEnumerable will be infinite. That could be useful when taken advantage of or devestating for the careless. The init argument is where the calculation starts.</p>
<h3>Examples</h3>
<p>Here the obvious butt stupid example.</p>
<pre class="brush:csharp">var numbers = 1.Expand(i => i + 1);
// numbers : [1, 2, 3, 4, 5..]</pre>
<p>Expands a list from 1 up to infinity. I'm not sure what uses that have, except debugging.</p>
<pre class="brush:csharp">var previous = 0;
var fibonacci = 1.Expand(current =>
{
    var next = previous + current;
    previous = current;
    return next;
});
// fibonacci : [1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89..]</pre>
<p>Talking of useless applications. Fibonacci is an obvious number series when you start from a base value and want to expand it. This uses a state variable `previous` outside the lambda.</p>
<p>Let's say we have a list of employees and they all have salaries. We would like a table of employee salaries over 3 years, calculated on a 3% raise.</p>
<pre class="brush:csharp">var employees = new List<Employee>
{
    new Employee(name : "John Smith", salary : 45000.0),
    new Employee(name : "Carla Sewer", salary : 38000.0),
    new Employee(name : "Sam Shipwright", salary : 55000.0)                    
};

const double Raise = 1.03;

var table = employees.Map(e => new
{
    e.Name,
    Salaries = e.Salary.Expand(amount => amount * Raise)
});

// Print
var format = "{0,14} | {1,7} | {2,7} | {3,7}";
Console.WriteLine(format, string.Empty, "Year 1", "Year 2", "Year 3");
foreach (var line in table)
{
    var salaries = line.Salaries.Take(3).ToArray();
    Console.WriteLine(format, line.Name, salaries[0], salaries[1], salaries[2]);
}
//                |  Year 1 |  Year 2 |  Year 3
//     John Smith |   45000 |   46350 | 47740,5
//    Carla Sewer |   38000 |   39140 | 40314,2
// Sam Shipwright |   55000 |   56650 | 58349,5</pre>
<p>The yield functionality of both map and expand plays nicely here, making sure that no values are calculated until we request them.</p>
<h3>Implementation</h3>
<p>The implementation is pretty straight forward. I use an overload to provide an extension method that does gives infinite lists as default value to while_fn.</p>
<pre class="brush:csharp">public static IEnumerable<T> Expand<T>(Func<T, T> yield_fn, Predicate<T> while_fn, T init)
{
    if (yield_fn == null)
    {
        throw new ArgumentNullException("yield_fn", "Supplied yield_fn argument to Expand is not allowed to be null");
    }

    if (while_fn == null)
    {
        throw new ArgumentNullException("while_fn", "Supplied while_fn argument to Expand is not allowed to be null");
    }

    var current = init;
    yield return current; // yield initial value
    while (while_fn(current))
    {
        // yield each calculated new value
        yield return current = yield_fn(current);
    }
}

public static IEnumerable<T> Expand<T>(this T init, Func<T, T> yield_fn,  Predicate<T> while_fn)
{
    return Expand(yield_fn, while_fn, init);
}

public static IEnumerable<T> Expand<T>(this T init, Func<T, T> yield_fn)
{
    return Expand(yield_fn, i => true, init);
}</pre>
<h3>Conclusion</h3>
<p>Expand is perfect when you need to generate data on demand. The beautiful thing is that each new value is lazily evaluated, meaning you will only calculate as much as needed, and expanded result may be performance expensive. We could get a directory from the filesystem, and expand this directories subdirectories or files. They wouldn't be requested until enumerated upon.</p>
<p>I see some great functionality originating from my understanding of Expand, and I hope I will remember to use it next time there is an opportunity.</p>
