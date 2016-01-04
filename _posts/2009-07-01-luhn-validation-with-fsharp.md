---
layout: post
title: "LUHN validation with F#"
description:
date: 2009-07-01 10:29:27
assets: assets/posts/2009-07-01-luhn-validation-with-fsharp
image: 
---

I'm on vacation, and since I'm a nerd I take that amount of spare time and use it to learn a new language. This year I decided to learn F#. I've been working with Lisp before, so the concept of functional oriented langauges is not new to me. The syntax however is.  After a couple of hours with the book [Foundations of F# (Robert Pickering)](http://www.amazon.com/Foundations-F-Experts-Voice-Net/dp/1590597575). I've already written my first program. It is a LUHN10 validator.  Every Swedish citizen has a personal identity number (almost like social security number) that uniquely identifies that person. The format of this number looks like this

```
y y M M d d x x x z
6 9 0 1 0 1 1 2 3 6
```

`y` is year, `M` is month and `d'`is day. `x` is some number and `z` is a control digit. From this number you could tell when I was born (birth date), what region of Sweden I was born and my gender. The last digit is a control number used to validate the rest of the number. The LUHN10 validation works like this.

```
  6 9 0 1 0 1 1 2 3 6
* 2 1 2 1 2 1 2 1 2 1
---------------------
 12 9 0 1 0 1 2 2 6 6
```

You calculate the products as I shown above, and then you add every digit each of their own.

```
1 + 2 + 9 + 0 + 1 + 0 + 1 + 2 + 2 + 6 + 6 = 30
```

If the result is evenly divisible by 10, then this personal identity number is valid. That is where the LUHN10 name comes from. You can also use this to calculate the last digit of the personal identity number.

```
  6 9 0 1 0 1 1 2 3 x
* 2 1 2 1 2 1 2 1 2 1
---------------------
1 + 2 + 9 + 0 + 1 + 0 + 1 + 2 + 2 + 6 + x = y
24 + x = y
```

At this point you set `x` some a number that will make y evenly divisible with 10, and you have your control digit.  I wrote this validation algorithm in F# as practice. This piece of code probably looks like shit to those of you that are already fluent with F#.

{% gist miklund/b3682e35f729b59a4235 luhn.fs %}

And the usage may look like this

{% gist miklund/b3682e35f729b59a4235 example.fs %}
