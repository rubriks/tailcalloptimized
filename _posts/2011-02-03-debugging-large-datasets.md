---
layout: post
title: "Debugging large datasets"
description: When dealing with web services that return large amount of data it can be a trifle to debug that data and see that you get what you'd expect.
tags: big data, wcf, web service, debugging
date: 2011-02-03 07:40:47
assets: assets/posts/2011-02-03-debugging-large-datasets
image: 
---

You call a webservice and get back a datastructure that is ~1 mb. How do you in a debug session make sure that it contains the data you expect?

![a service call returns a large set of data rows](/assets/posts/2011-02-03-debugging-large-datasets/serviceresult.png)

I'm not really interested in the name BRODERIC in my code, but I would like to know if it is there.

> I could write a test that will tell me, but I might also want a faster and more temporary way to get this knowledge.

## Immediate window

In your Visual Studio you have an Immediate window that will allow you to write code in debug mode. This is very useful. Start a debugging session and open the menu Debug/Windows/Immediate, or press CTRL+ALT+I.


![in debugging you can access the data set through immediate window](/assets/posts/2011-02-03-debugging-large-datasets/serviceresult2.png)

This is a very simple datastructure, but let's pretend it is a complex one and we would like to get it as XML. Start with a xml serializer. I prefer the DataContractSerializer (you need to have a reference to System.Runtime.Serialization in your current project).

```csharp
System.Runtime.Serialization.DataContractSerializer serializer = new System.Runtime.Serialization.DataContractSerializer(names.GetType());
```

It takes the type to serialize in it's constructor. This should work even with an anonymous type. Next create the output stream that serialization should be made to.

```csharp
System.IO.MemoryStream outputStream = new System.IO.MemoryStream();
```

Now you can serialize the contents of names to this stream.

```csharp
serializer.WriteObject(outputStream, names);
```

The immediate window will tell you that the expression has been evaluated, but has no value. That is correct. Now we need to reset the stream if we're to read from it.

```csharp
outputStream.Position = 0;
```

Now we're ready to read the xml from that stream and put it into a variable. That variable will then be available in our Locals window.

```csharp
string outputXml = new System.IO.StreamReader(outputStream).ReadToEnd();
```

The locals window is also available in the menu Debug/Windows/Locals.

![in the locals window you can access the outputXml value](/assets/posts/2011-02-03-debugging-large-datasets/serviceresult3.png)
![you can also output the xml in the immediate window](/assets/posts/2011-02-03-debugging-large-datasets/serviceresult4.png)

Now you can copy paste the xml to your [favorite text editor](http://notepad-plus-plus.org/) and search for the value you're looking for. You can communicate the data to your customer and you can prove to Mr Andersson that you certainly don't get the values from his service that you're expecting.  Happy coding!
