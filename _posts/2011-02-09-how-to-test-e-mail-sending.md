---
layout: migratedpost
title: "How to test e-mail sending"
description:
date: 2011-02-09 06:45:01
assets: assets/posts/2011-02-09-how-to-test-e-mail-sending
image: 
---

<p>How do you test e-mail sending with System.net? This is actually quite trivial. You should start by creating a wrapper for the System.Net.Mail.SmtpClient to make DI and testing easier. It should look like this.</p>
<pre class="brush:csharp">namespace LiteMedia.EmailSending
{
    public class SmtpClient : System.Net.Mail.SmtpClient, ISmtpClient
    {
        public SmtpClient()
        {
        }

        public SmtpClient(System.Net.Mail.SmtpDeliveryMethod deliveryMethod, string pickupDirectoryLocation)
        {
            DeliveryMethod = deliveryMethod;
            PickupDirectoryLocation = pickupDirectoryLocation;
        }

        public new void Send(System.Net.Mail.MailMessage message)
        {
            base.Send(message);
        }
    }

    public interface ISmtpClient
    {
        void Send(System.Net.Mail.MailMessage message);
    }
}</pre>
<p>Easy enough. Now you can use ISmtpClient as a dependency to those classes that needs e-mail sending capability, and easily mock it out in your tests.  More interesting is how you can use this to test that your e-mails have the correct recipient, etc. Consider the following usage of the code above.</p>
<pre class="brush:csharp">namespace LiteMedia.EmailSending
{
    using System.Net.Mail;

    public class EmailNotification : INotifier
    {
        private readonly ISmtpClient client;

        public EmailNotification(ISmtpClient client)
        {
            this.client = client;
        }

        public void Notify(string message)
        {
            using (var mailMessage = new MailMessage())
            {
                mailMessage.Subject = "Notification from litemedia.se";
                mailMessage.Body = message;
                mailMessage.From = new MailAddress("spam@litemedia.se");
                mailMessage.To.Add("spam@litemedia.se");

                client.Send(mailMessage);
            }
        }
    }

    public interface INotifier
    {
        void Notify(string message);
    }
}</pre>
<p>We can test this, first by mocking away the client with Rhino Mocks.</p>
<pre class="brush:csharp">namespace LiteMedia.EmailSending
{
    using System.Net.Mail;
    using NUnit.Framework;
    using Rhino.Mocks;

    [TestFixture]
    public class EmailNotificationShould
    {
        private delegate void SendDelegate(MailMessage message);

        [Test]
        public void SendEmailThatOriginatesFromSpamAddress()
        {
            const string ExpectedFromAddress = "spam@litemedia.se";

            /* Setup */
            var client = MockRepository.GenerateStub<ISmtpClient>();
            var notification = new EmailNotification(client);
            MailMessage mailMessage = null;

            /* Arrange */
            client.Stub(c => c.Send(Arg<MailMessage>.Is.Anything))
                .Do(new SendDelegate(message => mailMessage = message));

            /* Act */
            notification.Notify("There is a new blog post at mint.litemedia.se");

            /* Assert */
            Assert.That(mailMessage.From.Address, Is.EqualTo(ExpectedFromAddress));
        }
    }
}</pre>
<p>What I do here, is generating a stub with rhino mocks, that will take the input MailMessage to ISmtpClient and store it in our local mailMessage variable. There I can assert what From-address was used calling the Send-method. Neat?  We can take this a step further and actually involve System.Net.Mail.SmtpClient and verify the e-mail that is created. Here we call SmtpClient with a pickup directory where the e-mail should be stored as an eml file, instead of sent to the SMTP server.  The test will pickup the eml file, assert on it and then delete it.</p>
<pre class="brush:csharp">[Test]
public void ProduceAnEmailThatOriginatesFromSpamAddress()
{
    const string ExpectedFromAddress = "spam@litemedia.se";

    /* Setup */
    var client = new SmtpClient(SmtpDeliveryMethod.SpecifiedPickupDirectory, Environment.CurrentDirectory);
    var notification = new EmailNotification(client);
            
    /* Test */
    notification.Notify("There is a new blog post at mint.litemedia.se");

    /* Assert */
    var emlFilePath = Directory.GetFiles(Environment.CurrentDirectory, "*.eml")[0];
    try
    {
        var email = File.ReadAllText(emlFilePath);
        Assert.That(email, Is.StringContaining("From: " + ExpectedFromAddress));
    }
    finally
    {
        /* Teardown */
        File.Delete(emlFilePath);
    }
}</pre>
<p>This is what the eml file contents looks like.</p>
<pre>X-Sender: spam@litemedia.se
X-Receiver: spam@litemedia.se
MIME-Version: 1.0
From: spam@litemedia.se
To: spam@litemedia.se
Date: 9 Feb 2011 07:39:12 +0100
Subject: Notification from litemedia.se
Content-Type: text/plain; charset=us-ascii
Content-Transfer-Encoding: quoted-printable

There is a new blog post at mint.litemedia.se</pre>
