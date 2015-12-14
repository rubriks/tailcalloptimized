---
layout: page
title: R3PL4Y game review website - blog.mikaellundin.name
---

# ![R3PL4Y game review website](logo.png)

[Click here to visit the website](http://replay.mikaellundin.name)

R3PL4Y was a project I made in 2012 in order to try out a couple of technologies that I had put off for too long time. The goal of the project was to create a website that me and others could use to rate and review games played. Very much like the swedish website filmtipset.se for movies, or similiar to IMDB.

![screenshot of r3pl4y](screenshot1.png)

## History

I started development by creating mockups of what I wanted the user interface to be like. It quickly became apparent that I wanted one user interface if you're logged in and another if you're a public visitor. As a visitor you want to read a review like an article on any kind of page, but if you're a user, you want a much more integrated experience. This developed into creating the user interface as a Single Page Application (SPA). This was before AngularJS and ReactJS became a thing, so the SPA was crafted manually with event handling and jQuery.

I developed a couple of mockup designs in pure HTML to try out the concept, but it really took about 3 tries until I reached something that I could bare. I'm not a graphical designer, which is quite apparent when looking at the page, but it looks ok.

![early mockup of r3pl4y](mockup1.png)

I implemented the site in Rails 3 with the use of SASS and CoffeeScript. I did it the rails way, and followed all the guide lines, with database migrations and such. Once I had an application that was working I published it to Heroku and used that for hosting.

I quickly decided that I didn't want to handle any kind of user password. With passwords come great responsibility. Instead I integrated the login to Twitter, Facebook and Steam so that a user could authentication with any or all of them. One account can be connected to all three in order to avoid the situation _"what social media login did I use here?"_.

![screenshot of r3pl4y](screenshot2.png)

One big part of the project was to create a catalogue of games. I used some large internet game databases that I scraped for information and inserted into R3PL4Y. This includes about 20000 games from all of the major gaming platforms DOS, Dreamcast, Game Boy (Advanced/Color), Nintendo 64, Nintendo DS, PlayStation (1, 2, 3), PlayStation Portable, PlayStation Vita, Sega Master System, Sega Mega Drive, Wii, Windows, Xbox and Xbox 360. The catalogue is somewhat lacking of games from PlayStation 4, Xbox One and Wii U, in other words games that came out after 2012.

After the projects "completion" development came to a halt and I lost interest in keeping it going. There were no active users of the website so 2013 I shut it down to save the hosting costs. Heruko was charging a substantional amount of money for keeping the site alive, so I had to let it go and also stopped renewing the domain name r3pl4y.com.

In 2015 my interest for this old project came back and I brought it back in a small experiment to run it on an Raspberry Pi 2. I needed a website that I could use to learn how to dockerize an application and R3PL4Y was perfect for the task.

As of writing the project is alive and fully functional on this address: [http://replay.mikaellundin.name](http://replay.mikaellundin.name)

## Technology

R3PL4Y was built on Rails 3 using postgresql as database.

* CoffeeScript was used as a javascript preprocessor. The whole SPA was implemented in CoffeeScript and jQuery.
* SASS was used for styling. OOCSS was followed as a paradigm.
* Heruko was used for hosting, 1 web dynamo and 1 worker dynamo for delayed jobs
* Integration with Twitter API for OATH authentication and publishing tweets
* Integration with Facebook Graph API for OAUTH authentication and publishing Review nodes to user's Facebook stream
* Integration with Steam API for OAUTH authentication
* Integration with Amazon S3 for storing game catalogue artifacts (images, screenshots)
* Integration with Tumblr for displaying blog posts as news items
* For information how the site was restored with the use of RPi and Docker, please go to [this](/2015/12/11/deploying-legacy-rails-application-on-raspberry-pi-2-with-docker.html) and [this](/2015/12/12/backup-database-in-a-rails-docker-setup.html) blog posts.

