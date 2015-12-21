---
layout: post
title: "Unit test XSL transformations"
description:
date: 2009-02-22 17:19:16
assets: assets/posts/2009-02-22-unit-test-xsl-transformations
image: 
---

Mint will be a very XSL transformation heavy application. That is why I've been thinking alot about how to manage all the transformation code. Well let's start off with unit testing.

## Unit testing XSLT?

Unit testing the transformation gives you the same benefits as unit testing any other code.

* Regression testing, it will help you validate that the old stuff is still working while you add new functionality

* It will help you structure your XSLT and write beautiful testable code

* It will give you confidence about the stability of your code

## How to unit test XSLT

There's already a whole language that will let you make sure that XML is valid. Since the result of my transformations will be XHTML I can use XML Schema to validate that the XSL script gave expected result.

![XSLT unit test model](/assets/posts/2009-02-22-unit-test-xsl-transformations/xslt_unittest.png)

1. Make sure that you split up your XSLT in templates so they will be easy to test.

2. Write one or more XML snippets for each of these templates.

3. Write XSD that defines what you expect after the snippet has been transformed

4. Write a unit test that will be the engine of transformation of the snippet, to validation of the result. In Mint I use the NUnit extensions RowTest, and define the XML snippet filename and XSD Schema filename as input parameters. The files I store as embedded resources in the unit test library.

From now on you have your XSL transformations properly unit tested.
