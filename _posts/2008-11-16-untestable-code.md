---
layout: post
title: "Untestable code"
description:
date: 2008-11-16 08:14:38
assets: assets/posts/2008-11-16-untestable-code
image: 
---

<p><img height="260" width="300" src="http://litemedia.info/media/Default/Mint/sw_testing-300x260.jpg" title="Testing" class="left size-medium wp-image-73" />This friday we had a discussion about unit tests and what is considered to be untestable code. I claimed that some code is untestable and met heavy resistance.  One of the blogs I read just threw me a good example of when unit tests are useless.</p>
<ul>
<li><a href="http://ayende.com/Blog/archive/2008/11/16/correct-event-handling.aspx" title="Ayende Rahien - Correct event handling">Ayende Rahien on correct event handling</a></li>
</ul>
<p>Would you find that bug using unit testing? I would say not, because you would have to start up a lot of threads to encounter the bug. Maybe if I knew that this was a place where many threads would meet and operate simultaneously, but I have to admit that most of the time I forget about thread safety and would not write unit tests for it, if it wasn't obvious.  Would you find that bug using integration testing? (testing how parts of the system interact with other parts of the system) If one of these parts fire up a lot of threads that will execute on that code you might be able to find the bug through integration testing, but threading in an integration testing environment and threading in a real user driven environment are two different things. Where a computer fires events, code will be run in a neat order, compared to when a user fire events (that start threads) which would be much more chaotic.  Would you find this bug in system testing? Probably. That depends on if one user is enough to trigger the bug or if you need to have several users to get the amount of threads for the bug to appear.  Would this appear in production where you have 100 people running your software at the same time? Yep.  Back to the discussion that we had this friday. Is there any untestable code? My answer is no. You can do excessive unit testing and actually test every possiblity there is, but is it wise? No.</p>
<ol>
<li>The cost of testing all code is so dramatic it would make your project manager choke.</li>
<li>For every test you write you specify that software that you're testing. Overspecification will make your tests break for every little change that you do to your SUT (system under test) and this will make test maintenance cost more in the long run than debugging legacy code (code without tests).</li>
</ol>
<p>All code is testable, but untestable code is not worth the cost. Multithreaded code is one scenario where you can't test every possibility. Another complex situation is when you're directly using a 3rd party library with bad design. (EPiServer) There are means to get around that too with proxy classes and what not, but we have to ask ourselves once again - is time spend on unit tests time won in debugging?</p>
