---
layout: post
title: "StarCop at your service"
description: StarCop is a tool for validating the style of your code. This can be good when you're working in a team and you want everyone to write code with the same style.
tags: stylecop, code style, style guidelines
date: 2009-02-10 17:22:00
assets: assets/posts/2009-02-10-starcop-at-your-service
image: 
---

Have you ever run a tool like [StyleCop](http://code.msdn.microsoft.com/sourceanalysis) or [FxCop](http://msdn.microsoft.com/en-us/library/bb429476(VS.80).aspx) on your source code and gotten something like this?

![starcop ui](/assets/posts/2009-02-10-starcop-at-your-service/stylecop1.png)

You are not alone my friend. What good will it do when the result is so overwhelming that you would never consider to sit down and do anything about it. The funny thing about just StyleCop is that it stops looking for rule breaking after about 1000 warnings, because it knows that you will give up.

> That means, if you fix 100 of these you still have 1000 more to go.

The point of a static analysis tool is not that you will fix every error the tool might find, but that it will help you to consider what kind of rules you find important. If you don't care about the ordering of using directives, you may choose to turn of that validation. Then you have made a decision of what does not matter to you.

> The most important feature is not massive amount of validation rules, but the ability to make you choose, what validation rule you find important to enforce.

If you combine the static analysis like FxCop and StyleCop with contineous integration, you might enforce a certain quality of coding on a whole team. You start slow by enforcing the most basic of programming rules and later on you might tighten it up when the developers learn to fix the big mistakes.

> Most of these tools let you write your own custom validation rules, which could prove very useful.

Last but not least is the [NDepend](http://www.ndepend.com/) which is the tool of tools for code analysis. This will let you track down [cyclomatic complexities](http://en.wikipedia.org/wiki/Cyclomatic_complexity), setup watchers for different queries you apply on the code base like _"no public method should reference DbHandler directly"_. This costs a small amount for any IT company and you should not hesitate to support this project now.
