---
layout: post
title: "Windows 7 installation hangs on Starting Windows"
description: You buy a new computer and that Windows 7 installation just crashes. It took me 8 hours to find the culprit but at the end, it turned out to be my own fault.
tags: windows 7, troubleshoot
date: 2010-02-26 20:33:30
assets: assets/posts/2010-02-26-windows-7-installation-hangs-on-starting-windows
image: 
---

![starting windows](/assets/posts/2010-02-26-windows-7-installation-hangs-on-starting-windows/startingwindows.jpg)

So, I had an unnerving experience trying to install Windows 7 the last couple of days. After the files where extracted from the dvd and the splash animation had run, the installation would hang, showing only the end of the splash animation with the frisky message "Starting Windows".  It took me a total of 8 hours to figure it out. Many of the tips you will find on the Internet tells you to

* Jank out all USB devices and disable USB in the BIOS if possible
* Make sure that 1397 is disabled in the BIOS
* Disconnect everything in the computer that is not needed for the installation, including expansion cards and extra hard drives.
* Update the bios with the latest version from your vendor
* Reset the bios and make sure that APCI is enabled

None of these did the the trick for me. What made the installation process hang was the second 2GB memory module that I've installed in my system. **By removing all memory modules except one, the installation could proceed.** There does not seem to be any silver bullet for solving this issue, and it does seem to be different for each and every failed installation. It would be nice to get some kind of error message to ease troubleshooting.  I wish you good luck if you have a similiar problem!
