---
layout: post
title: "jQuery/Thickbox + Prototype/Scriptaculous = ?"
description: When you run jQuery and Thickbox and try to integrate this with Prototype and Scriptacolous you will run into problems. You can actually make sure they don't conflict. Here's how.
tags: jquery, thickbox, prototype, scriptaculous, conflict
date: 2009-03-17 06:19:54
assets: assets/posts/2009-03-17-jquery-thickbox-prototype-scriptaculous
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

So, I wanted to implement [jQuery](http://jquery.com/)/[Thickbox](http://jquery.com/demo/thickbox/) in an environment that already were using [Prototype](http://www.prototypejs.org/)/[Scriptaculous](http://script.aculo.us/). The problem you see here is that both jQuery and Prototype use the same $ syntax. Lucky me there's a solution to this problem.

```javascript
jQuery.noConflict();
```

This will let you use all jQuery functionality but with jQuery() instead of $(). So, to be able to use thickbox with this, you need to download the [uncompressed thickbox code](http://jquery.com/demo/thickbox/thickbox-code/thickbox.js), add the noConflict statement at the beginning, and then exchange all $() with jQuery().

Like this:

{% gist miklund/caabb4588463f5c285e4 Example1.js %}

Beware of regex and other constructs that also use $. Don't do replace-all in your thickbox.js, because it just won't work. Thickbox is a small framework and it will take you just a minute to manually go through it and replace all jQuery calls.
