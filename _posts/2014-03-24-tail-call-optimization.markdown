---
layout: post
title:  "What is tail call optimization"
date:   2014-03-24 08:08:00
categories: fp
---

One of the most basic concepts of functional programming is the recursive call chain. Instead of iterating through a data source, you recurse through it. Compare the following

Join a set of string values into a comma delimited string.

{% highlight csharp %}
public static string IterativeJoin(IEnumerable<string> values)
{
    var result = string.Empty;

    foreach (var value in values)
    {
        // first
        if (result == string.Empty)
        {
            result = value;
            continue;
        }

        result += ", " + value;
    }

    return result;
}
{% endhighlight %}

The same in F#.

{% highlight fsharp %}
let rec join res = function
    | [] -> res
    | hd :: tl when res = "" -> join hd tl
    | hd :: tl -> join (res + ", " + hd) tl
{% endhighlight %}

In a functional language you do it recursivly because

1. With immutability you can't modify a value, making iterative programming hard
2. You strive towards expressiveness through recursion

The Problem
-----------
Let's say you would want to do functional programming in C# like the big boys do, and implement the recursive version of the algorithm above.

{% highlight csharp %}
public static string RecursiveJoin(IEnumerable<string> values, string result = "")
{
    var first = values.FirstOrDefault();
    if (first == null)
    {
        // values is empty list
        return result;
    }

    var rest = values.Skip(1);
    if (result == "")
    {
        // first
        return RecursiveJoin(rest, first);
    }

    return RecursiveJoin(rest, result + ", " + first);
}
{% endhighlight %}

What will happen when you run your program?

{% highlight csharp %}
var numbers = Enumerable.Range(1, 100000).Select(n => n.ToString());
RecursiveJoin(numbers);

==> StackOverflowException
{% endhighlight %}

This happens because every time a function gets called, a reference to that function is put on the stack, and the stack has a limit. Once you reach that limit you will get StackOverflowException.

This might not be a problem because you know that the level of recursion is very limited, as when traversing a folder path on an NTFS filesystem. But what you're actually doing is writing code that is highly ineffective and consumes unneccessary resources in favor of getting expressiveness code style.

