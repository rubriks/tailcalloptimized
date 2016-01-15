---
layout: post
title:  "What is tail call optimization"
description: When you write your recursions in F# with a tail call, the compiler will be able to optimize this into an interative loop, increasing performance and reducing function call nesting.
tags: F#, msil, compiler optimizations
date:   2014-03-24 08:08:00
categories: fsharp msil
---

One of the most basic concepts of functional programming is the recursive call chain. Instead of iterating through a data source, you recurse through it. Compare the following

Join a set of string values into a comma delimited string.

{% gist miklund/73f8b743234208061efc IterativeJoin.cs %}

The same in F#.

{% gist miklund/73f8b743234208061efc join.fs %}

In a functional language you do it recursivly because

1. With immutability you can't modify a value, making iterative programming hard
2. You strive towards expressiveness through recursion

The Problem
-----------
Let's say you would want to do functional programming in C# like the big boys do, and implement the recursive version of the algorithm above.

{% gist miklund/73f8b743234208061efc RecursiveJoin.cs %}

What will happen when you run your program?

{% highlight csharp %}
var numbers = Enumerable.Range(1, 100000).Select(n => n.ToString());
RecursiveJoin(numbers);

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
We'll take a look at the IL code of the bad C# function.

{% gist miklund/73f8b743234208061efc RecursiveJoin.il %}

Through all this jibberish you will notice that the code will make a recursive call to itself TailCallOptimized.Program::RecursiveJoin(...) and this is what screw things over.

What about the F# function? That did also call itself. Why doesn't this blow up in a StackOverflowException?

{% gist miklund/73f8b743234208061efc join.fs %}

This code will be compiled to the following IL-code.

{% gist miklund/73f8b743234208061efc join.il %}

I'm sure you don't find this as fascinating as I do, but you can notice that there is a loop, and no recursive call to the function join. The compiler has basically optimized away the recursive call and exchanged it with an iterative looping construct.

* Your coding style is expressive but not at the expense of performance

### It is easy to screw this up.

The tail call optimization is dependent on a tail call. Otherwise you will have the same issue as with C#. Let's rewrite our F# function to omit the tail call recursion.

{% gist miklund/73f8b743234208061efc join_bad.fs %}

When running this code we'll get the expected exception.

{% highlight fsharp %}
[1..100000] |> List.map (fun n -> n.ToString()) |> join_bad

// Process is terminated due to StackOverflowException.
// Session termination detected. Press Enter to restart.
{% endhighlight %}

And this is of course because there was no tail call to be optimized. The compiled IL looks very much like the bad C# function.

{% gist miklund/73f8b743234208061efc join_bad.il %}

See the bad line that starts with IL_0049. That is the recursive call, and that is why we fail.
