---
layout: post
title: "Mocking out and ref parameters with Rhino Mocks"
description:
date: 2010-10-14 20:29:19
assets: assets/posts/2010-10-14-mocking-out-and-ref-parameters-with-rhino-mocks
image: 
---

<p>Today I learned that you can mock out and ref parameters with the following syntax in Rhino Mocks.</p>
<pre class="brush:csharp">[TestMethod]
public void ShowHowRhinoMocksOutRefParameterWorks()
{
    /* Setup */
    var mock = MockRepository.GenerateMock<IBookRepository>();
    var bookFinder = new BookFinder(mock);

    /* Arrange */
    mock.Expect(rep => rep.FindByTitle(Arg<string>.Is.Anything, out Arg<int>.Out(10).Dummy))
        .Return(new List<Book>());

    /* Act */
    var count = 0;
    var books = bookFinder.FindBooks("hitchhikers guide to the galaxy", out count);

    /* Assert */
    Assert.AreEqual(10, count);
}</pre>
