---
layout: post
title: "Coverage is a broken metric"
description:
date: 2011-10-29 13:49:10
assets: assets/posts/2011-10-29-coverage-is-a-broken-metric
image: 
---

<p>In the backwaters of previous blog entry, <a href="http://litemedia.info/unit-test-file-system-operations">Using TDD to test file system operations</a>, I've been thinking alot about test coverage. This is the metric you use to measure how many lines of code % you traverse with your tests.</p>
<p>This metric is meant to tell you</p>
<ul>
<li>How much of the application you've tested</li>
<li>If you need to write more tests</li>
<li>When you're done testing</li>
</ul>
<p>Unfortunatly it does not do these things.</p>
<p>Our dear Uncle Bob propagates 100% coverage at all times. This is not very sane. Some tests are just useless. Take my previous blog post as an example. What would it gain us to test the following implementation of the file system wrapper?</p>
<pre class="brush:csharp">public bool PathExists(string targetPath)
{
    return Directory.Exists(targetPath);
}</pre>
<p>In a matter of tests "driving the design", we're already done with that part. In a matter of regression testing, don't even go there. The only thing you would test here is that System.IO is doing what it is supposed to, and that is not your job. That is up to Microsoft to verify.</p>
<p>Every test you write must give you more value, compared to the cost of writing the test. This means that doing focused testing on the following things is just creating waste.</p>
<ul>
<li>Wrapper classes</li>
<li>Constructors</li>
<li>Generated proxy classes (WCF services)</li>
<li>Trivial property setters and getters</li>
</ul>
<div>If you accidently traverse these while running specifications that's fine. That takes us on to the real topic here.</div>
<h2>What to test?</h2>
<p>You should not test how your application operates, but confirm that it does what it is supposed to.</p>
<ul>
<li>Test the 'what' not the 'how'.</li>
</ul>
<div>Why? Because if you focus on testing 'what', your tests won't break when you refactor your code, because you changed how to do things. As long as your program <strong>behavior</strong> stays the same your tests will stay green. This is incredible valuable as test maintenance is an incredible waste. Your tests should do two things</div>
<div><ol>
<li>Drive the design</li>
<li>Verify system behavior</li>
</ol>
<div>Everything else is a waste.</div>
<h2>Testing system behavior</h2>
<p>This means that we don't have tests called "CalculatorTest" or "NamePropertyShouldGetSameValueAsWasSet" because this does not test system behavior. Instead our tests looks like this.</p>
<ul>
<li>CreateTargetFolderIfDoesNotExist</li>
<li>CopyAnyFilesFromSourceFolderToTargetFolder</li>
<li>CopyAnyDirectoriesFromSourceFolderToTargetFolder</li>
<li>CopyFilesAndFoldersRecursivlyFromSourceToTargetFolder</li>
<li>NotCopySourceFileIfSameFileExistInTargetFolder</li>
<li>CopySourceFileIfNewerThanFileInTargetFolder</li>
<li>RemoveFilesFromTargetFolderNotPresentInSourceFolder</li>
</ul>
</div>
<p>All in all I have a coverage of 34%. Why? Because I have a wrapping layer that enables me to test the system without hitting the file system. I'm not testing that the wrapping layer is correclty mapped against System.IO, because that is not a part of the system specification, it is just a side effect of testing and a waste to test.</p>
<h2>Coverage does not prove the code to be correct</h2>
<p>Complete coverage does not mean that you're done testing.</p>
<pre class="brush:csharp">public double Divide(int a, int b)
{
    return a / b;
}

[Fact]
public void DivideTest()
{
    Assert.Equal(2, this.Divide(4, 2));
}</pre>
<p>Yes, this gives you 100% coverage, but the question stands, is the code correct? Is Divide(5, 2) == 2 expected behavior? We write specifications to decide what behavior to expect from the system.</p>
<ul>
<li>ShouldDivideNumbersWithAnIntegerResult</li>
<li>ShouldDivideNumbersWithFloatNumberResult</li>
<li>ShouldReturnZeroOnDivideWithZero</li>
</ul>
<p>Two last specifications were not proven with our previous test and might cause unexpected behavior from our program. Implementing these specifications would mean that we have 300% coverage on Divide, but does that mean that it is fully covered? <strong>Still no.</strong></p>
<p>Even Uncle Bob <a href="http://twitter.com/#!/unclebobmartin/status/55979248879538176">admits it</a>. "100% code coverage does not mean your code is correct. It _does_ mean that you tried."</p>
<h2>Conclusions about test coverage</h2>
<p>Focus on verifying that your system does what it is supposed to do. Don't worry about coverage, it will not tell you if you're done testing. It can't tell you if you've proven your program to be correct and it will not tell you the quality of your tests.</p>
<p>Instead you should</p>
<ul>
<li>Write a specification (red)</li>
<li>Implement that specification (green)</li>
<li>Refactor!</li>
</ul>
