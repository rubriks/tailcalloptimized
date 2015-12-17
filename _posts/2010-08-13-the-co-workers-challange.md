---
layout: post
title: "The co-worker's challenge"
description:
date: 2010-08-13 17:39:43
assets: assets/posts/2010-08-13-the-co-workers-challange
image: 
---

<p>-When I took a LISP course at university, there was this guy who wrote a luhn validation algorithm in just two lines of code.  - I can do it in one!</p>
<pre class="brush:fsharp">let luhn pnr = (pnr |> List.fold2 (fun acc n1 n2 -> acc + (n1 * n2) % 10 + n1 * n2 / 10) 0 ([1..10] |> List.map (fun x -> (x % 2) + 1))) % 10 = 0                          

Usage: luhn [3; 8; 0; 8; 2; 0; 9; 0; 0; 5]</pre>
<p>Here's a more <a href="http://mint.litemedia.se/2009/07/01/luhn-validation-with-fsharp/">maintainable version that I wrote about a year ago</a>.</p>
