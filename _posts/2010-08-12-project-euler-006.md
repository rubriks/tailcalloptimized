---
layout: migratedpost
title: "Project Euler #006"
description:
date: 2010-08-12 11:33:26
assets: assets/posts/2010-08-12-project-euler-006
image: 
---

<style type="text/css"><!--
sup {
font-size: smaller;
vertical-align: super;
}
--></style>
<p>The sum of the squares of the first ten natural numbers is,</p>
<div style="text-align: center;">1<img alt="^(" style="display: none;" /><sup>2</sup><img alt=")" style="display: none;" /> + 2<img alt="^(" style="display: none;" /><sup>2</sup><img alt=")" style="display: none;" /> + ... + 10<img alt="^(" style="display: none;" /><sup>2</sup><img alt=")" style="display: none;" /> = 385</div>
<p>The square of the sum of the first ten natural numbers is,</p>
<div style="text-align: center;">(1 + 2 + ... + 10)<img alt="^(" style="display: none;" /><sup>2</sup><img alt=")" style="display: none;" /> = 55<img alt="^(" style="display: none;" /><sup>2</sup><img alt=")" style="display: none;" /> = 3025</div>
<p>Hence the difference between the sum of the squares of the first ten natural numbers and the square of the sum is 3025 <img style="vertical-align: middle;" border="0" alt="−" height="3" width="9" src="images/symbol_minus.gif" /> 385 = 2640.</p>
<p>Find the difference between the sum of the squares of the first one hundred natural numbers and the square of the sum.</p>
<pre class="brush:fsharp">let sum_of_squares list = list |> List.map (fun x -> (x |> float) ** 2.0) |> List.sum |> int
let square_of_sums list = (list |> List.sum |> float) ** 2.0 |> int

(square_of_sums [1..100]) - (sum_of_squares [1..100])</pre>
