---
layout: post
title: "Citerus programming challenge"
description:
date: 2011-02-16 20:26:31
assets: assets/posts/2011-02-16-citerus-programming-challenge
image: 
---

<p>I'm very weak for programming challenges. <a href="http://www.citerus.se/jfokus">Citerus</a> held a contest where you could win an iPad if you would solve their problem. Since I'm a .NET developer, I'm not elegible for winning such a challenge but I love to meet a challenge just for the sake of it.</p>
<h2>The Challenge</h2>
<p>Given a string</p>
<pre>VOCDIITEIOCRUDOIANTOCSLOIOCVESTAIOCVOLIOCENTSU</pre>
<p>And a collection of abbreviations</p>
<pre>TDD, DDD, DI, DO, OO, UI, ANT, CV, IOC, LOC, SU, VO</pre>
<p>What is the shortest string you could produce by removing abbreviations from it?</p>
<h3>Example</h3>
<pre>1) ...BIDDDOCDDD...  (remove DDD)
2) ...BIDDDOC...     (remove DDD again) 
3) ...BIOC...        (remove IOC)</pre>
<h2>The solution</h2>
<p>This kind of problem is ideal for F#.  The main problem is that you just can't remove abbreviations, because you won't find the shortest string. You will have to try to remove abbreviations in all orders to find the shortest string produced. I do this by recursive calls, where every abbreviation removal is a path in the tree. I solve the problem by taking the branch with the shortest result.</p>
<pre class="brush:fsharp">// http://www.citerus.se/jfokus
module CiterusChallenge

// In the string
let s = "VOCDIITEIOCRUDOIANTOCSLOIOCVESTAIOCVOLIOCENTSU"

// Any occurrence of
let abbreviations = ["TDD"; "DDD"; "DI"; "DO"; "OO"; "UI"; "ANT"; "CV"; "IOC"; "LOC"; "SU"; "VO"]

// Should be removed
let rec remove (abbreviations : string List) (s : string) =
    
    // Collect any version where one abbr is removed from s
    // Filter out those with no effect on s
    let collect = 
        abbreviations 
        |> List.map (fun abbr -> s.Replace(abbr, ""))
        |> List.filter (fun short_s -> short_s.Length < s.Length)

    // Select longest string of s1 and s2, or s1 if they're equal
    let min (s1 : string) (s2 : string) =
        if s1.Length <= s2.Length then s1 else s2

    // Match result of abbreviations removal
    match collect with
    | [] -> s
    | _  -> List.fold ( min ) s (collect |> List.map ( remove abbreviations ))

// Execute
let solution = lazy ( s |> remove abbreviations )
Utilities.measure_execution_time solution |> ignore

// Tests
let tests = 
    "HELLO" = ("HETDDLLDIO" |> remove abbreviations )    &&  // Two consecutive abbr
    "HELLO" = ("HEDTDDILLO" |> remove abbreviations )    &&  // Two nested abbr
    "HELLO" = ("HEDTDDILLO" |> remove abbreviations )    &&  // Removing TDD before DI
    "HELIUM" = ("HELANTDDDIUM" |> remove abbreviations ) &&  // Don't remove DI or TDD, remove ANT then DDD
    "" = ("DTDDIIOC" |> remove abbreviations )           &&  // Take TDD then IOC last DI will leave only empty string
    "B" = ("BIDDDOCDDD" |> remove abbreviations)             // Some wierd example from the problem description</pre>
<p>Look, F# with syntax highlighting! All in all, the algorithm code is 11 LOC, if you remove the comments, and runs for 320 ms on my machine.</p>
