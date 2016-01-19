---
layout: post
title: "Exporting comments from Orchard CMS to import them into Disqus - Part 2"
description: Now that we have extracted our comments from the database into an XML file, all we need to do is to transform that XML into the correct WXR format that Disqus supports.
date: 2016-01-18 10:37:36
tags: xml, xsl, wxr, Disqus, Orchard, CMS
assets: assets/posts/2016-01-18-exporting-comments-from-orchard-cms-to-import-them-into-disqus-part-2
image: assets/posts/2016-01-18-exporting-comments-from-orchard-cms-to-import-them-into-disqus-part-2/title.png

author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

In my [previous post](/2016/01/17/exporting-comments-from-orchard-cms-to-import-them-into-disqus-part-1.html "Exporting comments from Orchard CMS to import them into Disqus - Part 1") we took a look at exporting comments from the Ochard CMS database when the export functionality is out of order. It had some nifty tricks to extract XML from an SDF[^1] file and resulted in an XML file looking like this.

{% gist miklund/e642f787e125905a04da databaseComments.xml %}

Creating this XML was much easier than trying to create the WXR format that Disqus accepts. Instead we will quite easily turn this XML format into the WXR format by using another of my favorite tools, XSLT.

{% gist miklund/e642f787e125905a04da transform.xsl %}

This is a very simple XSL transformation. In the root template we're outputting the headers, and in the Comment template we output the WXR format while we fetch the values directly from the databaseComments.xml elements. Since we've preformatted the dates and cdata fields, there is not much data migration going on.

{% gist miklund/e642f787e125905a04da transform.fs %}

A few lines of F# code will turn our input XML to the WXR by transforming it with our XSL.

```fsharp
transform "databaseOutput.xml" "transform.xsl" "disqusImport.xml"
```

Before running the import I verified that all the URLs in the disqusImport.xml was working, and then I just pushed the file to Disqus with great success.

{% gist miklund/e642f787e125905a04da disqusImport.xml %}

![Importing WXR files to Disqus](/assets/posts/2016-01-18-exporting-comments-from-orchard-cms-to-import-them-into-disqus-part-2/disqusImport.png)

---
**Footnotes**

[^1]: SQL Server Compact 4
