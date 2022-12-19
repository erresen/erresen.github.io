---
layout: post
title:  "Install node.js NPM packages globally without sudo"
date:   2015-11-07 12:41:00
tags: javascript bash node npm vscode
comments: true
permalink: "/javascript/bash/node/npm/vscode/2015/11/07/install-npm-no-sudo.html"
---
[vscode]: https://code.visualstudio.com/
[install-tsd]: https://code.visualstudio.com/Docs/runtimes/nodejs
[global-npm]: http://stackoverflow.com/questions/16151018/npm-throws-error-without-sudo#answer-24404451
I've been using [Visual Studio Code][vscode] for a while now; it's a great, lightweight editor that has Visual Studio-esque intellisense... for javascript! In order to get the code completions for node.js, you have to [install the typescript definitions][install-tsd]. This is done through tsd, which is installed through npm (the Node Package Manager). 

An issue that I've run into is that root privileges are required to install packages globally. Judging by a quick stackoverflow search, I’m not the only one! [Solutions that are suggested][global-npm] include installing node through nvm (Node Version Manager), but the github repo for that notes that the build is failing… not a positive sign. 

A better solution is to change the directory that npm installs the global packages into, to one that the user already has privileges. 

[npm-no-sudo]: https://github.com/sindresorhus/guides/blob/master/npm-global-without-sudo.md
[This guide][npm-no-sudo] walks through the process of doing this. I’ve reiterated it here to help stave off link rot.

`npm` installs packages locally within your projects by default. You can also install packages globally (e.g. `npm install -g <package>`) (useful for command-line apps). However the downside of this is that you need to be root (or use `sudo`) to be able to install globally.

Here is a way to install packages globally for a given user.

#### 1. Create a directory for your global packages

```sh
mkdir "${HOME}/.npm-packages"
```

#### 2. Reference this directory for future usage in your `.bashrc`/`.zshrc`:

```sh
NPM_PACKAGES="${HOME}/.npm-packages"
```

#### 3. Indicate to `npm` where to store your globally installed package. In your `$HOME/.npmrc` file add:

```sh
prefix=${HOME}/.npm-packages
```

#### 4. Ensure `node` will find them. Add the following to your `.bashrc`/`.zshrc`:

```sh
NODE_PATH="$NPM_PACKAGES/lib/node_modules:$NODE_PATH"
```

#### 5. Ensure you'll find installed binaries and man pages. Add the following to your `.bashrc`/`.zshrc`:

```sh
PATH="$NPM_PACKAGES/bin:$PATH"
# Unset manpath so we can inherit from /etc/manpath via the `manpath`
# command
unset MANPATH # delete if you already modified MANPATH elsewhere in your config
MANPATH="$NPM_PACKAGES/share/man:$(manpath)"
```

NOTE: If you are running OS X, the `.bashrc` file may not yet exist, and the terminal will be obtaining its environment parameters from another file, such as `.profile` or `.bash_profile`. These files also reside in the user's home folder. In this case, simply adding the following line to them will instruct Terminal to also load the `.bashrc` file:

```sh
source ~/.bashrc
```