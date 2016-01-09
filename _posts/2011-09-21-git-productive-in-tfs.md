---
layout: post
title: "Git productive in TFS"
description:
date: 2011-09-21 06:46:58
assets: assets/posts/2011-09-21-git-productive-in-tfs
image: 
---

Have you ever used TFS (Microsoft Team Foundation System) in a day to day basis? I'm sure its all fine and dandy for managers, but as a developer the revision control system of TFS gives me headaches. One or two reasons for this are...

* Workspaces, where TFS will make all files readonly until you 'touch' them in Visual Studio 2010, trigger a 'check out for edit' which make your files writable. Works fine except...

* TFS makes working in Visual Studio terrible slow. When you want to change a file it must first be checked out for edit by TFS (syncronously), and this does not happen on save - but on actual edit.

* You accidently check out files for edit when you didn't intend to edit the file, or save your changes.

* Edit files outside Visual Studio means manually doing a 'check out for edit' in the Source Control Manager to get rid of the readonly attribute to files.

* The readonly attribute also has a way of finding itself in build servers, and production environment after copy operations. This can be a pain during continuous integration.

* Sometimes you find yourself working offline, but you're not able to commit your changes without connection to your TFS. That's ok, but if you forget to press "Go Offline" before you loose connection, you will have Visual Studio crashing all over the place. Imagine working over cellular network where the connection comes and goes - it's impossible with TFS.

Nice to get that off my chest.

## But TFS11 will solve those problems?

Yes, you will be able to have local workspaces in TFS11, but this will not be a DVCS as you will not be able to commit changes or merge branches while offline. All the work you'll do in your local workspace has to be synced with the TFS from time to time. I can imagine the headaches of merging local workspace with online workspace after a long period of offline work.

## How to get going with git

The solution to the TFS problem is not using it for revision control, but only as centralized storage for Git. Here I will describe how to install git and explain my workflow with git and tfs.

### Installation

Head over to the git homepage and install git itself. This will give you the binaries that you need to use git.

* [http://git-scm.com/](http://git-scm.com/)

You need to install the Git-Tfs gateway in order to push and pull commits between Git and Tfs.

* [https://github.com/spraints/git-tfs/](https://github.com/spraints/git-tfs/)

The latest version at the time of writing this blog post is 0.12, and it has a defect of not being able to handle files with filenames not in ASCII. If you need to handle filenames with characters not in ASCII you should instead download the code from github and compile head version yourself. They've fixed it in there. Any version of Git-Tfs after 0.12 should have this problem fixed.

In order to get git to recognize the git-tfs extension they both need to be in the global environment path. The following figure explains where to find and edit this path variable.

![Go edit your environment variable PATH](assets/posts/2011-09-21-git-productive-in-tfs/gitpath.png)

I've added this value to the variable.

```
C:\Dev\Console2;C:\cygwin\bin;C:\Program Files\TortoiseSVN\bin;C:\Program Files (x86)\Git\bin;C:\Program Files (x86)\GitTfs
```

I use Cygwin and Console2 to enlighten my git experience.

* [http://www.cygwin.com/](http://www.cygwin.com/)
* [http://sourceforge.net/projects/console/files/console-devel/2.00/](http://sourceforge.net/projects/console/files/console-devel/2.00/)

For those that find console applications intimidating, should try the graphical tool called TortoiseGit. I've not tried it myself, but heard from colleages that it gives you an almost as good experience as working directly with the console.

* [http://code.google.com/p/tortoisegit/](http://code.google.com/p/tortoisegit/)

![tortoise git log dialog](/assets/posts/2011-09-21-git-productive-in-tfs/tortoise_log_dialog.jpg)

### Workflow

Working with git is not the same as working with TFS. You need to rethink the way you normaly do version control. Git is about versioning your code. Tfs is as much about centralizing your code, storing it all in one place.

When I was working with TFS, I would check in my work when I was done with a feature. Now when I work with Git, I will commit every change I do to the source code. I still push my completed user stories to TFS when they are done, so the frequency of my TFS checkins are not depleted, but I commit to git for every little change, giving me a complete history of 'fixing that bug' or 'completing that function'.

First you clone your TFS repository.

```bash
git tfs clone http://tfsserver:8080/DefaultCollection/ $/Path/In/Source/Control ProjectPath
```

![git workflow clone](/assets/posts/2011-09-21-git-productive-in-tfs/gitwf1.png)

This will give you a complete copy of the whole TFS history for that TFS path into ProjectPath. If you have a lot of history, and a lot of files, you need to be patient while all this is downloading. Thankfully you'll only have to do this once.

**STOP!** Yes, you have the code, but don't start coding just yet. You have a git repository and a master branch. The thing is, you never code directly into master branch. Instead you create a branch for every user story or bug you need to fix. Do it like this.

```bash
git checkout –b my_new_feature
```

![git workflow checkout new branch](/assets/posts/2011-09-21-git-productive-in-tfs/gitwf2.png)

This will create a new branch called "my\_new\_feature" and make it active. Now you can start development of your feature.

The three most important commands while developing your feature are status, add and commit.

* git status = display what has changed
* git add = stage changes for commit
* git commit = commit staged changes

Let's commit a change to our new branch.

```bash
git commit -a -m "Test: Should do awesome when condition is satisfied"
```

![git workflow commit](/assets/posts/2011-09-21-git-productive-in-tfs/gitwf3.png)

What did happen during development of my\_new\_feature is that a coworker checked in his changes to TFS. Now we want to pull them out and update our branch with his changes. We du this with a tfs pull and rebase.

```bash
git checkout master
git tfs pull
git checkout my_new_feature
git rebase master
```

![git workflow rebase](/assets/posts/2011-09-21-git-productive-in-tfs/gitwf4.png)

What happens when you rebase a branch is that you rewind all commits, rebase the branch on the new version in master, and then reapply your commits to that branch. You will get conflicts if you have made commits to the same stuff as what you pulled from tfs. A great aspect of this workflow is that the conflict will arise in a local branch where it won't affect other development if you would need to create a new branch before solving the conflict.

When you're done with your new feature, you should merge it to master and from there we could push it back into TFS, which is effectivly a TFS checkin.

```bash
git checkout master
git merge my_new_feature
git tfs checkintool --build-default-comment
```

![git workflow merge push](/assets/posts/2011-09-21-git-productive-in-tfs/gitwf5.png)

## What are the benefits of working with git?

This workflow seems to give you a lot of overhead. Should it be this hard to just manage versioning of software. Do you really get back all the time you invest in creating branches and merging back and forth?

* You always have a clean master. When the customer comes to you with "drop everything you're doing, we need to do 'this' instead", you'll actually be able to do just that.

* You're actually doing versioning, and not 'checkin at end of the day to keep a backup of your code' as I've seen many developers treat TFS

* You work completely offline and may still do versioning. This has been a real issue for me while developing on the commute train.

* You can branch, commit and do versioning without disturbing build server or colleages with your checkins.

Using git with TFS is probably the closest you can get, having a decent experience with TFS version source control, even if that means taking away 'version' and 'control' from the Team Foundation System.
