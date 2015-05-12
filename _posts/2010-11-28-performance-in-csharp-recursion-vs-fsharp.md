---
layout: migratedpost
title: "Performance in C# recursion vs. F#"
description:
date: 2010-11-28 10:50:31
assets: assets/posts/2010-11-28-performance-in-csharp-recursion-vs-fsharp
image: 
---

<p>I did know that the F# compiler pulls some magic tricks with recursion, but I didn't know that it could affect performance like I've recently discovered. Me and my friend where discussing <a href="http://projecteuler.net/index.php?section=problems&id=16">Project Euler #16</a>, and where he did an <a href="https://bitbucket.org/Whettingstone/project-euler/src/0510e7d8b3a0/ProjectEuler/Problems11to20/Problem16.cs">iterative C# solution manipulating strings</a>, I went for a <a href="https://bitbucket.org/bokmal/projecteuler/src/364346926915/ProjectEuler.Exercises/E016.fs">recursive list mangling solution in F#</a>.</p>
<h2>Project Euler #16</h2>
<p>2^<sup>15</sup> = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26. What is the sum of the digits of the number 2^<sup>1000</sup>?</p>
<h2>Iterative string manipulating solution by Whettingstone</h2>
<pre class="brush:csharp">public static void Run()
{
 /*2^15 = 32768 and the sum of its digits is 3 + 2 + 7 + 6 + 8 = 26.
   What is the sum of the digits of the number 2^1000?*/

 StringBuilder allDigits = new StringBuilder("1");
 int carryOver = 0;
 int temp;

 for (int i = 0; i < 1000; i++)
 {
  for (int index = 0; index < allDigits.Length; index++)
  {
   //Multiply the digit by two
   temp = int.Parse(allDigits[index].ToString()) * 2;

   if (temp > 9)
   {
    //The result is 10 or larger so add digit and set carryOver
    allDigits.Remove(index, 1);
    allDigits.Insert(index, (temp % 10) + carryOver);
    carryOver = 1;
   }

   if (temp <= 9)
   {
    //The result is less than 10 so add digit and reset carryOver
    allDigits.Remove(index, 1);
    allDigits.Insert(index, temp + carryOver);
    carryOver = 0;
   }

   if ((index == allDigits.Length - 1) && carryOver == 1)
   {
    //This is the last index so add the carryOver to the StringBuilder and break the loop
    allDigits.Append(carryOver);
    carryOver = 0;
    break;
   }
  }
 }

 //Calculation is done, let's sum it up
 int sum = 0;

 for (int i = 0; i < allDigits.Length; i++)
 {
  sum += int.Parse(allDigits[i].ToString());
 }

 Console.WriteLine("Sum of 2^1000: {0}", sum);
}</pre>
<p>This solution is pretty straight forward. Put the result in a string, double all the digits and span out overflowing number to next number in the string. At the end he sums it all up to an int.  <strong>Mean execution time: 127 ms</strong></p>
<h2>Recursive F# solution by me</h2>
<pre class="brush:fsharp">let rec calc list exp =
    let rec evenOut overhead l =
        match (l, overhead) with
        | [], 0 -> []
        | [], _ -> [overhead]
        | head :: tail, _ -> ((overhead + head) % 10) :: (evenOut ((overhead + head) / 10) tail)

    match exp with
    | 1 -> list
    | _ -> calc (list |> List.map (fun x -> x * 2) |> evenOut 0) (exp - 1)

calc [2] 1000 |> List.sum</pre>
<p>This is two recursive loops where the outer loop doubles every list item and the inner loop evens out the list with moving any number larger than 9 up the stack.  <strong>Mean execution time: 5 ms</strong></p>
<h2>Recursive C# translation of the F# version</h2>
<pre class="brush:csharp">private List<int> EvenOut(IEnumerable<int> numbers, int overflow)
{
    Func<IEnumerable<int>, bool> empty = list =>
        {
            var enumerator = list.GetEnumerator();
            return !enumerator.MoveNext();
        };

    if (empty(numbers))
    {
        if (overflow > 0)
            return new List<int> { overflow };

        return new List<int>();
    }

    var head = numbers.First();
    var n = (overflow + head) % 10;
    var newOverflow = (overflow + head) / 10;

    var result = EvenOut(numbers.Skip(1), newOverflow);
    result.Insert(0, n);
    return result;
}

private IEnumerable<int> Calc(IEnumerable<int> numbers, int exp)
{
    if (exp == 1)
        return numbers;

    return Calc(EvenOut(numbers.Select(n => n * 2), 0), exp - 1);
}

[Test]
public void Pe16()
{
    Assert.That(this.Calc(new[] { 2 }, 1000).Sum(), Is.EqualTo(1366));
}</pre>
<p>In order to explain to my friend whettingstone what I do with my F# code I translated it to C#. I was really suprised when I noticed that it took so much longer to execute.  <strong>Mean execution time: 87235 ms</strong></p>
<h2>Conclusion</h2>
<p>The F# compiler does some heavy optimizations to our recursion and going from F# to C# one must watch out, and not write pure functional constructs without thinking about the consequences. You could problably rewrite the C# recursive solution to be much faster, but an iterative solution is probably the preferred one here.</p>
