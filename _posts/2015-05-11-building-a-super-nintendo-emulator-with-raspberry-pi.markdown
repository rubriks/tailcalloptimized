---
layout: post
title: "Building a Super Nintendo Emulator with Raspberry Pi"
description: How I turned an RPi1 into a SNES emulator with Retropi
date: 2015-05-11 21:12:21
tags: gaming, rpi, retropi
assets: assets/posts/2015-05-11-building-a-super-nintendo-emulator-with-raspberry-pi
image: assets/posts/2015-05-11-building-a-super-nintendo-emulator-with-raspberry-pi/title.png
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

I'm an old gamer.

The first game I can remember playing is [Winter Games](http://en.wikipedia.org/wiki/Winter_Games) on an Amiga 500 at my father's office. I was five years old and it was magical. I fell in love with computers there and then.

![](/assets/posts/2015-05-11-building-a-super-nintendo-emulator-with-raspberry-pi/C64_Winter_Games.png)

Now 28 years later, having a 4 yo. son of my own, I want him to experience the same magical conquest of the technology landscape as I did. I wonder with all the iPads and MacBooks in our lives, if it would be the same. Is the magic with 16-bits is still there?

## Retropi

I bought a RPi Model B, 2 years ago because .. I don't really know. It was a cool thing to have and I imagined that I could turn it into a build screen or something. Two years later I still hadn't done anything useful with it and version 2 has come out.

![](/assets/posts/2015-05-11-building-a-super-nintendo-emulator-with-raspberry-pi/raspberrypi.jpg)

Then it hit me that my son is old enough to experience Super Mario and enjoy it. I made some research and found the [Retropi project](http://blog.petrockblock.com/retropie/), which makes it easy to turn a Raspberry Pi into a retro gaming console.

You download an image from their website, write it on an SD card and push it onto your RPi and BOOM! you have a working retro gaming machine. Those parts are quite trivial, but my 4 yo. would not be able to control that with a keyboard.

![](/assets/posts/2015-05-11-building-a-super-nintendo-emulator-with-raspberry-pi/controller.jpg)
![](/assets/posts/2015-05-11-building-a-super-nintendo-emulator-with-raspberry-pi/retrolink.jpg)

So I bought a classic famicom super nintendo controller, together with a USB bridge called retrolink in order to connect it to the raspberry pi. The problem was that I couldn't configure the controller properly together with the retropi. It would not recognize all the buttons on the controller.

Seemed like there was some kind of limitation in the kernel, and I found a brave soul who [fixed the kernel](http://blog.petrockblock.com/forums/reply/89387/) and uploaded a new version so that you could patch your system. After that, the controller would work perfectly, and I ordered a second controller so that we could play the games together.

![](/assets/posts/2015-05-11-building-a-super-nintendo-emulator-with-raspberry-pi/supermario.jpg)

Only one small detail left. The retropi is bundled with lots of emulators, and I was only planning on using the SNES emulator. My son would easily get confused and get lost in all the emulators so I had to disable every other than SNES.

This was easily accomplished by commenting out unecessary emulators from /etc/emulationstation/es_systems.cfg. Now I have a console system that can be booted, controlled and turned off by my son, without much help from myself.

And yes, the magic is still there.

