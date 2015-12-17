---
layout: post
title: "Forwarding events in C#"
description:
date: 2011-04-07 06:11:24
assets: assets/posts/2011-04-07-forwarding-events-in-c
image: 
---

<p>Yesterday I learned a new syntax in C# that I didn't know about. I learned how you can forward events.  Let's say I want a class that takes a schema, and validates html to that schema. The class would encapsulate the XmlReaderSettings, but code from the outside would want to subscribe to the ValidationEventHandler on that private field. The code would look something like this.</p>
<pre class="brush: csharp">public class HtmlValidator
{
    private readonly string html;
    private XmlReaderSettings xmlValidationSettings;

    public HtmlValidator(string @namespace, string schemaPath)
    {
        this.html = html;
            
        /* Load the schema */
        var xmlSchema = XmlReader.Create(schemaPath);

        xmlValidationSettings = new XmlReaderSettings();
        xmlValidationSettings.Schemas.Add(@namespace, xmlSchema);
        xmlValidationSettings.ValidationType = ValidationType.Schema;
    }

    public void Validate(string html)
    {
        var htmlReader = new StringReader(html);

        // Trigger this event on schema validation errors
        // xmlValidationSettings.ValidationEventHandler += HandleValidationErrors; 

        // Read and validate htmlOutputStream
        var xmlValidatingReader = XmlReader.Create(htmlReader, xmlValidationSettings);
        while (xmlValidatingReader.Read()) ;
    }
}</pre>
<p>How could the code calling on Validate, subscribe to ValidationEventHandler on xmlValidationSettings? We would need to create an event on HtmlValidator that forwards the ValidationEventHandler.  I add a public forwarding event like this.</p>
<pre class="brush: csharp">public event ValidationEventHandler OnValidationError
{
    add { xmlValidationSettings.ValidationEventHandler += value; }
    remove { xmlValidationSettings.ValidationEventHandler -= value; }
}</pre>
<p>Now we can subscribe to this event, and it will subscribe to the inner ValidationEventHandler. Study the following tests.</p>
<pre class="brush: csharp">[TestFixture]
public class Test
{
    private int CountHtmlErrors(string html)
    {
        // Create validator
        var validator = new HtmlValidator("urn:unordered-list", "UlLiSchema.xsd");

        // Add event handler
        var errors = 0;
        validator.OnValidationError += (o, e) => errors++;

        // Validate html
        validator.Validate(html);
        return errors;
    }

    [Test]
    public void HtmlShouldBeValid()
    {
        var html = @"<ul xmlns=""urn:unordered-list""><li></li><li></li></ul>";

        // Assert the result
        Assert.That(this.CountHtmlErrors(html), Is.EqualTo(0));
    }

    [Test]
    public void HtmlShouldBeInvalid()
    {
        var html = @"<ul xmlns=""urn:unordered-list""><p>Hello</p></ul>";

        // Assert the result
        Assert.That(this.CountHtmlErrors(html), Is.EqualTo(1));
    }
}</pre>
<p>At line 11 I subscribe to the external event that will trigger the error++ code on validation errors. Pretty neat, huh!?</p>
