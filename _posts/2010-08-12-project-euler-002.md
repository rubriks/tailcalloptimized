---
layout: post
title: "Project Euler #002"
description: Find the sum of all the even-valued terms in the sequence which do not exceed four million.
tags: project euler, F#, dojo
date: 2010-08-12 07:02:08
assets: assets/posts/2010-08-12-project-euler-002
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

Each new term in the Fibonacci sequence is generated by adding the previous two terms. By starting with 1 and 2, the first 10 terms will be:  1, 2, 3, 5, 8, 13, 21, 34, 55, 89, ...  Find the sum of all the even-valued terms in the sequence which do not exceed four million.

```fsharp
let rec fib n1 n2 iterations =
    if iterations = 1 then
        n2
    else
        fib n2 (n1 + n2) (iterations-1)

let rec fiblist iterations =
    let n = fib 1 1 iterations
    if n > 4000000 then
        []
    else
        n :: fiblist (iterations + 1)

let even x = (x % 2 = 0)
List.fold (fun acc x -> if (even x) then acc + x else acc + 0) 0 (fiblist 1)
```
