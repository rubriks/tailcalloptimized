---
layout: post
title: "Running a Twitter Campaign"
description: I ran a Twitter campaign on my book. This is the full disclosure on how it was setup, the results and what I could've done differently to get a better engagement rate.
date: 2016-01-08 13:01:06
tags: twitter, campaign, advertisement, book, fsharp
assets: assets/posts/2016-01-08-running-a-twitter-ad-campaign
image: assets/posts/2016-01-08-running-a-twitter-ad-campaign/title.png
---

For the last 11 days I've been running a Twitter campaign on the sale going on with my book, [Testing with F#](https://www.packtpub.com/application-development/testing-f). The discounted price has been only $5 for almost a month and that is now at an end. I've not been running the campaign in order to sell a large quantity of books, but more so to get a grasp on how this Twitter ADs works. I will summerize it here for you.

## Setting up the Twitter Campaign

I set the campaign to start 28 December and run until 7 January. During this time Twitter was allowed to spend 45 SEK [^1] a day, and a total of 495 SEK [^2] for the entire period.

![campaign start 28 december and end midnight 7 january](/assets/posts/2016-01-08-running-a-twitter-ad-campaign/time.png)

![allowed spending 45 SEK a day and total of 495 SEK](/assets/posts/2016-01-08-running-a-twitter-ad-campaign/budget.png)

It surpised me that you needed to select a location for the campaign. I'm interested at selling my book anywhere in the world. Why would I want to select a location? In the end I picked locations from Google Analytics of my blog. Those reading my blog would also be interested in my book? This might have been an error on my part.

![selected 39 locations matching people reading my blog](/assets/posts/2016-01-08-running-a-twitter-ad-campaign/locations.png)

I didn't make any specific pick for gender, language or device. These don't matters in my case. I did put in a list of keywords that should be matched, to find my audience of F# developers or people tweeting about unit testing.

![keywords used to match the ad with people](/assets/posts/2016-01-08-running-a-twitter-ad-campaign/keywords.png)

I wanted a narrow match rather than a wide match. If I were to add _software development_ to the list, I would get too wide match with people not interesting in this book. The same for _testing_ which would target a wide audience of non programmers.

In retrospect this might be completely wrong and I should've added the terms _programming_, _testing_, _software development_ and other quite loose keywords.

Then it was time to create the AD tweet. I used the built in card creator to write my tweet without spamming it all to my followers.

![promoted tweet for the twitter ad](/assets/posts/2016-01-08-running-a-twitter-ad-campaign/tweet.png)

The recommendation is to create several different tweets, but I really couldn't think of any more ways to express my message. Anyway, with this I fired off my campaign and off we go.

## Running a campaign

It was quite exciting to watch the campaign dashboard and all the impressions ticking up, but what I didn't expect was the likes and retweets that my campaign was getting, and that I was constantly notified about in my phone. At first this was fun and exciting and later it started to get quite annoying.

I kept a close look on my Google Analytics and Twitter Analytics. The campaign was not really bleeding over to my Twitter Account or my blog. I got a few new followers, but the visitor statistics for my blog stayed the same as previous weeks. I guess if I want to draw followers to my blog, I need to target the campaign exactly at my blog. The PACKT website was the target and not my blog, but it would've been a nice side effect if some of the visitors were to bleed over to my blog.

## Summarizing the campaign 

The result of the campaign was following.

* My tweet made 156k impressions
* The link to my book was clicked 370 times
* The rate of click per impression was 0.24%

![summary of the twitter campaign](/assets/posts/2016-01-08-running-a-twitter-ad-campaign/summary.png)

**The tweet resulted in the following engagements**

* 1200 clicks on the tweet
* 11 retweets
* 3 replies
* 7 new followers

![engagements of the twitter campaign](/assets/posts/2016-01-08-running-a-twitter-ad-campaign/engagements.png)

**Looking at what platforms engaged with the tweet**

* Out of 370 link clicks 93% were on mobile devices
* This really shows the importance that the target link is mobile friendly

![impressions on platforms](/assets/posts/2016-01-08-running-a-twitter-ad-campaign/platforms.png)

**The locations where the campaign made an impression**

* Argentina and Malaysia are far over other locations where it comes to impressions
* My presumption was that US, UK and India might be the correct target locations

![in what countries did people engage with the tweet](/assets/posts/2016-01-08-running-a-twitter-ad-campaign/locations_result.png)

_The list carries on for all 39 countries._

**The list of keywords and the distribution of engagement over the keywords**

* F# is the dominant keyword and really the only important one
* No other keyword except F# caused an engagement

![keywords that were used during the campaign and in what sense they caused an engagement](/assets/posts/2016-01-08-running-a-twitter-ad-campaign/keywords_result.png)

# Some musings about the result

The campaign didn't quite turn out the way I was expecting it. I was musing about 1% link clicks from the number of impressions and instead it was a quarter of that, 0.24%. For me, this is almost within the margin of error, where people accidently pressing a link because they stumble with their thumbs.

I think the cause for this low engagement is that I'm missing my audience. F# might not be the best keyword to match with as this might be short for something else than the Microsoft F# programming language.

I should probably have added a few more large keywords as _software testing_, _functional programming_ as to give the impressions a bit more spread and not only hit 1 keyword.

I think I could've skipped most on the 39 locations and focus on a few. I should not only have run the list of locations through my blog, but also through the shipping targets of the PACKT e-shop store.

I don't have any statistics on conversion rates as in how many sales I got from this campaign, but I would be very surprised if the sales will cover the cost of the campaign. This was an experiment and I'm not at all disappointed.

---
**Footnotes**

[^1]: About $5
[^2]: About $50


