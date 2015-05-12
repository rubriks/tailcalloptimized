---
layout: migratedpost
title: "Sharpen Your Saw"
description:
date: 2012-11-12 19:46:16
assets: assets/posts/2012-11-12-sharpen-your-saw
image: 
---

<p>I've been hosting a lunch event three times this year called 'Sharpen Your Saw' where we tackle a programming problem in pairs. The purpose is to work with tools you haven't before, testing out new techniques and having fun. It is also a social event where you pair up with people you haven't worked with before.</p>
<p>This week I crafted a problem concerning encryption algorithms. You can see the problem description in <a href="http://sys3.litemedia.se">this HTML5 presentation</a>. I would like to give you my solutions to these problems in F#.</p>
<h2>Part 1: Decrypt the message using correct key</h2>
<p>We have a message <span>RZQPDIUYTUKEYFLACGGHERFVKM</span> that could be decrypted with one of the keys <span>MANCHESTERBLUFF</span>, <span>COMPLETEVICTORY</span>, <span>COMERETRIBUTION</span>. Find the right key and get the message.</p>
<p>Being a functional programmer, I want to start off with the easiest possible case - decrypting one character.</p>
<pre class="brush:fsharp">// example: unshift 'C' 'B' -> 'Z'
let unshift (key : char) (c : char) = ((c |> int) - (key |> int) + 26) % 26 + 65 |> char</pre>
<p>Now when we're able to decrypt one character, we would like to do this to a whole string.</p>
<pre class="brush:fsharp">// crypt unshift 'MANCHESTERBLUFF' 'RZQPDIUYTUKEYFLACGGHERFVKM'
let crypt shift_fn key s = Seq.map2 shift_fn key s |> Seq.fold (fun acc c -> acc + c.ToString()) System.String.Empty</pre>
<p>The problem is that decryption will stop when the key runs out of characters. We need to make sure that the key will be repeating.</p>
<pre class="brush:fsharp">// example: loop "LEMON" -> ['L', 'E', 'M', 'O', 'N', 'L', 'E', ...]
let rec loop (s : string) = seq {
        yield s.[0]
        yield! loop (s.[1..] + s.[0].ToString())
    }</pre>
<p>Here is the decryption call.</p>
<pre class="brush:fsharp">// example: decrypt "COMPLETEVICTORY" "RZQPDIUYTUKEYFLACGGHERFVKM"
let decrypt key s = crypt unshift (loop key) s</pre>
<p>When we run this with the three possible keys we get the following result.</p>
<pre class="brush:fsharp">let _decrypt s key = decrypt key s

["MANCHESTERBLUFF"; "COMPLETEVICTORY"; "COMERETRIBUTION"]
|> List.map (_decrypt "RZQPDIUYTUKEYFLACGGHERFVKM")</pre>
<pre class="brush:plain">val it : string list =
  ["FZDNWECFPDJTEAGOCTEAAZMRTL"; "PLEASEBUYMILKONYOURWAYBACK";
   "PLELMEBHLTQLQRYYOUCQAYONJS"]</pre>
<h2>Part2: Find the key for the message</h2>
<p>We can assume that the original string for the encrypted KBCTTWFQIWTWSONUNVIUZ contains the word VALTECH. Find the key that encrypted the string.</p>
<p>The obvious wrong thing to do here, is to try brute forcing by testing all possible combinations of A-Z until you find the key. So, I did this and hit a wall when I reached keys of 6 characters. That means 26 * 26 * 26 * 26 * 26 * 26 combinations, about 309 million; and that wouldn't even be enough to find this key.</p>
<p>Don't blame anyone for trying the brute force method. You learn a lot of things by doing it the wrong way.</p>
<p>The solution is in the weakness of the cipher itself, you use the same key to encrypt as decrypt. You have x, y and z of the equation and if you got y and z, you can easily get x (our key in this case).</p>
<p>The problem is that we don't know where in the encrypted string KBCTTWFQIWTWSONUNVIUZ the word VALTECH exists, so we have to solve the equation for every possible index in the encrypted string. It's only 15 places, a lot fewer than 309 million.</p>
<pre class="brush:fsharp">// example: possibles "KBCTTWFQIWTWSONUNVIUZ" "VALTECH"
let possibles (cipher : string) (search : string) = 
    [0..(cipher.Length - search.Length)] 
    |> List.map (fun i -> decrypt search cipher.[i..i + search.Length - 1])</pre>
<pre class="brush:plain">val it : string list =
  ["PBRAPUY"; "GCIASDJ"; "HTIDBOB"; "YTLMMGP"; "YWUXEUM"; "BFFPSRP"; "KQXDPUL";
   "VILASQH"; "NWIDOMG"; "BTLZKLN"; "YWHVJSG"; "BSDUQLO"; "XOCBJTB"; "TNJURGN";
   "SUCCESS"]</pre>
<p>By using our human instinct we can resolve that VALTECH was placed in the last index, and the key was incidently the same length (7) as the word we were looking for. The key is therefor SUCCESS. This would be hard for a machine to know, but easy for us humans.</p>
<p>This problem was made easier by making the sought key, the same length as the word we're looking for, and the whole string dividable by the length of both.</p>
<p>Let us confirm that SUCCESS really is the key and decrypt the encrypted string.</p>
<pre class="brush:fsharp">decrypt "SUCCESS" "KBCTTWFQIWTWSONUNVIUZ"</pre>
<pre class="brush:plain">val it : string = "SHARPENYOURSAWVALTECH"</pre>
