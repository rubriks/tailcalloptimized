---
layout: post
title: "Project Euler #007"
description:
date: 2010-08-12 12:31:26
assets: assets/posts/2010-08-12-project-euler-007
image: 
---

<p>By listing the first six prime numbers: 2, 3, 5, 7, 11, and 13, we can see that the 6th prime is 13.  What is the 10001st prime number?</p>
<pre class="brush:fsharp" name="code">let rec prime_of_order n primes (current:int) =
    let is_prime = primes |> List.forall (fun x -> current % x <> 0)

    if is_prime then
        if n = 1 then
            current
        else
            prime_of_order (n - 1) (current :: primes) (current + 1)
    else
        prime_of_order n primes (current + 1)


prime_of_order 10001 [] 2;;</pre>
