---
layout: migratedpost
title: "There were build errors. Would you like to continue and run the last successful build?"
description:
date: 2011-11-03 16:58:22
assets: assets/posts/2011-11-03-there-were-build-errors.-would-you-like-to-continue-and-run-the-last-successful-build
image: 
---

<p><img src="http://litemedia.info/media/Default/BlogPost/blog/dialog.png" alt="Visual Studio error dialog" width="454" height="169" /></p>
<p>No.</p>
<p>Let me say that again.</p>
<p>No.</p>
<p>I can't believe how many times I've pushed "No" on this dialog. I really can't remember any time that I've pressed 'Yes'. Why is it even there? Is there somone that chooses to press 'Yes' on in this dialog? If you've changed something in the source code, and try to start the site in Debug mode, wouldn't you be interested in the changes? Wouldn't the ability to test the changes be the sole reason for you to start this site in Debug mode?</p>
<p>I learned recently that you can turn this dialog off, globally in Visual Studio, and not just the solution that you're in.</p>
<ul>
<li>Go to menu Tools/Options</li>
<li>Project and Solutions / Build and Run</li>
<li>On Run, when build or deployment errors occur<br />=> Select Do not launch </li>
</ul>
<p><img src="http://litemedia.info/media/Default/BlogPost/blog/options_dialog.png" alt="Visual studio options dialog" width="757" height="440" /></p>
<p>Away with you, evil stupid dialog.</p>
