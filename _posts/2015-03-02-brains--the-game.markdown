---
layout: post
title: "Brains, The Game"
description: Do you have the brains for this game? A game developed with only javascript and buttons.
date: 2015-03-02 16:37:12
tags: javascript, game development, puzzle game
assets: assets/posts/2015-03-02-brains--the-game
image: assets/posts/2015-03-02-brains--the-game/title.jpg
author:
    name: Mikael Lundin
    email: hello@mikaellundin.name
    web: http://mikaellundin.name
    twitter: mikaellundin
    github: miklund
    linkedin: miklund
---

In my book, [Testing with F#](http://www.amazon.com/Testing-F-Mikael-Lundin/dp/1784391239/), I work out an example on model-based testing using a game called Brains.

I first met this game on the Amiga when I was growing up, facinated by its simplicity and genious. The rules goes like this

* Recreate the grid on the right to the left
* Click the grid to place out 1's
* Each 1 you place will increase the value of neighbours
* If a cell is increased from 4, it will turn-around and become 1

Here's the game. (you need to read this in a javascript enabled browser)

## Play Brains!

<div>
    <style>
    .controls {
      clear: left;
    }
    .board {
      margin-right: 12px;
      float: left;
      font-size: 12pt;
    }
    .board input {
      width: 24px;
      height: 24px;
      line-height: 24px;
      margin: 1px;
      border: 1px solid gray;
      background-color: #FAFAFA;

      -webkit-appearance: none;
      -webkit-border-radius: 0;
    }
    .board.success input {
      background-color: #F0FFF0;
    }
    .board.failure input {
      background-color: #FFF0F0;
    }
    .width-4-5 {
      width: 120px;
    }
    </style>
    <div id="brains"></div>
    <p class="controls">
      <input id="new" type="button" value="New" onclick="brains.new()" />
      <input id="reset" type="button" value="Reset" onclick="brains.reset()" />
    </p>
    <script src="/assets/posts/2015-03-02-brains--the-game/brains.js"></script>
    <script>
      var brains = new Brains(document.getElementById('brains'));
      brains.create(4, 5);
    </script>
</div>

## The Code

Since this is a programming blog it wouldn't do unless I posted the code for the game also.

<script src="https://gist.github.com/miklund/217a98878e6802b262cd.js"></script>
