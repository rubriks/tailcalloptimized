---
layout: post
title: "Validate XHtml 1.0 Strict as part of your build process"
description: If you're conforming to XHtml 1.0 strict, then your HTML is pure XML and can be validated with an XSD. Here's how you can do that W3C Validation on your build machine using unit testing frameworks.
tags: W3C Validator, XSD, XHtml 1.0 Strict
date: 2010-03-19 11:00:43
assets: assets/posts/2010-03-19-validate-xhtml-1-0-strict-as-part-of-your-build-process
image: 
---

If one of the requirements for the website you're building is that it should validate XHtml 1.0 Strict, then you can't mearly use the <a href="http://validator.w3.org/">W3C Validator</a>, but have to make it a part of your build process. That you do, by turning the validation into a test.  First, you need to get those URLs. I get mine from a sitemap.xml.

{% gist miklund/1ffbb627af3f118a4b6a GetTargetUrls.cs %}

Next, I get the HTML content for those URLs.

{% gist miklund/1ffbb627af3f118a4b6a GetHtmlContent.cs %}

And now we're ready to do the validation. But first, you download the [XHtml 1.0 Strict Schema](http://www.w3.org/TR/xhtml1-schema/) and include it in your project as an **Embedded Resource**. That way you don't have to worry about where the file ends up after compilation.

![Visual Studio embedded resource](/assets/posts/2010-03-19-validate-xhtml-1-0-strict-as-part-of-your-build-process/embeddedresource.png)

You will easily get a stream to this file with the following method. This takes for granted that it is placed in the same namespace/path as the calling instance method.

{% gist miklund/1ffbb627af3f118a4b6a GetEmbeddedResource.cs %}

Now we're ready to write the test. For each URL in the sitemap, it will load its HTML into an XmlDocument and validate it with the schema. If the validation fails, it will throw an AssertionException that will be caught and registered in the errorMessage result string. This way, we will continue and test all URLs even when one fails its validation.

{% gist miklund/1ffbb627af3f118a4b6a Test.cs %}

You can [download the whole code example from here](/assets/posts/2010-03-19-validate-xhtml-1-0-strict-as-part-of-your-build-process/ValidateXHtmlStrict.zip).

Happy testing!
