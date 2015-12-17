---
layout: post
title: "Business loves Excel, Engineers loves XML"
description:
date: 2009-08-19 05:42:59
assets: assets/posts/2009-08-19-business-loves-excel-engineers-loves-xml
image: 
---

<p>In the middle of my project, the client sends me this excel file that I should validate user input against.  I asked around among my colleagues to get their opinion of what I should do with this treacherous thing. Their answers were any of</p>
<ul class="unIndentedList">
<li> Import it into an SQL table and query against the database</li>
<li> Give the client a web page where they can upload it, and transform the file to XML</li>
</ul>
<p>Programmers doesn't like Excel as a data format because it is an unreliable grid where anything could be a text, numeric or date value. There is nothing short of convention of how columns are placed and ordered on the spreadsheet;  a complete nightmare.  I decided to take on the challenge. We all know that this customer will come back with an updated spreadsheet in the future, and then I would like to just replace the old one.  I know that you can use <a title="Reading an Excel document - CodeProject" href="http://www.codeproject.com/KB/office/excel_using_oledb.aspx">OLEDB connections to query Excel documents</a> with SQL-like queries, but I wanted something cleaner. What I found was <a title="LINQ to Excel - Google Code" href="http://code.google.com/p/linqtoexcel/">LINQ to Excel</a>, which is really an outstanding idea. Look at the following example.</p>
<p><img class="size-full wp-image-504" title="spreadsheet" src="http://litemedia.info/media/Default/Mint/spreadsheet.png" alt="spreadsheet" width="260" height="132" /></p>
<p>First I create my model object that represents a row in the spreadsheet.</p>
<pre class="brush:csharp">public class ZipCodeWorksheet
{
    public const string Name = "Report";

    public string Country { get; set; }
    public string ZipCode { get; set; }
    public string City { get; set; }
}</pre>
<p>Then I write the LINQ query.</p>
<pre class="brush:csharp">var repo = new ExcelRepository(this.filePath, ExcelVersion.PreExcel2007);

repo.AddMapping(x => x.Country, "COUNTRY");
repo.AddMapping(x => x.ZipCode, "ZIPCODE");
repo.AddMapping(x => x.City, "CITY");

var q = from worksheet in repo.Worksheet(ZipCodeWorksheet.Name)
        where worksheet.ZipCode == indata
        select worksheet;</pre>
<p>Easy, maintainable and your clients will love you for it.</p>
