---
layout: post
title: "Hand rolling your datalayer"
description:
date: 2010-03-16 19:35:33
assets: assets/posts/2010-03-16-hand-rolling-your-datalayer
image: 
---

<p>There are higher and higher demands on you as a developer to learn more and more frameworks that I sometimes get lost in the djungle out there. If you ask me to store some data into a database my mind will automatically go into an <a href="http://www.nhforge.org/">NHibernate</a>, <a href="http://msdn.microsoft.com/en-us/library/aa697427(VS.80).aspx">Entity Framework</a>, <a href="http://msdn.microsoft.com/en-us/library/bb425822.aspx">Linq 2 SQL</a>, <a href="http://www.castleproject.org/activerecord/index.html">Castle Active Record</a> mantra and start discussing with itself what is the perfect framework for this specific problem.  When you have four entities you don't really need an ORM to handle persistance. In fact, using an ORM in that case is same as <em>"<a href="http://ayende.com/Blog/archive/2009/08/15/the-least-common-denominator-approach.aspx">stealing from your clients</a>"</em>. <em>(I'm aware that the link goes to a post that states the opposite of my argument)</em> I suggest we take a moment here to reflect on how you hand roll a data layer that will suit for up to four entities.  First we need some sort of provider that may deliver us data connections and commands. Some sort of object that will get the plumbing out of the way.</p>
<pre class="brush:csharp">/// <summary>
/// Provider class for the database connection and command
/// </summary>
public class DataProvider : IDataProvider
{
    private readonly ConnectionStringSettings settings;

    /// <summary>
    /// Create new instance of DataProvider
    /// </summary>
    /// <param name="connectionStringName">Name of the active connectionString in the App.Config/Web.Config</param>
    public DataProvider(string connectionStringName)
    {
        settings = ConfigurationManager.ConnectionStrings[connectionStringName];

        if (settings == null)
        {
            throw new ConfigurationErrorsException("Expected a connectionString with the name " + connectionStringName);
        }

        DbProviderFactory = DbProviderFactories.GetFactory(settings.ProviderName);
    }

    /// <summary>
    /// Gets the DbProviderFactory
    /// </summary>
    public DbProviderFactory DbProviderFactory { get; private set; }

    /// <summary>
    /// Opens a new connection to the database. Make sure you close it before you're done.
    /// </summary>
    /// <returns>An open DbConnection</returns>
    public DbConnection OpenConnection()
    {
        var connection = DbProviderFactory.CreateConnection();
        connection.ConnectionString = settings.ConnectionString;
        connection.Open();

        return connection;
    }

    /// <summary>
    /// Creates a new DbCommand
    /// </summary>
    /// <param name="connection">The connection we utilize for this command</param>
    /// <param name="query">The SQL query to run</param>
    /// <returns>The DbCommand</returns>
    public DbCommand CreateCommand(DbConnection connection, string query)
    {
        var command = DbProviderFactory.CreateCommand();
        command.Connection = connection;
        command.CommandText = query;

        return command;
    }

    /// <summary>
    /// Creates a DbParameter for parameterized database calls
    /// </summary>
    /// <param name="name">Name of the parameter</param>
    /// <param name="type">Type of the parameter</param>
    /// <param name="value">Value of the parameter</param>
    /// <returns>A DbParameter</returns>
    public DbParameter CreateParameter(string name, DbType type, object value)
    {
        var parameter = DbProviderFactory.CreateParameter();
        parameter.ParameterName = name;
        parameter.DbType = type;
        parameter.Value = value;

        return parameter;
    }
}</pre>
<p>And this would be an example of how you can use that provider to talk to the database.</p>
<pre class="brush:csharp">public class BookRepository
{
    private const string GetByIdQuery = "SELECT title, author FROM books WHERE id=@id";
    private readonly IDataProvider provider;

    public BookRepository(IDataProvider provider)
    {
        this.provider = provider;
    }

    public Book GetById(int id)
    {
        using (var connection = provider.OpenConnection())
        using (var command = provider.CreateCommand(connection, GetByIdQuery))
        {
            var idParameter = provider.CreateParameter("id", DbType.Int32, id);
            command.Parameters.Add(idParameter);

            var reader = command.ExecuteReader();

            if (!reader.Read())
            {
                throw new DataException("Expected Book entity with id " + id + " in the database");
            }

            var result = new Book
            {
                Id = id,
                Title = reader["title"] as string,
                Author = reader["author"] as string
            };

            return result;
        }
    }
}</pre>
<p>From your presenter or controller (or whatever) you may now use your data layer like this.</p>
<pre class="brush:csharp">// Could use a DI framework here, but what the heck!
var repository = new BookRepository(new DataProvider("MyDatabaseConnection"));
var book = repository.GetById(1);</pre>
<p>There's nothing wrong with going back to the basics, sometimes.</p>
