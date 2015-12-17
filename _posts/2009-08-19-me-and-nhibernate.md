---
layout: post
title: "Me and NHibernate"
description:
date: 2009-08-19 20:01:28
assets: assets/posts/2009-08-19-me-and-nhibernate
image: 
---

"If you hand roll your SQL statements you're stealing from your clients."

That is the essence of what <a href="http://ayende.com/Blog/Default.aspx">Ayende</a> <a href="http://ayende.com/Blog/archive/2008/11/21/stealing-from-your-client.aspx">is saying</a> and I dearly wants to suppose he's right. I love the idea of a layer of abstraction over the database, bridging the relational world to the object oriented. But every time I've tried to setup NHibernate I've failed with even the most basic scenarios, and it pains me greatly knowing what's right but not getting it to work. I think the main issues are the following.
<ul>
 <li>I'm a beginner looking for a silver bullet, but everytime I rip someones implementation and try to adapt it to my own situation I fail because every scenario seems to need its own custom solution.</li>
 <li>Every time I search google for a solution to my problems, I only find articles with lingo I don't understand or so advanced that it's useless for my simple task. (NHibernate in F# anyone?)</li>
 <li>When you read a discussion between the leading ORM specialists in the field they never ever agree on anything. <a href="http://codebetter.com/blogs/karlseguin/archive/2008/12/22/new-repository-lt-t-gt-domagic.aspx">Generic repositories</a>, <a href="http://ayende.com/Blog/archive/2009/08/02/your-domain-model-isnrsquot-in-the-entity-relationship-diagram.aspx">entities as domain model</a> or <a href="http://stackoverflow.com/questions/310691/nhibernate-good-complete-working-helper-class-for-managing-sessionfactory-sessi">how to handle the session factory</a>. For every strong idea there seems to be an equally strong opposition.</li>
 <li>It's not intuitive. Today I got a very cryptic exception that turned out to be that I forgot to add an Id-property to my entity. I guess that the exception message was refering to the abstract faulty state that was going on, but a google search turned out the most common failure. The whole framework seems to suffer from the same problem of expressing itself in what is correct and not what's easy to understand.</li>
</ul>
I will get there. After hours and hours of fighting with errors I will at last feel proficient enough to use it in an application for a client. Until then I'll worry about how every Joe Developer will manage to do the same thing and start traversing that learning curve.
