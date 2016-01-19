---
layout: post
title: "The value of attributes"
description: Attributes are useful for adding all kinds of meta data to your code.
tags: attributes, c#, meta
date: 2009-02-20 17:26:09
assets: assets/posts/2009-02-20-the-value-of-attributes
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

I often rediscover the value of Attributes in C#. Very often it is hard to find a situation where you have need of attributes, you may be thinking that it is only for meta coding like unit testing or dynamic code intepretation/serializing, but you're wrong. Attributes are useful every time you need to add meta data to a class, property or field. Let me give you the common example of adding label to an enum.

> Problem: An enum defines genre in your music database. Now you want to display all available genres.

{% gist miklund/2fdb10929f47f599da75 Genre1.cs %}

Start by defining the attribute Label.

{% gist miklund/2fdb10929f47f599da75 LabelAttribute.cs %}

Now you can add this to your genre values.

{% gist miklund/2fdb10929f47f599da75 Genre2.cs %}

With the simple use of an extension method you may accomplish alot.

{% gist miklund/2fdb10929f47f599da75 LabelAttributeHelper.cs %}

Now you may easily type out all available genres with a simple procedure.

```csharp
foreach (Genre genre in Enum.GetValues(typeof(Genre)))
    Console.WriteLine(genre.Label());
```

That's all for today. Have a nice weekend!
