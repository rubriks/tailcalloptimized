---
layout: post
title: "Time in a global space"
description: How to deal with time when you have users from all over the world using the same system. Time is subjective to the person that is using your system right now.
tags: ruby, r3pl4y, timeline, utc, coffee script
date: 2012-05-29 09:20:00
assets: assets/posts/2012-05-29-time-in-a-global-space
image: 
---

> What time is it?

Simple question that should have a simple answer. But when you're asking from all around the globe at the same time, the answer will not be the same. Even in US they have 4 different timezones, giving 4 different answers to the question depending on location. As a web developer, this might get quite tricky.

![R3PL4Y timeline](/assets/posts/2012-05-29-time-in-a-global-space/r3pl4y_timeline.png)

The picture above is a partial screenshot of a game rating web site that I'm currently developing. The headings are game titles and the score is out to the right. This website is intended to work for anyone around the globe and is not targeted at a specific country or a specific timezone. So, how do we manage to display time correctly for each user?

The problem is that "Today 08:00" in Sweden actually is "Yesterday 23:00" in California, but the two users, both Swedish and American, should get their local time.

## Solution

First of all, we need to make sure that dates are stored in a universial time format. For this we use UTC, because UTC is the same everywhere. The date for each review is stored in UTC in the database, which simplify a lot of things for us.

Next, we have to decide how to render the correct date and time. Many websites will take the route of asking users in what timezone they live as the register their user account. There are a few problems with that.

1. If the user change timezone, they will get timestamps that are wrong.
2. The user has to manage their timezone settings in the website preferences.
3. The HTML markup is not cachable, as we need to render different timestamps for each user

Instead I thought, this is not a server issue. It should just render out the UTC timestamps, and let the client transform it to user friendly dates.

{% gist miklund/f08f1247b585e7806574 listpart.html %}

Time will always be rendered correctly to anyone on the planet, but for sake of readability we use some coffeescript to enhance the experience.

```coffee
# parse string '2012-05-05T16:16:34Z' to datetime
parse_datetime = (str) ->
    exp = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/
    date = new Date()
    parts = exp.exec(str)
 
    # not correct format
    throw "Failed to parse as time: #{str}" unless parts
 
    month = +parts[2]
    date.setUTCFullYear(parts[1], month - 1, parts[3])
    date.setUTCHours(parts[4], parts[5], parts[6])
    return date
 
# helpers for formatting dates
format =
    # These might have to be globalized in the future
    weekdays : ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
 
    # These might have to be globalized in the future
    months : [ "January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ],
 
    # get hours from date with leading zero
    getHours : ((date) ->    if date.getHours() < 10 then "0#{date.getHours()}" else "#{date.getHours()}"),
 
    # get minutes from date with leading zero
    getMinutes : ((date) -> if date.getMinutes() < 10 then "0#{date.getMinutes()}" else "#{date.getMinutes()}"),
     
# transform all timestamps on page
for time in $('time')
    # get localized time
    published = parse_datetime(time.attr('datetime'))
     
    # ommitting code for all if today, if yesterday, if this week....
    # Format: 18 January, 12:34 
    time.text("#{published.getDate()} #{format.months[published.getMonth()]} #{published.getFullYear()}, #{format.getHours(published)}:#{format.getMinutes(published)}")
```

This script takes all &lt;time&gt; elements on the page and parses their UTC dates. When the browser parses the date, it will be parsed into local time. Why? Because the browser does know what timezone it is in, because it is the same as the computer. If you travel with your computer you are likely to update the system clock. This means that you automaticly get the correct time on the website. We do not manage timezones on the site, does not have to write settings options for it, and we don't have to take it into account while rendering the HTML. This means that we can more effectivly cache the request for all users.

