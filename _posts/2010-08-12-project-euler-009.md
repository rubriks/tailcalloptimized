---
layout: post
title: "Project Euler #009"
description: For the pythagorean triplet with the sum of 1000, find the product of a b c.
tags: F#, project euler, dojo
date: 2010-08-12 15:24:58
assets: assets/posts/2010-08-12-project-euler-009
image: 
---

A Pythagorean triplet is a set of three natural numbers, a &lt; b &lt; c, for which, a<sup>2</sup> + b<sup>2</sup> = c<sup>2</sup>

For example, 3<sup>2</sup> + 4<sup>2</sup> = 9 + 16 = 25 = 5<sup>2</sup>

There exists exactly one Pythagorean triplet for which a + b + c = 1000.  
Find the product abc.

```fsharp
let pythagorean_triplet a b c = (((a |> float) ** 2.0) + ((b |> float) ** 2.0) = ((c |> float) ** 2.0)) && (a + b + c = 1000)

let calc max =
    let data = [1..(max - 2)] |> List.collect (fun x -> [(x + 1)..(max - 1)] |> List.collect (fun y -> [(y + 2)..max] |> List.collect (fun z -> [x :: [y; z]])))
    data |> List.filter (fun x -> pythagorean_triplet x.[0] x.[1] x.[2])

// This takes a lot of time (5 minutes) because of 500
calc 500 |> List.head |> List.fold (fun acc x -> acc * x) 1
```
