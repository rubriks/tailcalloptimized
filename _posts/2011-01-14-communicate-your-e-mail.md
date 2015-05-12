---
layout: migratedpost
title: "Communicate your e-mail"
description:
date: 2011-01-14 06:49:56
assets: assets/posts/2011-01-14-communicate-your-e-mail
image: 
---

<p>For anyone to contact you they need to know how. That's why you should display your e-mail everywhere. Except ... you will get a lot of spam because <a href="http://mint.litemedia.se/2011/01/07/email-is-dead/">e-mail is not secure by default</a>.  The e-mail protocols are flawed and that is why there are spammers, constantly scanning the web for new e-mail addresses for sending crap to.  What alternatives do you have communicating your e-mail address on the web, without handing it over to spammers framed in gold?</p>
<h2>Content information as an image</h2>
<p>Spammers are lazy. If it takes too much effort to extract an e-mail they will skip it, because there are millions more waiting. Easiest way to protect your e-mail address from spammers is to put it in an image like below.</p>
<p><img class="alignnone" title="Contact information" src="http://litemedia.info/media/Default/Mint/contact.png" width="317" height="80" /></p>
<h3>Cons</h3>
<ul>
<li>You can't mark and copy the e-mail address into your e-mail client. You'll have to type it out manually.</li>
<li>The image can't be percieved by blind people or other kinds of screen readers.</li>
</ul>
<h2>Use scripts to display e-mail</h2>
<p>Since spambots very seldom execute client side scripts on a page it would be safe to create a placeholder on the page and replace the contents with the e-mail. You could do it with javascript, or Flash, Silverlight if you want to make it even harder to parse out it with a bot.</p>
<pre class="brush:html"><html>
 <body>
  <span id="email">[Email Placeholder]</span>
  <script type="text/javascript">
   document.getElementById('email').innerText = "spam@litemedia.se";
  </script>
 </body>
</html></pre>
<h3>Cons</h3>
<ul>
<li>Today, most browsers are able to run scripts and most companies allows their employees to run javascript, but this is not unobtrusive javascript. If you turn of javascript, content of the page will change.</li>
</ul>
<h2>Convert to HTML Literals</h2>
<p>Most of the bots are quite stupid. They download the html page and run a regex looking for e-mail addresses. If your e-mail address does not look like an e-mail address they will not find it. That's why you could convert every character in your e-mail address to ascii html literals.  Here's how to do the conversion in F#.</p>
<pre class="brush:fsharp">let encode (s : string) =
    s
    |> Seq.map (fun c -> System.String.Format("&#{0:d};", c |> int))
    |> System.String.Concat

> encode "spam@litemedia.se";;
val it : string =
  "&#115;&#112;&#97;&#109;&#64;&#108;&#105;&#116;&#101;&#109;&#101;&#100;&#105;&#97;&#46;&#115;&#101;"</pre>
<p>This is what my e-mail will look like after being rendered in a browser: spam@litemedia.se</p>
<h3>Cons</h3>
<ul>
<li>A really clever bot will look for the @ literal &#64; and parse out the rest of the e-mail address. That is however not very likely since it is too much work and there are millions of unprotected e-mails waiting.</li>
</ul>
