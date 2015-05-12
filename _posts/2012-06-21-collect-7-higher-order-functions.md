---
layout: migratedpost
title: "Collect - 7 higher order functions"
description:
date: 2012-06-21 17:36:00
assets: assets/posts/2012-06-21-collect-7-higher-order-functions
image: 
---

<p>This is my sixth post in a series about higher order functions in C#. Here are the other ones.</p>
<ul>
<li><a href="http://litemedia.info/map-7-higher-order-functions#map">map</a></li>
<li><a href="http://litemedia.info/fold-7-higher-order-functions#fold">fold</a></li>
<li><a href="http://litemedia.info/partition-7-higher-order-functions#partition">partition</a></li>
<li><a href="http://litemedia.info/reduce-7-higher-order-functions#reduce">reduce</a></li>
<li><a href="http://litemedia.info/expand-7-higher-order-functions#expand">expand</a></li>
<li><a href="http://litemedia.info/collect-7-higher-order-functions#collect">collect</a></li>
<li><a href="http://litemedia.info/scan-7-higher-order-functions#scan">scan</a></li>
</ul>
<h2 id="collect">Collect</h2>
<p>The collect function is mostly used as an intelligent "flatten", as you use it to flatten out data structures. Here's the function signature.</p>
<pre class="brush:csharp;gutter:false">IEnumerable<U> Collect<T, U>(Func<T, IEnumerable<U>> fn, IEnumerable<T> list)</pre>
<p>For each item in the list, we produce a list, and in that list every item is yielded. This becomes much clearer with an example.</p>
<h3>Examples</h3>
<pre class="brush:csharp">var numbers = new[] 
{ 
    new[] { 1, 2, 3 },
    new[] { 4, 5, 6 },
    new[] { 7, 8, 9 },
};

var flat = numbers.Collect(arr => arr);
// 1, 2, 3, 4, 5, 6, 7, 8, 9</pre>
<p>Almost so simple it's stupid. It just flattens out the array. Let's do something closer to home. Each blog post has comments, and I would like to collect all the comments.</p>
<pre class="brush:csharp">private class BlogPost
{
    public IEnumerable<Comment> Comments { get; private set; }

    public static IEnumerable<BlogPost> All()
    {
        // return SELECT blogpost.* FROM db
    }
}

var blogPosts = BlogPost.All();
var comments = blogPosts.Collect(post => post.Comments);</pre>
<p>When you think of it, this is also a "flatten", but with the selected property Comments. Once you understand how to use it, this higher order function is extremely useful.</p>
<h3>Implementation</h3>
<p>The implementation of Collect is dead simple. </p>
<pre class="brush:csharp">public static IEnumerable<U> Collect<T, U>(Func<T, IEnumerable<U>> fn, IEnumerable<T> list)
{
    if (list == null)
    {
        throw new ArgumentNullException("list", "Supplied list to Collect is not allowed to be null");
    }

    if (fn == null)
    {
        throw new ArgumentNullException("fn", "Supplied function to Collect is not allowed to be null");
    }

    foreach (var item1 in list)
    foreach (var item2 in fn(item1))
    {
        yield return item2;
    }
}

public static IEnumerable<U> Collect<T, U>(this IEnumerable<T> list, Func<T, IEnumerable<U>> fn)
{
    return Collect(fn, list);
}</pre>
<p>This loops through the list, selecting the property that should be collecting, and yielding all items in those child lists. Pretty simple.</p>
<h3>Conclusion</h3>
<p>We have taken a look on collect and how to use it to flatten, not only multi leveled collections, but also object graphs. This becomes very useful in situations where the value you have is a 1..N relation with the value you really want.</p>
