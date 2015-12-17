---
layout: post
title: "UTF8 encoding and Excel CSV"
description:
date: 2011-04-20 15:24:13
assets: assets/posts/2011-04-20-utf8-encoding-and-excel-csv
image: 
---

<p>Working with WebForms I often use ASHX handlers for generating stuff. It can be anything from XML to CSV.</p>
<p><a href="http://mint.litemedia.se/wp-content/uploads/generichandler.png"><img class="alignnone size-full wp-image-1148" title="generichandler" src="http://mint.litemedia.se/wp-content/uploads/generichandler.png" width="444" height="40" /></a></p>
<p>This is very lightweight and I like it, but today I ran into a problem where I wanted to generate a CSV for Microsoft Excel, but Excel could not recognize the UTF encoding and tried to parse it as ANSI.</p>
<p><img class="alignnone size-full wp-image-1149" title="excel" src="http://litemedia.info/media/Default/Mint/excel.png" width="219" height="101" /></p>
<p>Looks like crap because Excel can't tell that we're feeding it UTF8. This can be fixed by explicitly giving the file a BOM (byte order mark).</p>
<pre class="brush: csharp">public void ProcessRequest(HttpContext context)
{
    context.Response.ContentEncoding = Encoding.UTF8;
    context.Response.ContentType = "text/csv";
    context.Response.AppendHeader("Content-Disposition", "attachment;filename=data.csv");
            
    // Start the feed with BOM
    context.Response.BinaryWrite(Encoding.UTF8.GetPreamble());

    var data = new[]
    {
        "Namn;Land;Poäng", // Name;Country;Points
        "Mikael Lundin;Sverige;1200",
        "John Smith;US;800",
        "Jean-Pierre Bordeaux;Française;600"
    };

    foreach (var rows in data)
        context.Response.Write(rows + "\n");
}</pre>
<p>The magic happens at line 8 where we explicitly write the BOM to the stream.</p>
