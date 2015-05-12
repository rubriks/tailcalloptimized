---
layout: migratedpost
title: "Reduce - 7 higher order functions"
description:
date: 2012-06-16 10:24:00
assets: assets/posts/2012-06-16-reduce-7-higher-order-functions
image: 
---

<p>Fourth blog post in this series is about Reduce, a pattern I heard of first with Map/Reduce, that I will be revisiting later  on. At the moment let's focus on Reduce. What is it?</p>
<ul>
<li><a href="http://litemedia.info/map-7-higher-order-functions#map">map</a></li>
<li><a href="http://litemedia.info/fold-7-higher-order-functions#fold">fold</a></li>
<li><a href="http://litemedia.info/partition-7-higher-order-functions#partition">partition</a></li>
<li><a href="http://litemedia.info/reduce-7-higher-order-functions#reduce">reduce</a></li>
<li><a href="http://litemedia.info/expand-7-higher-order-functions#expand">expand</a></li>
<li><a href="http://litemedia.info/collect-7-higher-order-functions#collect">collect</a></li>
<li><a href="http://litemedia.info/scan-7-higher-order-functions#scan">scan</a></li>
</ul>
<h2 id="reduce">Reduce</h2>
<p>The function signature of Reduce is very much like Fold but without the seed value.</p>
<pre class="brush:plain;gutter:false">U Fold<T, U>(Func<U, T, U> fn, U init, IEnumerable<T> list)
T Reduce<T>(Func<T, T, T> fn, IEnumerable<T> list</pre>
<p>No seed value and same result type as list type. Otherwise pretty much the same.</p>
<h3>Examples</h3>
<p>Easiest example to show is summing up a list of ints.</p>
<pre class="brush:csharp">public int Sum(int[] numbers)
{
    return numbers.Reduce((a, b) => a + b);
}</pre>
<p>And we could do the same with functions like Max or Min. This is not very useful. We've been able to do that before. Let's say we want to collect all outgoing links from this blog.</p>
<pre class="brush:csharp">// Links
var links = new[]
{
	"http://litemedia.info/map-7-higher-order-functions",
	"http://litemedia.info/fold-7-higher-order-functions",
	"http://litemedia.info/partition-7-higher-order-functions",
};

// Map - noop because of yield
var map = links.Map(OutgoingUrls);

// Reduce
var outgoingLinks = map.Reduce((links1, links2) =>
{
	// Add all links2 to links1 list
	var result = new List<string>(links1);
	foreach (var link in links2)
	{
		// Filter unique
		if (!result.Contains(link))
		{
			result.Add(link);
		}
	}

	return result;
});

// DONE: all outgoing links are now in variable 'outgoingLinks'

// For url, get outgoing urls
private IEnumerable<string> OutgoingUrls(string url)
{
    var result = new List<string>();
    var request = HttpWebRequest.Create(url);

	// Request url content
    using (var response = request.GetResponse())
    using (var reader = new StreamReader(response.GetResponseStream()))
    {
		// Match all href="http://..." not litemedia
        var matches = Regex.Matches(reader.ReadToEnd(), @"href=""(?<url>(?:http\:)?//(?!litemedia).*?)""");
        foreach (Match match in matches)
        {
            result.Add(match.Groups["url"].Value);
        }
    }

    return result;
}</pre>
<p>Thanks to Map uses yield, we're only traversing the list of links once.</p>
<h3>Implementation</h3>
<p>The implementation is straight forward. One difference between Fold and Reduce, is that Reduce requires at least one item in the list. You cannot reduce an empty list.</p>
<pre class="brush:csharp">public static T Reduce<T>(Func<T, T, T> fn, IEnumerable<T> list)
{
    if (list == null)
    {
        throw new ArgumentNullException("list", "Supplied list to Reduce is not allowed to be null");
    }

    if (fn == null)
    {
        throw new ArgumentNullException("fn", "Supplied function to Reduce is not allowed to be null");
    }

    IEnumerator<T> enumerator = list.GetEnumerator();
    if (!enumerator.MoveNext())
    {
        throw new ArgumentException("Can't run reduce on an empty list", "list");
    }

    var result = enumerator.Current;
    while (enumerator.MoveNext())
    {
        result = fn(result, enumerator.Current);
    }

    return result;
}

public static T Reduce<T>(this IEnumerable<T> list, Func<T, T, T> fn)
{
    return Reduce(fn, list);
}</pre>
<p>Because I need to get the first item in the list separately, and start the reduce iteration from second item, I've chosen to use the enumerator directly, and not the foreach syntactic sugar.</p>
<h3>Conclusion</h3>
<p>Reduce is one of those functions that is hard to put into a context. With out Map, its really just another Sum/Max/Min aggregate function, but together with map you have a lot of possibilities. I hope this sheared some light as to when and how, reduce should be used.</p>
