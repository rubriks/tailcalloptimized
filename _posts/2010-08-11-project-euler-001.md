---
layout: post
title: "Project Euler #001"
description:
date: 2010-08-11 20:20:03
assets: assets/posts/2010-08-11-project-euler-001
image: 
---

If we list all the natural numbers below 10 that are multiples of 3 or 5, we get 3, 5, 6 and 9. The sum of these multiples is 23.  Find the sum of all the multiples of 3 or 5 below 1000.

```fsharp
[0..999] |> List.filter (function n -> (n % 3 = 0) || (n % 5 = 0)) |> List.sum
```
