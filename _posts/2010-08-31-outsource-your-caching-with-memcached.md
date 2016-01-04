---
layout: post
title: "Outsource your caching with memcached"
description:
date: 2010-08-31 16:19:56
assets: assets/posts/2010-08-31-outsource-your-caching-with-memcached
image: 
---

I'm currently working on a large business system for a client where there are several caching situations, because the service that delivers the data is too slow, the database is too slow or we don't want to hit the source for the data all too often.  I've been hand rolling most of these cache layers myself. I don't like the idea of using ASP.NET caching for non ASP.NET applications.

## Memcached

Always when I hit the same problem the third time, I start looking for a common solution. When I was about to write my third caching implementation, I made a google search and found out that I probably should move the cache outside the application pool into a seperate service. Memcached is a service that I've heard of before, but I haven't really tried it out.  Memcached is

* a key/value store
* hip and cool because it's NoSQL
* available as a windows service from [NorthScale](http://www.northscale.com/) with a simple .NET client API

## How does it work?

Download and install the service from NorthScale. You'll get a user interface where you can analyze status of your cache service. Notice all the stuff about clustering which is cool, but probably only usable if you're Facebook or Twitter.

![northscale ui](/assets/posts/2010-08-31-outsource-your-caching-with-memcached/northscale_ui.png)

Before you start writing code you should create a bucket, where you want to store your data. If I understood this correctly, buckets are just there to separate one type of cached data from another type of cached data.

## Your own project

Add references to the `Enyim.Caching.dll` and `Northscale.Store.dll`.

![references tree in visual studio solution explorer](/assets/posts/2010-08-31-outsource-your-caching-with-memcached/references.png)

You will need to add configuration to tell NorthScaleClient where to find memcached service.</p>

{% gist miklund/73fd3cfccb0c6fa678f8 Web.config.xml %}

Now you can get and set data from the cache like this.

{% gist miklund/73fd3cfccb0c6fa678f8 GetData.cs %}

Easy huh! Now, go out there and cache the world!
