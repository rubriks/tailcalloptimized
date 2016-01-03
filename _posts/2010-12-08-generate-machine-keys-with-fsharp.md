---
layout: post
title: "Generate machine keys with F#"
description:
date: 2010-12-08 06:11:40
assets: assets/posts/2010-12-08-generate-machine-keys-with-fsharp
image: 
---

If you want to release software often, as scrum advises, you need to take special care about those releases. I had recently a problem where releasing changes to an ASP.NET website would cause it to generate new machine key and invalidating ViewState for all visitors that were using some sort of form on the website.  The solution to that is of course [specifying the machine key in web.config](http://http://msdn.microsoft.com/en-us/library/ff649308.aspx) to make sure that it doesn't change when the application pool refreshes.</p>

<script src="https://gist.github.com/miklund/014eba747ef326df3b6d.js?file=generate.fs"></script>

This is how I use F# to generate the keys.

<script src="https://gist.github.com/miklund/014eba747ef326df3b6d.js?file=example.fs"></script>

And the result is...

<script src="https://gist.github.com/miklund/014eba747ef326df3b6d.js?file=result.xml"></script>

Dump this in your web.config and you're good to go. Just don't forget to [encrypt the configuration file before deployment](/2010/05/19/encrypt-your-web-config-with-msbuild.html) to avoid the keys getting in the wrong hands.
