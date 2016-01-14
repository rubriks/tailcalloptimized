---
layout: post
title: "There are too many active security negotiations or secure conversations at the service."
description: When you have screwed up with you WCF solution you might run into this problem. Here's how to debug it and find the problem in your code.
tags: troubleshooting, WCF
date: 2010-11-16 18:06:41
assets: assets/posts/2010-11-16-there-are-too-many-active-security-negotiations-or-secure-conversations-at-the-service
image: 
---

I was fighting an error today. It might show itself as

* There are too many active security negotiations or secure conversations at the service.
* The operation has timed out
* SecurityNegotiationException

## Conditions for making it happen

1. In WCF (Windows Communication Foundation)
2. Your clients open and close connections to the server without calling any method
3. You protect your service with some kind of security
4. You have at least 128 security negotiations in 2 minutes time

## Why does it happen?

There is a [bug #499859](https://connect.microsoft.com/VisualStudio/feedback/ViewFeedback.aspx?FeedbackID=499859&wa=wsignin1.0) that WCF does not remove a security session from the list of pending sessions when a client opens and closes a connection without calling any operations. The is room for 128 security session in the pending sessions queue and a security session times out in 2 minutes.

## Possible fixes

I've come up with the following solutions.

> Best solution would be to make your code stop open/close connections without calling any operations.

### Increase the pending sessions queue length

If you can't fix the problem with open/closing connections you could make the problem less critical by increasing the pending sessions queue length. This you do by creating a custom binding.

{% gist miklund/3111d8c36207923b68cd customBinding.xml %}

Then you refer to this custom binding from your endpoint like this.

{% gist miklund/3111d8c36207923b68cd endpoint.xml %}

Hope this will help someone along the way. My main inspiration was [this forum thread](http://social.msdn.microsoft.com/Forums/en-US/wcf/thread/a8f82f1d-e824-474e-84ef-b5e9ba7eca18).
