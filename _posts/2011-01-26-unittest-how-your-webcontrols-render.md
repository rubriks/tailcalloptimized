---
layout: post
title: "How to UnitTest your WebControls rendered HTML"
description: In order to know that your WebControls are rendering the correct HTML you need to unit test it. Here's how you can manage to do this without breaking your neck.
tags: webforms, unit testing, nunit, mocking
date: 2011-01-26 17:20:28
assets: assets/posts/2011-01-26-unittest-how-your-webcontrols-render
image: 
---

Testing ASP.NET code is always hard. How do you test that a control renders the HTML that you require? I will show you how. Let's use the [ULRadioButtonList that I have written about earlier](/2010/11/26/aspnet-radiobutton-in-an-ul-li-list.html "ASP.NET RadioButton in an UL LI list") and test that it outputs the expected markup.

## The schema that validates the markup

The downside of using a XSD schema to validate HTML, is that HTML 5 is not XML as XHTML was. There's not much we can do about that except writing our controls markup as if it where strict XHTML.

{% gist miklund/6ff7a9bf8b62c02a6fc9 schema.xsd %}

If you think XSD coding is hard, I recommend that you start with writing the XML that you are specifying and then write the XSD to fit that XML. In Visual Studio you will get feedback at once, if your XML does not fit the XSD.

{% gist miklund/6ff7a9bf8b62c02a6fc9 RadioButtonList.html %}

Make sure that you add these files to your project as Embedded Resource, since they're not interesting for anything except your test.

![select embedded resource in solution explorer](/assets/posts/2011-01-26-unittest-how-your-webcontrols-render/ul1.png)

## Writing that test

Now we would like to use our schema to validate output of the web control. This is done with the following code.

{% gist miklund/6ff7a9bf8b62c02a6fc9 UnorderedRadioButtonListShould.cs %}

This looks really cool, but it is completely useless because it will never fail. That is because the HTML is not associated with that schema.

## Change the web control

We have to change our system under test to allow this kind of validation. We need to add `xmlns="urn:unordered-radio-button-list"` to the root element to apply the validation. But, we don't want this when we render in page. I propose that you add a property called Xmlns and only render its contents on the ul node when it is not null.

{% gist miklund/6ff7a9bf8b62c02a6fc9 Example1.cs %}

Now you will initialize the web control with the following.

{% gist miklund/6ff7a9bf8b62c02a6fc9 Example2.cs %}

Now we have a test that will validate that the web control renders expected markup. Pretty powerful huh! The whole solution can be [downloaded from my repository on bitbucket](http://code.litemedia.se/litemedia.web.ui.webcontrols "Unit test web controls example on Mikael Lundin bitbucket repository").
