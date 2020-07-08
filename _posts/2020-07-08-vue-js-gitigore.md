---
layout: post
title: "A .gitignore file for Vue.js projects"
date: 2020-07-08 00:00:00
categories: vue js git
comments: true
excerpt_separator: <!--more-->
---

GitHub doesn't appear to have a default `.gitignore` file for new [Vue.js](https://vuejs.org/) projects, so here's what I'm currently using.

<!--more-->

```awk
.DS_Store
node_modules
/dist

# local env files
.env.local
.env.*.local

# Log files
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*

# Editor directories and files
.idea
.vscode
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
```

- `.DS_Store` is Mac specific, so you won't need this if your Windows only, but it doesn't hurt to include it in case a Mac user contributes to your project. Here's some [more info on .DS_Store](https://en.wikipedia.org/wiki/.DS_Store)
- I always exclude `node_modules` from my repositories, but [here's an article discussing the pros and cons](https://flaviocopes.com/should-commit-node-modules-git/). If you're concerned about npm disappearing or a package you're using getting removed from npm, maybe you should consider including them in the repo. In practice that's a very unlikely scenario.
- The `/dist` directory is where your built project goes. There could be arguments for including this, but generally your project would be deployed in a manner that doesn't require compiled code to be committed to the repository.
- I have seen some Vue `.gitignore` files exclude the `/public` directory, but I haven't required this yet.

From there it's environment, log and editor files. I use VS Code as an editor, but normally keep the exclusions for other editors too. It saves someone inadvertently committing their own editor config.
