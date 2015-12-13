---
layout: post
title: "Backup database in a rails docker setup"
description: 
date: 2015-12-13 04:55:36
tags: rails docker postgres backup devops 
assets: assets/posts/2015-12-13-backup-database-in-a-rails-docker-setup
image: assets/posts/2015-12-13-backup-database-in-a-rails-docker-setup/title.jpg
---

Now after I've moved my [R3PL4Y application off Heroku and onto my Raspberry Pi](/2015/12/11/deploying-legacy-rails-application-on-raspberry-pi-2-with-docker.html), there are some things that no longer comes for free. Backup of database is one of those.

It is very neccessary as there is one downside of RPi and that is primary storage is an SD card, and these are notoriously untrustworthy when it comes to hosting operating systems. I must assume they were not made for the constant I/O that an OS does. Memory cards were designed for storing files, like images and video.

The effect is that they break. It is not a question if they will break, but when, so you always need to have a descent backup plan when dealing with data on a RPi.

At this moment my setup looks like this.

<pre>
CONTAINER ID        IMAGE                     COMMAND                  CREATED             STATUS              PORTS                  NAMES
f4d4069d448b        replay-app                "/var/www/script/dela"   2 days ago          Up 2 days           3000/tcp               replay-jobs
b7d0ec9d5a49        replay-app                "/var/www/script/rail"   3 days ago          Up 3 days           0.0.0.0:80->3000/tcp   replay-app
d55171690310        zsoltm/postgresql-armhf   "/entrypoint.sh postg"   8 days ago          Up 8 days           5432/tcp               postgres
</pre>

Three containers. One web application, one for jobs and the last one is the database container.

Now comes the question, where should database backups be made? The web application already has a connection to the database, but it doesn't have the neccessary tools (pg_dump). The database could make its own updates, but we would need to install AWS tools in order to upload the backups to Amazon S3. The jobs container should be an obvious choice but its running delayed_jobs, a rails construct. Database backups needs to be issued from cron or other scheduling.

Another option is to let the container host run the backups, but I think that backups is part of sustaining the application and there for application logic, and such I want to isolate the application knowledge to containers.

The answer is of course to create another container, replay-backup, responsible for making backups. This container could be customized for the task and as containers are lightweight it should cost us too much.

Our backup looks like this

1. Trigger once per day (cron)
2. Perform a pg_dump of the database and store as a file
3. Remove any backups that are older than 5 iterations
4. Synchronize backup with an Amazon S3 bucket

As for the file system there is no state that is not part of the application. I've created an image of the SD-card and I can restore that to a new card if disaster happens. The application itself is updated with `git pull && bundle`.

Here is the Dockerfile I came up with for replay-backup.

	# replay-backup
	FROM zsoltm/debian-armhf:jessie
	MAINTAINER Mikael Lundin <hello@mikaellundin.name>

	# Install prerequisites
	RUN apt-get update && apt-get install -y cron awscli postgresql-client-9.4

	# ADD backup script to container
	ADD backup-replay-database.sh /backup-replay-database.sh
	ADD backup-replay-cron /etc/cron.d/backup-replay

	# Make script files executable
	RUN chmod 755 /backup-replay-database.sh
	RUN chmod 755 /etc/crontab

	# VOLUME where the backups reside
	VOLUME /var/backups
	VOLUME /var/log/cron

	# start the application
	CMD ["cron", "-f"]

This is very straight forward. There are two important files that are included in this container. First is the script that does the backup.

	#!/bin/bash

	# Set environment variables
	export DATABASE_URL=postgres://postgres:<obfuscated>@postgres:5432/r3pl4y_production
	export AWS_ACCESS_KEY_ID=<obfuscated>
	export AWS_SECRET_ACCESS_KEY=<obfuscated>
	export AWS_DEFAULT_REGION=eu-west-1

	echo $(date +"%Y-%m-%d %T"): START r3pl4y database backup

	# get a dump of database
	echo $(date +"%Y-%m-%d %T"): Dump the database
	pg_dump --dbname=$DATABASE_URL | gzip > /var/backups/r3pl4y_production-$(date +%Y%m%d).psql.gz

	# remove all but 5 latest backups
	echo $(date +"%Y-%m-%d %T"): Remove old backups
	ls -1trd /var/backups/* | head -n -5 | xargs rm -f

	# synchronize folder to s3 backup bucket
	echo $(date +"%Y-%m-%d %T"): Push new backup to Amazon S3
	aws s3 sync /var/backups s3://replay-files.mikaellundin.name/backup

	echo $(date +"%Y-%m-%d %T"): END r3pl4y database backup

This script dumps the database, removes old backups and then pushes to S3 bucket. It is heavily annotated because its output will be the only way to troubleshoot.

Next is the scheduling which is done with cron by dumping the following script into `/etc/cron.d/`

	0 3 * * * root /backup-replay-database.sh >> /var/log/cron/backup-replay-database.log 2>&1
	

Some magic requires this file to end with an empty line. So don't forget it if you decide to try this at home.

Every night 3am, root will run the script `backup-replay-database.sh` and append the output to `/var/log/cron/backup-replay-database.log`. This is a shared docker volume, so I can read the output from the docker host.

All that remains is to start up the container.

	docker run --name replay-backup -v /var/log/cron:/var/log/cron --link postgres -d replay-backup

<pre>
CONTAINER           CPU %               MEM USAGE / LIMIT     MEM %               NET I/O             BLOCK I/O
replay-backup       0.00%               602.1 kB / 970.5 MB   0.06%               1.406 kB / 648 B    401.4 kB / 0 B
</pre>

When I said that this container would be lightweight, it appears to be using about 0% CPU and 600 kB memory. This is because its only waiting for the moment when it is time to take a backup. Until then it is cost free.

In the S3 bucket we can see the new backups start to appear.

![Amazon S3 Bucket](/assets/posts/2015-12-13-backup-database-in-a-rails-docker-setup/index.png)
