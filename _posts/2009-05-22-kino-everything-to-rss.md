---
layout: post
title: "Kino - Everything to RSS"
description:
date: 2009-05-22 22:00:35
assets: assets/posts/2009-05-22-kino-everything-to-rss
image: 
---

I have a file sharing service up and running for my friends. It is nothing fancier than a windows share with a web interface tied to it. When I would like to share a new file, I just drop it in the shared directory and it will be available to everyone that has login credentials to that share. Cool and easy, works like a charm. - Almost.  How should my friends know that I've dropped a new file or directory into the share? Of course I could send them an e-mail, but that does not seem very convenient. They would get spammed and I would have to do manual labour.  From the title you've already guessed that I would use RSS. Let's write an application that would monitor the share and publish any additional files as items in an RSS feed. This would only require my friends to subscribe to an RSS channel, if they're interested in what's new.

## The solution

In the following articles I will discuss how this problem was solved. We will take a detailed look on the source code and how it was implemented. You have the following articles looking forward to.

* [Part 1: Design and architecture](/2009/05/24/kino-design-and-architecture.html)
* [Part 2: Dependency injection with Unity and XML configuration](/2009/05/25/part-2-dependency-injection-with-unity-and-xml-configuration.html)
* [Part 3: Structured unit testing](/2009/05/26/part-3-structured-unit-testing.html)
* [Part 4: Keep yourself covered with NCover](/2009/05/27/part-4-keep-yourself-covered-with-ncover.html)
* [Part 5: Easy error handling with ELMAH](/2009/05/28/part-5-easy-error-handling-with-elmah.html)

## Get started with the source

You may of course [download the source right now](/assets/posts/2009-05-22-kino-everything-to-rss/kino_2009-05-21_1.zip), and start playing with it. Go to the [download page](/kino/) and follow the instructions there to get you started.
