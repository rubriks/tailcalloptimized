---
layout: post
title: "Functional Patterns in C#: MapWhile"
description:
date: 2011-01-13 15:02:02
assets: assets/posts/2011-01-13-functional-patterns-in-c-mapwhile
image: 
---

<p>I had already solved <a href="http://projecteuler.net/index.php?section=problems&id=23">Project Euler 23</a> in F# but wanted to translate my solution to C# for a friend. Those translations always tend to become very functional.  This time around I needed a MapWhile method. This method should take a list and map a function over all elements as long as the while condition is true. This is actually very simple to implement, if you know how.</p>
<pre class="brush:csharp">public static class Extensions
{
    public static IEnumerable<T> MapWhile<T>(this IEnumerable<T> list, Func<T, T> mapFunction, Func<T, bool> whilePredicate)
    {
        return MapWhile(list, (i, item) => mapFunction(item), (i, item) => whilePredicate(item));
    }

    public static IEnumerable<T> MapWhile<T>(this IEnumerable<T> list, Func<int, T, T> mapFunction, Func<int, T, bool> whilePredicate)
    {
        var enumerator = list.GetEnumerator();
        var index = 0;

        while (enumerator.MoveNext())
        {
            if (!whilePredicate(index, enumerator.Current))
            {
                break;
            }

            yield return mapFunction(index, enumerator.Current);
            index++;
        }
    }
}</pre>
<p>And some unit tests on usage.</p>
<pre class="brush:csharp">[TestFixture]
public class MapWhileShould
{
    [Test]
    public void ReturnAtEndOfList()
    {
        /* Setup */
        var list = new[] { 1, 2, 3, 4 };

        /* Test */
        var result = list.MapWhile(x => x * 2, x => true);

        /* Assert */
        Assert.That(result.Sum(), Is.EqualTo(20));
    }

    [Test]
    public void BreakWhenWhileConditionIsFalse()
    {
        /* Setup */
        var list = new[] { 1, 2, 3, 4 };

        /* Test */
        var result = list.MapWhile(x => x * 2, x => x < 3);

        /* Assert */
        Assert.That(result.Sum(), Is.EqualTo(6));
    }

    [Test]
    public void ReturnEmptyListWhenWhileConditionIsFalseByDefault()
    {
        /* Setup */
        var list = new[] { 1, 2, 3, 4 };

        /* Test */
        var result = list.MapWhile(x => x * 2, x => false);

        /* Assert */
        Assert.That(result.Count(), Is.EqualTo(0));
    }

    [Test]
    public void WorkWithStrings()
    {
        /* Setup */
        var list = new[] { "Hello", "World", "Santa", "Claudius" };

        /* Test */
        var result = list.MapWhile((i, s) => i % 2 == 0 ? s.ToUpper() : s, (i, s) => true);

        /* Assert */
        Assert.That(string.Join(string.Empty, result), Is.EqualTo("HELLOWorldSANTAClaudius"));
    }
}</pre>
<h2>Usage in Project Euler 23</h2>
<p>This is how I solved Project Euler 23 with the MapWhile function. This is not the most effective solution imaginable, but it is short and readable.</p>
<pre class="brush:csharp">private const int AbundantSumMax = 28123;

public static void Main(string[] args)
{
    // Just create this once
    var defaultRange = Enumerable.Range(1, AbundantSumMax);

    // Returns true if n is abundant
    Func<int, bool> isAbundant = n => Enumerable.Range(1, n / 2).Where(x => n % x == 0).Sum() > n;

    // Get all abundants up to 28123
    var abundants = defaultRange.Where(isAbundant).ToList();

    // Get abundant sums
    var abundantSums = GetAbundantSums(abundants);

    // Invert abundant sums
    var result = defaultRange.Except(abundantSums).Sum();

    // Print
    Console.WriteLine("Result: {0}", result);
}

private static IEnumerable<int> GetAbundantSums(IList<int> abundants)
{
    // Unique set of numbers
    var result = new HashSet<int>();

    // The Tortoise and the Hare
    foreach (var abundant in abundants)
    foreach (var abundantSum in abundants.MapWhile(x => x + abundant, x => x <= abundant))
    {
        result.Add(abundantSum);
    }

    return result;
}</pre>
<p>You can find <a href="https://bitbucket.org/bokmal/projecteuler">my F# solution at bitbucket</a>.</p>
