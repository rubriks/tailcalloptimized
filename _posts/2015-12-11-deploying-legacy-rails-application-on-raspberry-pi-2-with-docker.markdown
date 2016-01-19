---
layout: post
title: "Deploying legacy Rails application on Raspberry Pi 2 with Docker"
description: A long story on how I moved the rails application R3PL4Y from Heroku to running in Docker on an RPi2.
date: 2015-12-11 10:00:46
tags: rails, ruby, rpi2, raspberry pi, docker
assets: assets/posts/2015-12-11-deploying-legacy-rails-application-on-raspberry-pi-2-with-docker
image: assets/posts/2015-12-11-deploying-legacy-rails-application-on-raspberry-pi-2-with-docker/rpi2.jpg
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

When the Raspberry Pi 2 came out I was quick to order one. As I am lazy I actually ordered a complete package with SD card, power cord and a casing all in one. Then I never unpackaged it. It stayed in its boxing for neary a year before I figured out what to do with it.

> I know! Let's take that rails application I wrote 2012 and get it running on the RPi2!

I developed a Rails application in 2012 in order to learn Ruby and Rails as this was the proper thing to do in 2012. Even if I've not practiced much Ruby since then, I have still learned alot from the conventions used there.

![this is r3pl4y after you've logged in](/assets/posts/2015-12-11-deploying-legacy-rails-application-on-raspberry-pi-2-with-docker/r3pl4y.png)

The application, [R3PL4Y](http://replay.mikaellundin.name) was an ambitions project to create a kind of review site for games, where ordinary gamers like myself could login and rate games they've played. A little bit like IMDB for movies, but the main source of inspiration was a swedish site called [filmtipset](http://www.filmtipset.se).

I eventually took the site down because noone was using it and it was costing me $50/month in hosting on [Heroku](http://www.heroku.com). I have only good things to say about Heruko but $50/month was a bit steep for that hobby project of mine. (pricing of cloud services has gone down since 2012)

So, what I wanted to do is to take this site that was built for Heroku and make it run on the RPi2 instead. However building a site that works on Heruko doesn't mean that it will work anywhere else. This is where Docker comes into play. If I can build a Docker container where my site will run, then I can use that Docker container to host it anywhere. I could host it on my RPi, or I could just move the container to Amazon AWS if the RPi turns out to be too slow.

## Building a R3PL4Y docker image

So, the first thing I did was to create a Docker container for R3PL4Y on my desktop Linux machine, with a little caveat. Instead of creating the container by hand, I chose to script it all in a Dockerfile. Why I did that will become apparent.

{% gist miklund/e9754a246aed10ebb16a Dockerfile %}

A lot of magic is of course in the `bundle install` statement, where all gems from the [Gemfile](https://github.com/rubriks/r3pl4y/blob/master/Gemfile) will be installed, but apart from that, this small script contains everything that is needed for R3PL4Y to run.

Now, all you have to do to build a complete production image is running the following command.

```bash
docker build -t replay-app .
```

And after a while you have a new production environment image. With this you can start a container with the following command.

```bash
docker run --name replay-app -d replay-app
```

But there are some things missing, like a database.

## Building a docker postgres database

R3PL4Y is expecting a postgres database, and this is very easy to setup with docker, as there are complete postgres database images that you can just download from dockerhub.

Checkout the [postgres docker image at dockerhub](https://hub.docker.com/_/postgres/)

In order to build the database I started by download and install the official postgres docker image.

```bash
docker pull postgres
```

Then you need to create a container and boot it up.

```bash
docker run --name postgres -e POSTGRES_PASSWORD=<obfuscated> -d postgres
```

Open up a psql database client to this database.

```bash
docker run -it --link postgres:postgres --rm zsoltm/postgresql-armhf sh -c 'exec psql -h "$POSTGRES_PORT_5432_TCP_ADDR" -p "$POSTGRES_PORT_5432_TCP_PORT" -U postgres'
```

And then create a new database where we will restore the old production database.

```sql
CREATE DATABASE r3pl4y_production;
```

Then all that was left to do was to restore a database dump file that I had saved from the time R3PL4Y was situated at Heroku.

```bash
docker run -it --link postgres:postgres -v /tmp/db:/var/lib/postgresql/backup --rm postgres sh -c 'exec pg_restore --verbose --clean --no-acl --no-owner -h "$POSTGRES_PORT_5432_TCP_ADDR" -U postgres -d r3pl4y_production /var/lib/postgresql/backup/r3pl4y-201501270119.dump'
```

And in just a few moments the database was restored.

## Linking it all together

In order to get the reolay-app container talk to the postgres container we need to link them together. This is simply done while starting the container.

```bash
docker run --name replay-app -p 80:3000 --link postgres -v /var/log/www:/var/www/log -d replay-app
```

I've added a few more arguments here

* -p 80:3000 -- bind localhost:80 to port 3000 on the container where WeBrick will be running.
* --link postgres -- make the postgres container accessible from the replay-app container, using default ports and alias.
* -v /var/log/www:/var/www/log -- this creates a volume in the container, where the log files will be stored on the docker host instead. This makes it easier to read the logs and troubleshoot.

Now when the containers are linked, the R3PL4Y rails application can connect to the database with the following database connection string.

```
postgres://postgres:<obfuscated>@postgres:5432/r3pl4y_production
```

## Setting up the Raspberry Pi 2

When prepping the RPi2 for docker I first tried to get it running with ArchLinux. I like Arch and have been running it as a desktop OS before, but this time I ran into some trouble. The ArchLinux team has simply stopped handing out ARMv7 images that you can bootstrap your SD card with. Instead you need to build the image yourself by hand. This is surely more the ArchLinux way of doing things, but the problem is that you need to have a native Linux installation in order to create an XFS file system.

I don't have that. I mostly run Linux in virtual machines. I have a native OSX and a native Windows 7, but those won't do. So I had to scratch the idea of running ArchLinux on my RPi2. Sad, but true.

Instead I downloaded the latest Raspbian with hopes of just adding Docker to it and remove all uneccessary things. This turned out to be a challenge. You also need to recompile the kernel because it is missing some crucial LXC parts. I quickly scrapped this idea as it seemed all too much work with very uncertain outcome.

I google around and found that someone already done the work for me. [Hypriot - Docker Pirates ARMed with explosive stuff](http://blog.hypriot.com/) seemed to be exactly what I needed, so I downloaded an image, flashed my SD card and the thing worked as smooth as anyone could expect. I was up and running!


## Moving it all to Raspberry Pi 2

In an ideal world we could just bundle up these containers and import them to the Raspberry Pi 2. This would work fine if the raspberry was running on an x86 architecture, but it's not. The Raspberry Pi 2 has a ARMv7 processor and it cannot run a container that has been built for x86.

This was why I already from the beginning created the replay-app container from a Dockerfile, in order to automate the recreation of the docker container on the ARMv7 architecture. I changed the base image in the Dockerfile from `ubuntu:14.04` to an ARM variant `armv7/armhf-ubuntu:14.04`. In theory all I needed to do was to run `docker build -t replay-app .` on the RPi2 and wait. Then the whole application would be rebuilt on the Raspberry Pi 2.

Funny how things aren't always so smooth as one would expect. The Dockerfile worked fine, but bundling an old Gemfile and compiling native extensions for ARM was not trivial. Just because the native extensions compile for x86, doesn't mean that they do for ARM. After a lot of patching and trickery with the Gemfile and gem versions I managed to get it all to build.

As for the database, I used an [ARM version of the postgres image](https://hub.docker.com/r/zsoltm/postgresql-armhf/) called `zsoltm/postgresql-armhf` and from that I managed to recreate the database on the RPi2 without any other changes.

## Wrapping it up

From here on it was just a matter of configuration to make sure that all the old integrations with Facebook, Twitter, Steam and Amazon S3 was working dispite I changed URL from r3pl4y.com to [replay.mikaellundin.name](http://replay.mikaellundin.name). You can visit it and play around with it if you like. Most of the things should be working, even if I'm still working on some details.

Performance wise it is much faster than when I ran it off Heroku, mostly because it doesn't spin down like the Heroku dynamos does to save CPU and bandwidth. Responses varies from 100-300 ms depending on what kind of request is done, but it could be made much faster by moving it off WeBrick to nginx and also leverage some caching, which is not done today.

If we take a look at the numbers, here is the output of vmstat.

<pre>
$ vmstat
procs -----------memory---------- ---swap-- -----io---- -system-- ------cpu-----
r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
0  0      0  74028 206548 205524    0    0     1     5   11    8  1  0 98  0  0
</pre>

The RPi2 has a total of 1Gb RAM and here we can see that 74Mb are free, 206Mb buffered and 205Mb cached. This looks pretty good to me. If the si/so values would be non zero, that would mean that we're out of memory. This is not the case.

If we take a look at `docker stats` it looks like this.

| CONTAINER          | CPU %              | MEM USAGE / LIMIT    | MEM %              | NET I/O              | BLOCK I/O           |
| ------------------ | ------------------ | -------------------- | ------------------ | -------------------- | ------------------- |
| rails-app          | 0.05%              | 105.2 MB / 970.5 MB  | 10.84%             | 10.22 MB / 5.275 MB  | 11.76 MB / 892.9 kB |
| postgres           | 0.00%              | 56 MB / 970.5 MB     | 5.77%              | 61.05 MB / 83.41 MB  | 4.911 MB / 513.5 MB |
| rails-jobs         | 0.00%              | 74.03 MB / 970.5 MB  | 7.63%              | 5.003 MB / 5.007 MB  | 0 B / 0 B           |

The rails-app container is consuming most of the memory and the database is doing most of th I/O operations. This is expected. I also have a rails-jobs container that I've not talked about before which is responsible for doing async jobs, like e-mailing and doing social media api calls.

If we look over time, it will be rails-app that is consuming the most CPU, especially when there is traffic on the site.

![raspberry pi 2 as a web server](/assets/posts/2015-12-11-deploying-legacy-rails-application-on-raspberry-pi-2-with-docker/rpi2.jpg)

## Thoughts on docker

Docker was the most interesting part of this project for me. Even if I couldn't build the whole production environment on my development machine and simply move it to the Raspberry Pi 2 (due to differences in processor architecture) I can see some huge benefits there.

Apart from that, I see the following benefits of utilizing Docker

* When writing a Dockerfile, I did automaticaly document all the dependencies that this application has and also automate creation of a production environment
* Containers are so lightweight that I can create a new production environment, try something out and throw it away without disrupting the production container that is running live
* With rails I can run `rails console` in production in a different container and use it as a debug environment. If I'm also using the --sandbox mode, I can really go wild in production without hurting anyone
* I like the idea that you make a change to the container and commit it. This way you can rollback if it turns out that the change was a bad one
* Isolation, if I would do this on the RPi2 without docker, the rails application and postgres database would be running in the same space. Now there is no risk for conficts
* I could set limitations on how much memory/cpu a container may have. This might not be of use to me right now, but I can see lots of uses for this

That's all! If you've read all the way down here, I hope you enjoyed it!
