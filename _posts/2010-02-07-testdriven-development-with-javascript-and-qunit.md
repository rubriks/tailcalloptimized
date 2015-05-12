---
layout: migratedpost
title: "Testdriven development with JavaScript and QUnit"
description:
date: 2010-02-07 10:10:54
assets: assets/posts/2010-02-07-testdriven-development-with-javascript-and-qunit
image: 
---

<p>I've always had problems with JavaScript, because the lack of tooling, no good source for documentation and the most advanced way of debugging being <strong>alert</strong>. It has become easier over the years with jQuery and Firebug, but being used to C# I'm still a bit lost when it comes to JavaScript.  I was recently required to write some validation logic in JavaScript, and to make sure that I was on track the whole time, I adopted TDD in JavaScript with <a href="http://docs.jquery.com/QUnit">QUnit</a>.</p>
<h2 style="font-size: 1.5em;">QUnit</h2>
<p>Writing tests for JavaScript is actually much easier than unit testing C# code. You have so much more freedom in a <a href="http://en.wikipedia.org/wiki/Dynamic_programming_language">dynamically typed language</a> that makes it easier to write tests that will not pass, such as code in a statically typed language would not compile.</p>
<h3>Getting started</h3>
<p>Download <a href="http://jquery.com/">jQuery</a>, <a href="http://github.com/jquery/qunit/raw/master/qunit/qunit.js">qunit.js</a> and <a href="http://github.com/jquery/qunit/raw/master/qunit/qunit.css">qunit.css</a> and include them in an HTML document that will be host of your test suite.</p>
<pre class="brush:html"><!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
    <title>Required field validation</title>
    <script type="text/javascript" src="jquery-1.3.2.min.js"></script>
 <script type="text/javascript" src="qunit.js"></script>
    <link rel="stylesheet" href="qunit.css" type="text/css" media="screen" />

 <!-- SYSTEM UNDER TEST -->
 <script type="text/javascript" src="Validation.js"></script>
    <script type="text/javascript">
        $(document).ready(function () {
   /* TESTS GO HERE */
        });
    </script>
</head>
<body>
 <!-- QUNIT REQUIRED HTML -->
    <h1 id="qunit-header">Required field validation</h1>
    <h2 id="qunit-banner"></h2>
    <h2 id="qunit-userAgent"></h2>
    <ol id="qunit-tests"></ol>

 <!-- TEST STRUCTURE -->
    <div id="test-container" style="display: none">
    </div>
</body>
</html></pre>
<h3>Keywords</h3>
<p>You write your tests in the HTML document that you've created, and you use different HTML documents to divide your test suite in sections as it grows. My first test looks like this.</p>
<pre class="brush:javascript">module("Validate on blur()");
test("Should validate required field as false when input value is empty", function() {
 expect(1);

 /* Initialize the validation */
 heartbeat.initialize();

 /* Select the required 'Name' field and execute blur() event */
 $('#Name').blur();

 equals($('#name-field').data('isValid'), false, 'Expected the field to be marked as invalid on blur()');
});</pre>
<ul>
<li><strong>module</strong>([string] heading) - A way to group tests together under a common heading</li>
<li><strong>test</strong>([string] name, function()) - The name of the test and the test code</li>
<li><strong>expect</strong>(1) - tells the test runner that I will use 1 assert</li>
<li><strong>equals</strong>([obj] actual, [obj] expecting, [string] message) - compares actual object with expecting object and fails if they are not equal. The message describes the failing condition.</li>
<li><strong>ok</strong>([boolean] condition) - though not present here, you can use the ok method instead of equals if you want to check that a condition is true.</li>
</ul>
<p>It runs on the following HTML part.</p>
<pre class="brush:html"><div id="name-field" class="field name required">
 <label for="Name">Your name</label>
 <input id="Name" name="Name" type="text" value="" />
</div></pre>
<p>The beautiful thing about this is that I can write this test and get a red result without having implemented the actual validation logic yet. So, I implement the logic to make the test green and in my browser it looks like this.</p>
<p><img height="215" width="633" alt="test_success" src="http://litemedia.info/media/Default/Mint/test_success.png" title="test_success" class="alignnone size-full wp-image-618" /></p>
<p>One test executed successfully!</p>
<h3>Setup and Teardown</h3>
<p>Using the same HTML structure for all tests in the test suite is however not a good idea, because it will accuire state that will effectivly affect all other tests in the test suite. This means that we will have to recreate the HTML structure for every test run.</p>
<pre class="brush:javascript">/* SETUP / TEARDOWN */
QUnit.testStart = function (name) {
 $('#test-container').append('<div id="name-field" class="field name required"><label for="Name">Your name</label><input id="Name" name="Name" type="text" value="" /></div>');
};

QUnit.testDone = function (name, failures, total) {
 $('#test-container').empty();
}
/* ************* */</pre>
<p>There is no longer any reason not to unit test your JavaScript. You can download <a href="http://mint.litemedia.se/wp-content/uploads/JavaScript-TestSuite.zip">the whole example from here</a>.</p>
