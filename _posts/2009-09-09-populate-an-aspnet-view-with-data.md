---
layout: post
title: "Populate an ASP.NET view with data"
description:
date: 2009-09-09 20:26:44
assets: assets/posts/2009-09-09-populate-an-aspnet-view-with-data
image: 
---

I've found four ways to populate an ASP.NET view with data.

1. Databind from Page\_Load in code behind
2. OnLoad event on the databinding control
3. Fetching data from a method with databound expression
4. DataSourceControl

## Databind from Page\_Load in code behind

When I see this happening I automatically removes it and blame the developer who ever put it there. My Page\_Load should be as clean as possible. If there is a way to remove code from the Page\_Load I will attempt to do it.

{% gist miklund/c054453aba0a4bc406ba ColorsDropDownList.aspx.cs %}

This is a big no no!

## OnLoad event on the databinding control

There is a method where you use the OnLoad-event to databind the control. The good thing about this is a clear separation of concern between the control being databound and the data that is bound.

{% gist miklund/c054453aba0a4bc406ba NamesDropDownList.aspx %}

I find this much neater. The method responsible for finding the data has no idea on what control is used for databinding.

## Fetching data from a method with databound expression

Here comes something similar to the previous example. We act at the event OnLoad and databind the control itself with a databoundexpression.

{% gist miklund/c054453aba0a4bc406ba FlowersDropDownList.aspx %}

In this example I would place the DataBind callback method in a common PageBase or UserControlBase where it could be reused all over the application.  The power of this method of databinding is reusing dataproviding method with only changing arguments to the method from markup. This is something that is not possible with our previous method of databinding. You should beware of putting logic in the databound expression since it is inline code in markup.

## DataSourceControl

The most powerful method of databinding is implementing a DataSourceControl. This is useful when you have a common data store that you want to get data from, and use different views to display parts of that data. This is the most concern separated application here, but also the most time consuming and complex. Use this when you notice that you query the same data in more than three different ways or from three different places in your code.

{% gist miklund/c054453aba0a4bc406ba CmsPages.aspx %}
