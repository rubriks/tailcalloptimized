---
layout: migratedpost
title: "Unit Testing - What to test"
description:
date: 2009-08-24 19:16:23
assets: assets/posts/2009-08-24-unit-testing-what-to-test
image: 
---

This is a follow up on a post from <a href="http://blog.typemock.com/">Typemock</a><a href="http://blog.typemock.com/"> Insider</a>, <a href="http://blog.typemock.com/2009/08/unit-testing-what-not-to-test.html">Unit Testing - What not to test...</a>

You should test everything! except when you've got a good reason not to. One of the most common reasons for me is <em>"testing this will not add any value, just increase complexity and coupling between my tests and system under test"</em>.

I hear a lot of other reasons not to test that I can't find legitimate
<ul>
 <li><strong>It's too complex</strong>

This is the best reason to test, but I've heard this argument from several developers. When it is too hard, they won't put their mind to it. Quite often they write bad tests that just run through the code and make sure it doesn't throw any exception at them. That if something is a useless test.

Instead, you should refactor until the code is not too complex to test. That will add a lot of value to the whole system.</li>
 <li><strong>It's built on EPiServer</strong> <em>(or Sharepoint, or Umbraco, or [insert your framework here])</em>

This is just a crap excuse for lazy programmers. You're nothing but one google result away from learning how to combine unit testing with any framework.</li>
 <li><strong>It's all frontend magic</strong>

Then maybe unit tests aren't the way to go. There are other kind of tests that will deal with the complexity of frontend logic. You can use frameworks like <a href="http://watin.sourceforge.net/">WatiN</a> or <a href="http://seleniumhq.org/">Selenium</a>. There's <em>Web Test</em> from the Microsoft Team Suite that will also do the trick.

You should also be considered with not putting too much logic in your frontend layer. When you feel the need to unit test your frontend logic, you probably have the need to refactor down the logic,  one more layer of abstraction.</li>
 <li> <strong>It's too simple, there's no logic</strong>

If you have a facade with the only purpose is to call another layer, you might not want to write a unit test for each method in the facade and make sure that method calls the next layer. What you can do, is to write an integration test that looks on every public method in this layer and makes sure that it calls a method in the underlying layer. This is not a unit test, but rather a constraint put on the architectural design.

You can accomplish the same thing by setting an <a href="http://www.ndepend.com/">NDepend</a> rule on the build server. That could be complementary to the test and should yield the same result.</li>
</ul>
If you're unsure, write the test. After a while you might come to the conclusion that the test is useless and then remove it.
