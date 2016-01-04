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

| CONTAINER ID       | IMAGE                    | COMMAND                 | CREATED            | STATUS             | PORTS                 | NAMES       |
| ------------------ | ------------------------ | ----------------------- | ------------------ | ------------------ | --------------------- | ----------- |
| f4d4069d448b       | replay-app               | "/var/www/script/dela"  | 2 days ago         | Up 2 days          | 3000/tcp              | replay-jobs |
| b7d0ec9d5a49       | replay-app               | "/var/www/script/rail"  | 3 days ago         | Up 3 days          | 0.0.0.0:80->3000/tcp  | replay-app  |
| d55171690310       | zsoltm/postgresql-armhf  | "/entrypoint.sh postg"  | 8 days ago         | Up 8 days          | 5432/tcp              | postgres    |

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

{% gist miklund/0d94b4a9c772a94c4e7b Dockerfile %}

This is very straight forward. There are two important files that are included in this container. First is the script that does the backup.

{% gist miklund/0d94b4a9c772a94c4e7b backup-replay-database.sh %}

This script dumps the database, removes old backups and then pushes to S3 bucket. It is heavily annotated because its output will be the only way to troubleshoot.

Next is the scheduling which is done with cron by dumping the following script into `/etc/cron.d/`

```bash
0 3 * * * root /backup-replay-database.sh >> /var/log/cron/backup-replay-database.log 2>&1
```

Some magic requires this file to end with an empty line. So don't forget it if you decide to try this at home.

Every night 3am, root will run the script `backup-replay-database.sh` and append the output to `/var/log/cron/backup-replay-database.log`. This is a shared docker volume, so I can read the output from the docker host.

All that remains is to start up the container.

```bash
docker run --name replay-backup -v /var/log/cron:/var/log/cron --link postgres -d replay-backup
```

| CONTAINER          | CPU %              | MEM USAGE / LIMIT    | MEM %              | NET I/O            | BLOCK I/O      |
| ------------------ | ------------------ | -------------------- | ------------------ | ------------------ | -------------- |
| replay-backup      | 0.00%              | 602.1 kB / 970.5 MB  | 0.06%              | 1.406 kB / 648 B   | 401.4 kB / 0 B |

When I said that this container would be lightweight, it appears to be using about 0% CPU and 600 kB memory. This is because its only waiting for the moment when it is time to take a backup. Until then it is cost free.

In the S3 bucket we can see the new backups start to appear.

![Amazon S3 Bucket](/assets/posts/2015-12-13-backup-database-in-a-rails-docker-setup/index.png)
