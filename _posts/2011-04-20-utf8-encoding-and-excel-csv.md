---
layout: post
title: "UTF8 encoding and Excel CSV"
description:
date: 2011-04-20 15:24:13
assets: assets/posts/2011-04-20-utf8-encoding-and-excel-csv
image: 
---

Working with WebForms I often use ASHX handlers for generating stuff. It can be anything from XML to CSV.

![Generic Handler](/assets/posts/2011-04-20-utf8-encoding-and-excel-csv/generichandler.png)

This is very lightweight and I like it, but today I ran into a problem where I wanted to generate a CSV for Microsoft Excel, but Excel could not recognize the UTF encoding and tried to parse it as ANSI.

![Generic Handler](/assets/posts/2011-04-20-utf8-encoding-and-excel-csv/excel.png)

Looks like crap because Excel can't tell that we're feeding it UTF8. This can be fixed by explicitly giving the file a BOM (byte order mark).

{% gist miklund/5b593c2e50059920a96d ProcessRequest.cs %}

The magic happens at line 8 where we explicitly write the BOM to the stream.
