---
layout: post
title: "Throwaway: Disposable email helper in Vue.js"
date: 2020-07-04 00:00:00
categories: vue js security privacy programming
comments: true
---

I recently wrote **[Throwaway](https://erresen.github.io/throwaway)**, a little app built in Vue.js to help generate and store throwaway email addresses.

## Why?

I am a big advocate of online privacy; I don’t like giving away any more personal information than is strictly necessary, and it pains me to see my friends and family blindly entering their real names and email address into random online forms, without really comprehending what they're giving away. More often than not this is merely because a website is asking them to do so, maybe to gain access to this or that or to stop a pop-up from nagging them. Once your personal information’s out there it’s practically impossible to take it back.

Even if you wear a tin foil hat and live under a rock, as soon as you sign up for a phone/internet/utility contract, or even simply pay your council tax, your details are out there on the web, somewhere. Hopefully encrypted, hidden and protected. Likely not as well as you’d hope or imagine. It’s not reasonable to expect that your information not be in any online database, but it’s prudent to minimise this potential exposure.

As I mentioned, you’re not going to be able to avoid using your real details everywhere... banks, mobile phone contracts, utilities etc are more than likely going to require real information, but there are a lot of online services/websites that don’t _really_ need your actual name and email address. All they "need" it for is to market to you and/or sell it onto other companies. Even if you like and trust the website your entering your data into, there’s no guarantee that they won’t sell your data, or simply leak/lose your data inadvertently. It happens everyday.

Anyway... one of the normal parts of a registration process for an online service is email address verification. You fill in your email address, they send you an email with a link, you click on the link, et voila... you’ve proven that you “own” that email address. Email addresses are one of the main pieces of information that companies use to track you around the internet as they're unique to each user and a good way of identiying the same person across different platforms. Generally, most people only have one personal email address, and maybe a second one for work. It takes some amount of effort to set up a new email address and most people can’t really be bothered to set up a different email account for every different online service because a) they don't see the benefit and b)... well that’s just crazy - who has time for that?!

Enter throwaway email accounts. Throwaway/temporary/disposable/anonymous email accounts are simply email addresses and inboxes that you can use to sign up for those services that you’re not interested in receiving emails from, but you need to verify your email address to gain access.

With disposable email addresses you don’t have to sign up/sign in... you can simply view the inbox. There are plenty of them about, but two of my favourites are [mailinator](https://www.mailinator.com/) and [maildrop](https://maildrop.cc/). These services allow you to access the inboxes for any email address you like on the mailinator.com or maildrop.cc domains. I like this method of anonymous email compared to services like [10 minute mail](https://10minutemail.com/) for which a temporary inbox is setup for you upon request.

The slight issue with my preferred style of inbox, mailinator particularly, is that you have to come up with your own email address username (maildrop has suggestions on the homepage). Think one up out of the blue. It’s actually not that easy. Certainly not after 5 or 10 accounts. Humans aren’t very good at being random, so there's a good chance you’ll sometimes end up using the same email address multiple times, or randomly pick the same as someone else. Remember, half the point of this is to prevent the trackers from tracking you. There’s no point in using the same disposable email account on multiple sites... then it just becomes your regular email address. A regular email address with absolutely no security.

You also have to remember this email address long enough to go and check the inbox to verify the account. Not a big deal, but if you just spam the keyboard for the email address and submit the registration form, there’s a good chance you won’t spam the keyboard in the same way when it comes to checking the inbox.

[Throwaway](https://erresen.github.io/throwaway) looks to solve those problems by producing randomly generated, kinda-pronounceable email addresses that can be copied to the clipboard with a single click, along with a handy link to the related inbox. This email address history can also be stored in your browsers local history, if you check a box.

So that’s the “why”... well most of it. I also like learning and had been hearing interesting things about the [Vue.js](https://vuejs.org/) framework. I’ve had a play with [React](https://reactjs.org/) before, and I use a very old version of [Angular](https://angularjs.org/) on a commercial Electron app that I work on, but Vue was supposed to be quick and simple to learn, allowing you to get stuff built fast! This simple project seemed like the ideal candidate. A few moving components, enough to make it tricky without a framework, but not so many that the project would take an eternity to build.

## Project Spec / Requirements

These requirements weren't written down anywhere - they were the goals I had in mind when building the tool

### 1. At least as simple to use than the vanilla websites

Using mailinator/maildrop isn't complicated. Using Throwaway shouldn't add any complexitiy and should be at least as simple, if not simpler.

### 2. Generates random email addresses (that are unlikely to be manually typed by a human)

For a human, making up random strings is hard. We're are terrible at it. Yes, yes... I know... computers aren't random either, but they're much better than humans at producing _seemingly_ random strings. As for the email address being unlikely to be typed... we have to make some assumptions here. The reason for this requirement is to avoid username collisions (i.e. entering the same email address as someone else has) to a reasonable degree. This doesn't have to be cryptographically secure. In fact _nothing_ about disposable email is secure. They're literally publc inboxes. That said, we don't have to use email addresses that are definitely in use by other people. I don't have statisical data about the usage of these anonymous email sites, so I can't be certain what people do and don't enter as email addresses, but from experience of dealing with human entered data in databases on a daily basis, humans are predictable. test@test.com is a favourite, as well as just fat-fingering the keyboard for 5-10 characters. What isn't common is structured/formatted data. If this tool can produce email addresses in a structured format that's still randomised, that would fit the bill.

### 3. Alternative inbox services

Many websites have built-in protection against people registering with these sorts of email addresses. They don't want you to use them. If you don't give your real data then you can't be sold to or have your data sold on, so you're not worth anything to them. There isn't a definitive list of all of the domains names for disposable email, so when faced with blocking these registration most developers will do a small amount of research to build up a list commonly used services and block those domains. As such, if a website is blocking a particular domain, it should be simple to switch to a different domain in the tool.

Mailinator and maildrop are the first two services, but more services may be added later.

### 4. Static hosting

I don't really want to pay to host and maintain what is essestially a toy project. GitHub Pages is my preferred host as it's so simple to deploy to from a public GitHub repository.

### 5. No backend (if not possible then use free serverless functions)

Expanding on the previous requirement, if any backend functionality is required then it should be free and as low maintenance as possible. [Vercel](https://vercel.com/) offer free serverless functions, so use those if required.

### 6. History of previously generated emails

Let users keep a log of the email addresses (with links to the inboxes) that they've generated previously. This should genrated and stored on the client, for both privacy and simplicity.
