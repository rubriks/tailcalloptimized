---
layout: post
title: "Windows Home Server"
description: I bought a Windows Home Server from Fujitsu and this is my review.
tags: home server, windows server 2003
date: 2009-02-07 07:17:00
assets: assets/posts/2009-02-06-windows-home-server
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

![Fujitsu-Siemens 2205-WHS](/assets/posts/2009-02-06-windows-home-server/405637.jpg)

So I finally got around and bought me a [Fujitsu-Siemens Scaleo Home Server 2205](http://www.fujitsu-siemens.lu/home/products/home_server/scaleo_homeserver.html). It was delivered with 2x 1TB disks and since then I've plugged in another 500 GB for storage and 750 GB for backups. I've become a bit paranoid since my Lacie Big Disk failed on me.  The server looks pretty much like a suitcase and it runs real quiet. Not quiet enough for having under your desk, but sometimes when I open my closet, I wonder if it's still running.  Installation was pretty much a 1 click install that took under an hour, and it was very easy to get started with the server. Mounting a new drive took about 5 minutes and there were no need for a screwdriver. Even though I thought the price tag a bit high, I am a very pleased customer.  What will I use my home server for?

* Daily backups - My laptop is getting old and I don't expect it to survive the daily travels for long. **When** the hard drive fails, I want to be able to replace it and just keep it running until it is time to buy a new laptop.

* Centralized storage - It is so easy just filling your computer with junk. Now I have a centralized storage facility where I can dump all the extra stuff and free some space on my working machine.

* Source repository - I've needed a backed up repository for my source for a long time. Local file system based repository just doesn't cut it anymore. I need the safety of backups.

* Continuous integration - I will install [CC.NET](http://confluence.public.thoughtworks.org/display/CCNET/Welcome+to+CruiseControl.NET) on the server to make sure that all of my source in the repository compiles and that my tests runs green.

* Acceptance testing - I will use my server to test out Mint, just to fix "works on my machine" related bugs. Hopefully I will be able to automate deployment directly from CC.NET. We'll see how that plays out.

What would you use a home server for?
