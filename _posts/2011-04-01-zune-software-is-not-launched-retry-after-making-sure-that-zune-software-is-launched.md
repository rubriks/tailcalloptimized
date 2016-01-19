---
layout: post
title: "Zune software is not launched. Retry after making sure that Zune software is launched"
description: Dealing with the problem of Zune not starting when doing Windows Phone 7 development.
tags: WP7, phone development, emulation
date: 2011-04-01 09:58:32
assets: assets/posts/2011-04-01-zune-software-is-not-launched-retry-after-making-sure-that-zune-software-is-launched
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

I was getting started with some WP7 development today, but already on my first Compile/Run i ran into this error message. _"Zune software is not launched. Retry after making sure that Zune software is launched."_ After some googling I found out that the default target after installing Zune with a real phone would be to run the project on the phone. Not interesting for me, while in this early stages of development. I want to run my project in the emulator.  Some more googling and I found out that there's an option in the "Standard toolbar" where you can choose target. Not very obvious to me as [I've removed all my toolbars](/2011/03/23/56-useless-buttons-in-your-ide.html "56 useless buttons in your ide") to free up some screen space. A prime example on how non-default GUI options could backfire.  Enabling the "Standard toolbar" and changing the run target, did the trick.

![select windows phone 7 device as target](/assets/posts/2011-04-01-zune-software-is-not-launched-retry-after-making-sure-that-zune-software-is-launched/target.png)
