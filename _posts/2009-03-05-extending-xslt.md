---
layout: migratedpost
title: "Extending XSLT"
description:
date: 2009-03-05 06:47:21
assets: assets/posts/2009-03-05-extending-xslt
image: 
---

<p>One thing that I never seem to remember is how to extend my XSLT with extensions. How to include your own namespace and let the transformation engine call my own methods written in C#. It might be hard to remember because I do it once every year, at the most. Now I will write down the procedure here, so that when I google this a year from now, I will find my own blog post. ;)  First, write a class that you want to use in your XSLT. Keep the class public and your methods also.</p>
<pre class="brush: csharp">/// <summary>
/// Default extensions for Mint transformations
/// </summary>
public class XsltExtensions
{
    /// <summary>
    /// Returns parameter of the current HttpContext.Request
    /// </summary>
    /// <param name="parameterName">Name of the parameter to retrieve</param>
    /// <returns>String.Empty if parameter is not found</returns>
    public string parameter(string parameterName)
    {
        return HttpContext.Current.Request.Params[parameterName] ?? string.Empty;
    }
}</pre>
<p>My extension above will return a parameter from the current HttpContext. Some would argue that this should be included in the XSLT 2.0 basic functions, but the transformation does not really have any scope in which it is transformed. Could be a web scenario like mine, or a console application where HttpContext would not be present.  Now, in your tranformation code you will have to include this extension class as an argument.</p>
<pre class="brush: csharp">XslCompiledTransform transformer = new XslCompiledTransform(debug);
XsltSettings settings = new XsltSettings(false, false); // document() and script disabled

XsltArgumentList arguments = new XsltArgumentList();
arguments.AddExtensionObject("urn:mint", new XsltExtensions());

transformer.Load(XmlReader.Create(stylesheetStream), settings, null);
transformer.Transform(XmlReader.Create(documentStream), arguments, output);</pre>
<p>The magic happens in row 4 and 5. Now it is possible to call this function from within the XSL stylesheet like this.</p>
<pre class="brush: xml"><xsl:stylesheet version="2.0" 
 xmlns:xsl="http://www.w3.org/1999/XSL/Transform" 
 xmlns="http://www.w3.org/1999/xhtml" 
 xmlns:mint="urn:mint">

  <xsl:output method="xhtml" encoding="utf-8" indent="yes" media-type="application/xhtml+xml" />
  <xsl:template match="/">
    <html>
      <head>
        <title>
          <xsl:value-of select="//title" />
        </title>
      </head>
      <body>
        <h1>Value of parameter test is: <xsl:value-of select="mint:parameter('test')" /></h1>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet></pre>
<p>Since XSLT is of a very dynamic nature and easy to change, it would seem quite stupid to lock yourself in using only  a specified set of extensions. Right? You can solve this by actually loading your XSLT extensions through dependency injection. Let your extension classes implement the following interface.</p>
<pre class="brush: csharp">/// <summary>
/// An extension class for an XSL transformation
/// </summary>
public interface IXsltExtensions
{
    /// <summary>
    /// Gets the namespace URI that associates this class with a namespace in the xslt.
    /// </summary>
    /// <value>The namespace URI.</value>
    string NamespaceUri { get; }
}</pre>
<p>Now you can add extensions as you will in the configuration of your dependency injection framework. I've chosen to use Unity for my needs, and my implementation looks something like this.</p>
<pre class="brush: csharp">/// <summary>
/// Loads the XSLT extensions into the argument list
/// </summary>
/// <param name="arguments">The argumentlist that will be used in transfomation</param>
private void LoadExtensions(XsltArgumentList arguments)
{
    // Retrieve all implementations of IXsltExtensions
    IEnumerable<IXsltExtensions> extensions = ContainerFactory.Instance.ResolveAll<IXsltExtensions>();

    // Add all implementations as extensions to the transformation
    foreach (IXsltExtensions extensionObject in extensions)
        arguments.AddExtensionObject(extensionObject.NamespaceUri, extensionObject);
}</pre>
<p>There you have it! ContainerFactory is in my case a singleton that derives from UnityContainer. Let's hope this will be of any use to you, me or anyone else in a near future.</p>
