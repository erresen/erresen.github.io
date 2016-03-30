---
layout: post
title:  "Infinite Scrolling - Dynamically Adding Content On Scroll"
date:   2016-03-28 19:53:01
categories: jquery javascript html
---

# Infinite Scrolling

Loading more content dynamically as the user reaches the end of the page can improve engagement on many sites - here's a way of doing this using jQuery.

# Detecting a Scroll

The first thing we need to detect when a user scrolls up on the page. jQuery, of course, has an event for this:

```js
$(window).scroll(function() {
    console.log($(window).scrollTop());
}
```