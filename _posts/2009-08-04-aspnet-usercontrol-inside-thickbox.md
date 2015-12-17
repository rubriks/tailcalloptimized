---
layout: post
title: "ASP.NET UserControl inside Thickbox"
description:
date: 2009-08-04 03:58:58
assets: assets/posts/2009-08-04-aspnet-usercontrol-inside-thickbox
image: 
---

I love the <a href="http://jquery.com/demo/thickbox/">Thickbox</a>. It's fast, easy to use and I've not had any problems with it, until today.

I added an ASP.NET UserControl to a page. This user control was a form where readers should be able to submit comments. Additional to scrolling down to the bottom of the page, I wanted to make the form available in a thickbox. However, as soon as my form was in the whitebox window it stopped responding to ASP.NET events, such as <em>button click</em>.

The reason for this was simple. When the thickbox window opens it will copy the content to a new node called TB_window under the body. This won't work with ASP.NET UserControls because they have to stay inside the server form tag. Otherwise, events will not be triggered. Since I did not want to load my user control inside an IFrame, I opened up the thickbox.js and did some modifications.
<ol>
 <li>Give your server side form tag some ID, mine is <em>aspnetForm</em></li>
 <li>In the thickbox.js, modify every code that adds or remove stuff from the body, to <em>#aspnetForm</em> instead.</li>
</ol>
I think this might be less stable than just adding the elements to body and I've not tried it in Internet Explorer 6 yet. The solution seems promising though.

<a href="http://mint.litemedia.se/wp-content/uploads/thickbox.js">Here's my code</a> as reference when you do your own mojo.
