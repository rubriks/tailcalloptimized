---
layout: post
title: "ASP.NET RadioButtons in an UL/LI list"
description: Having a RadioButton in a list is a classic ASP.NET WebForms problem. Here is my solution.
tags: WebForms, dynamic
date: 2010-11-26 18:23:00
assets: assets/posts/2010-11-26-aspnet-radiobutton-in-an-ul-li-list
image: 
---

When you would like to generate a list of radio buttons in ASP.NET you will run into a problem

* RadioButton and Repeater does not play well together
* RadioButtonList have very limited ways to control generated markup

## Introducing ULRadioButtonList

This is very inspired by [Scott Elikin's post Render RadioButtonList as an Unordered List UL](http://scottelkin.com/aspnet/render-radiobuttonlist-as-an-unordered-list-ul "Render RadioButtonList as an Unordered List UL"). I have mostly translated his code to C#.

{% gist miklund/abce3de8ae3d1c1cf688 ULRadioButtonList.cs %}

## Usage

```xml
<LiteMedia:ULRadioButtonList ID="rblSelectBank" runat="server" CssClass="payment-list" />
```
