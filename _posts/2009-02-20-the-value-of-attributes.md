---
layout: migratedpost
title: "The value of attributes"
description:
date: 2009-02-20 17:26:09
assets: assets/posts/2009-02-20-the-value-of-attributes
image: 
---

<p>I often rediscover the value of Attributes in C#. Very often it is hard to find a situation where you have need of attributes, you may be thinking that it is only for meta coding like unit testing or dynamic code intepretation/serializing, but you're wrong. Attributes are useful every time you need to add meta data to a class, property or field. Let me give you the common example of adding label to an enum.</p>
<blockquote>Problem: An enum defines genre in your music database. Now you want to display all available genres.</blockquote>
<pre class="brush: csharp">[Flags]
public enum Genre
{
    Other = 0,
    AlternativeRock = 1,
    HardRock = 2,
    WorldMusic = 4,
    Indie = 8,
    PostRock = 16
}</pre>
<p>Start by defining the attribute Label.</p>
<pre class="brush: csharp">public class LabelAttribute : Attribute
{
    public LabelAttribute(string text)
    {
        this.Text = text;
    }

    public string Text { get; set; }
}</pre>
<p>Now you can add this to your genre values.</p>
<pre class="brush: csharp">[Flags]
public enum Genre
{  
    [Label("Other")]
    Other = 0,

    [Label("Alternative Rock")]
    AlternativeRock = 1,

    [Label("Hard rock")]
    HardRock = 2,

    [Label("World music")]
    WorldMusic = 4,

    [Label("Indie")]
    Indie = 8,

    [Label("Post-rock")]
    PostRock = 16
}</pre>
<p>With the simple use of an extension method you may accomplish alot.</p>
<pre class="brush: csharp">public static class LabelAttributeHelper
{
    /// <summary>
    /// Get label of an enum field
    /// </summary>
    public static string Label<T>(this T val)
    {
        if (!typeof(T).IsEnum)
            throw new ArgumentException("T must be an Enum");

        FieldInfo field = typeof(T).GetField(val.ToString());
        LabelAttribute[] attributes = 
            (LabelAttribute[])field.GetCustomAttributes(typeof(LabelAttribute), false);

        if (attributes.Length == 0)
            throw new ArgumentOutOfRangeException("Enum value " + val.ToString() + " is missing Label attribute");

        return attributes.First().Text;
    }
}</pre>
<p>Now you may easily type out all available genres with a simple procedure.</p>
<pre class="brush: csharp">foreach (Genre genre in Enum.GetValues(typeof(Genre)))
    Console.WriteLine(genre.Label());</pre>
<p>That's all for today. Have a nice weekend!</p>
