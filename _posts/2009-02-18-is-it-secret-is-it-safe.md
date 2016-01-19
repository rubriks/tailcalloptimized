---
layout: post
title: "Is it secret? Is it safe?"
description: You should make sure that your data always is protected. You can do this by encrypting your harddrive using a tool like TrueCrypt.
tags: truecrypt, encrypt
date: 2009-02-18 06:22:22
assets: assets/posts/2009-02-18-is-it-secret-is-it-safe
image: 
author: 
    name: Mikael Lundin
    email: hello@mikaellundin.name 
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund                    
---

![Gandalf, the one ring](/assets/posts/2009-02-18-is-it-secret-is-it-safe/gandalf4.jpg)

Many developers walk around every day with customers code in their laptops. The moment your code leaves the network (or building) where it is secure you put it at risk. A fun anecdote is that before release of the movie "Fellowship of the ring" one of the producers traveled with the most recent copy of the movie from New Zealand to London  for a last review before gold print. In London he nearly got mugged and had to run the last few blocks to Peter Jacksons home.  If he had gotten mugged, the movie had been released on the Internet before the premiere. That would have been a total disaster for both the production team and the economically for the company.  Every day developers are walking around with source in their pockets. What if they got mugged on the street? What if the source to that banking application found its way out on the Internet? Not only have your customer paid for that code, but they now also got a major security problem on their hands.  The solution is to encrypt all source code on your laptop. The best tool I've found for this is [TrueCrypt](http://www.truecrypt.org/). With this you can define a virtual encrypted hard drive or you may encrypt a whole partition.  Working from this encrypted drive is a bit slower than working from an unencrypted drive, but I've had no other problems with it, and I've been doing it for over a year. As a collegue of mine would say, this is still not secure. Given an amount of knowledge and an amount of time (and processing power), you may brute force this. But then again, if you have those kind of resources, you would more likely try to break into the repository and get the latest version.
