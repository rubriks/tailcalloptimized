---
layout: post
title: "Scan - 7 higher order functions"
description:
date: 2012-06-23 09:47:30
assets: assets/posts/2012-06-23-scan-7-higher-order-functions
image: 
---

<p>This is the last function in the blog series about higher order functions. I hope that you've enjoyed it so far.</p>
<ul>
<li><a href="http://litemedia.info/map-7-higher-order-functions#map">map</a></li>
<li><a href="http://litemedia.info/fold-7-higher-order-functions#fold">fold</a></li>
<li><a href="http://litemedia.info/partition-7-higher-order-functions#partition">partition</a></li>
<li><a href="http://litemedia.info/reduce-7-higher-order-functions#reduce">reduce</a></li>
<li><a href="http://litemedia.info/expand-7-higher-order-functions#expand">expand</a></li>
<li><a href="http://litemedia.info/collect-7-higher-order-functions#collect">collect</a></li>
<li><a href="http://litemedia.info/scan-7-higher-order-functions#scan">scan</a></li>
</ul>
<h2 id="scan">Scan</h2>
<p>Scan is very much like a map, but it will take an accumulator through the list. The function signature looks like this.</p>
<pre class="brush:csharp;gutter:false">IEnumerable<U> Scan<T, U>(Func<U, T, U> fn, U state, IEnumerable<T> list)</pre>
<p>For each element in the list, we use fn to calculate a new value and update the state. This will become much clearer if we look at an example.</p>
<h3>Examples</h3>
<p>I've taken this example straight from <a href="http://msdn.microsoft.com/en-us/library/ee370366.aspx">the F# version of this function</a>. We have an account with an initial balance, and then we have transactions. We would like to get the account history as well as the current balance after the transactions has been made.</p>
<pre class="brush:csharp;">// Data
var initialBalance = 1122.73;
var transactions = new[] { -100.00, 450.34, -62.34, -127.00, -13.50, -12.92 };

// Scan transaction history
var accountHistory = transactions.Scan((balance, transaction) => balance + transaction, initialBalance);
            
// Print
Console.WriteLine("Initial balance:\n{0:c}", initialBalance);
Console.WriteLine("{0,15} {1,15}", "Transactions", "Balance");
foreach (var balance in transactions.Zip(accountHistory, Tuple.Create))
{
    Console.WriteLine("{0,15:c} {1,15:c}", balance.Item1, balance.Item2);
}

// =>
// Initial balance:
// 1.122,73 kr
// Transactions         Balance
//   -100,00 kr     1.022,73 kr
//    450,34 kr     1.473,07 kr
//    -62,34 kr     1.410,73 kr
//   -127,00 kr     1.283,73 kr
//    -13,50 kr     1.270,23 kr
//    -12,92 kr     1.257,31 kr</pre>
<p>We use the state variable initialBalance that we bring through the computation of each value, that will result in the transaction history. Quite neat.</p>
<p>My bus to the city departs at alternating 10/20 minutes intervals. I would like a time table that tells me of each departs from now, 10 departs forward.</p>
<pre class="brush:csharp">// The bus departs at 20 minutes / 10 minutes intervals
// [20, 10, 20, 10, 20, ..]
var departures = 0.Expand(minute => minute == 20 ? 10 : 20);

// First bus departs at 10:09
var firstDeparture = DateTime.Parse("2012-06-23 10:09");

// Get timetable for each departure
var timetable = departures.Scan((time, minute) => time.AddMinutes(minute), firstDeparture);

Console.WriteLine("Bus departures at");
foreach (var departure in timetable.Take(10))
{
    Console.WriteLine(departure.ToString("t"));
}

// Bus departures at
// 10:09
// 10:29
// 10:39
// 10:59
// 11:09
// 11:29
// 11:39
// 11:59
// 12:09
// 12:29</pre>
<h3>Implementation</h3>
<p>The implementation is extremely simple. There is a result variable that is accumulated through the computation, but aside from that, this is nearly identical to Map.</p>
<pre class="brush:csharp">public static IEnumerable<U> Scan<T, U>(Func<U, T, U> fn, U state, IEnumerable<T> list)
{
    if (list == null)
    {
        throw new ArgumentNullException("list", "Supplied list to Scan is not allowed to be null");
    }

    if (fn == null)
    {
        throw new ArgumentNullException("fn", "Supplied function to Scan is not allowed to be null");
    }

    var result = state;
    foreach (var item in list)
    {
        yield return result = fn(result, item);
    }
}

public static IEnumerable<U> Scan<T, U>(this IEnumerable<T> list, Func<U, T, U> fn, U state)
{
    return Scan(fn, state, list);
}</pre>
<h3>Conclusion</h3>
<p>Scan is one of those odd cases when you think that you need to take to a for loop, but really just want to remember your higher order functions. If your peers don't know about Scan, they'll have to look it up, but that is a better way to communicate intent with your code than custom hacking inline for loops.</p>
