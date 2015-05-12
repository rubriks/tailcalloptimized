---
layout: migratedpost
title: "Project Euler #020"
description:
date: 2010-08-23 15:20:28
assets: assets/posts/2010-08-23-project-euler-020
image: 
---

<p><em>n</em>! means <em>n</em> <img height="9" width="9" alt="×" border="0" src="http://projecteuler.net/images/symbol_times.gif" /> (<em>n</em> <img height="3" width="9" alt="−" border="0" src="http://projecteuler.net/images/symbol_minus.gif" /> 1) <img height="9" width="9" alt="×" border="0" src="http://projecteuler.net/images/symbol_times.gif" /> ... <img height="9" width="9" alt="×" border="0" src="http://projecteuler.net/images/symbol_times.gif" /> 3 <img height="9" width="9" alt="×" border="0" src="http://projecteuler.net/images/symbol_times.gif" /> 2 <img height="9" width="9" alt="×" border="0" src="http://projecteuler.net/images/symbol_times.gif" /> 1  Find the sum of the digits in the number 100!</p>
<pre class="brush:fsharp">let factorial n : bigint = List.fold (*) 1I [1I .. n]

let sum (n:bigint) =
    n |> string |> Seq.fold (fun acc x -> acc + System.Int32.Parse(x.ToString())) 0
 
sum (factorial 100I)</pre>
<p>If you consider using bigint to be cheating, here's a solution that will calculate it with the use of lists instead.</p>
<pre class="brush:fsharp">let rec plan overflow l =
    match l with
    | head :: tail ->
        let column = head + overflow
        if column > 9 then
            let next_overflow = column / 10 |> float |> System.Math.Truncate |> int
            (column - next_overflow * 10) :: plan next_overflow tail
        else
            column :: plan 0 tail
    | _ -> if overflow > 0 then 
              (overflow % 10) :: plan ((overflow - (overflow % 10)) / 10) []
           else 
              []

let add (l1 : int list) (l2 : int list) =
    l1 |> List.map2 (fun i1 i2 -> i1 + i2) l2 

let prod (l1 : int list) (l2 : int list) = 
    let tenths i = 10.0 ** (i |> float) |> int
    l2 |> List.mapi (fun i x -> l1 |> List.map (fun y -> x * y * tenths (-1 + l2.Length - i)))
    |> List.fold (fun acc l -> add acc l) (List.init l1.Length (fun i -> 0))
    |> List.rev
    |> plan 0 // from outer space
    |> List.rev

let to_list n =
    let rec calc x = 
        if x > 0 then
            (x % 10) :: calc ((x - (x % 10)) / 10)
        else
            []
    calc n |> List.rev

[2..100] |> List.map (fun x -> to_list x) |> List.fold (fun acc y -> prod acc y) [1] |> List.sum</pre>
