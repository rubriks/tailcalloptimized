---
layout: post
title: "Dynamic user control list"
description: There are some things in ASP.NET WebForms that are hard to do. One of those is to have a UserControl that should be added dynamically and then repopulated at every postback. This is needed when you want the user to be able to add or remove things on a page.
tags: webforms, dynamic, usercontrol, asp.net
date: 2009-09-20 10:49:47
assets: assets/posts/2009-09-20-dynamic-user-control-list
image: 
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

How do you add and remove user controls dynamically on an ASP.NET page?

![Dynamic User Control List](/assets/posts/2009-09-20-dynamic-user-control-list/dynamic_controls.png)

There are many ways to do this and here I will present one.

## The page container

Start with adding a button and a placeholder on the page. The button will create user controls in the placeholder.

{% gist miklund/6dba7e1a7efd98c0b31e Page.aspx %}

## The user control

The user control is very simple. The delete button is tied to an event that will call the Delete-method on the current page.

{% gist miklund/6dba7e1a7efd98c0b31e UserControl.ascx %}
{% gist miklund/6dba7e1a7efd98c0b31e UserControl.ascx.cs %}

## The IDynamicControlContainer interface

If you want this to work you need to create an interface that has the Delete-method, and implement this interface on the container page. The reason you want the method on an interface and not on the container page, is to create lower coupling from the user control on the container page.

{% gist miklund/6dba7e1a7efd98c0b31e IDynamicControlContainer.cs %}

## Keep state between post backs

We will use the ViewState to save and restore state between postbacks. The only thing we need to keep track on our selves is the control IDs that we added to the user control. When we return on postback, we recreate the controls in the placeholder with the previous IDs and trust that ASP.NET will read back the state of these controls for us. When we change the list by adding and removing a control, we also update the list of IDs in ViewState.  Here comes my code behind for the container page.

{% gist miklund/6dba7e1a7efd98c0b31e NameList.cs %}

You can download the [complete source code sample here](/assets/posts/2009-09-20-dynamic-user-control-list/DynamicUserControls.zip).
