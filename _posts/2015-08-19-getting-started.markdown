---
layout: post
title:  "Getting started... Jekyll and GitHub Pages"
date:   2015-08-19 18:53:44
categories: jekyll update css
---
# It's a blog!
So, I made two websites today... an ASP.NET MVC 4 site at work that monitors a backup server, displaying a report of the SVN backup status of several repositories... and this one!

This is a blog, most probably about programming.

I'm not a writer, I'm a developer, and as a developer I like to take notes about things I learn. I'll likely use this as somewhere to store those notes while getting a little web development practice in. From a lot of programming blogs it'd be easy to assume that *all programming was web development*, but it's really not. I work with some very talented engineers, most of whom have never even considered developing for the web. It's a skill that doesn't necessarily fit into my teams day-to-day roles, but one which I believe is invaluable to have in your toolkit as a modern software developer. 

# CSS Diner and GitHub Pages
[css-diner]: http://flukeout.github.io
While I was working on the afforementioned MVC site for monitoring SVN backups, I felt I needed a quick brush-up on my CSS. Googling for CSS selector reference, I can across [CSS Diner][css-diner], an fun interactive site for learning CSS selectors. Besides the cool design, something that grabbed me was the URL: [flukeout.github.io][css-diner] ... github.io??? Not heard about GitHub hosting sites before. And then everything at work exploded. Every machine in the entire plant couldn't resolve local DNS addresses... No servers. No SQL. No data! Not what you want at a manufacturing site where every machine relies upon data about incoming part condition in order to process their components! Turns out the corporate IT overlords had screwed up the DNS forwarding. Safe to say the github.io URL and hosting was forgotten about.

# Jekyll
[haacked]:        http://haacked.com
[haacked-jekyll]: http://haacked.com/archive/2013/12/02/dr-jekyll-and-mr-haack/
[jekyll]:         http://jekyllrb.com/
[jekyll-qs]:      http://jekyllrb.com/docs/quickstart/
[github-help]:    https://help.github.com/articles/using-jekyll-with-pages/
This evening, completely seperately, I subscribed to [Phil Haack's blog][haacked] and came across [a post regarding how he migrated his blog from Subtext to GitHub][haacked-jekyll]. I had a blog on blogspot a few years ago, but despised the environment and the blogspot.com URL. *I'm a developer, I should be making my own site... blah blah blah.* And then never did anything about it.
This is my attempt to change that. A github.io address seems acceptable to me, as a developer, for a blog that will *hopefully* focus on programming. And [Jekyll][jekyll] is how I plan to do it. I can learn some web development, have total control over the site content, but not have the weight of an entire db driven blogging framework on my shoulders. The [Jekyll quick start guide][jekyll-qs] got a site up and running on my mac in seconds, and the [GitHub Help][github-help] got me the tools required to replicate how the site will appear on github, on my mac.

So far, so good. But this is my first post... let's see how this develops.
