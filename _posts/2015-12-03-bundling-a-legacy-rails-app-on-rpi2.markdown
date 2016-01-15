---
layout: post
title: "Bundling a legacy rails app on RPi2"
description: How to get therubyracer 0.11 to work with libv8 on ARM processor architecture.
date: 2015-12-03 07:06:56
tags: ruby, rails, legacy, rpi2, raspberry pi 
assets: assets/posts/2015-12-03-building-a-legacy-rails-app-on-rpi2
image: assets/posts/2015-12-03-building-a-legacy-rails-app-on-rpi2/title.jpg
---

If you don't care how I solved this, but only want a libv8 with version 3.11.7.12 compiled for ARMv7, scroll to the bottom of this article and download it from there.

I was about to call it a quits. I was working on getting an old Rails app up and running on a Raspberry Pi 2, when it was failing during bundle install. therubyracer was failing to compile its native extensions with libv8 because it tried to compile for i64 when the correct architecture is armv7.

After researching a bit on the internet I found the answer to recompile libv8 on the RPi2, patch the source for it to work on ARMv7 and bundle your own gem. These are the threads that was most helpful.

* [unable to build therubyracer/libv8 on arm A10](https://github.com/cowboyd/therubyracer/issues/255)
* [Doesn't build/install on ARM (Raspberry Pi armv6I)](https://github.com/cowboyd/therubyracer/issues/257)

There is not much more information on the internet than this, due to the Rails version is legacy and RPi2 didn't even exist when this version of Rails were active.

Here's what I did to make it work.

1. Clone libv8 to your Raspberry Pi.

        git clone git://github.com/cowboyd/libv8.git

2. Checkout the 3.11 branch.

        git checkout 3.11

3. Install dependencies to this project, unless you already have them

        bundle install

4. Checkout v8 and gyp.

    This should work by simply doing `bundle exec rake checkout` but I found that the subrepos were broken links. So what I did was that I found the correct versions and cloned them manually.

        git clone https://github.com/v8/v8.git vendor/v8
        git checkout 3.16.13. -f
        svn checkout --force http://gyp.googlecode.com/svn/trunk build/gyp --revision 1501

5. Then I made a change to the patch in `patches/fPIC-on-x64.patch` 

        diff --git a/patches/fPIC-on-x64.patch b/patches/fPIC-on-x64.patch
        index 7388132..a95341a 100644
        --- a/patches/fPIC-on-x64.patch
        +++ b/patches/fPIC-on-x64.patch
        @@ -6,7 +6,7 @@ index ebdf557..c7a59bc 100644
                    [ 'OS=="linux"', {
                      'cflags': [ '-ansi' ],
                    }],
        -+          [ '(OS=="linux" or OS=="freebsd" or OS=="solaris") and v8_target_arch=="x64" and component=="static_library"', {
        ++          [ '(OS=="linux" or OS=="freebsd" or OS=="solaris") and (v8_target_arch=="x64" or v8_target_arch=="arm") and component=="static_library"', {
         +            'cflags': [ '-fPIC' ],
         +          }],
                    [ 'visibility=="hidden"', {

6. With the patch all patched up, I started the compilation. This takes quite some time on a RPi2.

        bundle exec rake compile

7. When the compilation is done, the result should appear in the v8/out folder. With this we can package a new gem.

        bundle exec rake binary

    The new gem will appear in `pkg/libv8-3.11.8.17-arm-linux.gem`

8. Now you can install therubyracer with our new gem as dependency on your system.

        gem install pkg/libv8-3.11.8.17-arm-linux.gem therubyracer -v '0.11.4'

And you're good to go.

If you like me am trying to get a legacy version of Rails to run on a Raspberry Pi 2, you do not have to complete all these steps, but just download the gem that I've already compiled.

* Download the gem from here: [libv8-3.11.8.17-arm-linux.gem](https://github.com/rubriks/r3pl4y/tree/master/vendor/cache)

Put it your `vendor/cache` folder and `bundle install` will pick it up before downloading from online archives. Make sure that you're really referencing therubyracer 0.11.4 in your Gemfile.

    gem 'libv8', '3.11.8.17'
    gem 'therubyracer', '0.11.4'

That's it and good luck!

