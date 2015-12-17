---
layout: post
title: "Authentication through OpenID"
description:
date: 2008-09-11 04:52:51
assets: assets/posts/2008-09-11-authentication-through-openid
image: 
---

<p>I hate to register as soon as I want to try something out or download a piece of code. It is a real drag to find a new login, since your usual crap-site-login has already been taken. Then the next time you get to the site you problably have forgot that you're already registered, and sign up with another account.  Why does it work like this? Does it have to? In Mint I will try to reduce the amount of registration a user have to do by three reasons.</p>
<ol>
<li>Registration is just another step between google and the application, and I'm going to remove as many steps as possible. If you're interested in Mint, you should be inside the application playing with it even before you knew what happened. </li>
<li>Storing user information is a risky business. I don't want to be held responsible when the password database is stolen, and I don't want to think about recreating all those accounts if the user table is dropped.</li>
<li>I really hate registrations and I'm sure that I'm not the only one that does. Every step in Mint you take should be a step towards productivity.</li>
</ol>
<div>It is realatively easy to solve this problem. I was planning to have a big "Try it out"-button on the front page. If you click it you will end up in Mint with a new user and some nice help bubbles telling you what to do and how to do it. An account was created automatically on the fly, and the user doesn't have to worry.</div>
<div>When the user is done playing around, he could choose to press the "Keep this account" button. That will popup a dialog box that would ask him to chosse an OpenID. For those that don't have an OpenID, will get a pointer to where they will get one and what it is good for.</div>
<div></div>
<div><a href="http://www.openid.net"><img height="160" width="480" alt="OpenID" src="http://openid.net/wp-content/uploads/2007/10/openid_big_logo_text.png" title="OpenID logo" class=" " /></a></div>
<div></div>
<div>What is OpenID? It involves two things. A provider and a login. When you're asked to login with an OpenID you will specify an URL that will identify you. Mine is <a href="http://bokmal.myopenid.com/">http://bokmal.myopenid.com/</a>. From that URL the user will be sent to the provider (myopenid in this case) and asked to login. After login, I will be sent back to the site that asked for authentication.</div>
<div>So, to make an analogy you're going to the library to get some books, but they librarian behind the counter won't give you any books because she doesn't know you. Then you give her your passport that in Sweden is issued by the police. Since the librarian trusts the police, she will admit the driving licence as a proper identification of you, and now lend you the books.</div>
<div>So I won't have to worry about storing passwords, and another good thing is that many people already have an OpenID-account without even knowing it, though bloggs, communities and ISPs.</div>
