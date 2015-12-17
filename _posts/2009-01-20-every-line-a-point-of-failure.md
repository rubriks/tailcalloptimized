---
layout: post
title: "Every line, a point of failure"
description:
date: 2009-01-20 06:14:58
assets: assets/posts/2009-01-20-every-line-a-point-of-failure
image: 
---

No matter how much I love to write code, there is nothing as satisfactory as removing code. Perfection is recieved when there is nothing more to take away.

Many developers I know wants to write code and is very reluctant to removing code. Even when they're supposed to update or change the behaviour of existing code, they comment it out and leave the old version in case it will be needed.
<h2>Obsolete code is dangerous</h2>
Leaving commented code in the code base is just clutter. I don't know if they leave it there as a backup or a substitute for version control, but I can't see any point in it.

In addition to just cluttering the code base, the old code might give a new developer wrong ideas about the functionality.  Instead of trusting the current code he will be given an alternative. "Why did the original developer leave that old stuff here? Must mean that it's important."

The worst kind is obsolete code that's not intended to run.  Let's say there is one case in an else-if that is not needed anymore, but you leave it there because what harm could it do?

Remember that every line of code is a point of failure in your system. Every line has a potential of throwing an exception, and fewer the lines, the more stable your system will become.

I read in <a href="http://www.amazon.com/Pragmatic-Programmer-Journeyman-Master/dp/020161622X">Pragmatic Programmer</a> that writing code is like tendering a garden. You add flowers, and trees; you trim the grass. Just don't forget to remove the weeds.
