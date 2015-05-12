---
layout: migratedpost
title: "Kino - Everything to RSS"
description:
date: 2009-05-22 22:00:35
assets: assets/posts/2009-05-22-kino-everything-to-rss
image: 
---

<p><img class="alignright size-full wp-image-329" style="float: right;" title="kino" src="http://litemedia.info/media/Default/Mint/kino.jpg" alt="kino" width="182" height="184" /><span style="font-weight: normal;">I have a file sharing service up and running for my friends. It is nothing fancier than a windows share with a web interface tied to it. When I would like to share a new file, I just drop it in the shared directory and it will be available to everyone that has login credentials to that share.</span> Cool and easy, works like a charm. - Almost.  How should my friends know that I've dropped a new file or directory into the share? Of course I could send them an e-mail, but that does not seem very convenient. They would get spammed and I would have to do manual labour.  From the title you've already guessed that I would use RSS. Let's write an application that would monitor the share and publish any additional files as items in an RSS feed. This would only require my friends to subscribe to an RSS channel, if they're interested in what's new.</p>
<h3>The solution</h3>
<p>In the following articles I will discuss how this problem was solved. We will take a detailed look on the source code and how it was implemented. You have the following articles looking forward to.</p>
<ul>
<li><a href="http://mint.litemedia.se/2009/05/24/kino-design-and-architecture/">Part 1: Design and architecture</a></li>
<li><a href="http://mint.litemedia.se/2009/05/25/part-2-dependency-injection-with-unity-and-xml-configuration/">Part 2: Dependency injection with Unity and XML configuration</a></li>
<li><a href="http://mint.litemedia.se/2009/05/26/part-3-structured-unit-testing/">Part 3: Structured unit testing</a></li>
<li><a href="http://mint.litemedia.se/2009/05/27/part-4-keep-yourself-covered-with-ncover/">Part 4: Keep yourself covered with NCover</a></li>
<li><a href="http://mint.litemedia.se/2009/05/28/part-5-easy-error-handling-with-elmah/">Part 5: Easy error handling with ELMAH</a></li>
</ul>
<h3>Get started with the source</h3>
<p>You may of course <a href="http://mint.litemedia.se/wp-content/uploads/kino_2009-05-21_1.zip">download the source right now</a>, and start playing with it. Go to the <a href="http://mint.litemedia.se/kino/">download page</a> and follow the instructions there to get you started.</p>
