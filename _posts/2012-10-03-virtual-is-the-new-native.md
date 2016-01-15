---
layout: post
title: "Virtual is the new native"
description: I have stopped configuring my main machine for development, because after a while it gets bogged down with the tools. Instead I create specialized virtual machines for development that I can throw away when I'm done with them.
tags: virtual machine, software development, consultancy
date: 2012-10-03 04:14:15
assets: assets/posts/2012-10-03-virtual-is-the-new-native
image: 
---

About a month ago, I was getting a new development rig, since my previous one had run its course. That machine was in a very bad shape after 3 years of heavy development. Sure, I upgraded it to Windows 7 but that really didn't help much. My work days would consist mostly of typing a line of code and then waiting for it to appear on the screen. Compiling was a thing you did only when you where sure, you got it right.

So, I was getting a new machine, and I was not sure what to get. I've had a vision on how I would want my development to work for a number of years, but the hardware has never been good enough for me to achieve it.

## Virtual is the new Native

I'm a consultant and I work idealy with several different clients that have different needs. Some wants me to develop in Visual Studio 2008, others in Visual Studio 2010. Some have old databases, others have new. Worst of all, everyone has their own VPN solution to drive you mad. My current client wants my machine added to their domain.

Once you have worked for a set of different clients your Windows installation is totally screwed up and you need to format C: and start over. Uninstallation of software, network interfaces and switching domains back and forth just doesn't cut it. Windows becomes sluggish and unresponsive at times.

This is why I want to work in a virtual machine. I can do anything I'd like with that machine to customize my development experience for that client. Once the contract is up, I erase the machine or put it info a long term storage in case I need to go back for some maintenance. The major problem with this setup is that no machine to date has been able to deliver acceptable performance.

## A dream come true

Once I spotted the MacBook Retina I fell in love. Not like you think. It is not the screen that amazes me. I is not the processing power. It is not the form factor, the design, usability and not the OSX operating system. I fell in love with the 16 Gb RAM. There's the solution to my virtual vision.

I've never been a big fan of Apple. I got seriously burned by their iPhone 3G (first iPhone in Sweden) as they released software updates that made the whole phone completely useless. I don't like their business strategy, being closed and sue anyone that stands in their way. I don't like the one-man cult that the company is built upon. But when it comes down to ´getting shit done´ I'm not going to argue who's delivering the right experience.

So I got a MacBook Retina and I'm running Windows in Parallels. I didn't expect it to go smoothly. I was expecting bad performance, bad integration between host and guest OS'es. I was expecting to spend hours getting it to work the way I wanted it too, but I figured it would be worth it.

## Review

I love my setup. I'm running 3 Virtual Machines on my MBP.

* Windows 7 - Client Spec
* Windows 7 - Lab environment
* Linux

Each machine has designated 4 logical CPU cores and 4 Gb of RAM. As long as I don't run them all on the same time I notice no performance drawbacks. Working inside the Parallels Virtual Machine feels as fast as working nativly, which I've never been able to say about VMWare. In fact, I'm having the snappiest Visual Studio experience in my team right now, even though they're all running on native Windows.

With the Windows installations the Parallels Tools does a great job with integration between guest and host OS'es. You can copy paste, back and forth. Your host OS harddrive is mounted within the guest OS and it works great to connect several screens as you need when working with software development.

My Linux VM is a customized Arch Linux installation, which is not supported by the parallels tools, and it leaves some things to be wished for. I'm going to do a Ubuntu install and see if I can get it to work better. Yes, it works running customized Linux inside Parallels, but it is much more on par with what I was expecting from the start, and not an all enlightning experience.

## In closing

I've been using this development setup for a month now and is as happy as can be. I've had a few glitches with OSX that crashes when I give it a hard time, but that is only expected. I'm running Office 2011 on my host OS which is not a very good port of the Windows version. I'm dependent on Outlook in my everyday work, and it is passable but not great on the Mac. I'm really not that comfortable with the OSX operating system at all, but it makes a much more stable platform for running virtual machines than Windows could ever be.

For the record, my alternative to the MacBook Pro Retina would be getting a HP with same amount of RAM, running Linux as host OS and Windows for guests in VMWare. But that setup would require much more maintenance which I'm glad to get rid off.
