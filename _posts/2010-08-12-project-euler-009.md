---
layout: migratedpost
title: "Project Euler #009"
description:
date: 2010-08-12 15:24:58
assets: assets/posts/2010-08-12-project-euler-009
image: 
---

<style type="text/css"><!--
sup {
font-size: smaller;
vertical-align: super;
}
--></style>
<p>A Pythagorean triplet is a set of three natural numbers, <var>a</var> <img style="vertical-align: middle;" border="0" alt="<" height="10" width="10" src="images/symbol_lt.gif" /> <var>b</var> <img style="vertical-align: middle;" border="0" alt="<" height="10" width="10" src="images/symbol_lt.gif" /> <var>c</var>, for which, <var>a</var><sup>2</sup> + <var>b</var><sup>2</sup> = <var>c</var><sup>2</sup></p>
<p>For example, 3<img alt="^(" style="display: none;" /><sup>2</sup><img alt=")" style="display: none;" /> + 4<img alt="^(" style="display: none;" /><sup>2</sup><img alt=")" style="display: none;" /> = 9 + 16 = 25 = 5<img alt="^(" style="display: none;" /><sup>2</sup><img alt=")" style="display: none;" />.</p>
<p>There exists exactly one Pythagorean triplet for which <var>a</var> + <var>b</var> + <var>c</var> = 1000.<br />Find the product <var>abc</var>.</p>
<pre class="brush:fsharp">let pythagorean_triplet a b c = (((a |> float) ** 2.0) + ((b |> float) ** 2.0) = ((c |> float) ** 2.0)) && (a + b + c = 1000)

let calc max =
    let data = [1..(max - 2)] |> List.collect (fun x -> [(x + 1)..(max - 1)] |> List.collect (fun y -> [(y + 2)..max] |> List.collect (fun z -> [x :: [y; z]])))
    data |> List.filter (fun x -> pythagorean_triplet x.[0] x.[1] x.[2])

// This takes a lot of time (5 minutes) because of 500
calc 500 |> List.head |> List.fold (fun acc x -> acc * x) 1</pre>
