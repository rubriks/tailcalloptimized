---
layout: post
title: "Project Euler #019"
description: How many sundays fell on the first of the month during the twentieth century?
tags: project euler, dojo
date: 2010-08-21 19:51:35
assets: assets/posts/2010-08-21-project-euler-019
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

You are given the following information, but you may prefer to do some research for yourself.

* 1 Jan 1900 was a Monday.
* Thirty days has September, April, June and November. All the rest have thirty-one, Saving February alone, Which has twenty-eight, rain or shine. And on leap years, twenty-nine.
* A leap year occurs on any year evenly divisible by 4, but not on a century unless it is divisible by 400.

How many Sundays fell on the first of the month during the twentieth century (1 Jan 1901 to 31 Dec 2000)?

```fsharp
let months = [31; 28; 31; 30; 31; 30; 31; 31; 30; 31; 30; 31]

[0..99]
    |> List.map (fun x -> months) |> List.concat // all months consecutive
    |> List.mapi (fun i x -> if i = 1 && ((i - 1) / 12) % 4 = 0 then x + 1 else x) // leap year
    |> List.fold (fun (acc, result) x -> if (acc + x) % 7 = 6 then (acc + x, result + 1) else (acc + x, result)) (0,0) // Sunday bloody sunday
```
