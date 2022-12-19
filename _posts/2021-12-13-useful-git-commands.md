---
layout: post
title: "CLI git commands for IDE/GUI users"
date: 2021-12-13 18:15:00
updated: 2022-04-07 18:00:00
tags: git shortcuts visualstudio
comments: true
permalink: "/git/shortcuts/visualstudio/2021/12/13/useful-git-commands.html"
---

Git's super powerful, but a lot of that power is only really available in the command line interface (CLI), hidden from developers using GUI tools built into IDEs like Visual Studio. I'm a C# dev, so I live in Visual Studio. Recently I've been finding myself having to use git's CLI to get things done, either more quickly or sometimes at all!

Below is a list of the git commands that I actually use in the CLI. It's a living list that I'll update whenever I find another command that I want to keep for the future. It's unlikely to contain things that are built into (and work well) in Visual Studio's git implementation.

Using the command line can be a bit scary for devs that are used to GUIs, but using it will give you a much better understanding of what's actually happening when you click the buttons on your GUI. The more you use the command line the more comfortable you'll get with it, and when the time comes that you actually _need_ to use git's CLI, you'll be better equipped to get the job done.

[branching]: #branch-management
[flow]: #git-flow
[history]: #commit-history
[remotes]: #git-remotes
[stashing]: #stashing

- [Branch management][branching]
- [Commit History][history]
- [Git flow][flow]
- [Git remotes][remotes]
- [Stashing][stashing]

## Branch management

### List local branches

Like everything in git, branch has loads of options that you'll never use, but to just list your local branches:

[git-branch]: https://git-scm.com/docs/git-branch
[git branch documentation][git-branch]

```sh
git branch
```

### Checkout an existing branch

[switch-vs-checkout]: https://stackoverflow.com/questions/57265785/whats-the-difference-between-git-switch-and-git-checkout-branch

Switch to an existing branch. [Switch command is newer, created for switching branches.][switch-vs-checkout]

[git-switch]: https://git-scm.com/docs/git-switch
[git switch documentation][git-switch]

```sh
git switch branch_name
```

or

[git-checkout]: https://git-scm.com/docs/git-checkout
[git checkout documentation][git-checkout]

```sh
git checkout branch_name
```

### Create a new branch

Making a new local branch. [Switch command is newer, created for switching branches.][switch-vs-checkout]

[git switch documentation][git-switch]

```sh
git switch -c branch_name
```

or

[git checkout documentation][git-checkout]

```sh
git checkout -b branch_name
```

### Rename a local branch

To rename your branch you first need to check it out/switch to it, then change it's name using the `-m` flag on `git branch`.

Switch to your branch.

[git-switch]: https://git-scm.com/docs/git-switch
[git switch documentation][git-switch]

```sh
git switch branch_name
```

Rename your branch.

[git-branch]: https://git-scm.com/docs/git-branch
[git branch documentation][git-branch]

```sh
git branch -m new_name
```

### Pushing new local branch to remote origin

When you've created your new branch and committed some code to it, it's likely that you'll want to push this branch to GitHub (or elsewhere) for review or just to keep a copy somewhere other than your local machine. You can't just `git push` because the remote hasn't seen that branch before. UIs like those in Visual Studio actually hide this from you, but you have to do a little more leg work in the command line to push up your code (not a lot more though).

[git-push]: https://git-scm.com/docs/git-push
[git push documentation][git-push]

```sh
git push --set-upstream origin branch_name
```

## Commit History

### List commits in one branch but not another

Get list of commits in develop that aren't in master:

[git-log]: https://git-scm.com/docs/git-log
[git log documentation][git-log]

```sh
git log --no-merges develop ^master
```

### List commits related to a file

Get a list of commits that affected a specific file (in the examples below, a file named `file.cs`). Useful for finding when a file was deleted.

[git-log]: https://git-scm.com/docs/git-log
[git log documentation][git-log]

Get the "simplified" history of a file.

```sh
git log -- **/file.cs
```

If this doesn't include what you're looking for, try a non-simplified history with the `full-history` option.

```sh
git log --full-history -- **/file.cs
```

If this is too "noisy", you can remove merges from that history with the `no-merges` option.

```sh
git log --full-history --no-merges -- **/file.cs
```

## Git flow

Love it or hate it, in my team we use git flow. It's not perfect but it's a known quantity that is easy (ish) to explain to new developers and is genuinely helpful in managing the work in distributed teams. The Visual Studio extension for git flow is... not the best. It works, but is slow and locks the interface quite a lot.

It's can be useful to sync (pull & push) on both master and develop to make sure you're up to date before performing git flow operations. Switching branches in Visual Studio can cause VS to reload any project that were modified when switching branches, which can be frustratingly slow in large solutions and when master and develop haven't been merged in a while.

To synchronise the master and develop branches outside of Visual Studio, I made a Powershell sync script which automates that for me:

```ps
$ErrorActionPreference = "Stop"
Set-Location "C:\Code\MyRepo"
$branch = &git rev-parse --abbrev-ref HEAD 
git checkout develop
git pull
git push
git checkout master
git pull
git push
if ($branch -ne "master") {
    git checkout $branch
    if ($branch -ne "develop") {
        git pull
        git push
    }
}
```

Most of the git flow operations I perform are starting and finishing hotfixes and features. The syntax is pretty simple, but there's a couple of useful flags on the finish hotfix command that aren't the defaults.

### Start a new git flow feature

```sh
git flow feature start feature_branch
```

### Finish a git flow feature

```sh
git flow feature finish feature_branch
```

### Start a git flow hotfix

```sh
git flow hotfix start hotfix_branch
```

### Finish a git flow hotfix

`-n` Don't tag this hotfix

`-p` Push to origin after finish

```sh
git flow hotfix finish hotfix_branch -n -p
```

### Allow multiple hotfixes

Git flow ships out of the box with the restriction that you can only have one hotfix branch open at a time. I think the idea is that hotfixes are really only for bugs, and you should finish the bug you're working on before starting on the next one. While I agree in principle, that's quite an opinionated default setting. In my team we also require code reviews before any code is merged into master or develop. This means that unless you're going to delete you local hotfix branch while waiting for it to be reviewed, you'll often want to have more than one hotfix branch open.

My initial solution to this was just to manually create the hotfix branch using git rather than git flow:

```sh
git switch master
git switch -c hotfix/new_hotfix_branch
```

But it turns out there's a built in way to disable the single hotfix restriction. The command below will enable multiple hotfixes for this repository on this computer.

```sh
git config --add gitflow.multi-hotfix true
```

## Git remotes

### Get remote origin URL

There are a few ways to do this. You can check the setting from the configuration:

```sh
git config --get remote.origin.url
```

You could list all of your remote URLs:

```sh
git remote -v
```

Or you can get lots of info about the remote origin, including tracked and out-of-date branches:

```sh
git remote show origin
```

### Change remote origin URL

Sometimes you might want to change where the remote origin, for example when you leave behind Azure Devops (previous TFS) and move to GitHub (because why wouldn't you). It's as simple as switching the origin and pushing to your new repo:

```sh
git remote set-url origin new-github-url-here
git push
```

## Stashing

Stashing is great if you're in the middle of some work and don't really want to commit it yet, but need to switch tasks and get on with something else (if you suddenly need to fix a bug that's just been reported, for example).

### Stash changes

```sh
git stash push
```

### Get your stashed changes back

```sh
git stash pop
```

### List your stashes

```sh
git stash list
```
