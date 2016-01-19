---
layout: post
title: "Orchard: Alternative content on start page"
description: How to modify the start page to add alternative content compared to all other pages on the site.
tags: Orchard, CMS, content management
date: 2011-06-16 15:04:15
assets: assets/posts/2011-06-16-orchard-alternative-content-on-homepage
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

It took me a lot of time to figure out how to tell Orchard to render something different on the start page. One way is to define a layout that is specific for the start page url.

![Orchard theme view folder](/assets/posts/2011-06-16-orchard-alternative-content-on-homepage/orchard_view_templates.png)

If you want to use placement.info to move things around or hide the title on start page you can match on the ~/ url.

{% gist miklund/c5941e91889d8690b228 placement.info.xml %}

This tells Orchard to display page title in Content, unless the page has url ~/. Then you should not display it at all. Hope this will help someone else out there looking for an answer to this.
