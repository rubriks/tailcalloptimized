---
layout: migratedpost
title: "Project Euler #018"
description:
date: 2010-08-21 16:47:13
assets: assets/posts/2010-08-21-project-euler-018
image: 
---

<p>By starting at the top of the triangle below and moving to adjacent numbers on the row below, the maximum total from top to bottom is 23.  <strong>3</strong> <strong>7</strong> 4 2 <strong>4</strong> 6 8 5 <strong>9</strong> 3  That is, 3 + 7 + 4 + 9 = 23.  Find the maximum total from top to bottom of the triangle below</p>
<pre class="brush:fsharp">type BinaryTree =
    | Node of int * BinaryTree * BinaryTree
    | Empty

let rec calculate tree =
    match tree with
    | Node (n, left, right) -> n + List.max [(calculate left); (calculate right)]
    | Empty -> 0

let s_data = 
    [
    "75";
    "95 64";
    "17 47 82";
    "18 35 87 10";
    "20 04 82 47 65";
    "19 01 23 75 03 34";
    "88 02 77 73 07 63 67";
    "99 65 04 28 06 16 70 92";
    "41 41 26 56 83 40 80 70 33";
    "41 48 72 33 47 32 37 16 94 29";
    "53 71 44 65 25 43 91 52 97 51 14";
    "70 11 33 28 77 73 17 78 39 68 17 57";
    "91 71 52 38 17 14 91 43 58 50 27 29 48";
    "63 66 04 68 89 53 67 30 73 16 69 87 40 31";
    "04 62 98 27 23 09 70 98 73 93 38 53 60 04 23";
    ]

let rec data_tree (data : string list) row i =
    let data_row row_number = data.[row_number].Split(' ') |> Seq.map (fun s -> System.Int32.Parse(s)) |> Seq.toList
    let length = data.Length
    match row with
    | 15 -> Empty
    | _ -> Node ((data_row row).[i], data_tree data (row + 1) i, data_tree data (row + 1) (i + 1))

data_tree s_data 0 0 |> calculate;;</pre>
