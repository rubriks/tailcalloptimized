---
layout: migratedpost
title: "Zune software is not launched. Retry after making sure that Zune software is launched"
description:
date: 2011-04-01 09:58:32
assets: assets/posts/2011-04-01-zune-software-is-not-launched-retry-after-making-sure-that-zune-software-is-launched
image: 
---

<p>I was getting started with some WP7 development today, but already on my first Compile/Run i ran into this error message.<em> "Zune software is not launched. Retry after making sure that Zune software is launched."</em> After some googling I found out that the default target after installing Zune with a real phone would be to run the project on the phone. Not interesting for me, while in this early stages of development. I want to run my project in the emulator.  Some more googling and I found out that there's an option in the "Standard toolbar" where you can choose target. Not very obvious to me as <a href="http://mint.litemedia.se/2011/03/23/56-useless-buttons-in-your-ide/">I've removed all my toolbars</a> to free up some screen space. A prime example on how non-default GUI options could backfire.  Enabling the "Standard toolbar" and changing the run target, did the trick.</p>
<p><img class="alignnone size-full wp-image-1121" title="target" src="http://litemedia.info/media/Default/Mint/target.png" width="369" height="146" /></p>
