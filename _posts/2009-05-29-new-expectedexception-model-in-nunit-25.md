---
layout: post
title: "New ExpectedException model in NUnit 2.5"
description:
date: 2009-05-29 22:00:07
assets: assets/posts/2009-05-29-new-expectedexception-model-in-nunit-25
image: 
---

<p>A new version of NUnit is released and there is a new way to handle expected exceptions. Until recently NUnit did this by putting an attribute on your test method, very much how MsTest still works.</p>
<pre class="brush:csharp">[TestMethod]
[ExpectedException(typeof(NullReferenceException))]
public void NullReferenceExceptionTestInMsTest()
{
    /* Setup */
    string[] names = null;
    int numberOfNames = 0;

    /* Test */
    numberOfNames = names.Length;
}</pre>
<p>You read by the method header that this test is throwing an exception. The test runner will catch the specified exception and try to determine if it was the expected exception thrown. The bad thing about this is that you put your assertion outside your test and that hurts readability. The NUnit team has conjured up the following solution.</p>
<pre class="brush:csharp">[Test(Description = "Testing the new ExpectedException functionality in NUnit 2.5")]
public void NullReferenceExceptionTest()
{
    /* Setup */
    string[] names = null;
    int numberOfNames = 0;

    /* Assert */
    Assert.Throws<NullReferenceException>(

        /* Test */
        () => numberOfNames = names.Length);

    /* Assert that numberOfNames is still zero */
    Assert.That(numberOfNames == 0);
}</pre>
<p>The assert is nicely put inside the test and you can actually assert that there were now side effects from the thrown exception. This is a major improvement. What bothers me is that it looks like my first assertion comes before the test. We all know that the test has to run first, because it is an argument that has to be evaluated, but this does not really look good either.</p>
<pre class="brush:csharp">[Test(Description = "Testing the new ExpectedException functionality in NUnit 2.5")]
public void NullReferenceExceptionTest()
{
    /* Setup */
    string[] names = null;
    int numberOfNames = 0;

    /* Test */
    TestDelegate throwingCode = () => numberOfNames = names.Length;

    /* Assert */
    Assert.Throws<NullReferenceException>(throwingCode);

    /* Assert that numberOfNames is still zero */
    Assert.That(numberOfNames == 0);
}</pre>
<p>Pretty neat, huh! Keep it up, NUnit team! You know that we all love you.</p>
