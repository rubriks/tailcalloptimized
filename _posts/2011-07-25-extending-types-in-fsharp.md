---
layout: migratedpost
title: "Extending types in F#"
description:
date: 2011-07-25 05:08:43
assets: assets/posts/2011-07-25-extending-types-in-fsharp
image: 
---

<p>Just as you can extend existing types in C# with extension methods you can do the same in F# with <a href="http://msdn.microsoft.com/en-us/library/dd233211.aspx" title="MSDN Type Extensions (F#)">type extensions</a>. The difference is that extending types in F# helps you work in a functional matter with object orientation. Consider the following discriminated union that could be used for a card game.</p>
<pre class="brush:fsharp">type Suit = | Spades | Hearts | Diamonds | Clubs

type Card =
    | ValueCard of Suit * int
    | Knave of Suit
    | Queen of Suit
    | King of Suit
    | Ace of Suit</pre>
<p>We would like to expose a hand as a type. In this type we can do all the object oriented behavior things like limiting number of cards in hand to 5, making sure that we don't have duplicate cards and so on. Great, but the problem is working with the type members we always need to reevaluate the type as we're changing member functions. </p>
<pre class="brush:fsharp">type Hand (cards : Card list) =
    member this.Cards = cards</pre>
<p>So we keep the Hand type as simple as possible, and then we extend with functionality.</p>
<pre class="brush:fsharp">let isRoyalStraightFlush (cards : Card list) = 
    match cards with
    | Ace suit_1 :: King suit_2 :: Queen suit_3 :: Knave suit_4 :: ValueCard (suit_5, 10) :: [] 
        when suit_1 = suit_2 && suit_2 = suit_3 && suit_3 = suit_4 && suit_4 = suit_5 
        -> true
    | _ -> false</pre>
<p>The function isRoyalStraightFlush can be written and tested individually without any connection to the Hand object, and then we can extend the hand with this functionality like this.</p>
<pre class="brush:fsharp">type Hand with
    member x.IsRoyalStraightFlush = isRoyalStraightFlush x.Cards</pre>
<p>I really like this way of working with object orientation in a functional manner.</p>