![Resource consumption of recursive function in C#](/assets/posts/2014-03-24-tail-call-optimization/resources.png)

That is bad. Coding style does not come before function.

Why doesn't a functional language like F# suffer the same problem?
> Because F# has tail call optimization

Tail Call Optimization
----------------------
We'll take a look at the IL code of the bad C# function.

{% highlight csharp %}
.method public hidebysig static 
    string RecursiveJoin (
        class [mscorlib]System.Collections.Generic.IEnumerable`1<string> values,
        [opt] string result
    ) cil managed 
{
    .param [2] = ""
    // Method begins at RVA 0x21e8
    // Code size 84 (0x54)
    .maxstack 4
    .locals init (
    [0] string first,
    [1] class [mscorlib]System.Collections.Generic.IEnumerable`1<string> rest,
    [2] string CS$1$0000,
    [3] bool CS$4$0001
    )

    IL_0000: nop
    IL_0001: ldarg.0
    IL_0002: call !!0 [System.Core]System.Linq.Enumerable::FirstOrDefault<string>(class [mscorlib]System.Collections.Generic.IEnumerable`1<!!0>)
    IL_0007: stloc.0
    IL_0008: ldloc.0
    IL_0009: ldnull
    IL_000a: ceq
    IL_000c: ldc.i4.0
    IL_000d: ceq
    IL_000f: stloc.3
    IL_0010: ldloc.3
    IL_0011: brtrue.s IL_0018

    IL_0013: nop
    IL_0014: ldarg.1
    IL_0015: stloc.2
    IL_0016: br.s IL_0052

    IL_0018: ldarg.0
    IL_0019: ldc.i4.1
    IL_001a: call class [mscorlib]System.Collections.Generic.IEnumerable`1<!!0> [System.Core]System.Linq.Enumerable::Skip<string>(class [mscorlib]System.Collections.Generic.IEnumerable`1<!!0>, int32)
    IL_001f: stloc.1
    IL_0020: ldarg.1
    IL_0021: ldstr ""
    IL_0026: call bool [mscorlib]System.String::op_Equality(string, string)
    IL_002b: ldc.i4.0
    IL_002c: ceq
    IL_002e: stloc.3
    IL_002f: ldloc.3
    IL_0030: brtrue.s IL_003d

    IL_0032: nop
    IL_0033: ldloc.1
    IL_0034: ldloc.0
    IL_0035: call string TailCallOptimized.Program::RecursiveJoin(class [mscorlib]System.Collections.Generic.IEnumerable`1<string>, string)
    IL_003a: stloc.2
    IL_003b: br.s IL_0052

    IL_003d: ldloc.1
    IL_003e: ldarg.1
    IL_003f: ldstr ", "
    IL_0044: ldloc.0
    IL_0045: call string [mscorlib]System.String::Concat(string, string, string)
    IL_004a: call string TailCallOptimized.Program::RecursiveJoin(class [mscorlib]System.Collections.Generic.IEnumerable`1<string>, string)
    IL_004f: stloc.2
    IL_0050: br.s IL_0052

    IL_0052: ldloc.2
    IL_0053: ret
} // end of method Program::RecursiveJoin
{% endhighlight %}

Through all this jibberish you will notice that the code will make a recursive call to itself TailCallOptimized.Program::RecursiveJoin(...) and this is what screw things over.

What about the F# function? That did also call itself. Why doesn't this blow up in a StackOverflowException?

{% highlight fsharp %}
let rec join res = function
    | [] -> res
    | hd :: tl when res = "" -> join hd tl
    | hd :: tl -> join (res + ", " + hd) tl
{% endhighlight %}

This code will be compiled to the following IL-code.

{% highlight csharp %}
.method public static 
    string join (
    string res,
    class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string> _arg1
    ) cil managed 
{
    .custom instance void [FSharp.Core]Microsoft.FSharp.Core.CompilationArgumentCountsAttribute::.ctor(int32[]) = (
    01 00 02 00 00 00 01 00 00 00 01 00 00 00 00 00
    )
    // Method begins at RVA 0x20b0
    // Code size 149 (0x95)
    .maxstack 5
    .locals init (
        [0] class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>,
        [1] class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>,
        [2] class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string> tl,
        [3] string hd,
        [4] class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string> tl,
        [5] string hd,
        [6] class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>,
        [7] class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string> tl,
        [8] string hd
    )

    // loop start
        IL_0000: ldarg.1
        IL_0001: stloc.0
        IL_0002: ldloc.0
        IL_0003: call instance class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<!0> class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_TailOrNull()
        IL_0008: brfalse.s IL_002b

        IL_000a: ldloc.0
        IL_000b: stloc.1
        IL_000c: ldloc.1
        IL_000d: call instance class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<!0> class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_TailOrNull()
        IL_0012: stloc.2
        IL_0013: ldloc.1
        IL_0014: call instance !0 class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_HeadOrDefault()
        IL_0019: stloc.3
        IL_001a: ldarg.0
        IL_001b: ldstr ""
        IL_0020: call bool [mscorlib]System.String::Equals(string, string)
        IL_0025: brfalse.s IL_0029

        IL_0027: br.s IL_002e

        IL_0029: br.s IL_0048

        IL_002b: nop
        IL_002c: ldarg.0
        IL_002d: ret

        IL_002e: ldloc.1
        IL_002f: call instance class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<!0> class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_TailOrNull()
        IL_0034: stloc.s tl
        IL_0036: ldloc.1
        IL_0037: call instance !0 class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_HeadOrDefault()
        IL_003c: stloc.s hd
        IL_003e: ldloc.s hd
        IL_0040: ldloc.s tl
        IL_0042: starg.s _arg1
        IL_0044: starg.s res
        IL_0046: br.s IL_0000
        IL_0048: ldloc.0
        IL_0049: call instance class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<!0> class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_TailOrNull()
        IL_004e: brfalse.s IL_0052
        IL_0050: br.s IL_0054
        IL_0052: br.s IL_0086
        IL_0054: ldloc.0
        IL_0055: stloc.s 6
        IL_0057: ldloc.s 6
        IL_0059: call instance class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<!0> class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_TailOrNull()
        IL_005e: stloc.s tl
        IL_0060: ldloc.s 6
        IL_0062: call instance !0 class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_HeadOrDefault()
        IL_0067: stloc.s hd
        IL_0069: ldarg.0
        IL_006a: ldstr ", "
        IL_006f: call string [mscorlib]System.String::Concat(string, string)
        IL_0074: ldloc.s hd
        IL_0076: call string [mscorlib]System.String::Concat(string, string)
        IL_007b: ldloc.s tl
        IL_007d: starg.s _arg1
        IL_007f: starg.s res
        IL_0081: br IL_0000
    // end loop

    IL_0086: ldstr "C:\\Users\\Mikael\\Documents\\Visual Studio 2012\\Projects\\TailCallOptimized\\TailCallOptimized.Func\\Library1.fs"
    IL_008b: ldc.i4.s 12
    IL_008d: ldc.i4.s 19
    IL_008f: newobj instance void [FSharp.Core]Microsoft.FSharp.Core.MatchFailureException::.ctor(string, int32,int32)
    IL_0094: throw
} // end of method Func::join
{% endhighlight %}

I'm sure you don't find this as fascinating as I do, but you can notice that there is a loop, and no recursive call to the function join. The compiler has basically optimized away the recursive call and exchanged it with an iterative looping construct.

* Your coding style is expressive but not at the expense of performance

### It is easy to screw this up.

The tail call optimization is dependent on a tail call. Otherwise you will have the same issue as with C#. Let's rewrite our F# function to omit the tail call recursion.

{% highlight fsharp %}
let rec join_bad = function
    | [] -> "" 
    | hd :: [] -> hd
    | hd :: tl -> hd + ", " + (join_bad tl)
{% endhighlight %}

When running this code we'll get the expected exception.

{% highlight fsharp %}
[1..100000] |> List.map (fun n -> n.ToString()) |> join_bad

// Process is terminated due to StackOverflowException.
// Session termination detected. Press Enter to restart.
{% endhighlight %}

And this is of course because there was no tail call to be optimized. The compiled IL looks very much like the bad C# function.

{% highlight csharp %}
.method public static 
string join_bad (
    class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string> _arg1
    ) cil managed 
{
    // Method begins at RVA 0x2050
    // Code size 84 (0x54)
    .maxstack 4
    .locals init (
        [0] class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>,
        [1] class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>,
        [2] string hd,
        [3] class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string> tl,
        [4] string hd
    )

    IL_0000: ldarg.0
    IL_0001: stloc.0
    IL_0002: ldloc.0
    IL_0003: call instance class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<!0> class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_TailOrNull()
    IL_0008: brfalse.s IL_001d

    IL_000a: ldloc.0
    IL_000b: stloc.1
    IL_000c: ldloc.1
    IL_000d: call instance class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<!0> class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_TailOrNull()
    IL_0012: call instance class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<!0> class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_TailOrNull()
    IL_0017: brtrue.s IL_001b

    IL_0019: br.s IL_0024

    IL_001b: br.s IL_002d

    IL_001d: nop
    IL_001e: ldstr ""
    IL_0023: ret

    IL_0024: ldloc.1
    IL_0025: call instance !0 class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_HeadOrDefault()
    IL_002a: stloc.2
    IL_002b: ldloc.2
    IL_002c: ret

    IL_002d: ldloc.1
    IL_002e: call instance class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<!0> class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_TailOrNull()
    IL_0033: stloc.3
    IL_0034: ldloc.1
    IL_0035: call instance !0 class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>::get_HeadOrDefault()
    IL_003a: stloc.s hd
    IL_003c: ldloc.s hd
    IL_003e: ldstr ", "
    IL_0043: call string [mscorlib]System.String::Concat(string, string)
    IL_0048: ldloc.3
    IL_0049: call string TailCallOptimized.Func::join_bad(class [FSharp.Core]Microsoft.FSharp.Collections.FSharpList`1<string>)
    IL_004e: call string [mscorlib]System.String::Concat(string, string)
    IL_0053: ret
} // end of method Func::join_bad
{%endhighlight %}

See the bad line that starts with IL_0049. That is the recursive call, and that is why we fail.
