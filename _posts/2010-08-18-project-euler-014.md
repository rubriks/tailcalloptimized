---
layout: post
title: "Project Euler #014"
description:
date: 2010-08-18 15:09:36
assets: assets/posts/2010-08-18-project-euler-014
image: 
---

The following iterative sequence is defined for the set of positive integers: <var>n</var> &rarr; <var>n</var>/2 (<var>n</var> is even) <var>n</var> &rarr; 3<var>n</var> + 1 (<var>n</var> is odd)  Using the rule above and starting with 13, we generate the following sequence:  13 &rarr; 40 &rarr; 20 &rar; 10 &rarr; 5 &rarr; 16 &rarr; 8 &rarr; 4 &rarr; 2 &rarr; 1

It can be seen that this sequence (starting at 13 and finishing at 1) contains 10 terms. Although it has not been proved yet (Collatz Problem), it is thought that all starting numbers finish at 1.  Which starting number, under one million, produces the longest chain?

```fsharp
let rec calculate_length (n:int64) =
    let even_f x = x / 2L
    let odd_f x = 3L * x + 1L
    let is_even = n % 2L = 0L
    if n = 1L then
        1
    else
        if is_even then
            1 + calculate_length (even_f n)
        else
            1 + calculate_length (odd_f n)

let rec find_longest n greatest =
    if n = 1000000 then
        fst greatest
    else
        let length = calculate_length (n |> int64)
        if length > (snd greatest) then
            find_longest (n + 1) (n, length)
        else
            find_longest (n + 1) greatest

find_longest 1 (0,0)
```
