---
layout: post
title: "Project Euler #003"
description: What is the largest prime factor of the number 600851475143?
tags: prime, F#, project euler, dojo
date: 2010-08-12 08:44:08
assets: assets/posts/2010-08-12-project-euler-003
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
image: 
---

The prime factors of 13195 are 5, 7, 13 and 29.  What is the largest prime factor of the number 600851475143 ?

```fsharp
let sqrt_int(x:int64) = x |> float |> sqrt |> int64 
let rec factor (n:int64) = 
    let max = sqrt_int n
    [1L..max] |> 
        List.filter (fun x -> 
                        (n % x = 0L) && 
                        if x = 1L then 
                            true 
                        else 
                            (factor x) = 1
                    ) 
        |> List.max 
        |> int

factor 600851475143L
```
