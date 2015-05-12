---
layout: migratedpost
title: "Project Euler #017"
description:
date: 2010-08-21 11:57:04
assets: assets/posts/2010-08-21-project-euler-017
image: 
---

<p>If the numbers 1 to 5 are written out in words: one, two, three, four, five, then there are 3 + 3 + 5 + 4 + 4 = 19 letters used in total.  If all the numbers from 1 to 1000 (one thousand) inclusive were written out in words, how many letters would be used?</p>
<pre class="brush:fsharp">let dictionary = 
    [
    (1000, "one thousand"); 
    (90, "ninety");
    (80, "eighty");
    (70, "seventy");
    (60, "sixty");
    (50, "fifty");
    (40, "forty");
    (30, "thirty");
    (20, "twenty");
    (19, "nineteen");
    (18, "eighteen");
    (17, "seventeen");
    (16, "sixteen");
    (15, "fifteen");
    (14, "fourteen");
    (13, "thirteen");
    (12, "twelve");
    (11, "eleven");
    (10, "ten");
    (9, "nine");
    (8, "eight");
    (7, "seven");
    (6, "six");
    (5, "five");
    (4, "four");
    (3, "three");
    (2, "two");
    (1, "one");
    ];


let rec translate (n:int) : string =
    if n = 0 then
        System.String.Empty
    elif dictionary |> List.exists (fun (x, s) -> x = n) then
        snd (dictionary |> List.find (fun (x, s) -> n = x)) + " "
    else
        let log10 x = x |> float |> System.Math.Log10 |> System.Math.Truncate
        let first_number x = System.Math.Truncate((x |> float) / (10.0 ** log10 x))
        let part x = (first_number x) * 10.0 ** log10 x |> int

        if 2.0 = log10 n then
            let rest = translate (n - part n)
            translate (first_number n |> int) + "hundred " + if System.String.IsNullOrWhiteSpace(rest) then "" else "and " + rest
        else
            (translate (part n)) + (translate (n - (part n)))
            
(List.fold (fun acc n -> acc + translate n) "" [1..1000]).Replace(" ", System.String.Empty).Length</pre>
