---
layout: post
title:  "What is tail call optimization"
date:   2014-03-24 08:08:00
categories: fp
---

One of the most basic concepts of functional programming is the recursive call chain. Instead of iterating through a data source, you recurse through it. Compare the following

Get the average of a list in C#

{% highlight csharp %}
public static string IterativeJoin(IEnumerable<string> values)
{
    var result = string.Empty;

    foreach (var value in values)
    {
        // first
        if (result == string.Empty)
        {
            result = value;
            continue;
        }

        result += ", " + value;
    }

    return result;
}
{% endhighlight %}

Get the average of a list in F#

{% highlight fsharp %}
let rec join = function
    | [] -> "" 
    | hd :: [] -> hd
    | hd :: tl -> hd + ", " + (join tl)
{% endhighlight %}

In a functional language you do it recursivly because
1. With immutability you can't modify a value, making iterative programming hard
2. You strive towards expressiveness through recursion

The Problem
-----------
Let's say you would want to do functional programming in C# like the big boys do, and implement the recursive version of the algorithm above.

{% highlight csharp %}
private static bool Empty(IEnumerable<string> list)
{
    var enumerator = list.GetEnumerator();
    return !enumerator.MoveNext();
}

public static string Join(IEnumerable<string> values)
{
    if (Empty(values))
    {
        return string.Empty;
    }

    var head = values.First();
    var tail = values.Skip(1);
    if (Empty(tail))
    {
        return head;
    }

    return head + ", " + Join(tail);
}
{% endhighlight %}

What will happen when you run your program?

{% highlight csharp %}
var numbers = Enumerable.Range(1, 100000).Select(n => n.ToString());
result = Join(numbers);
Console.WriteLine("Recursive join is {0}\nCalculated in {1} ms", result, watch.ElapsedMilliseconds);

==> StackOverflowException
{% endhighlight %}

This happens because every time a function gets called, a reference to that function is put on the stack, and the stack has a limit. Once you reach that limit you will get StackOverflowException.

This might not be a problem because you know that the level of recursion is very limited, as when traversing a folder path on an NTFS filesystem. But what you're actually doing is writing code that is highly ineffective and consumes unneccessary resources in favor of getting expressiveness code style.

![Resource consumption of recursive function in C#](/assets/posts/2014-03-24-tail-call-optimization/resources.png)

That is bad. Coding style does not come before function.

Why doesn't a functional language like F# suffer the same problem?
> Because F# has tail call optimization

Tail Call Optimization
----------------------
Let's take another look on the F# code provided earlier. Why won't this blow up in a StackOverflowException?

{% highlight fsharp %}
let rec join = function
    | [] -> "" 
    | hd :: [] -> hd
    | hd :: tl -> hd + ", " + (join tl)
{% endhighlight %}

This code will be compiled to the following IL-code.

{% highlight csharp %}
{% endhighlight %}

This code doesn't have a recursive call. It is an ordinary iteration like you would do in any imperative language. It is because the F# recursion has been optimized into an iterative loop.
* Your coding style is expressive but not at the expense of performance

### It is easy to screw this up.

The tail call optimization is dependent on a tail call. Otherwise you will have the same issue as with C#. Let's rewrite our F# function to omit the tail call recursion.

{% highlight fsharp %}
{% endhighlight %}

When running this code we'll get the expected exception.

{% highlight fsharp %}
{% endhighlight %}

And this is of course because there was no tail call to be optimized.

{% highlight csharp %}
{%endhighlight %}
