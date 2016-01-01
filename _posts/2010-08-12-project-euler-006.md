---
layout: post
title: "Project Euler #006"
description:
date: 2010-08-12 11:33:26
assets: assets/posts/2010-08-12-project-euler-006
image: 
---

The sum of the squares of the first ten natural numbers is

> 1<sup>2</sup> + 2<sup>2</sup> + ... + 10<sup>2</sup> = 385

The square of the sum of the first ten natural numbers is

> (1 + 2 + ... + 10)<sup>2</sup> = 55<sup>2</sup> = 3025

Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 &minus; 385 = 2640.

Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.

```fsharp
let sum_of_squares list = list |> List.map (fun x -> (x |> float) ** 2.0) |> List.sum |> int
let square_of_sums list = (list |> List.sum |> float) ** 2.0 |> int

(square_of_sums [1..100]) - (sum_of_squares [1..100])
```
