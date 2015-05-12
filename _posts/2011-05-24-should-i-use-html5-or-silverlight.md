---
layout: migratedpost
title: "Should I use HTML5 or Silverlight?"
description:
date: 2011-05-24 06:28:55
assets: assets/posts/2011-05-24-should-i-use-html5-or-silverlight
image: 
---

<div>

This is an answer to the <a href="http://www.hanselman.com/blog/ShouldIUseHTML5OrSilverlightOneMansOpinion.aspx">post of Scott Hanselman with the same title</a>. The problem I have reading these kind of blog posts is that the author is always either a Microsoft/Adobe/Sun spokesman or an open standards zealot.

This has little to do with Silverlight, but could easily be applied to any browser plugin model, like Flash or JavaFx. The reason I use Silverlight here, is that I'm a .NET developer and this is a blog about .NET development.

I have no cares for any plugin model, and I'm not an open standards fan. I just want to get the most possible value with the least possible cost.
<h2>The web is all about semantics</h2>
The web has a language and it is called html. You use it to markup the meaning of your content. For your page title you use <h1> and for your paragraphs you use <p>. If you have an image use use <img> and for table data, the black sheep <table>.

When you place a plugin on the page you remove this sematic markup and replace it with a black box. Before you do that, you should be aware of the consequenses. The meaning of the content within that plugin will never be revealed to the browser. The text is invisible to any screen reader software and Google indexer robot will not reach it.

This is why I say, using Silverlight (or any other browser plugin) to display content is bad.
<h3>How about banners?</h3>
The technology for creating animated banners in html5 canvas + javascript is still very new. Some older browsers do not support it and that might give you enough reason to use flash, which is still the most widespread browser plugin when it comes to animation.

Don't forget that you will hide the banner content to anyone that is not a human using a web browser with flash installed.
<h2>Rich Internet Applications</h2>
Rich Internet Applications (RIA) are desktop apps that runs in the browser. It could be a public application like GMail or it could be a private administration console for your e-commerce workflow.

In a public RIA you would like to target as large user base as possible. In that case, html is the obvious choice. Not html5, but standard xhtml 1.0. Imagine if GMail was written in Flash. I don't think it would have gotten that kind of popularity that it has. The experience of having a full scale e-mail client as a web application is just seamless for the user.

If the RIA is not a free application but something that your customers buy, you may set another stage. The customer accepts that they need to use the latest Silverlight plugin to be able to run your application. They login, and they install the latest Silverlight runtime (takes 2 minutes) and then they are up and running. Why is this acceptable? I guess it has to do with perception - I buy an application - it should be an application.

Silverlight is perfect for the RIA scenario because it has much better integration between frontend and backend. You use C# on both. There are a lot of controls that will make your development smoother and the maintainability is just higher with XAML/C# than HTML/JavaScript/Css.

When you have an internal private application, the choice is simple. You control the machines that your application will run on, and may demand what version of Silverlight should be available.

Last time I worked with Flash, this was not suited for RIA development. The maintainability was really poor and it was hard to produce anything that was stable enough for production use. My recommendation is that Flash, only suits banner development, and should not be used for any larger scale project.
<h2>Where to use Silverlight?</h2>
To sum it up. You should use Silverlight in windows application development. When you write an application in Silverlight it can be used both inside and outside of browser, and that is very powerful.

It's easy to maintain a Silverlight application, not only because of the .NET infrastructure, but only for release management. You deploy the application to an URL and your customer service team will get the update as soon as they refreshes the url in their browser.

Silverlight is the only development platform for Windows Phone 7, and a quite nice one.
<h3>When you shouldn't use Silverlight?</h3>
<ul>
 <li>When you need to target a larger audience</li>
 <li>When the application represent content, blog, news articles</li>
 <li>When you can't control the environment that your users are in</li>
</ul>
</div>
