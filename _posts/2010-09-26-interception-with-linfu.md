---
layout: post
title: "Interception with LinFu"
description:
date: 2010-09-26 15:03:08
assets: assets/posts/2010-09-26-interception-with-linfu
image: 
---

I have previously showed you how you can do interception with both [Castle DynamicProxy](/2010/09/21/lazy-loading-property-with-castle-dynamicproxy2.html "Lazy loading property with castle DynamicProxy 2") and with [Unity](/2010/09/23/interception-with-unity.html "Interception with Unity"). Now it is time to do the same with LinFu, which is suprisingly easy if you have done it with the previous two.

## Implement the IInvokeWrapper

There are several ways for interception with LinFu but I like the InvokeWrapper, because it's so easy to use. Just implement the LinFu.AOP.Interfaces.IInvokeWrapper.

{% gist miklund/0d12e3b6f1c6f52ad8ff MyInvokeWrapper.cs %}

Now that's quite self explanatory.

## Create a new ProxyFactory and intercept away

Now all you need to do to get your proxy class is the following.

{% gist miklund/0d12e3b6f1c6f52ad8ff Example.cs %}

Go [here for a full example](https://bitbucket.org/bokmal/litemedia.bookstore.linfu "LiteMedia.BookStore.LinFu at BitBucket repository") , or [download as a zip archive](/assets/posts/2010-09-26-interception-with-linfu/b79e9f83af1b.zip).
