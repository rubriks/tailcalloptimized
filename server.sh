#!/bin/sh

trap "echo TRAPed signal" HUP INT QUIT KILL TERM

# start jekyll in the background
jekyll serve --detach

# start gulp in the foreground
gulp watch

# kill jekyll
echo "stopping jekyll"
pkill jekyll -f

echo "exited $0"
