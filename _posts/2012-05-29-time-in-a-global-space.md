---
layout: migratedpost
title: "Time in a global space"
description:
date: 2012-05-29 09:20:00
assets: assets/posts/2012-05-29-time-in-a-global-space
image: 
---

<p>What time is it?</p>
<p>Simple question that should have a simple answer. But when you're asking from all around the globe at the same time, the answer will not be the same. Even in US they have 4 different timezones, giving 4 different answers to the question depending on location. As a web developer, this might get quite tricky.</p>
<p><img src="/Media/Default/BlogPost/r3pl4y_timeline.png" alt="R3PL4Y timeline" width="470" height="435" /></p>
<p>The picture above is a partial screenshot of a game rating web site that I'm currently developing. The headings are game titles and the score is out to the right. This website is intended to work for anyone around the globe and is not targeted at a specific country or a specific timezone. So, how do we manage to display time correctly for each user?</p>
<p>The problem is that "Today 08:00" in Sweden actually is "Yesterday 23:00" in California, but the two users, both Swedish and American, should get their local time.</p>
<h2>Solution</h2>
<p>First of all, we need to make sure that dates are stored in a universial time format. For this we use UTC, because UTC is the same everywhere. The date for each review is stored in UTC in the database, which simplify a lot of things for us.</p>
<p>Next, we have to decide how to render the correct date and time. Many websites will take the route of asking users in what timezone they live as the register their user account. There are a few problems with that.</p>
<ol>
<li>If the user change timezone, they will get timestamps that are wrong.</li>
<li>The user has to manage their timezone settings in the website preferences.</li>
<li>The HTML markup is not cachable, as we need to render different timestamps for each user</li>
</ol>
<p>Instead I thought, this is not a server issue. It should just render out the UTC timestamps, and let the client transform it to user friendly dates.</p>
<pre class="brush:html"><li>
	<!-- Removed unimportant markup for brevity -->
	<time datetime="2012-05-29T08:29:51Z">2012-05-29T08:29:51Z</time>
</li>
<li>
	<!-- ... -->
	<time datetime="2012-05-28T15:16:24Z">2012-05-28T15:16:24Z</time>
</li>
<li>
	<!-- ... -->
	<time datetime="2012-05-28T08:05:38Z">2012-05-28T08:05:38Z</time>
</li>
<li>
	<!-- ... -->
	<time datetime="2012-05-26T08:36:20Z">2012-05-26T08:36:20Z</time>
</li>
</pre>
<p>Time will always be rendered correctly to anyone on the planet, but for sake of readability we use some coffeescript to enhance the experience.</p>
<pre class="brush:coffeescript"># parse string '2012-05-05T16:16:34Z' to datetime
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
	getHours : ((date) ->	if date.getHours() < 10 then "0#{date.getHours()}" else "#{date.getHours()}"),

	# get minutes from date with leading zero
	getMinutes : ((date) -> if date.getMinutes() < 10 then "0#{date.getMinutes()}" else "#{date.getMinutes()}"),
	
# transform all timestamps on page
for time in $('time')
	# get localized time
	published = parse_datetime(time.attr('datetime'))
	
	# ommitting code for all if today, if yesterday, if this week....
	# Format: 18 January, 12:34 
	time.text("#{published.getDate()} #{format.months[published.getMonth()]} #{published.getFullYear()}, #{format.getHours(published)}:#{format.getMinutes(published)}")</pre>
<p>This script takes all <time> elements on the page and parses their UTC dates. When the browser parses the date, it will be parsed into local time. Why? Because the browser does know what timezone it is in, because it is the same as the computer. If you travel with your computer you are likely to update the system clock. This means that you automaticly get the correct time on the website. We do not manage timezones on the site, does not have to write settings options for it, and we don't have to take it into account while rendering the HTML. This means that we can more effectivly cache the request for all users.</p>
<p>If the CoffeeScript part confuses you. Here's the same thing compiled to javascript.</p>
<pre class="brush:javascript">var format, parse_datetime, published, time, _i, _len, _ref;

parse_datetime = function(str) {
  var date, exp, month, parts;
  exp = /^(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2}):(\d{2})Z$/;
  date = new Date();
  parts = exp.exec(str);
  if (!parts) {
    throw "Failed to parse as time: " + str;
  }
  month = +parts[2];
  date.setUTCFullYear(parts[1], month - 1, parts[3]);
  date.setUTCHours(parts[4], parts[5], parts[6]);
  return date;
};

format = {
  weekdays: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
  months: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
  getHours: (function(date) {
    if (date.getHours() < 10) {
      return "0" + (date.getHours());
    } else {
      return "" + (date.getHours());
    }
  }),
  getMinutes: (function(date) {
    if (date.getMinutes() < 10) {
      return "0" + (date.getMinutes());
    } else {
      return "" + (date.getMinutes());
    }
  })
};

_ref = $('time');
for (_i = 0, _len = _ref.length; _i < _len; _i++) {
  time = _ref[_i];
  published = parse_datetime(time.attr('datetime'));
  time.text("" + (published.getDate()) + " " + format.months[published.getMonth()] + " " + (published.getFullYear()) + ", " + (format.getHours(published)) + ":" + (format.getMinutes(published)));
</pre>
