---
layout: post
title: "Project Euler #004"
description: Find the largest palindrome made from the product of two 3-digit numbers.
tags: F#, project euler, dojo
date: 2010-08-12 09:34:38
assets: assets/posts/2010-08-12-project-euler-004
image: 
---

A palindromic number reads the same both ways. The largest palindrome made from the product of two 2-digit numbers is 9009 = 91  99.  Find the largest palindrome made from the product of two 3-digit numbers.

```fsharp
let rec reverse (s:string) = 
    if s.Length = 1 then s
    else (reverse (s.Substring 1)) + (s.[0] |> string)

let is_palindrome n = (n |> string) = reverse (n |> string)

[100..999] |> List.collect (fun x -> [100..999] |> List.map (fun y -> x * y))
    |> List.filter (fun x -> is_palindrome x)
    |> List.max
```
