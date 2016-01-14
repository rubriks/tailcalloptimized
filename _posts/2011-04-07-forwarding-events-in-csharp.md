---
layout: post
title: "Forwarding events in C#"
description: A guide to how to forward an event that happens on an object to make sure that external components can listen to that event.
tags: C#, event handling
date: 2011-04-07 06:11:24
assets: assets/posts/2011-04-07-forwarding-events-in-csharp
image: 
---

Yesterday I learned a new syntax in C# that I didn't know about. I learned how you can forward events.  Let's say I want a class that takes a schema, and validates html to that schema. The class would encapsulate the XmlReaderSettings, but code from the outside would want to subscribe to the ValidationEventHandler on that private field. The code would look something like this.

{% gist miklund/4bd12d0696284edc4d8a HtmlValidator.cs %}

How could the code calling on Validate, subscribe to ValidationEventHandler on xmlValidationSettings? We would need to create an event on HtmlValidator that forwards the ValidationEventHandler. I add a public forwarding event like this.

{% gist miklund/4bd12d0696284edc4d8a OnValidationError.cs %}

Now we can subscribe to this event, and it will subscribe to the inner ValidationEventHandler. Study the following tests.

{% gist miklund/4bd12d0696284edc4d8a Test.cs %}

At line 11 I subscribe to the external event that will trigger the error++ code on validation errors. Pretty neat, huh!?
