---
layout: migratedpost
title: "Introduction to NHibernate"
description:
date: 2010-07-02 05:38:24
assets: assets/posts/2010-07-02-introduction-to-nhibernate
image: 
---

<p>I held this introduction to NHibernate yesterday and thought it might be nice to share this with you. It is just a basic NHibernate application without any fancy schmancy, to familiarize yourself with the concepts.</p>
<h2>Download and install the Northwind database</h2>
<p>This example builds upon the Northwind database. Please <a href="http://www.microsoft.com/downloads/details.aspx?FamilyID=06616212-0356-46a0-8da2-eebc53a68034">download and install it from here</a>. Once installed you need to find the database install SQL script that should be located in C:\SQL Server 2000 Sample Databases\instnwnd.sql and run it on a database that is available to you.</p>
<p><img class="alignnone size-full wp-image-742" title="schema" src="http://litemedia.info/media/Default/Mint/schema.png" width="395" height="215" /></p>
<h2>Create a domain model</h2>
<p>Next thing you create a new Visual Studio console project/solution. This will make it easy for you to run and debug your mappings later.</p>
<p><img class="alignnone size-full wp-image-744" title="solution" src="http://litemedia.info/media/Default/Mint/solution1.png" width="247" height="134" /></p>
<p>As you can see I've created a namespace for our OR-mappings and the domain model. Please <a href="http://www.nhforge.org/">download NHibernate</a> and reference it to your project. I've used version 2.1.2.GA in my solution. Don't forget to include binaries for lazy loading. I'm using Castle in this example.<img class="alignnone size-full wp-image-745" title="Domain" src="http://litemedia.info/media/Default/Mint/Domain.png" width="403" height="162" /></p>
<p>We keep the domain simple for this example. Here's what the code looks like for these two domain classes. An important aspect here is to keep the properties virtual.</p>
<pre class="brush:csharp">namespace NHibernateExample.Model
{
    public class Product
    {
        public Product()
        {
        }

        public Product(string name, double price)
        {
            Name = name;
            Price = price;
        }

        public virtual int ID { get; set; }

        public virtual string Name { get; set; }

        public virtual double Price { get; set; }

        public virtual Category Category { get; set; }
    }

    public class Category
    {
        public virtual int ID { get; set; }

        public virtual string Name { get; set; }

        public virtual string Description { get; set; }
    }
}</pre>
<h2>The object relational mapping</h2>
<p>You map the database tables to your entity object by writing hbm.xml-mapping files. There are <a href="http://www.fluentnhibernate.org">nicer ways to do the mapping through code</a>, but I will go through the most common way of mappings here instead.</p>
<pre class="brush:xml"><hibernate-mapping xmlns="urn:nhibernate-mapping-2.2" assembly="NHibernateExample" namespace="NHibernateExample.Model">
  <class name="NHibernateExample.Model.Product, NHibernateExample" table="Products">
    <id name="ID" column="ProductID">
      <generator class="identity" />
    </id>

    <property name="Name" column="ProductName" />
    <property name="Price" column="UnitPrice" />
    <many-to-one name="Category" class="NHibernateExample.Model.Category, NHibernateExample" column="CategoryID" />
  </class>
</hibernate-mapping></pre>
<p>Notice that the ID is specified to be generated as "identity". This means that ID is an identity column in the table, and that the SQL server will generate the value for us on insert.  You can also see how Product is related to Category with a many-to-one relationship. We specify the foreign key column name in the column attribute.</p>
<pre class="brush:xml"><hibernate-mapping xmlns="urn:nhibernate-mapping-2.2" assembly="NHibernateExample" namespace="NHibernateExample.Model">
  <class name="NHibernateExample.Model.Category, NHibernateExample" table="Categories">
    <id name="ID" column="CategoryID">
      <generator class="identity" />
    </id>

    <property name="Name" column="CategoryName" />
    <property name="Description" />
  </class>
</hibernate-mapping></pre>
<p>Description does not need to specify column name, because it is the same as property name. This is one of the defaults of NHibernate.  You'll have to mark the hbm.xml-files as Embedded Resources for NHibernate to find them.<img class="alignnone size-full wp-image-748" title="embedded_resource" src="http://litemedia.info/media/Default/Mint/embedded_resource.png" width="315" height="168" /></p>
<h2>NHibernate configuration</h2>
<p>The configuration for NHibernate specifies what database provider to use, SQL dialect and connection string to the database. If you want NHibernate to be verbose about it's SQL you can set show_sql to true.</p>
<pre class="brush:xml"><?xml version="1.0" encoding="utf-8" ?>
<hibernate-configuration xmlns="urn:nhibernate-configuration-2.2">
  <session-factory>
    <property name="connection.provider">NHibernate.Connection.DriverConnectionProvider</property>
    <property name="dialect">NHibernate.Dialect.MsSql2000Dialect</property>
    <property name="connection.driver_class">NHibernate.Driver.SqlClientDriver</property>
    <property name="connection.connection_string">Data Source=(local);Initial Catalog=Northwind;Integrated Security=SSPI</property>
    <property name='proxyfactory.factory_class'>NHibernate.ByteCode.Castle.ProxyFactoryFactory, NHibernate.ByteCode.Castle</property>
    <property name="show_sql">true</property>
  </session-factory>
