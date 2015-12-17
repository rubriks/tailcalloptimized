---
layout: post
title: "The gyroball code challenge"
description:
date: 2010-08-31 22:00:15
assets: assets/posts/2010-08-31-the-gyroball-code-challenge
image: 
---

<p><a href="http://www.thycotic.com/">Thycotic</a> presented a <a href="http://thycoticsolutionsblog.wordpress.com/2010/08/12/code-challenge-win-a-gyroball/">code challenge where you could win a gyroball here</a>. Since I live in Sweden, I'm not eligible to win this challenge but I thought it would be fun to solve the problem.</p>
<blockquote>
<pre>// We have designed a new magical number system called "alpha-end".  This number system is
// similar to hexadecimal but has the following characters:  0 1 2 3 4 5 6 7 8 9 x y z
// (basically the decimal number system plus the 3 characters x, y and z)
// Therefore converting from decimal to alpha-end gives the following:
//    5   =>   5
//    10  =>   x
//    13  =>   10
//    20  =>   17
// Your task is to implement the Converter.Convert method for this new number system to get all the
// unit tests passing.  Feel free to add more unit tests as you work if it helps you test drive to the goal.
// You will be judged based on the accuracy and design of your code.
//
// Extra challenge:
// Try extending from your Converter to support other number systems such as binary, octal and hexadecimal.
// Is there an easy way to refactor your code/algorithm to support this?</pre>
</blockquote>
<p>Simply, write a method that will convert from decimal to any number system. Lucky for us all their examples contains only positive discrete numbers.</p>
<pre class="brush:fsharp">type Converter(alphabet:list<string>) =
    let alphabet = alphabet

    new () = Converter(["0"; "1"; "2"; "3"; "4"; "5"; "6"; "7"; "8"; "9"; "x"; "y"; "z"])

    member this.Convert (n:int) =
        let division = (n |> float) / (alphabet.Length |> float) |> System.Math.Truncate |> int
        match division with
        | 0 -> alphabet.Item(n)
        | _ -> this.Convert division + alphabet.Item(n % alphabet.Length)

type BinaryConverter() =
    inherit Converter(["0"; "1"])

type OctalConverter() =
    inherit Converter(["0"; "1"; "2"; "3"; "4"; "5"; "6"; "7"])

type HexConverter() =
    inherit Converter(["0"; "1"; "2"; "3"; "4"; "5"; "6"; "7"; "8"; "9"; "a"; "b"; "c"; "d"; "e"; "f"])</pre>
<p>Here's the same thing in C#.</p>
<pre class="brush:csharp">public class Converter2
{
    private readonly string[] alphabet;
    private static string[] AlphaEnd = new[] { "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "x", "y", "z" };

    public Converter2()
        : this(AlphaEnd)
    {
    }

    public Converter2(string[] alphabet)
    {
        this.alphabet = alphabet;
    }

    public string Convert(int number)
    {
        int division = (int) Math.Truncate(((double)number) / alphabet.Length);

        if (division == 0)
        {
            return alphabet[number];
        }

        return Convert(division) + alphabet[number % alphabet.Length];
    }
}</pre>
<p>Personally I think F# looks much better.</p>
