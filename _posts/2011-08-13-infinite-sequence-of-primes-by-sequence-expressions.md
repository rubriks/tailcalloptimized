---
layout: post
title: "Infinite sequence of primes"
description:
date: 2011-08-13 16:39:16
assets: assets/posts/2011-08-13-infinite-sequence-of-primes-by-sequence-expressions
image: 
---

<p>I've been writing algorithms for calculating primes since high school. Most of those algorithms have looked the same, but in different languages with that language's specific quirks. It was when I read up on F# sequence expressions that my mind was blown, and I went <strong>holy bananas</strong> as I could see the solution to a prime calculation problem I've had since I started.</p>
<h2>Is 15485867 a prime?</h2>
<p>Yes, it is. How would I know that? I must decide that the number is not evenly divisible by any prime number up to the square root of that number (3935). Here comes the problem. I would have to know every prime up to 3935, to make sure that 15485867 is a prime.</p>
<p>For every number up to 3935 I have to divide by any prime up to the square root of that number. It looks like I would have to carry around a list of prime numbers in order to calculate any other prime number.</p>
<p>(you could also use the <a href="http://en.wikipedia.org/wiki/Sieve_of_Eratosthenes">sieve of eratosthenes</a> for getting primes up to a certain top limit)</p>
<h2>Sequences</h2>
<p>Instead I was going to use sequences. What is a sequence? It could be numbers where you would say "give me next" and you would get the next number until you reach the end. The thing about sequences is that you always move next. So when you want the third element, you would have to take next element three times.</p>
<p>What's so special about sequences is that they can be infinite. If you have a function that calculates the next element, the sequence does not have to have an end. If you calculate the sequence lazily, you would also be able to pass the infinite sequence around like any other object reference.</p>
<p>Sequence in C#</p>
<pre class="brush:csharp;gutter:false">IEnumerable<T></pre>
<p>Sequence in F#</p>
<pre class="brush:fsharp;gutter:false">seq<'a> </pre>
<h2>Creating sequences</h2>
<p>In F# you use sequence expressions to create sequences.</p>
<pre class="brush:fsharp;gutter:false">seq { for n in 0..100 do yield n }</pre>
<p>This creates a simple sequence ranging from 0 to 100. You can do the same in C#.</p>
<pre class="brush:csharp;gutter:false">Enumerable.Range(0, 100)</pre>
<p>But sequence expressions are a bit more powerful than that. You can use yield! (bang!) to bind together sequences.</p>
<pre class="brush:fsharp">  seq { 
    yield 0
    yield! [1; 2; 3]
    yield! [4; 5; 6]
    yield! [7; 8; 9]
  }</pre>
<p>So what about this?</p>
<pre class="brush:fsharp">  let rec alternating = 
    seq {
      yield true
      yield false
      yield! alternating
    }</pre>
<pre>val it : seq<bool> = seq [true; false; true; false; ...]</pre>
<p>Not very surprising, this code generates an infinite sequence of alternating true/false. But why doesn't it stuck and loop forever generating the sequence? Because yield! is lazy and won't generate next true/false until you request it.</p>
<h2>Infinitive sequence of primes</h2>
<p>As I was reading about recursive sequence expressions my mind went, <em>"could I create an infinite sequence of prime numbers?"</em>. It took me a good part of a day, but here's my solution.</p>
<pre class="brush:fsharp">let rec primes = 
  let isPrime number primes =
    let sqrtn = float >> sqrt >> int
    primes
     |> Seq.takeWhile (fun n -> n <= (sqrtn number))
     |> Seq.exists (fun n -> number % n = 0)
   |> not

  let rec primes' current =
    seq {
     if primes |> isPrime current then
     yield current
   yield! primes' (current + 2)
    }
  seq {
    yield 2
    yield! primes' 3
  } |> Seq.cache</pre>
<p>Let's break it down. We have an outer and inner sequence.</p>
<pre class="brush:fsharp;first-line:15">  seq {
    yield 2
    yield! primes' 3
  } |> Seq.cache</pre>
<p>The outer sequence yields the number 2 as the first prime and then calls inner function to generate primes 3 and up.</p>
<pre class="brush:fsharp;first-line:9">  let rec primes' current =
    seq {
     if primes |> isPrime current then
     yield current
   yield! primes' (current + 2)
    }
</pre>
<p>The inner function yields current number if it is prime. If it is not prime it will recurse by adding current number with 2. (next test is 5)</p>
<pre class="brush:fsharp;first-line:2">  let isPrime number primes =
    let sqrtn = float >> sqrt >> int
    primes
     |> Seq.takeWhile (fun n -> n <= (sqrtn number))
     |> Seq.exists (fun n -> number % n = 0)
   |> not</pre>
<p>The inner isPrime function is not very complicated. It takes number to be tested as argument, as well as a sequence of primes up to this number. If the number is not divisible with any prime up to square root of itself, this should also be a prime.</p>
<p><strong>But hey!</strong> Where does that sequence of primes come from? As you can see on line 11, the sequence of primes are actually a recursive call to the sequence we're about to create.</p>
<h3>Crazy talk</h3>
<p>As long as we don't try to check primeness of the same number in the recursion as we try to test for isPrime, we won't get into an infinite recursion. We make sure of that by only divide current number up to <strong>the square root</strong> of that number.</p>
<p>This becomes extremely ineffective since we need to recalculate the sequence and every prime up to square root of the number on recursion. That is why I've added <strong>Seq.cache</strong> on line 18. This will cache already calculated primes in the sequence and return them directly. This makes the code, not only beautiful to look at, but also pretty fast.</p>
<h2>Is 15485867 a prime?</h2>
<p>It is actually the 1 millionth and 1 prime.</p>
<pre class="brush:fsharp;gutter:false">primes |> Seq.nth(1000000)</pre>
<p><em>(zero based indexer)</em></p>
