---
layout: post
title: "Project Euler #010"
description: Find the sum of all prime numbers below two million.
tags: F#, project euler, dojo, primes
date: 2010-08-12 17:59:51
assets: assets/posts/2010-08-12-project-euler-010
image: 
---

The sum of the primes below 10 is 2 + 3 + 5 + 7 = 17.  Find the sum of all the primes below two million.

```fsharp
let rec sum_primes top (primes:list<int>) : int64 =
    let root = top |> float |> sqrt |> int

    if (primes.Head < root) then
        match primes with
        | head :: tail -> (head |> int64) + sum_primes top (tail |> List.filter (fun x -> x % head <> 0))
        | [] -> 0L // Should never happen
    else
        primes |> List.map (fun x -> x |> int64) |> List.sum

sum_primes 2000000 [2..2000000]
```
