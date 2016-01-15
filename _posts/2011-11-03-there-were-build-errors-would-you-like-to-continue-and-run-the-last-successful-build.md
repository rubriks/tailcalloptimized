---
layout: post
title: "There were build errors. Would you like to continue and run the last successful build?"
description: A short guide to removing the irritating build message that appears when you try to run a project though you got build errors. Let's remove that question you never say Yes to.
tags: Visual Studio
date: 2011-11-03 16:58:22
assets: assets/posts/2011-11-03-there-were-build-errors-would-you-like-to-continue-and-run-the-last-successful-build
image: 
---

![There were build errors. Would you like to continue and run the last successful build?](/assets/posts/2011-11-03-there-were-build-errors-would-you-like-to-continue-and-run-the-last-successful-build/dialog.png "Visual Studio error dialog")

> No.  
> Let me say that again.  
> No.

I can't believe how many times I've pushed "No" on this dialog. I really can't remember any time that I've pressed 'Yes'. Why is it even there? Is there somone that chooses to press 'Yes' on in this dialog? If you've changed something in the source code, and try to start the site in Debug mode, wouldn't you be interested in the changes? Wouldn't the ability to test the changes be the sole reason for you to start this site in Debug mode?

I learned recently that you can turn this dialog off, globally in Visual Studio, and not just the solution that you're in.

* Go to menu Tools/Options
* Project and Solutions / Build and Run
* On Run, when build or deployment errors occur  
  => Select _Do not launch_

![Visual Studio options dialog](/assets/posts/2011-11-03-there-were-build-errors-would-you-like-to-continue-and-run-the-last-successful-build/options_dialog.png)

Away with you, evil stupid dialog.
