---
layout: post
title: "Xml, future of the past"
description: XML had such promise when it was made public. We could have a clear separation in our browsers of data (xml) and ui (xsl). Why did it all go away?
tags: xml, xsd, xsl
date: 2008-12-15 15:20:53
assets: assets/posts/2008-12-15-xml-future-of-the-past
image: 
---

Xml is another fantastic overlooked technology. Not because it's one of the most used data formats in the world, but because almost all of those applications only use a tiny bit of the whole xml technology. It is really fantastic and it features some functionality that no other data format does.

{% gist miklund/d8928eee2c2fba80e02e bookstore.xml %}

I would not claim it to be a beautiful format. It is not very minimalistic and sending huge amounts of data as XML will cause a lot of overhead. But, anyone that ever done some HTML will get the idea from the start.

## Document Type Definition

Included in the Xml suite is the DTD, document type definition. This is its own language that describes what the xml markup should look like. The xml markup is a sort of language, and the DTD setup the rules for this language.

{% gist miklund/d8928eee2c2fba80e02e bookstore.dtd %}

A small DTD is very readable like this one, but it is easy to loose readability as the size of your document format grows.  DTDs are very useful when you want to exchange xml documents with others. You define a DTD that others have to follow, and when you recieve a document from them, you can validate it and make sure that it follows the specification, before you start using it. You can also specify indexes in your DTD which will make searching in your XML blazing fast.  XSD is a schema format that also specifies the XML format just like the DTD but in XML. It is a bit harder to define a XSD schema than a DTD, but the application feels more natural since it is written in XML and it is actually much more powerful. If I was going to implement XML validation I would always use XSD before DTD, but I would consider to use DTD when I need to communicate the XML data format to the customer because of its readability.


{% gist miklund/d8928eee2c2fba80e02e bookstore.xsd %}

When I create a schema for a bookstore I have defined what my data should look like, to me and to others that are going to talk to my system. So, when another developer comes along we can give him the data definition and tell him that this is the dataformat we support.

# XSL Transformation

I remember a couple of years ago when everyone should learn HTML to "program" homepages. Lots of pages emerged about pets, families and obscure hobbies. That was the flower power time of the internet. The next big thing would be XML as a backbone to the XSLT transformation. XML would serve as a data bearer only, and the client browser would use a stylesheet to render the HTML. This enabled different rendering for different devices and moving all rendering from server side to client side. This was a genious idea from W3C but it never got the attention that it deserved. I think it was way ahead of its time. When the low grade teacher just've learnt HTML she was going to grasp seperation of concerns and a deviation between data storage and presentation? That was a bit too much to ask. The real programmers didn't grasp the technology because this was evolutionary thinking by the time and they were still struggling with CSS. There were no real tool that made it simple to understand the relationship between XML/XSL, so the whole technology was pretty much forgotten.  Today, seperation of concerns, rendering of strict xhtml and accessability for different devices are on everyones lips but XSL transformation have never found the way back to the web. Instead we use it for more obscure transformations in the backend.

{% gist miklund/d8928eee2c2fba80e02e bookstore.xsl %}

[Open this link in Internet Explorer for result](/assets/posts/2008-12-15-xml-future-of-the-past/bookstore.xml) With the power of XSLT you can transform any XML document to anything at all. A simple XML language will let you query your data, format it and sort. The number of built in functions are minimal so that you can expand them with your own library by adding namespaces to the transformation engine.  As I said, the XSLT technology is as useful today as when it arrived. Ponder that you in your C# application needs to output your object domain into a CSV format. This is a trivial thing when using XSLT. First you use the built in XmlSerializer to get your data as XML, and then you write your XSLT so that you get the data in the order that you want. When the requirements on this data changes you only have to update your XSLT script and not change any compiled logic.  Another cool thing in .NET is the implementation of XmlReader. Any data structure that can be interpreted as a DOM can be readed as XML and transformed to anything you like using XSLT on the fly. All you need to do is to implement your own XmlReader. Imagine reading that csv file as if it were XML and query it with XPATH using something like /item[@id='1234'] instead of your own custom made search logic.

# From here and on

There are more XML technologies. Some are quite cool, some have been forgotten. Some you won't understand until you've tried them. Here are my favourites.

* XHtml
* XPath
* XForms
* XLink

Also make sure that you check out all the cool stuff you can do with XML in the .NET Framework including Linq to XML. Knowing this is like knowing your backyard and knowledge like this may get you safely out of pretty nasty requirements in the future. 

[Download source example](/assets/posts/2008-12-15-xml-future-of-the-past/xmlDemo.zip)
