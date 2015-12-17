---
layout: post
title: "Using TDD to test file system operations"
description:
date: 2011-10-27 05:54:35
assets: assets/posts/2011-10-27-unit-test-file-system-operations
image: 
---

<p><em>I will refer to SUT during this article, meaning "System Under Test". In this case it will be the synchronize functionality in the FileSystemSynchronizer class.</em></p>
<p>A friend of mine asked me how I would unit test file system operations. The answer is that System.IO is not very test friendy and you will have to implement wrappers around it. This is not very hard, only time consuming and it gives you an additional layer of complexity. I would do this if I had to do a lot of file operations that needed testing, or if those file operations where important enough.</p>
<p>First we need a purpose. Let's say that we're going to build an application that's going to synchronize files in two file folders by pushing changes from source to target.</p>
<pre class="brush:csharp">public class FileSystemSynchronizer
{
    public void Synchronize(string source, string destination)
    {
    }
}</pre>
<p>Before we do anything else we should ask ourselves what we need this routine to accomplish. We do this by defining tests.</p>
<pre class="brush:csharp">public class FileSystemSynchronizerSpecification
{
    [Fact]
    public void ShouldCreateTargetFolderIfDoesNotExist()
    {
    }

    [Fact]
    public void ShouldCopyAnyFilesFromSourceFolderToTargetFolder()
    {
    }

    [Fact]
    public void ShouldCopyAnyDirectoriesFromSourceFolderToTargetFolder()
    {
    }

    [Fact]
    public void ShouldCopyFilesAndFoldersRecursivlyFromSourceToTargetFolder()
    {
    }

    [Fact]
    public void ShouldNotCopySourceFileIfSameFileExistInTargetFolder()
    {
    }

    [Fact]
    public void ShouldCopySourceFileIfNewerThanFileInTargetFolder()
    {
    }

    [Fact]
    public void ShouldRemoveFilesFromTargetFolderNotPresentInSourceFolder()
    {
    }
}</pre>
<p>Now we could just implement these tests and the wrapper situation should resolve itself?</p>
<pre class="brush:csharp">[Fact]
public void ShouldCreateTargetFolderIfDoesNotExist()
{
    const string SourcePath = @"C:\FolderA";
    const string TargetPath = @"C:\FolderB";

    /* Setup */
    var factory = MockRepository.GenerateMock<IFileSystemFactory>();
    var sut = new FileSystemSynchronizer(factory);

    /* Arrange */
    factory.Expect(f => f.PathExists(TargetPath)).Return(false);

    /* Test */
    sut.Synchronize(SourcePath, TargetPath);

    /* Assert */
    factory.AssertWasCalled(f => f.MakeDirectory(TargetPath));
}</pre>
<p>Do you find it hard to write tests before writing the code? Well, it is meant to be hard, because you should consider why you write the code in the first place.</p>
<p>I've created something I call the IFileSystemFactory and that class knows how to check if a path exists and it knows how to create directories. In this test I expect PathExists to be called and return false from it, and then I verify that a directory is created.</p>
<p>As you run this test it will turn red, but as you write the implementation it should turn green.</p>
<pre class="brush:csharp">public class FileSystemSynchronizer
{
    private readonly IFileSystemFactory fsFactory;

    public FileSystemSynchronizer(IFileSystemFactory fsFactory)
    {
        this.fsFactory = fsFactory;
    }

    public void Synchronize(string sourcePath, string targetPath)
    {
        if (!fsFactory.PathExists(targetPath))
        {
            fsFactory.MakeDirectory(targetPath);
        }
    }
}</pre>
<p><img src="http://litemedia.info/media/Default/BlogPost/blog/unit-test-file-system-operations/unittest.png" alt="" width="539" height="245" /></p>
<p>The last step is to refactor, but I think I will wait until I have something to refactor. This code is still quite simple and clean.</p>
<p>Let's implement that next test.</p>
<pre class="brush:csharp">[Fact]
public void ShouldCopyAnyFilesFromSourceFolderToTargetFolder()
{
    /* Setup */
    var factory = MockRepository.GenerateMock<IFileSystemFactory>();
    var sut = new FileSystemSynchronizer(factory);

    var targetDirectory = MockRepository.GenerateStub<IDirectory>();

    var file1 = MockRepository.GenerateMock<IFile>();
    file1.Name = "first.txt";

    var file2 = MockRepository.GenerateMock<IFile>();
    file2.Name = "second.txt";

    var fileList = new[] { file1, file2 };

    /* Arrange */
    factory.Expect(f => f.PathExists(TargetPath)).Return(true);
    factory.Expect(f => f.GetDirectory(SourcePath)).Return(targetDirectory);
    targetDirectory.Files = fileList;

    /* Test */
    sut.Synchronize(SourcePath, TargetPath);

    /* Assert */
    foreach (var file in fileList)
    {
        file.AssertWasCalled(f => f.CopyTo(TargetPath));
    }
}</pre>
<p>And the SUT to make it green.</p>
<pre class="brush:csharp">public class FileSystemSynchronizer
{
    private readonly IFileSystemFactory fsFactory;

    public FileSystemSynchronizer(IFileSystemFactory fsFactory)
    {
        this.fsFactory = fsFactory;
    }

    public void Synchronize(string sourcePath, string targetPath)
    {
        if (!fsFactory.PathExists(targetPath))
        {
            fsFactory.MakeDirectory(targetPath);
        }

        foreach (var file in fsFactory.GetDirectory(sourcePath).Files)
        {
            file.CopyTo(targetPath);
        }
    }
}</pre>
<p>And we're green, but .... THIS IS CRAP!</p>
<h2>Overspecification is the hell of unit testing</h2>
<p>What I did just now was not testing the function, but specifying the internals of the function. This is very dangerous, because I can't refactor without changing my tests. You should always try to test only the public api, and you should not bother with the internals. Instead you should look at the output after SUT has been run.</p>
<p>That means that we'll have to rethink and refactor our tests.</p>
<p>Let's create a virtual simulation of our file system instead, and fill it with files. Our virtual directory as source should be replicated into our virtual target path. This means a bit more implementation in the test, but we can limit the testing to Input/Output without overspecifying internals.</p>
<pre class="brush:csharp">public class VirtualFileSystemFactory : IFileSystemFactory
{
    public static readonly IDirectory FolderA;
    public static readonly IDirectory FolderB;

    private const string FolderAPath = @"C:\FolderA";
    private const string FolderBPath = @"C:\FolderB";

    private readonly IDictionary<string, IDirectory> fileSystem = new Dictionary<string, IDirectory>
        {
            { FolderAPath, FolderA },
            { FolderBPath, FolderB },
        };

    static VirtualFileSystemFactory()
    {
        FolderA = new VirtualFolder(FolderAPath);
        FolderB = new VirtualFolder(FolderBPath);
    }

    public bool PathExists(string targetPath)
    {
        return fileSystem.ContainsKey(targetPath);
    }

    public void MakeDirectory(string targetPath)
    {
        fileSystem.Add(targetPath, new VirtualFolder(targetPath));
    }

    public IDirectory GetDirectory(string sourcePath)
    {
        if (!this.PathExists(sourcePath))
        {
            throw new DirectoryNotFoundException("Folder was not registered in VirtualFileSystemFactory: " + sourcePath);
        }

        return fileSystem[sourcePath];
    }

    public void Copy(IFile file, string targetPath)
    {
        this.GetDirectory(targetPath).Add(file);
    }
}

