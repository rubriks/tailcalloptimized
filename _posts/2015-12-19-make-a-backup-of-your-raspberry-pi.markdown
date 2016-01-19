---
layout: post
title: "Make a backup of your Raspberry Pi"
description: This is a quick guide to creating a backup of your Raspberry Pi on Mac OS X.
date: 2015-12-19 13:40:54
tags: osx, rpi, raspberry pi
assets: assets/posts/2015-12-19-make-a-backup-of-your-raspberry-pi
image: assets/posts/2015-12-19-make-a-backup-of-your-raspberry-pi/title.png
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

It's always these small menial tasks that you do once and a while that costs so much time, because you can't remember how to do it and you run into the same culprits time and again.

Here's how to make a backup of the SD card of a Raspberry Pi.

1. Make a clean shutdown of your Raspberry Pi.

    ```bash
    sudo /sbin/shutdown -h now
    ```

2. Take our the SD card and input it into your Mac. This will cause the Mac to mount any partitions it see as mountable.

3. List the partitions on your system.

    ```bash
    diskutil list
    ```

4. Find the mounted partitions and unmount them. (can't use the Eject functionality from Finder)

    ```bash
    diskutil unmount /dev/disk<X>s<Y>
    ```

_* Where <X> is drive number and <Y> is partition._

5. When all partitions are unmounted _(mind you, not ejected)_ run the following command to read the SD card and write it to disc.

    ```bash
    sudo dd bs=4m if=/dev/disk<X> | gzip > ~/backup.img.gz
    ```

6. After you're done you may eject the SD card with the following command.

    ```bash
    diskutil eject /dev/disk<X>
    ```

Now you're done and you may put the SD card back into your Raspberry Pi and boot it back up.
