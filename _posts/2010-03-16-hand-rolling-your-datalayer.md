---
layout: post
title: "Hand rolling your datalayer"
description: Nobody is talking to the database anymore. You write code or a framework, that uses a framework that in the end results in some SQL sent over the wire. Here is how you hand roll that datalayer in order to understand how it works.
tags: ADO.NET, data access, data layer, sql, ORM
date: 2010-03-16 19:35:33
assets: assets/posts/2010-03-16-hand-rolling-your-datalayer
image: 
---

There are higher and higher demands on you as a developer to learn more and more frameworks that I sometimes get lost in the djungle out there. If you ask me to store some data into a database my mind will automatically go into an [NHibernate](http://www.nhforge.org/), [Entity Framework](http://msdn.microsoft.com/en-us/library/aa697427(VS.80).aspx), [Linq 2 SQL](http://msdn.microsoft.com/en-us/library/bb425822.aspx), [Castle Active Record](http://www.castleproject.org/activerecord/index.html) mantra and start discussing with itself what is the perfect framework for this specific problem.  When you have four entities you don't really need an ORM to handle persistance. In fact, using an ORM in that case is same as _"[stealing from your clients](http://ayende.com/Blog/archive/2009/08/15/the-least-common-denominator-approach.aspx)"_. _(I'm aware that the link goes to a post that states the opposite of my argument)_ I suggest we take a moment here to reflect on how you hand roll a data layer that will suit for up to four entities.  First we need some sort of provider that may deliver us data connections and commands. Some sort of object that will get the plumbing out of the way.

{% gist miklund/57a17cf597079bc889ee DataProvider.cs %}

And this would be an example of how you can use that provider to talk to the database.

{% gist miklund/57a17cf597079bc889ee BookRepository.cs %}

From your presenter or controller (or whatever) you may now use your data layer like this.

{% gist miklund/57a17cf597079bc889ee Example.cs %}

There's nothing wrong with going back to the basics, sometimes.
