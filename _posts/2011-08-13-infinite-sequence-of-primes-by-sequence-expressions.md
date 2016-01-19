---
layout: post
title: "Infinite sequence of primes"
description: With the use of infinite sequences in F# you can quite easily create an infinite sequence of prime numbers. Here how to do it, with some recursion and caching magic.
tags: prime numbers, F#, seq, sieve of eratosthenes
date: 2011-08-13 16:39:16
assets: assets/posts/2011-08-13-infinite-sequence-of-primes-by-sequence-expressions
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

I've been writing algorithms for calculating primes since high school. Most of those algorithms have looked the same, but in different languages with that language's specific quirks. It was when I read up on F# sequence expressions that my mind was blown, and I went **holy bananas** as I could see the solution to a prime calculation problem I've had since I started.

## Is 15485867 a prime?

Yes, it is. How would I know that? I must decide that the number is not evenly divisible by any prime number up to the square root of that number (3935). Here comes the problem. I would have to know every prime up to 3935, to make sure that 15485867 is a prime.

For every number up to 3935 I have to divide by any prime up to the square root of that number. It looks like I would have to carry around a list of prime numbers in order to calculate any other prime number.

(you could also use the [sieve of eratosthenes](http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes) for getting primes up to a certain top limit)

## Sequences

Instead I was going to use sequences. What is a sequence? It could be numbers where you would say "give me next" and you would get the next number until you reach the end. The thing about sequences is that you always move next. So when you want the third element, you would have to take next element three times.

What's so special about sequences is that they can be infinite. If you have a function that calculates the next element, the sequence does not have to have an end. If you calculate the sequence lazily, you would also be able to pass the infinite sequence around like any other object reference.

* Sequence in C#: `IEnumerable<T>`
* Sequence in F#: `seq<'a>`

## Creating sequences

In F# you use sequence expressions to create sequences.

```fsharp
seq { for n in 0..100 do yield n }
```

This creates a simple sequence ranging from 0 to 100. You can do the same in C#.

```csharp
Enumerable.Range(0, 100)
```

But sequence expressions are a bit more powerful than that. You can use yield! (bang!) to bind together sequences.

{% gist miklund/0b418905ce6d25fc75a4 seq1.fs %}

So what about this?

{% gist miklund/0b418905ce6d25fc75a4 seq2.fs %}

```
val it : seq<bool> = seq [true; false; true; false; ...]
```

Not very surprising, this code generates an infinite sequence of alternating true/false. But why doesn't it stuck and loop forever generating the sequence? Because yield! is lazy and won't generate next true/false until you request it.

## Infinitive sequence of primes

As I was reading about recursive sequence expressions my mind went, _"could I create an infinite sequence of prime numbers?"_. It took me a good part of a day, but here's my solution.

{% gist miklund/0b418905ce6d25fc75a4 primes.fs %}

Let's break it down. We have an outer and inner sequence.

{% gist miklund/0b418905ce6d25fc75a4 seq3.fs %}

The outer sequence yields the number 2 as the first prime and then calls inner function to generate primes 3 and up.

{% gist miklund/0b418905ce6d25fc75a4 primesPrime.fs %}

The inner function yields current number if it is prime. If it is not prime it will recurse by adding current number with 2. (next test is 5)

{% gist miklund/0b418905ce6d25fc75a4 isPrime.fs %}

The inner isPrime function is not very complicated. It takes number to be tested as argument, as well as a sequence of primes up to this number. If the number is not divisible with any prime up to square root of itself, this should also be a prime.

**But hey!** Where does that sequence of primes come from? As you can see on line 11, the sequence of primes are actually a recursive call to the sequence we're about to create.

## Crazy talk

As long as we don't try to check primeness of the same number in the recursion as we try to test for isPrime, we won't get into an infinite recursion. We make sure of that by only divide current number up to **the square root** of that number.

This becomes extremely ineffective since we need to recalculate the sequence and every prime up to square root of the number on recursion. That is why I've added `Seq.cache` on line 18. This will cache already calculated primes in the sequence and return them directly. This makes the code, not only beautiful to look at, but also pretty fast.

## Is 15485867 a prime?

It is actually the 1 millionth and 1 prime.

```fsharp
primes |> Seq.nth(1000000)
```

_(zero based indexer)_
