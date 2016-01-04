---
layout: post
title: "The gyroball code challenge"
description:
date: 2010-08-31 22:00:15
assets: assets/posts/2010-08-31-the-gyroball-code-challenge
image: 
---

[Thycotic](http://www.thycotic.com/) presented a [code challenge where you could win a gyroball here](http://thycoticsolutionsblog.wordpress.com/2010/08/12/code-challenge-win-a-gyroball/). Since I live in Sweden, I'm not eligible to win this challenge but I thought it would be fun to solve the problem.

```
// We have designed a new magical number system called "alpha-end".  This number system is
// similar to hexadecimal but has the following characters:  0 1 2 3 4 5 6 7 8 9 x y z
// (basically the decimal number system plus the 3 characters x, y and z)
// Therefore converting from decimal to alpha-end gives the following:
//    5   =>   5
//    10  =>   x
//    13  =>   10
//    20  =>   17
// Your task is to implement the Converter.Convert method for this new number system to get all the
// unit tests passing.  Feel free to add more unit tests as you work if it helps you test drive to the goal.
// You will be judged based on the accuracy and design of your code.
//
// Extra challenge:
// Try extending from your Converter to support other number systems such as binary, octal and hexadecimal.
// Is there an easy way to refactor your code/algorithm to support this?</pre>
```

Simply, write a method that will convert from decimal to any number system. Lucky for us all their examples contains only positive discrete numbers.

{% gist miklund/527772dd9d642e454100 Gyroball.fs %}

Here's the same thing in C#.

{% gist miklund/527772dd9d642e454100 Gyroball.cs %}

Personally I think F# looks much better.
