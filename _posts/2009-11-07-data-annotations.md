---
layout: migratedpost
title: "Data Annotations"
description:
date: 2009-11-07 11:57:49
assets: assets/posts/2009-11-07-data-annotations
image: 
---

<p>I've recently discovered the System.ComponentModel.DataAnnotations namespace. This is a collection of Attributes you can use to markup your data objects with conditions, like the following.</p>
<pre class="brush:csharp">public class Person
{
    [StringLength(20), Required(ErrorMessage = "Name is a required property")]
    public string Name { get; set; }

    [Range(0, 150)]
    public int Age { get; set; }

    [RegularExpression(@"(?i:^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$)")]
    public string Email { get; set; }
}</pre>
<p>Let's say that you use this Person object to store user input, you can easily validate that input meets the requirements of the annotations.</p>
<pre class="brush:csharp">var person = new Person
{
    Name = "John Doe",
    Age = 54,
    Email = "john.doe@aol.com"
};

/* Validate */
var result = person.ValidateAnnotations();</pre>
<p>What I find even more interesting is that you can annotate a contract and just let your model object inherit the annotations. Consider the following.</p>
<pre class="brush:csharp">[MetadataType(typeof(IPerson))]
public class Person : IPerson
{
    public string Name { get; set; }

    public int Age { get; set; }

    public string Email { get; set; }
}

public interface IPerson
{
    [StringLength(20), Required(ErrorMessage = "Name is a required property")]
    string Name { get; set; }

    [Range(0, 150)]
    int Age { get; set; }

    [RegularExpression(@"(?i:^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$)")]
    string Email { get; set; }
}</pre>
<p>Now that's hot! The annotations are actually part of the interface IPerson that specifies what an IPerson is. Then the concrete Person class just implements that contract. Neat!  My validating extension method and some tests can be downloaded from <a href="http://litemedia.info/media/Default/Mint/MintDataAnnotations.zip">here</a>. Enjoy!</p>
