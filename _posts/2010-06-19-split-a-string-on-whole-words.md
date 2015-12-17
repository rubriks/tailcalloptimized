---
layout: post
title: "Split a string on whole words"
description:
date: 2010-06-19 09:59:12
assets: assets/posts/2010-06-19-split-a-string-on-whole-words
image: 
---

<p>In case you've ever needed an extension method that splits a string on whole words, here are my implementation.</p>
<pre class="brush:csharp">public static class StringExtensions
{
    /// <summary>
    /// If we only allow complete words the right edge might be a bit ugly.
    /// Instead we accept that words are broken if cut has right egde would
    /// move more than MaxStringSplitOffset characters for the cut to exist.
    /// </summary>
    private const int MaxStringSplitOffset = 4;

    /// <summary>
    /// Splits a string on whole words.
    /// </summary>
    /// <param name="input">The input.</param>
    /// <param name="partitionSize">Size of the partition.</param>
    /// <returns>An array of strings not exceeding the partition size</returns>
    public static string[] SplitOnWholeWords(this string input, int partitionSize)
    {
        if (input == null)
        {
            throw new ArgumentNullException("input");
        }
        if (partitionSize <= 0)
        {
            throw new ArgumentOutOfRangeException("partitionSize", "partitionSize must be larger than 0");
        }
        Contract.EndContractBlock();

        var partitioned = new List<string>();

        var rest = input;
        while (rest.Length > partitionSize)
        {
            var part = rest.Substring(0, partitionSize);
            var cutIndex = part.LastIndexOf(' ');

            /* For those cases where next character is ' ' */
            if (rest[partitionSize] == ' ')
            {
                cutIndex = partitionSize;
            }   

            /* No space found */
            if (cutIndex == -1)
            {
                rest = rest.Substring(partitionSize);
            }
            else if (cutIndex < partitionSize - MaxStringSplitOffset)
            {
                const int PushCharactersToNextRow = 2;

                /* Remove add a dash to the end of the string */
                part = part.Substring(0, part.Length - PushCharactersToNextRow) + "-";

                /* Remove part from the rest */
                rest = rest.Substring(part.Length - 1);
            }
            else
            {
                /* Refine cut */
                part = part.Substring(0, cutIndex);

                /* Remove part from the rest (including the space) */
                rest = rest.Substring(cutIndex + 1);
            }

            partitioned.Add(part);
        }

        partitioned.Add(rest);
        return partitioned.ToArray();
    }
}</pre>
<p>And some tests to prove that it works.</p>
<pre class="brush:csharp">[TestFixture]
public class SplitOnWholeWords
{
    // Split between "fox" and "jumps"
    [TestCase("A quick brown fox jumps over the dog", "A quick brown fox", "jumps over the dog")]

    // Split will exceed max allowed characters moving to the left
    [TestCase("My lover say gregarious, as I stand over her", "My lover say grega-", "rious, as I stand")] 

    // Split right before the space
    [TestCase("All of your base are belong to us", "All of your base are", "belong to us")]

    // Split right after the space
    [TestCase("##All your base are belong to us", "##All your base are", "belong to us")]
    public void ShouldSplitStringInTwo(string original, string expectedLine1, string expectedLine2)
    {
        /* Test */
        var partitions = original.SplitOnWholeWords(20);

        /* Assert */
        Assert.That(partitions[0], Is.EqualTo(expectedLine1));
        Assert.That(partitions[1], Is.EqualTo(expectedLine2));
    }

    [Test]
    public void ShouldHandleWhereInputAndPartitionSizeAreTheSame()
    {
        /* Setup */
        const string Input = "Hello World!";

        /* Test */
        var partitions = Input.SplitOnWholeWords(Input.Length);

        /* Assert */
        Assert.That(partitions.Length, Is.EqualTo(1));
    }

    [Test]
    public void ShouldNotTryToSplitWhereThereAreNoSpaces()
    {
        /* Setup */
        const string Input = "TheQuick BrownFoxJumpsOverTheLazyDog";

        /* Test */
        var partitions = Input.SplitOnWholeWords(10);

        /* Assert */
        Assert.That(partitions[1], Is.EqualTo("BrownFoxJu"));
        Assert.That(partitions[2], Is.EqualTo("mpsOverThe"));
        Assert.That(partitions[3], Is.EqualTo("LazyDog"));
    }

    [Test]
    public void CannotSplitNullInputArgument()
    {
        /* Test */
        TestDelegate code = () => ((string) null).SplitOnWholeWords(10);

        /* Assert */
        Assert.Throws<ArgumentNullException>(code);
    }

    [Test]
    public void CannotSplitWhenPartitionSizeIsNotPositiveNumber()
    {
        /* Test */
        TestDelegate code = () => "Hello World!".SplitOnWholeWords(0);

        /* Assert */
        Assert.Throws<ArgumentOutOfRangeException>(code);
    }
}</pre>
<p>Happy coding!</p>
