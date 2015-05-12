---
layout: migratedpost
title: "Unit test XSL transformations"
description:
date: 2009-02-22 17:19:16
assets: assets/posts/2009-02-22-unit-test-xsl-transformations
image: 
---

<p>Mint will be a very XSL transformation heavy application. That is why I've been thinking alot about how to manage all the transformation code. Well let's start off with unit testing.</p>
<h4>Unit testing XSLT?</h4>
<p>Unit testing the transformation gives you the same benefits as unit testing any other code.</p>
<ul>
<li>Regression testing, it will help you validate that the old stuff is still working while you add new functionality</li>
<li>It will help you structure your XSLT and write beautiful testable code</li>
<li>It will give you confidence about the stability of your code</li>
</ul>
<h4>How to unit tests XSLT</h4>
<p>There's already a whole language that will let you make sure that XML is valid. Since the result of my transformations will be XHTML I can use XML Schema to validate that the XSL script gave expected result.<img class="alignnone size-full wp-image-191" title="xslt_unittest" style="margin-right: 100%;" src="http://litemedia.info/media/Default/Mint/xslt_unittest.png" alt="xslt_unittest" width="337" height="208" /></p>
<ol>
<li>Make sure that you split up your XSLT in templates so they will be easy to test.</li>
<li>Write one or more XML snippets for each of these templates.</li>
<li>Write XSD that defines what you expect after the snippet has been transformed</li>
<li>Write a unit test that will be the engine of transformation of the snippet, to validation of the result. In Mint I use the NUnit extensions RowTest, and define the XML snippet filename and XSD Schema filename as input parameters. The files I store as embedded resources in the unit test library.</li>
</ol>
<p>From now on you have your XSL transformations properly unit tested.</p>
