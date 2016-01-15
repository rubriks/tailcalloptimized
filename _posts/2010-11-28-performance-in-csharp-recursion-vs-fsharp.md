---
layout: post
title: "Performance in C# recursion vs. F#"
description: How does performance in F# measure to performance in C#? I will write the same code in F# as in C# and compare how the compiler optimizes the different solutions.
tags: C#, F#, performance, Project Euler
date: 2010-11-28 10:50:31
assets: assets/posts/2010-11-28-performance-in-csharp-recursion-vs-fsharp
image: 
---

I did know that the F# compiler pulls some magic tricks with recursion, but I didn't know that it could affect performance like I've recently discovered. Me and my friend where discussing [Project Euler #16](http://projecteuler.net/index.php?section=problems&id=16), and where he did an [iterative C# solution manipulating strings](https://bitbucket.org/Whettingstone/project-euler/src/0510e7d8b3a0/ProjectEuler/Problems11to20/Problem16.cs), I went for a [recursive list mangling solution in F#](https://bitbucket.org/bokmal/projecteuler/src/364346926915/ProjectEuler.Exercises/E016.fs).

## Project Euler #16

2^<sup>15</sup> = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26. What is the sum of the digits of the number 2^<sup>1000</sup>?

## Iterative string manipulating solution by Whettingstone

{% gist miklund/fc0d3c723895e0cef1c8 Whettingstone.cs %}

This solution is pretty straight forward. Put the result in a string, double all the digits and span out overflowing number to next number in the string. At the end he sums it all up to an int. **Mean execution time: 127 ms**

## Recursive F# solution by me

{% gist miklund/fc0d3c723895e0cef1c8 E016.fs %}

This is two recursive loops where the outer loop doubles every list item and the inner loop evens out the list with moving any number larger than 9 up the stack. **Mean execution time: 5 ms**

## Recursive C# translation of the F# version

{% gist miklund/fc0d3c723895e0cef1c8 E016.cs %}

In order to explain to my friend whettingstone what I do with my F# code I translated it to C#. I was really suprised when I noticed that it took so much longer to execute. **Mean execution time: 87235 ms**

## Conclusion

The F# compiler does some heavy optimizations to our recursion and going from F# to C# one must watch out, and not write pure functional constructs without thinking about the consequences. You could problably rewrite the C# recursive solution to be much faster, but an iterative solution is probably the preferred one here.
