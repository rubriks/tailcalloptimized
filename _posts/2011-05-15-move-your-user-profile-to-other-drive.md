---
layout: post
title: "Move your user profile to other drive"
description:
date: 2011-05-15 05:32:28
assets: assets/posts/2011-05-15-move-your-user-profile-to-other-drive
image: 
---

Windows has this great functionality that lets you move parts of your user profile to another drive.

![document properties](/assets/posts/2011-05-15-move-your-user-profile-to-other-drive/documents-properties1.png)

Crap, because it only moves the documents and not stuff like Application Data where most of my data is. Crap. And you know what? A lot of applications does not recognize that the documents folder has moved. Dubble crap.

## How to _really_ move your user profile

**If you're not comfortable working in the command prompt - don't try this. You will screw up your computer completely.** The trick is not to leave it to Windows for this low level stuff. Instead you should use a feature within NTFS - directory junction.  Consider why you want to do this. I have a small SSD as my primary hard drive that I run the system on. This was a great decision performance wise. My computer feels very fast because it runs on an SSD. The problem is that 80Gb is not a lot for both system files and user profile. That is why I have a slower, but much larger 1Tb, secondary hard drive (Western Digital Green Caviar) where I want to store my user profile. I've postponed this action for far too long and now I have no space left on my primary system drive.  A small side note on running SSD as your system drive: it's fast but dangerous. [Your SSD will fail](http://www.codinghorror.com/blog/2011/05/the-hot-crazy-solid-state-drive-scale.html), sooner or later, and much more often than a mechanical hard drive. That is the price for running a super performant system - you will fail and when you do - make sure that you can restore the system on a new hard drive with just a few clicks. Make sure that is a price you can pay. (continuous automatic backups - Windows Home Server or Synology)  Before you try this you should read other people experiences, because every situation is unique and this story alone will not help you.

* [Move user profile to another drive](http://lmgtfy.com/?q=move+user+profiles+to+another+drive)

### My story, how I did it

These instructions worked for me. If they completely screw up your file system, I take no responsibility. That is why your first step should be

1. Make a complete backup of your file system with some image tool. I recommend Norton Ghost. I have myself a daily image backup of my whole computer through Windows Home Server. That will work too.  Copy files to a backup drive will not help you if your file system is shredded to pieces by your failed attempts to create directory junctions. Consider yourself warned!  (also, you don't really have a backup until you've tried to restore it)

2. I've read a lot of problems with people trying to move their whole C:\Users directory. Don't do that! It is much easier to just move your profile, so limit the risk and go for that. Move several profiles if you have to.

3. Your profile contains directory junctions already. For example, your [Profile]\Documents\My Music points to  [Profile]\Music. I've not found a way to move these, so they will have to be recreated at the target location. Get a listing of all your current junctions and print it out[^1]

    ```
    dir C:\Users\[profile] /al /s
    ```

4. Restart your computer with the windows 7 install cd/dvd. Choose to repair an existing windows installation and choose command prompt as an option.  Notice that your first hard drive is not neccessarily C: in here. For me it was E: and my secondary hard drive was D:.  I will name these [source drive] and [target drive] from here on.

5. *Use robocopy to copy the profile* from one drive to another. You will read on the internet that you may just create a new user in windows, login as that and move your other user profile with that user. Don't do that! You will screw up user permissions and sometimes not get all hidden files and folders.  Here's the command that worked well for me. (you may have to create target folder first)
    
    ```
    robocopy /MIR /XJ /B /R:1 /W1 "[source drive]:\Users\[profile] " "[target drive]:\Users\[profile]"
    ```

6. Copying the profile took me 1,5 hours. The result of copy should not give you any failures. If it did, abort right now and find out why before you continue.  
    ![robocopy result](/assets/posts/2011-05-15-move-your-user-profile-to-other-drive/WP_000063-1024x768.jpg)

7. Now that have a copy of your user profile on the target drive you need to recreate those junctions that did not copy over. If you run `dir "[target drive]:\Users\[profile]" /al /s` you will notice that you don't have any junctions in the target. Damn! Lucky you that you have that printout of what it looked like before.

    ```
    mklink /J "[target drive]:\Users\[profile]\Documents\My Music" "[target drive]:\Users\[profile]\Music"
    mklink /J "[target drive]:\Users\[profile]\Documents\My Pictures" "[target drive]:\Users\[profile]\Pictures"
    mklink /J "[target drive]:\Users\[profile]\Documents\My Videos" "[target drive]:\Users\[profile]\Videos"
    ```

    ... and so on

8. Cool, now you can remove your old profile. Say what? Yes! Just do it. You don't need it anymore.

    ```
    rmdir /S /Q "[source drive]:\Users\[profile]"
    ```

9. Replace that old user profile with a junction from [source drive] to [target drive] like this.

    ```
    mklink /J "[source drive]:\Users\[profile]"  "[target drive]:\Users\[profile"
    ```

    Verify by

    ```
    dir "[source drive]:\Users\[profile]"
    ```

    You should see the files that is now on [target drive].

Reboot and mission accomplished.

---
**Footnotes**

[^1]: On real paper - you will thank me later

