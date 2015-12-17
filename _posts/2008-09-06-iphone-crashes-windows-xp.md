---
layout: post
title: "IPhone crashes Windows XP"
description:
date: 2008-09-06 15:43:26
assets: assets/posts/2008-09-06-iphone-crashes-windows-xp
image: 
---

So I finally got around and bought an IPhone. I tried to get one on the release day here in Sweden, but it was a hopeless mission. Then the store was going to phone me when they got one, but I ended up ordering one on the Internet instead.

![iphone 3g](/assets/posts/2008-09-06-iphone-crashes-windows-xp/iphone.jpg)

So, now it is here, all shiny and cool. My hip-factor just went through the roof. ;) Seriously, it is an impressive piece of machinery, and I will enjoy getting to know it better. I've already hooked up my e-mail, calendar, twitter, msn and facebook to it, so what do I need a real computer for now anyways?  Then, the second time that I plugged it into my Acer Travelmate 3040, Windows died on me, showing me the <abbr title="Blue Screen of Death">BSoD</abbr>. Even that is quite an impressive task performed by this phone, since I've never seen a blue screen on this computer in its 1½ years lifespan.  After some google searches I found out that drivers for the IPhone conflicted with my HP printer or my Logitech Webcam. Lucky me, doesn't have a HP printer and no Logitech webcam either. Then it hit me, isn't that Acer Orbicam really a logitech cam underneath the hood? I was right and went on the task of uninstalling the Acer Orbicam drivers.

![acer orbicam](/assets/posts/2008-09-06-iphone-crashes-windows-xp/acer-orbicam.jpg)

How do you uninstall drivers in Windows XP? I still don't know. Just pressing uninstall in Device Manager wouldn't help. In my next reboot, my smart computer would find a new piece of hardware, a camera, and also find its appropriate drivers  - Acer Orbicam. I went out on the adventure of removing all the DLLs that were associated with the camera but they just resurrected after a reboot. I read some tip that if I did uninstall in safe mode, the driver would be gone forever, but that also turned out bogus.  Three hours later I gave up. You simply can't uninstall a driver in Windows XP if you still have the hardware connected. (not from my experience) However, the first thing that I read about this conflict came back into my head. I don't have a HP printer but I do have a Brother HL-5140 (great printer by the way). It was not connected, and the driver was inactive but I was inclined to try anything at this point and uninstalled the printer driver.  Viola! The IPhone connected to my computer without any blue screen! It made me all warm and fuzzy inside.

## More information about the problem

So, what happens when you connect your IPhone is that it will register itself as a camera/imaging device in Windows and this will conflict with a current driver and throw a blue screen of death with the [Windows Stop Message 0x0000007E](http://www.aumha.org/a/stop.php "Windows Stop Messages") The error message from windows "SYSTEM_THREAD_EXCEPTION_NOT_HANDLED" is quite useless in this case.   Most probably this is a conflict between your IPhone and your printer and it will only happen if you have images taken with your IPhone camera, in your camera roll. Try to remove all you images and see if Windows XP still crashes on you.  Now, uninstall all you printer drivers in the Device Manager (WinKey+BREAK). If you can't see any printer drivers they might just be inactive because you don't have your printer connected. You can make them visible if you follow this [tip](http://www.tech-recipes.com/windows_installation_tips504.htmli "How to uninstall hidden devices, drivers and services").  If your IPhone still crashes your computer, try to update any Logitech driver in the system. I did see some tip about it in a forum that helped some guys.

Good luck!
