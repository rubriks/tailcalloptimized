---
layout: post
title: "Project Euler #015"
description:
date: 2010-08-20 16:33:29
assets: assets/posts/2010-08-20-project-euler-015
image: 
---

Starting in the top left corner of a 2 &times; 2 grid, there are 6 routes (without backtracking) to the bottom right corner.

![project euler 15](/assets/posts/2010-08-20-project-euler-015/p_015.gif)

How many routes are there through a 20 &times; 20 grid?

```fsharp
let rec find_path square_size x y = 
    let complete = x = square_size || y = square_size
    match complete with
    | true -> 1L
    | false -> (find_path square_size (x + 1) y) + find_path square_size x (y + 1)

// This will take some time
find_path 20 0 0
```