</hibernate-configuration></pre>
<p>This xml should be placed in a hibernate.cfg.xml that should be placed in the root of your project. Make sure to mark it as <strong>Copy to Output Directory: Copy Always</strong>. This file must be present in the output bin directory, unless you choose to specify the path while building the SessionFactory.</p>
<p><img class="alignnone size-full wp-image-749" title="copy_always" src="http://litemedia.info/media/Default/Mint/copy_always.png" width="315" height="169" /></p>
<h2>Session Management</h2>
<p>If you're writing a web application, you might want to consider using one session for each and every request. You can read more about how to accomplish that <a href="http://ryanlanciaux.com/post/nhibernate-session-per-request.aspx">here</a> and <a href="http://blog.benday.com/archive/2005/03/16/198.aspx">here</a>. In this simple example we will open one session for every database call. That should not be a problem since ISession is considered to be a lightweight object, in contrary to ISessionFactory that should be built only once per application.</p>
<pre class="brush:csharp">public class SessionManager
{
 private ISessionFactory globalSessionFactory;

 private static readonly object PadLock = new object();
 private static SessionManager instance;

 public static SessionManager Current
 {
  get
  {
   lock (PadLock)
   {
    return instance ?? (instance = new SessionManager());
   }
  }
 }

 public ISession OpenSession()
 {
  if (globalSessionFactory == null)
  {
   globalSessionFactory = CreateSessionFactory();
  }

  return globalSessionFactory.OpenSession();
 }

 private ISessionFactory CreateSessionFactory()
 {
  return new Configuration()
   .Configure()
   .AddAssembly(typeof(SessionManager).Assembly)
   .BuildSessionFactory();
 }

 private SessionManager()
 {
 }
}</pre>
<p>In CreateSessionFactory we do Configure() to load the hibernate.cfg.xml file, and AddAssembly will search for and load our Product.hbm.xml and Category.hbm.xml mapping files.</p>
<h2>RepositoryBase pattern</h2>
<p>Now when we easily can get an instance of ISession from our SessionManager, we can figure out how to do simple CRUD operations on our entities. For this we create a base class for our ProductRepository and CategoryRepository to derive from later.</p>
<pre class="brush:csharp">public abstract class RepositoryBase<TEntity>
 where TEntity : class
{
 protected SessionManager SessionManager;

 public RepositoryBase(SessionManager sessionManager)
 {
  SessionManager = sessionManager;
 }

 public TEntity GetById(object id)
 {
  using (var session = SessionManager.OpenSession())
  {
   return session.Get<TEntity>(id);
  }
 }

 public void Insert(TEntity TEntity)
 {
  using (var session = SessionManager.OpenSession())
  using (var transaction = session.BeginTransaction())
  {
   session.Save(TEntity);
   transaction.Commit();
  }
 }

 public void Update(TEntity TEntity)
 {
  using (var session = SessionManager.OpenSession())
  using (var transaction = session.BeginTransaction())
  {
   session.Update(TEntity);
   transaction.Commit();
  }
 }

 public void Delete(TEntity TEntity)
 {
  using (var session = SessionManager.OpenSession())
  using (var transaction = session.BeginTransaction())
  {
   session.Delete(TEntity);
   transaction.Commit();
  }
 }
}</pre>
<p>We need transactions for all operations that changes the datasource. That's because we can't know if our Insert operation will have to insert data into more than one table, and if it conflicts somewhere along the way we would like the operation to be atomic, and rollback to the state before we started our insert.  Here's how we implement ProductRepository and CategoryRepository now.</p>
<pre class="brush:csharp">public class ProductRepository : RepositoryBase<Product>
{
 public ProductRepository(SessionManager sessionManager)
  : base(sessionManager)
 {
 }

  public IEnumerable<Product> GetByCategory(Category category)
  {
   using (var session = sessionManager.OpenSession())
   {
    return session.CreateQuery("FROM Product as product WHERE product.Category = :category")
     .SetEntity("category", category)
     .List<Product>();

   }
  }
}

public class CategoryRepository : RepositoryBase<Category>
{
 public CategoryRepository(SessionManager sessionManager)
  : base(sessionManager)
 {
 }
}</pre>
<p>I've also extended the ProductRepository with a database call to get all Products within a specfied category. A query that is specific for the Product entity and not part of the base repository.</p>
<h2>An example application</h2>
<p>Here's an example of how we can use the framework.</p>
<pre class="brush:csharp">public class Program
{
 public static void Main(string[] args)
 {
  var beverages = new CategoryRepository(SessionManager.Current).GetById(1);
  var product = new Product("Juice", 12d) { Category = beverages };

  var repository = new ProductRepository(SessionManager.Current);

  repository.Insert(product);
  product.Price = 15d;

  repository.Update(product);
  repository.Delete(product);

  foreach (var beverage in repository.GetByCategory(beverages))
  {
   Console.WriteLine("{0}, {1} {2:c}", beverage.ID, beverage.Name, beverage.Price);
  }

  Console.ReadLine();
 }
}</pre>
<p>The whole example can be downloaded from <a href="http://mint.litemedia.se/wp-content/uploads/NHibernateExample.zip">here</a>. (Visual Studio 2008 solution)</p>
