---
layout: post
title: "Writing a Technical Book"
description: Statistics and insights on writing a technical book for a publisher 
date: 2015-04-30 22:53:48
tags: book, F#, publishing
assets: assets/posts/2015-04-30-writing-a-technical-book
image: assets/posts/2015-04-30-writing-a-technical-book/title.jpg
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

I don't believe it has escaped anyone that follows me that I've written a book called [Testing with F#](http://www.amazon.com/Testing-F-Mikael-Lundin/dp/1784391239/). In this post I will give my accounts on the process of writing a book.

## Signing the Contract

I got contacted by PACKT publishing in July 2014 asking me if I would like to write a book on testing with F# as it seemed I had experience in the field. The basis of this assumption was a [blog post that I made in 2013](http://litemedia.info/unit-testing-in-fsharp). 

Two thoughts from this

1. Wow, it really pays off blogging.
2. What an ego boost being headhunted for writing a book.

While the first one, is definetly true, the second though is an overstatement. I recieved templated e-mail, probably the same as some 100 other bloggers did. A very formal "Dear Mr. Mikael Lundin" kind of e-mail that you usually disregard as spam.

I made a thorough background check on PACKT, to figure out both what other books they've published before, but also what the public opinion was about the publisher. It was not fantastic, but still not bad enough. I got more and more used to the idea of writing a book.

In my response that I might be interested, the publisher wanted me to supply an outline of the book. It was going to be 250 pages and cover unit testing, integration testing, functional testing with all the major test frameworks. For each chapter they wanted me to estimate number of pages.

* Preface (4 pages)
* Why do we test? (15 pages)
* The Controversy of Test Automation (25 pages)
* Testing in an Agile Context (15 pages)
* Making Functional Code Testable (40 pages)
* Setting up your Test Environment (35 pages)
* Unit Testing (45 pages)
* Integration Testing (35 pages)
* Functional Testing (25 pages)
* Test Smells (10 pages)
* Ten Commandments of test automation (10 pages)

It seemed weird to me to estimate number of pages. How would I know the size of a chapter before writing it? What if I learn things while writing that would seriously affect the page count of a chapter?

I can see now how important page count can be to a publisher, just as estimates are to a project manager in software development. (can there be any other way? #noestimates)

After we agreed on the outline, I was given a contract and asked to sign it. There was no room here for negotiation, it was rather "go with it or skip it". I asked my wife three times, "do you really want me to do this?", and then I signed it 25 July 2014.

## Start Writing

The publisher set up a schedule where I would write 2 pages every day of the week, starting 4 August 2014 I agreed to finish the first draft by 5 December 2014.

Writing 2 pages every day of the week does not seem like much. In a full 8 hour work day I easily write 16 pages of technical documentation. However, these are 2 pages every day after work, and also on Saturdays and Sundays. If you have a family, you know how hard it can be to free up time for yourself. Now I had to do it every day.

I was given deadlines for each chapter, and those deadlines I had to meet even when I was down with a stomache flu, or had crunch at work.

* The Practice of Test Automation, 11 August 2014
* The Controversy of Test Automation, 23 August 2014
* Testing in an Agile Context, 30 August 2014
* Making Functional Code Testable, 16 September 2014
* TIS, 18 September 2014
* Setting up your Test Environment, 3 October 2014
* Unit Testing, 25 October 2014
* Integration Testing, 11 November 2014
* Functional Testing, 23 November 2014
* Test Smells, 28 November 2014
* Ten Commandments of Test Automation, 3 December 2014
* Preface, 5 December 2014

The picture you have of an author, looking out the window biting a pencil while contemplating the intricacies of his text, does not exist when you need to squeeze out every page in a rush. What from the beginning looked like a fun side project, quickly turned into a drugde and later a nightmare. You try to come up with good code examples just to meet a dead end after 2 hours, going to sleep with the feeling of a day wasted.

I slept 5 hours per night the 4 months of writing the first draft.

## Review review review

Making it through the first draft and delivering every chapter by due date, was a feat. The complete first draft was delivered by 5 December 2014. At 18 December 2014 my second baby was born and it was a happy time, and at the same time, the hardest time of my life.

The first chapter you get back is a shock. It is a punch in your stomache that will have you gasping for air.

With all the comments and edits, Microsoft Word lit up like a christmas tree. There was not one line of text in the first chapter that didn't have a comment or edit. I was expected to come back with an updated version of each returned chapter after 3 days.

The first review was done by a bunch of F# programmers and my content editor. After the first shock, I was very grateful for all their comments and edits, and the book became much better than I ever could have managed alone.

After the first review round, there was the technical editor review. This review focused on the code examples and the correctness of the technical facts. I was blessed by a great technical editor making an excellent job with the content. She also gathered all of my code samples into a code package, which also needed to be reviewed separately.

Then there was the final review. This was actually the first time I sat down and read my own text after the first draft, and found that a lot of things had changed and not all for the good. My wordings had sometimes been changed in a way they lost their meaning and I had to change them back. In some cases I couldn't understand my own reasoning at all and had to rewrite some parts of the text.

Review review review. I understand that self publishing is a thing, but I have no idea how you can write a good quality book without this level of quality assurance.

## Publishing

You work towards a critical date. If you can't deliver to that date, publishing is going to get pushed a month. There is a time window that needs to be hit, or you will get delayed. I assume it has something to do with killing of trees.

When the book was published it sent for printing, and it became almost instantly available at amazon.com. That was a nice boost to my confidence. Also it is quite scary to get tweets from peeps that just bought your book. What if you can't live up to their expectations? What if they don't think the book is worth the $$ they spent.

For the first time I was able to say "I've written a book" and provide people with a link to Amazon. When you first tell people that you're writing a book, you'll get the "oh, really!?", feeling that you're not taken seriously. I chose to not tell anyone before I already written half of the first draft. When you tell people that you have "published a book" you get a whole other reaction: "wow, cool, what a feat!".

I have written a book. The goal was not to earn a lot of money, and it was not to get famous. The goal was to increase my value, my confidence and feel that I have contributed to something that is more lasting than a website.

## Statistics

My day job is IT consultant. That means that I'm used to time everything I do. Actually I did time the whole book process and all in all, it took me 290 hours from beginning to end.

![Time spent on the different parts of the project](/assets/posts/2015-04-30-writing-a-technical-book/timespentparts.png "9 hours in preparations, 225 hours on 1st draft and 56 hours review")

Dividing it up on chapters you will find that chapter 4 (Unit Testing) has most pages and highest effort. Chapter 3 (Setting up your test environment) and Chapter 5 (Integration Testing) follows closely by. Least effort to write was Chapter 9 (Test Smells) and chapter 10 (The Ten Commandments of Test Automation), not suprisingly as they are closing chapters with only 10 pages each.

![Time spent on the different chapters of the book](/assets/posts/2015-04-30-writing-a-technical-book/timespentchapters.png "Chapter 3, 4, 5 took most effort. Chapter 9 and 10 least.")

It is also interesting to see how many hours where spent on each page. There are not many surprises here. More pages requires more effort. I spent less hours than pages on each chapter except for chapter 1. I rewrote the first chapter several times, because I had the time in the beginning, and I was new to writing and needed some practice to get it right.

![Effort on each page of a chapter](/assets/posts/2015-04-30-writing-a-technical-book/effortperpage.png "Average effort was 50 minutes / page")

When looking at the overall effort per page on each chapter, we'll see that Chapter 6 (Functional Testing) required least effort. I'm quite fond of that chapter, so I wouldn't say it has lower quality than the rest. Chapter 5 (Integration Testing) has much higher effort per page, but that chapter I'm least happy with.

## Summary

Writing a book was not all what I expected. I did expect it to be a lot of work, but I never assumed it would be so painful, that I would live 6 months under total stress over delivering next chapter before deadline. That really lowered my life quality during this time.

I'm very happy with the fact that I have written a book. It feels like I've made a permanent contribution to my line of business, and even if none will remember "Testing with F#" in 100 years time, I will still feel like I accomplished something on the day that I die.

### Favorite thing about writing a book

* Sense of accomplishment
* Calling yourself an "author" just to make out people's reactions
* Putting your book between Eric Evans and Martin Fowler in the book case at home

### Least favorite thing about writing a book

* People's skeptisism when you tell them you're writing a book
* The pain of writing it was hardly worth it
* Fear of wasting people's time and money by writing a bad book

