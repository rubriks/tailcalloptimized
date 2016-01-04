---
layout: post
title: "Business loves Excel, Engineers loves XML"
description:
date: 2009-08-19 05:42:59
assets: assets/posts/2009-08-19-business-loves-excel-engineers-loves-xml
image: 
---

In the middle of my project, the client sends me this excel file that I should validate user input against.  I asked around among my colleagues to get their opinion of what I should do with this treacherous thing. Their answers were any of

* Import it into an SQL table and query against the database
* Give the client a web page where they can upload it, and transform the file to XML

Programmers doesn't like Excel as a data format because it is an unreliable grid where anything could be a text, numeric or date value. There is nothing short of convention of how columns are placed and ordered on the spreadsheet;  a complete nightmare.  I decided to take on the challenge. We all know that this customer will come back with an updated spreadsheet in the future, and then I would like to just replace the old one.  I know that you can use [OLEDB connections to query Excel documents](http://www.codeproject.com/KB/office/excel_using_oledb.aspx "Reading an Excel document - CodeProject") with SQL-like queries, but I wanted something cleaner. What I found was [LINQ to Excel - Google Code](http://code.google.com/p/linqtoexcel/), which is really an outstanding idea. Look at the following example.

![excel spreadsheet](/assets/posts/2009-08-19-business-loves-excel-engineers-loves-xml/spreadsheet.png)

First I create my model object that represents a row in the spreadsheet.

{% gist miklund/f8e6c24cf230602abaa1 ZipCodeWorksheet.cs %}

Then I write the LINQ query.

{% gist miklund/f8e6c24cf230602abaa1 Example.cs %}

Easy, maintainable and your clients will love you for it.
