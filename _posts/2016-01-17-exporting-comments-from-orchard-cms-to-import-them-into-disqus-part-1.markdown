---
layout: post
title: "Exporting comments from Orchard CMS to import them into Disqus - Part 1"
description: 
date: 2016-01-17 13:17:48
tags: 
assets: assets/posts/2016-01-17-exporting-comments-from-orchard-cms-to-import-them-into-disqus-part-1
image: assets/posts/2016-01-17-exporting-comments-from-orchard-cms-to-import-them-into-disqus-part-1/title.png
---

I have during the span of a month been working on migrating my old blog posts from LiteMedia.info to this blog, and I have succeeded. Over 200 blog posts have been manually translated from HTML to Markdown. I have verified every link, moved every image and am forwarding all requests to old URLs to the new blog. All is done, except comments.

I've been bad at managing comments on my old blog, because it was swamped with spam. It was impossible to find the true comments in the ocean of crap. And if you think you could categorize and filter out spam comments, then you'll quickly realize that spam comments have become exceedingly qualified. In the end, I still have a few hundreds of approved comments that I wanted to move over.

When you migrate to Disqus you should export your comments to a WXR[^1] format. This format has no documentation at all, but it is the standard export format when you're exporting from Wordpress. You will find an [example XML from Disqus when you google it](https://help.disqus.com/customer/portal/articles/472150-custom-xml-import-format "Custom XML Import Format - DISQUS").

![Orchard CML Import/Export](/assets/posts/2016-01-17-exporting-comments-from-orchard-cms-to-import-them-into-disqus-part-1/export.png)

Simple enough, I assumed I could just export the comments from Orchard and transform the result to the correct format, but my Orchard CMS site seemed broken. The export would fail, no matter what I did, and it didn't fail with a nice stacktrace either. The application pool would just give up and die. Instead of wasting time trying to get the export to work, I decided to extract the information myself from the database.

![SQL Server Compact 4](/assets/posts/2016-01-17-exporting-comments-from-orchard-cms-to-import-them-into-disqus-part-1/sqlce4.png)

As not to make it too easy on me, I once decided that SQL Server Compact 4 would be quite enough for my little blog. Also because I didn't want to spend any extra dime on SQL Azure database services. This was quite a bad idea as it has only given me headaches[^2].

So I would use F# 2.0 and some SQL to extract the data from the database. If I were to use F# 3.0 I could utilize type providers and maybe make working with the database a bit smoother, but this is not code that will be sustained in the future, so I decided I could use the F# 2.0 that I had installed in my old Visual Studio 2010.

{% gist miklund/3b480b35930b05f444c5 Model.fs %}

Starting out by defining the model that I need to extract in order to create the import format. I choose to format the datetime strings in F# instead of doing it in XML later. This is pure lazyness of me, but as the code is written once and then thrown away, this doesn't matter much.

{% gist miklund/3b480b35930b05f444c5 Comments.sql %}

Then I wrote the SQL to extract the data I needed for the model. The JOIN statements looks pretty weird because Orchard CMS chooses to store lots and lots and lots of duplicates in the JOIN tables. Unless I choose to JOIN DISTINCT I would end up with 56000 comments instead of the real number 226.

There is also some trickery in joining the BodyPartRecord, because you can't use DISTINCT or GROUP BY in SqlCe4 with a nvar column. Basically I'm working my way around it with SQL subqueries.

{% gist miklund/3b480b35930b05f444c5 getData.fs %}

Next up I wrote the code to run the query on the database. Here I'm using standard ADO.NET because I don't have type providers available from F# 3.0. I think the code looks ok. Not too bad.

I end up returning an array because it is more suitable for serialization than a sequence or a list would be.

{% gist miklund/3b480b35930b05f444c5 readComment.fs %}

I need to map each row of data into an instance of the Comment record. If I would follow the functional path, I would turn every DBNull situation into an Option, Some/None, but let's be reasonable. That would be harder to serialize into XML and I'm only looking for empty values in the XML if the column data is null.

Type inference does a great deal here. I can write some pretty expressive code while the compiler works out the types.

```fsharp
commentDateUtc = dataReader |> get "CommentDateUtc" |> dateString
```

When formatting the date for the blog link URL, .NET framework is trying to be clever on us. `date.ToString("yyyy/MM/dd")` turns into `2008-08-20` and not `2008/08/20` as one would expect. This is because _dash_ is the default date separator in my current culture and not _slash_.

{% gist miklund/3b480b35930b05f444c5 dataContract.fs %}

There are a few XML serializers in .NET, but I choose to go with DataContractSerializer out of convenience. This is usually the least hassle free, but it requires you to put a few attributes on your model classes. Here I will tell the serializer that it should not put any namespaces on the result XML, and it should use the specified names on serialized elements.

{% gist miklund/3b480b35930b05f444c5 serialize.fs %}

```fsharp
getData "Orchard.sdf" |> xmlSerialize "databaseComments.xml"
```

Now it is just a matter of serializing the Comments and you will get the comments from the SqlCe4 database outputted in a XML format to disk. Note, that this is not the Disqus import format. This is just an arbitrary XML format that will make it easy for us to transform to the Disqus format. In the next post I will show you how to turn this XML format into the result format.

---
**Footnotes**

[^1]: Wordpress Extended RSS, "I posed this question to John O'Nolan, a WordPress core developer, who forwarded my question to core committer Aaron Jorbin. O'Nolan responded by saying (I'm paraphrasing) that there isn't any official documentation on the WXR standard, but that reverse engineering a WXR export should give me all the information I need."

[^2]: It has a limit of 256Mb file size, so once my blog was spammed with enough comments it actually crashed when the database couldn't store any more data. I also believe this was the reason that the blog was all together very slow. Each request would take approximatly 10 seconds before you got an answer. Lesson learned, don't use SqlCe4 for anything that goes to production.
