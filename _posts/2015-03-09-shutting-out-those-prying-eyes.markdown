---
layout: post
title: "Shutting out those prying eyes"
description: How I got spooked by Google and Facebook and learned to shut out those prying eyes.
date: 2015-03-09 15:47:47
tags: social media, google, facebook
assets: assets/posts/2015-03-09-shutting-out-those-prying-eyes
image: assets/posts/2015-03-09-shutting-out-those-prying-eyes/title.png
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

Are you using GMail? What if google were to inject your e-mails with advertisement. Would you be ok with that?

Probably not. And they know that.

However, they are listening to everything you do on the internet in order to sneak in advertisement at the least obtrusive times, so you won't question what or why.

Don't be evil, eh?

![False sense of security, Bennett](/assets/posts/2015-03-09-shutting-out-those-prying-eyes/privacy.jpg)

## A rude awakening

I have a developer friend on Skype that I chat with over the work day. We share joy and grief, good or bad, and programming headaches with each others.

One day he asked me about [DIBS](http://www.dibs.se/). I've done a lot of integrations over the years, so it's not strange that I need to google it to find out if I recognize it.

The day after I find DIBS advertisement on my Facebook wall. How did they find out?

## They know everything about me

As a developer I've added Facebook like and share functionality to a lot of websites. It usually includes running a script on your site, calling another script at Facebook which injects some functionality on your site.

In the end it will let you like pages on Facebook or share the page on your Facebook wall.

![You don't even have to click. They already know where you've been](/assets/posts/2015-03-09-shutting-out-those-prying-eyes/like.jpg)

What Facebook knows is that most people don't logout from Facebook in their browsers. They have a long term authenticated session in their browser. This means when a web browser makes a request to facebook.com it does that as your authenticated user. Through the Like button, Facebook will be able to determine that you visited this website, and use that information to target advertisement.

![The browser unwittingly recording everywhere you go](/assets/posts/2015-03-09-shutting-out-those-prying-eyes/dibs.png)

## Google menace

Google has mastered this to perfection.

They have effectivly made their Google Analytics service almost indispensible. As a web developer you add it to each website you develop and it gives you complete insights into users' behavior on that site.

It also calls home to google saying, [Mikael Lundin](http://mikaellundin.name) visited this site.

In order to do that it needs my authenticated session in the browser. Google has made sure to create services that I can't live (work) without.

* Gmail
* Google Hangout
* Google Analytics
* Google Maps (why do I need to login again!?)
* Google Plus (okay, I can live without this one)

An even more ingenious plan from Google is to create a fantastic browser (all for the good of the web, eh!?) and then have you login to it with your Google account.

Now they can track every step on the web. Oh, no they don't need the browser to call home. You will do that with your authenticated session on every website that uses Google Analytics, or features a G+ button.

Great job!

## Why does privacy matter?

Much more cleverer people than I [have answered this question](http://www.ted.com/talks/glenn_greenwald_why_privacy_matters).

For me, privacy infringements is where democracy starts to break down. When you know peoples thoughts you can use that against them. It can be used to create compelling adverts, but it can also be used to steer public opinion and to shape elections.

I am me, and I have a public interface, what I let you know. I don't dislike snooping because I have something to hide. It is my right to privacy that makes me an individual.

## What can you do?

![Use private browsing](/assets/posts/2015-03-09-shutting-out-those-prying-eyes/cookies.jpg)

*Log out.*

This will stop Facebook from tracking your movement on the Internet. When you want to check Facebook you can do it in a private browser window.

You don't need to quit using Facebook. Just be aware that Facebook is listening. When you send a private message to a friend, it is only between you, her and Facebook.

*Don't use Chrome.*

The Chrome browser does not serve you, it serves Google's best interest. Instead, use an open source browser like Firefox where the code of the browser is shared by people that care about privacy.

*Don't use Gmail.*

Oh gosh. Gmail is the best e-mail service out there. I love the spam filter. It has made my e-mail experience bareable. But every e-mail you send and recieve is shared with Google and it is used to create a complete social profile against you.

You can encrypt your e-mails. You do this by sharing a public key with all your friends with which they can send you encrypted e-mails. All Google can read from that is the envelope with the subject line, the sender and recipient.... and from that they would pretty much figure out the rest.

*No, don't use Gmail.*

When you send an e-mail it is not only shared by you, your friend and Google, but also the rest of the Internet that the e-mail passes by. It should really be renamed "e-postcard" to reflect on this particular side effect.

Get a certificate for your e-mail address like [this one from Globalsign](https://www.globalsign.com/en/secure-email/ "Secure E-mail"). It will let others encrypt e-mail they send to you. It will let you sign your e-mail to ensure others that no one has modified the e-mail that you sent. This is important.

I have personally signed up for [Amazon Workmail](http://aws.amazon.com/workmail/) in order to get off Gmail. Why is this better? At Workmail all data is encrypted and you hold the encryption keys. Amazon can't read your e-mail, and they have no self interest in doing so. They only want to sell you a data center and cloud computing.

*Don't google.*

Google has become such an integrated part of our society that we now use it as a verb. 'Google it!'

* Google
* To Google
* Have Googled
* Going to Google
* Googling
* Googled
* A Googler

You write everything that comes to mind directly into Google and as long as you're authenticated they keep track on it. They will know everything you think about and with some clever machine learning they should also be able to tell what you're going to think about next.

Instead, use a great alternative like DuckDuckGo. They promise [not track you or your searches](https://duckduckgo.com/about "About DuckDuckGo Search Engine"). It's easy to set as default in your browser, both on Safari for Mac and on iOS.

---

This is not news. There is no new information in this blog post that we didn't know about before. It's just that privacy has become a growing problem for each year, and now I'm starting to feel the prying eyes behind my shoulders.

Little did we know that Richard Stallman was right all along.
