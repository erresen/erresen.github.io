---
layout: post
title: "Useful git commands that you actually use"
date: 2021-12-13 18:15:00
categories: git shortcuts visualstudio
comments: true
---

Git's super powerful, but a lot of that power is only really available in the command line, hidden from developers using GUI git tools build into IDEs like Visual Studio. I'm a C# dev, so I live in Visual Studio. Recently I've been finding myself having to use git's CLI to get things done either more quickly or at all!

Below is a list of the git commands that I actually use in the CLI. It'll be a living list, updated when I find another command that I want to keep for the future. It's unlikely to contain things like committing code, as there's not reason not to use Visual Studio's implementation for that.

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

### List commits in one branch but not another

Get list of commits in develop that aren't in master:

[git-log]: https://git-scm.com/docs/git-log
[git log documentation][git-log]

```sh
git log --no-merges develop ^master
```

## Git flow

Love it or hate it, I use git flow. It's not perfect, but it's a known quantity that is easy to explain to new developers and is genuinely helpful in managing the work on distributed teams. The Visual Studio extension for git flow is... no the best. It works, but is slow and locks the interface quite a lot. It's also useful to sync (pull & push) on both master and develop before starting performing git flow operations, to make sure you're up to date. Doing this cause Visual Studio to want to reload any project that were modified when switching branches, which can be frustratingly slow in large solutions.

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
