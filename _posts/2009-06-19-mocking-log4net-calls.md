---
layout: migratedpost
title: "Mocking log4net calls"
description:
date: 2009-06-19 18:39:41
assets: assets/posts/2009-06-19-mocking-log4net-calls
image: 
---

<p>For the first time ever, I found the need to test logging calls. Normally I would call that stupid but I had a situation that looked very much like this. (don't ask why)</p>
<pre class="brush:csharp">public Customer RetrieveCustomer(Guid id)
{
    Customer result = null;

    try
    {
        result = dataAccess.GetCustomerByID(id);
    }
    catch (DbException ex)
    {
        Log.Error("An exception was thrown from the database", ex);
    }

    return result;
}</pre>
<p><em>This code is very much simplified for this blog post.</em> We have a very delicate situation where the RetrieveCustomer method swallows all database errors on the spot and return a default value. I would like to pass the exception on and let it surface and handled in the view, but right now that is not possible. Since I'm writing code that I'm not comfortable with, I'm going to write a test to confirm what is going on.</p>
<pre class="brush:csharp">[TestMethod]
public void ShouldSwallowDbExceptionButLogError()
{
    /* Setup */
    var exception = new TestDbException();

    var da = MockRepository.GenerateStub<DAL.CustomerDataAccess>();
    ILog log = MockRepository.GenerateStub<ILog>();
    var repository = new CustomerRepository(da, log);

    /* Arrange */
    da.Stub(dataAccess => dataAccess.GetCustomerByID(Arg<Guid>.Is.Anything))
        .Throw(exception);

    /* Act */
    repository.RetrieveCustomer(Guid.Empty);

    /* Assert */
    log.AssertWasCalled(logger => 
        logger.Error(Arg<string>.Is.Anything, Arg<Exception>.Is.Same(exception)));
}</pre>
<p>This was done using MsTest and Rhino Mocks. I just love that AAA syntax.</p>
