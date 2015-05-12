---
layout: migratedpost
title: "Real world functional programming"
description:
date: 2011-05-25 16:25:03
assets: assets/posts/2011-05-25-real-world-functional-programming
image: 
---

Today I held a seminar about functional programming at <a href="http://www.vtd11.se">Valtech Tech Day</a>. It's no coincidense that the title of the seminar is the same as <a href="http://www.amazon.com/Real-World-Functional-Programming-Examples/dp/1933988924">the book by Tomas Petricek</a>, since it inspired me to do the talk. After playing around with F# for over a year, it's time to get serious and use it in production case.

You will find my slides <a href="http://fp.litemedia.se">here</a>. (<a href="http://litemedia.info/media/Default/Mint/Real-world-functional-programming-Mikael-Lundin.pdf">or download as pdf</a>)
<h2>Do we need functional programming?</h2>
Yes! Our CPU's aren't getting faster, but better at doing several things at the same time. That is why we need to focus on parallel programming, and parallel programming is hard to do with imperative programming. That is why we must rethink our problem definitions and make them much more expressive, solving our problems with functional concepts.
<h2>What functional programming language should i learn?</h2>
If you're on .NET today, F# will be the shortest path to functional programming for you. If you're a hardcore Java developer you should look into Clojure. Erlang seems to be the coolest functional language right now, but Scala is also an alternative.
<h2>Is recursion the answer to everything?</h2>
Some people does not like recursion because they're so used to iterative way of thinking. There's nothing hard about recursive programming, but your brain is not tuned for it. Recursion is not the solution to everything, just as the foreach/while-loop is not the answer to everything, but I would say that its just as important as a looping construct.
<h2>Monads, gonads?</h2>
Ehhm ... yeah.
