---
layout: migratedpost
title: "N2 CMS vs. EPiServer CMS"
description:
date: 2010-02-22 20:11:24
assets: assets/posts/2010-02-22-n2-cms-vs-episerver-cms
image: 
---

I'll write this post to clear out the differences of these two CMSes. Note that these are my viewpoints and not the ones of my employer.
<h2>Why choose EPiServer over N2?</h2>
<ol>
 <li>EPiServer has customer support.
If your main line of business is not education, you can send your editors to a course at EPiServer, where they'll learn how to maintain a website. This is a security for you as a developer as well as for the customer.</li>
 <li>EPiServer is a company with a product.
This means that you can get guarantees and support for an amount of time in the future. You can demand that bugs should be fixed and you have a contract to lean on.</li>
 <li>EPiServer lets your editor create user input forms and gather the data.
Most developers fear this functionality since it is not very well implemented, but I've seen customers make good use of it. The argument "it saves you money since you don't need a developer to gather input data" is false, because these forms always needs some tweaking before working as they should. It is a nice and selling idea though.</li>
 <li>EPiServer has scheduled jobs.
Indeed, you do not have to create your own windows services for your scheduled tasks. You will also get a control panel within EPiServer Administrators Mode that can be used by the administrator to control behaviour of the scheduled job.</li>
 <li>EPiServer has lots of plugins like <a href="http://www.episerver.com/sv/Products/EPiServer-Community-3/">Community</a> and <a href="http://www.episerver.com/sv/Products/EPiServer-Relate-2/">Relate+</a>.
This is a pit of failure that customers will fall into thinking that they will need community functionality in the future. It is great for sales people that wants to lure the customer in with the immense diversity of EPiServer, but then they have never considered <a href="http://en.wikipedia.org/wiki/You_ain't_gonna_need_it">yagni</a>.</li>
 <li>EPiServer has Office integration.
Also a great selling point, but do you really need it?</li>
 <li>EPiServer has lots of documentation.
And this makes it easier to get new developers start working with EPiServer. It also makes it much easier to find developers that can maintain your website.</li>
 <li>EPiServer will scale horizontally by a custom made cache system.
If you have a website with enough traffic for two or more web servers, EPiServer makes it easier to share cache between these clustered servers.</li>
</ol>
<h2>Why choose N2 over EPiServer?</h2>
<ol>
 <li>There is no license fee.
When creating a small business website you don't want one quarter of the cost being licensing fees.</li>
 <li>It's open source.
If developers finds a bug they can fix it, to opposed to EPiServer where they would have to work around it. Also if you need to know how something is working you can look at the source, which is very easily read, and don't have to rely so much on updated documentation.</li>
 <li>It is lightweight.
You feel it when you're working in it as an editor - it responds very fast, and you feel it when you're working in it as a developer - it never gets in your way. I would claim that this is the main reason why N2 development is faster than EPiServer development. Less is more.</li>
 <li>N2 CMS is easier to use.
The editors interface is much easier to use because it does not have the complexity of EPiServer. The base functionality is very simple, and then it is up to the developer to make it complex. N2 CMS is also very easy to get started with as a developer. The API has a much nicer and extendable design than EPiServer that makes it easier to test and easier to maintain - read: lower cost.</li>
</ol>
Everywhere you have EPiServer offering a functionality you can easily substitute this. When you need scheduled jobs, you bring in <a href="http://quartznet.sourceforge.net/">Quartz.NET</a>. If you want to gather customer feedback you don't need a forms builder, but <a href="https://uservoice.com/">User Voice</a> (or <a href="http://kundo.se/">Kundo</a> in Sweden). When you need to scale out your website, you use <a href="http://code.msdn.microsoft.com/velocity">Velocity</a> caching for NHibernate instead of syscache2 that comes out of the box. That N2 is lightweight means that you extend it when you need to, and not try to solve global warming out of the box.
<h2>Cases - when I should use one over another</h2>
<ol>
 <li>You're a multi billion company that needs a new multilingual website. You have a hundred editors in 15 countries and you need the right tool to make this work.
EPiServer is the right tool when it comes to websites that will have tens of thousands of pages over several languages. You will also have much better support for workflows, where one user is writer, another is editor and there is a publishing mechanism that makes sure that the correct people have seen the content before it goes live.</li>
 <li>Your main business is not content, but you need a CMS to host your service.
This is a solid case for N2, the CMS that will not get in your way as you focus on producing your service, but will give you all the advantages of managing your content. In this case the content management system will work more as a control panel than a publishing platform.</li>
</ol>
Many customers thinks that they need everything and would go for any system that has it all, but what they care to ignore is that larger systems always are more complex and will be more expensive to maintain. It is developers responsibility to guide clients into making right decisions.
