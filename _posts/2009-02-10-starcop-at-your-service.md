---
layout: migratedpost
title: "[*Star]Cop at your service"
description:
date: 2009-02-10 17:22:00
assets: assets/posts/2009-02-10-starcop-at-your-service
image: 
---

<p>Have you ever run a tool like <a href="http://code.msdn.microsoft.com/sourceanalysis">StyleCop</a> or <a href="http://msdn.microsoft.com/en-us/library/bb429476(VS.80).aspx">FxCop</a> on your source code and gotten something like this?</p>
<p><img height="152" width="473" alt="Stylecop 1000 errors" src="http://litemedia.info/media/Default/Mint/stylecop1.png" title="Stylecop 1000 errors" style="margin-right: 50px;" class="alignnone size-full wp-image-165" /></p>
<p>You are not alone my friend. What good will it do when the result is so overwhelming that you would never consider to sit down and do anything about it. The funny thing about just StyleCop is that it stops looking for rule breaking after about 1000 warnings, because it knows that you will give up.</p>
<blockquote><strong>That means, if you fix 100 of these you still have 1000 more to go.</strong></blockquote>
<p>The point of a static analysis tool is not that you will fix every error the tool might find, but that it will help you to consider what kind of rules you find important. If you don't care about the ordering of using directives, you may choose to turn of that validation. Then you have made a decision of what does not matter to you.</p>
<blockquote><strong>The most important feature is not massive amount of validation rules, but the ability to make you choose, what validation rule you find important to enforce.</strong></blockquote>
<p>If you combine the static analysis like FxCop and StyleCop with contineous integration, you might enforce a certain quality of coding on a whole team. You start slow by enforcing the most basic of programming rules and later on you might tighten it up when the developers learn to fix the big mistakes.</p>
<blockquote><strong>Most of these tools let you write your own custom validation rules, which could prove very useful.</strong></blockquote>
<p>Last but not least is the <a href="http://www.ndepend.com/">NDepend</a> which is the tool of tools for code analysis. This will let you track down <a href="http://en.wikipedia.org/wiki/Cyclomatic_complexity">cyclomatic</a><a href="http://en.wikipedia.org/wiki/Cyclomatic_complexity"> complexities</a>, setup watchers for different queries you apply on the code base like <em>"no public method should reference DbHandler directly"</em>. This costs a small amount for any IT company and you should not hesitate to support this project now.</p>
