---
layout: post
title: "Communicate your e-mail"
description: In order to get contacted you need to provide means for contacting you. Best is to output your e-mail on your website, but that will also ensure you to get spam.
tags: spam prevention, e-mail
date: 2011-01-14 06:49:56
assets: assets/posts/2011-01-14-communicate-your-e-mail
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

For anyone to contact you they need to know how. That's why you should display your e-mail everywhere. Except ... you will get a lot of spam because [e-mail is not secure by default](/2011/01/07/email-is-dead.html "Email is dead").  The e-mail protocols are flawed and that is why there are spammers, constantly scanning the web for new e-mail addresses for sending crap to.  What alternatives do you have communicating your e-mail address on the web, without handing it over to spammers framed in gold?

## Content information as an image

Spammers are lazy. If it takes too much effort to extract an e-mail they will skip it, because there are millions more waiting. Easiest way to protect your e-mail address from spammers is to put it in an image like below.

![contact details](/assets/posts/2011-01-14-communicate-your-e-mail/contact.png)

### Cons

* You can't mark and copy the e-mail address into your e-mail client. You'll have to type it out manually.
* The image can't be percieved by blind people or other kinds of screen readers.

## Use scripts to display e-mail

Since spambots very seldom execute client side scripts on a page it would be safe to create a placeholder on the page and replace the contents with the e-mail. You could do it with javascript, or Flash, Silverlight if you want to make it even harder to parse out it with a bot.

{% gist miklund/58e74c10d022327776d5 document.html %}

### Cons

* Today, most browsers are able to run scripts and most companies allows their employees to run javascript, but this is not unobtrusive javascript. If you turn of javascript, content of the page will change.

## Convert to HTML Literals

Most of the bots are quite stupid. They download the html page and run a regex looking for e-mail addresses. If your e-mail address does not look like an e-mail address they will not find it. That's why you could convert every character in your e-mail address to ascii html literals.  Here's how to do the conversion in F#.

{% gist miklund/58e74c10d022327776d5 encode.fs %}

This is what my e-mail will look like after being rendered in a browser: spam@litemedia.se

### Cons

* A really clever bot will look for the @ literal `&#64;` and parse out the rest of the e-mail address. That is however not very likely since it is too much work and there are millions of unprotected e-mails waiting.

