---
layout: post
title: "How to test e-mail sending"
description:
date: 2011-02-09 06:45:01
assets: assets/posts/2011-02-09-how-to-test-e-mail-sending
image: 
---

How do you test e-mail sending with System.net? This is actually quite trivial. You should start by creating a wrapper for the System.Net.Mail.SmtpClient to make DI and testing easier. It should look like this.

<script src="https://gist.github.com/miklund/96e6a82ef4e89e76e3d5.js?file=SmtpClient.cs"></script>

Easy enough. Now you can use ISmtpClient as a dependency to those classes that needs e-mail sending capability, and easily mock it out in your tests.  More interesting is how you can use this to test that your e-mails have the correct recipient, etc. Consider the following usage of the code above.

<script src="https://gist.github.com/miklund/96e6a82ef4e89e76e3d5.js?file=EmailNotification.cs"></script>

We can test this, first by mocking away the client with Rhino Mocks.

<script src="https://gist.github.com/miklund/96e6a82ef4e89e76e3d5.js?file=EmailNotificationShould.cs"></script>

What I do here, is generating a stub with rhino mocks, that will take the input MailMessage to ISmtpClient and store it in our local mailMessage variable. There I can assert what From-address was used calling the Send-method. Neat?  We can take this a step further and actually involve System.Net.Mail.SmtpClient and verify the e-mail that is created. Here we call SmtpClient with a pickup directory where the e-mail should be stored as an eml file, instead of sent to the SMTP server.  The test will pickup the eml file, assert on it and then delete it.

<script src="https://gist.github.com/miklund/96e6a82ef4e89e76e3d5.js?file=ProduceAnEmailThatOriginatesFromSpamAddress.cs"></script>

This is what the eml file contents looks like.

```
X-Sender: spam@litemedia.se
X-Receiver: spam@litemedia.se
MIME-Version: 1.0
From: spam@litemedia.se
To: spam@litemedia.se
Date: 9 Feb 2011 07:39:12 +0100
Subject: Notification from litemedia.se
Content-Type: text/plain; charset=us-ascii
Content-Transfer-Encoding: quoted-printable

There is a new blog post at mint.litemedia.se
```
