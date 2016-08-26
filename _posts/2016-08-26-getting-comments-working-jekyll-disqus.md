---
layout: post
title:  "Getting Disqus comments to work on Jekyll"
date:   2016-08-26 13:18:31
categories: jekyll disqus
comments: true
---
[disqus]: http://disqus.com/
So, I've finally got [Disqus][disqus] comments working properly on this blog.

[github-pages]: https://help.github.com/articles/using-jekyll-as-a-static-site-generator-with-github-pages/
[jekyll-guide]: https://jekyllrb.com/docs/quickstart/
[disqus-guide]: https://help.disqus.com/customer/portal/articles/472138-jekyll-installation-instructions
I'd read several guides, including the [one from GitHub pages][github-pages], [Jekyll][jekyll-guide] itself, and [Disqus][disqus-guide], but I was continuously encountering the same issue; the Disqus comments box wasn't showing! It would show when I built and served the site locally, but when it was pushed to GitHub, no comments!

While I don't receive many (read *any*) comments, I still think it's a worthwhile feature to have on a blog. It allows for interaction between readers and the author, and opens the forum for discussions.

Back to the issue... Jekyll uses layout files to template a site. The blog posts on this site use the `post.html` template in the `_layouts` folder. Templates can have `.yml` front matter that, I assumed, would be applied to all posts... although I'm questioning that assumption now. This was the front matter from `post.html`:

{% highlight yml %}
---
layout: default
comments: true
---
{% endhighlight %}

`comment: true` is the front matter required for enabling comments on a page, and I thought it'd propagate through to the individual posts. It certainly did on my local machine, so why not online? Once I moved `comments: true` from the layout front matter to the individual post front matter; voila... Comments.

Individual post front matter:

{% highlight yml %}
---
layout: post
title:  "Getting Disqus comments to work on Jekyll"
date:   2016-08-26 13:18:31
categories: jekyll disqus
comments: true
---
{% endhighlight %}

So, yeah... Jekyll's cool for building static blogs, but having things work in one environment and not others isn't fantastic. Not sure if it's Jekyll's fault, or GitHub pages set up, but it's frustrating either way.

I'm going to have to look into whether any front matter is shared from the layouts, or whether I dreamt that up...
