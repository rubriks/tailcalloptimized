---
layout: post
title: "Project Euler #005"
description:
date: 2010-08-12 11:11:57
assets: assets/posts/2010-08-12-project-euler-005
image: 
---

2520 is the smallest number that can be divided by each of the numbers from 1 to 10 without any remainder.  What is the smallest positive number that is evenly divisible by all of the numbers from 1 to 20?

```
let evenly_divisible (n:int) list = list |> List.forall (fun (x:int) -> n % x = 0)

let rec evenly_divisible_by_all (n:int) =
    if evenly_divisible n [1;11;12;13;14;15;16;17;18;19;20] then
        n
    else
        evenly_divisible_by_all (n + 20)

evenly_divisible_by_all 20
```
