---
layout: post
title: "Project Euler #016"
description:
date: 2010-08-20 15:15:34
assets: assets/posts/2010-08-20-project-euler-016
image: 
---

<p>2<sup>15</sup> = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.  What is the sum of the digits of the number 2<sup>1000</sup>?</p>
<pre class="brush:fsharp">let rec exp n e =
    match e = 0 with
    | true  -> 1I
    | false -> n * exp n (e - 1) 

let sum n =
    n |> string |> Seq.fold (fun acc x -> acc + System.Int32.Parse(x |> string)) 0

exp 2I 1000 |> sum</pre>
