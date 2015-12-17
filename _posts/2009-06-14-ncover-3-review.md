---
layout: post
title: "NCover 3 - Review"
description:
date: 2009-06-14 15:39:20
assets: assets/posts/2009-06-14-ncover-3-review
image: 
---

<p>I've promised to review this software that I've been using intensly for the last month. So, here goes.</p>
<h2>NCover - What is it?</h2>
<p>This is a tool to help you as a developer to see what code your tests went through. It will help you to write better tests that aims to be more specific, and it will help you increase your <a href="http://en.wikipedia.org/wiki/Code_coverage">code coverage</a>. It is also useful for managers to keep track on what parts of the application is covered by tests.  I think this screenshot pretty much says it all.</p>
<p><img class="alignnone size-full wp-image-460" style="margin-right: 100%;" title="ncover" src="http://litemedia.info/media/Default/Mint/ncover.png" alt="ncover" width="540" height="327" /></p>
<h2>The cool things</h2>
<ul>
<li>It is obsessively fun to work with this tool. After writing a test, I can't wait to see how it affected my coverage.</li>
<li>You can see trends and easily spot where you loose coverage. (also a lot of fun)</li>
<li> Visualization is great, and being able to see how many times a certain code line was run, helps you find the "trunk" of your programs execution tree.</li>
<li>The architecture of NCover with the analysis tool as a command line executable makes it easy to integrate with other tools (CruiseControl.NET).</li>
<li>Hooking up the IIS process running the analysis engine on my acceptance tests, totally blew my mind! Awesome!</li>
</ul>
<h2>...and things that could be better...</h2>
<ul>
<li>It's not exactly plug-and-play for the beginner. It's rather "read-documentation-and-play".</li>
<li>Visual Studio integration could have been better. As far as I know the only VS integration is TestDriven.NET. Maybe the NCover team does not want to step on <a href="http://weblogs.asp.net/nunitaddin/">Jamie Cansdales</a> turf.</li>
</ul>
<h2>...and in comparison...</h2>
<p>I've been looking at the coverage tool that comes with VSTF, and even if it got full integration with Visual Studio, it can't be compared to NCover. The visualization is not close enough and the only thing you can measure cover on (as far as I know) are MsTest unit tests. <strong>I would pick NCover above the VSTF coverage tool.</strong> NCover is a tool that every developer should invest in, because it is an investment that will pay off. If you're serious about testing, this tool cannot be ignored and should not, since it will increase your productivity by magnitudes.  <a href="http://www.ncover.com">Download a trial today!</a></p>