public class VirtualFile : IFile
{
    public VirtualFile(string name)
    {
        Name = name;
    }

    public string Name { get; set; }
}

public class VirtualFolder : IDirectory, IEnumerable<IFileSystemItem>
{
    private readonly string path;
    private readonly IList<IFileSystemItem> items;

    public VirtualFolder(string path)
    {
        this.path = path;
        items = new List<IFileSystemItem>();
    }

    public IEnumerable<IFile> Files
    {
        get { return items.Where(f => f is IFile).Cast<IFile>(); }
    }

    public void Add(IFile file)
    {
        items.Add(file);
    }

    public IEnumerator<IFileSystemItem> GetEnumerator()
    {
        return items.GetEnumerator();
    }

    IEnumerator IEnumerable.GetEnumerator()
    {
        return items.GetEnumerator();
    }
}
</pre>
<p>That is a lot of code, but it is testing code. This will actually give us the power to not overspecify our tests, but work with the results of the method we're testing.</p>
<p>Look how this beautified the tests that where previously a mocking hell.</p>
<pre class="brush:csharp">[Fact]
public void ShouldCreateTargetFolderIfDoesNotExist()
{
    const string UnknownTargetPath = @"C:\FolderC";

    /* Setup */
    var factory = new VirtualFileSystemFactory();
    var sut = new FileSystemSynchronizer(factory);

    /* Test */
    sut.Synchronize(SourcePath, UnknownTargetPath);

    /* Assert */
    Assert.True(factory.PathExists(UnknownTargetPath), "Target path should be created if it does not exist");
}

[Fact]
public void ShouldCopyAnyFilesFromSourceFolderToTargetFolder()
{
    /* Setup */
    var factory = new VirtualFileSystemFactory();
    var sut = new FileSystemSynchronizer(factory);

    // Create files in source folder
    var sourceFolder = factory.GetDirectory(SourcePath);
    sourceFolder.Add(new VirtualFile("first.txt"));
    sourceFolder.Add(new VirtualFile("second.txt"));

    /* Test */
    sut.Synchronize(SourcePath, TargetPath);

    /* Assert */
    var targetFolder = factory.GetDirectory(TargetPath);
    foreach (var file in sourceFolder.Files)
    {
        Assert.Contains(file, targetFolder.Files);
    }
}</pre>
<p>These tests are great, because they won't break when we refactor our SUT. They are great because they are readable and you don't have to be Ayende to figure out how the mocking works. </p>
<h2>What about wrapping the file system?</h2>
<p>If I <a href="http://litemedia.info/media/Default/BlogPost/blog/unit-test-file-system-operations/LiteMedia.FileSync.zip">finish writing my tests and implementing my system</a>, I will end up with a file system wrapping that looks like this.</p>
<p><img src="http://litemedia.info/media/Default/BlogPost/blog/unit-test-file-system-operations/ClassDiagram1.png" alt="" width="619" height="446" /></p>
<p>We did wrap the file system. The wrapping layer grew fourth from what my tests needed. This means that it would probably not look the same if we had a different problem to solve. Then the wrapping layer would be suited for that problem instead.</p>
<p>Originating from the problem description and let the API grow from our tests, gave us a wrapping layer that both looks and feels natural to the problem at hand. I could never have anticipated this design, it has to be hand grown and it has to be done with TDD.</p>
<p>You can <a href="http://litemedia.info/media/Default/BlogPost/blog/unit-test-file-system-operations/LiteMedia.FileSync.zip">download the complete sample from here</a>. Do I need to mention that it worked flawless on the first run?</p>
