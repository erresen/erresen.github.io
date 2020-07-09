---
layout: post
title: "Throwaway: Disposable email helper in Vue.js"
date: 2020-07-09 20:40:00
categories: vue js security privacy programming
comments: true
---

I recently wrote **[Throwaway](https://erresen.github.io/throwaway)**, a little app built in Vue.js to help generate and store throwaway email addresses.

## Why?

I am a big advocate of online privacy; I don’t like giving away any more personal information than is strictly necessary, and it pains me to see my friends and family blindly entering their real names and email address into random online forms, without really comprehending what they're giving away. More often than not this is merely because a website is asking them to do so, maybe to gain access to this or that or to stop a pop-up from nagging them. Once your personal information’s out there it’s practically impossible to take it back.

Even if you wear a tin foil hat and live under a rock, as soon as you sign up for a phone/internet/utility contract, or even simply pay your council tax, your details are out there on the web, somewhere. Hopefully encrypted, hidden and protected. Likely not as well as you’d hope or imagine. While it’s pretty unreasonable to expect that your information not be in any online database, it’s prudent to minimise this potential exposure whenever possible.

As I mentioned, you’re not going to be able to avoid using your real details everywhere... banks, mobile phone contracts, utilities etc are more than likely going to require real information, but there are a lot of online services/websites that don’t _really_ need your actual name and email address. All they "need" it for is to market to you and/or sell it onto other companies. Even if you like and trust the website your entering your data into, there’s no guarantee that they won’t sell your data, or simply leak/lose your data inadvertently. It happens everyday.

Anyway... one of the normal parts of a registration process for an online service is email address verification. You fill in your email address, they send you an email with a link, you click on the link, et voila... you’ve proven that you “own” that email address. Email addresses are one of the main pieces of information that companies use to track you around the internet as they're generally unique to each user and a good way of identifying the same person across different platforms. Most people only have one personal email address, and maybe a second one for work. It takes some amount of effort to set up a new email address and most people can’t really be bothered to set up a different email account for every different online service because a) they don't see the benefit and b)... well that’s just crazy - who has time for that?!

Enter throwaway email accounts. Throwaway/temporary/disposable/anonymous email accounts are simply email addresses and inboxes that you can use to sign up for those services that you’re not interested in receiving emails from, but you need to verify your email address to gain access.

With disposable email addresses you don’t have to sign up/sign in... you can simply view the inbox. There are plenty of them about, but two of my favourites are [mailinator](https://www.mailinator.com/) and [maildrop](https://maildrop.cc/). These services allow you to access the inboxes for any email address you like on the mailinator.com or maildrop.cc domains. I like this method of anonymous email compared to services like [10 minute mail](https://10minutemail.com/) for which a temporary inbox is set up for you upon request.

The slight issue with my preferred style of inbox, mailinator particularly, is that you have to come up with your own email address username (maildrop has suggestions on the homepage). Think one up out of the blue. It’s actually not that easy. Certainly not after 5 or 10 accounts. Humans aren’t very good at being random, so there's a good chance you’ll sometimes end up using the same email address multiple times, or randomly pick the same as someone else. Remember, half the point of this is to prevent the trackers from tracking you. There’s no point in using the same disposable email account on multiple sites... then it just becomes your regular email address. A regular email address with absolutely no security.

You also have to remember this email address long enough to go and check the inbox to verify the account. Not a big deal, but if you just spam the keyboard for the email address and submit the registration form, there’s a good chance you won’t spam the keyboard in the same way when it comes to checking the inbox.

[Throwaway](https://erresen.github.io/throwaway) looks to solve those problems by producing randomly generated, kinda-pronounceable email addresses that can be copied to the clipboard with a single click, along with a handy link to the related inbox. This email address history can also be stored in your browsers local history, if you check a box.

So that’s the “why”... well most of it. I also like learning and had been hearing interesting things about the [Vue.js](https://vuejs.org/) framework. I’ve had a play with [React](https://reactjs.org/) before, and I use a very old version of [Angular](https://angularjs.org/) on a commercial Electron app that I work on, but Vue was supposed to be quick and simple to learn, allowing you to get stuff built fast! This simple project seemed like the ideal candidate. A few moving components, enough to make it tricky without a framework, but not so many that the project would take an eternity to build.

## Project Requirements and Outcomes

These requirements weren't written down anywhere - they were the goals I had in mind when building the tool.

### 1. At least as simple to use than the vanilla websites

Using mailinator/maildrop isn't complicated. Using Throwaway shouldn't add any complexity and should be at least as simple, if not simpler. Personally I think that Throwaway is easier to use than either mailinator or maildrops sites. It's lower noise and easier to navigate.

### 2. Generates random email addresses (that are unlikely to be manually typed by a human)

For a human, making up random strings is hard. We're terrible at it. Yes, yes... I know... computers aren't random either, but they're much better than humans at producing _seemingly_ random strings. As for the email address being unlikely to be typed... we have to make some assumptions here. The reason for this requirement is to avoid username collisions (i.e. entering the same email address as someone else has) to a reasonable degree. This doesn't have to be cryptographically secure. In fact _nothing_ about disposable email is secure. They're literally public inboxes. That said, we don't have to use email addresses that are definitely in use by other people. I don't have statistical data about the usage of these anonymous email sites, so I can't be certain what people do and don't enter as email addresses, but from experience of dealing with human entered data in databases on a daily basis, humans are predictable. test@test.com is a favourite, as well as just fat-fingering the keyboard for 5-10 characters. What isn't common is structured/formatted data.

It'd be preferable if the email address was pronounceable. What I was initially planning to do here was to use a dictionary to concatenate three random words. [What3words](https://what3words.com) managed to reference every 3m x 3m square on the entire globe using combinations of only 40k words, so there's plenty of scope for randomisation. The issue with this approach is file size. The dictionaries I found contained over 450k words and were around 5 MB. I was planning Throwaway to be a client side only app, and putting a 5 MB text file as a resource for a client side app is just mental. Sure, I could trim down the number of words in the dictionary, but that's not a job I want to do. An alternative would be to have this file in the backend, cached and ready to spit out 3 random words on request. I was looking into doing this using serverless functions, but I really wanted to do this without resorting to server side code.

The route I ended up taking was to not use a dictionary at all, but to produce randomly generated kinda-proncouable words. They're not real words, just randomly generated characters concatenated in a specific way. If you take a consonant, a vowel, then another consonant, you end up with a pronounceable syllable. Combine a couple of these and you've got a (usually) pronounceable word.

Here's what I came up with:

```js
function randomString() {
  const vowels = "aeiou";
  const consonants = "bcdfghjklmnpqrstvwxyz";
  let word = "";
  for (let i = 0; i < 6; i++) {
    if (i === 1 || i === 4) word += vowels[randomInt(0, vowels.length)];
    else word += consonants[randomInt(0, consonants.length)];
  }
  return word;
}
```

This is by no means perfect, but it gets the job done. It could use some finessing, possibly putting weights on some of the consonants that are not so common in English, like q, x and z. Combine three of theses words together with some dashes and you can end up with some reasonably readable email address usernames:

- **riscow-salruk-xocfuf** (see what I mean about the 'x' - there should possibly be some rules regarding position or weighting)
- **lalpux-cubvow-gopgiz**
- **ketkiy-boylal-gipyey**

This is the current approach, but there's scope for change in the future.

### 3. Alternative inbox services

Many websites have built-in protection against people registering with these sorts of email addresses. They don't want you to use them. If you don't give your real data then you can't be sold to or have your data sold on. You're not worth anything to them. There isn't a definitive list of all of the domains names for disposable email, so when faced with blocking these registrations most developers will do a small amount of research to build up a list of commonly used services and block those domains. As such, if a website is blocking a particular domain, it should be simple to switch to a different domain within the tool.

Mailinator and maildrop are the first two services, but more services may be added later. If you have a suggestion for throwaway email service that would be compatible, [raise an issue in GitHub](https://github.com/erresen/throwaway/issues/new) and I'll take a look! A compatible service is one that you can access the inbox by passing the email address or username as a query string parameter, i.e. `someservice.com?email=throwaway@someservice.com`

### 4. Static hosting

I don't really want to pay to host and maintain what is essentially a toy project. GitHub Pages is my preferred host as it's so simple to deploy to from a public GitHub repository. I thought about possibly looking into [Netlify](https://www.netlify.com/) or [Heroku](https://www.heroku.com/), but I already use GitHub for this blog and for work (on a different account), so I'm pretty comfortable with the platform in general.

### 5. No backend (if not possible then use free serverless functions)

Expanding on the previous requirement, if any backend functionality is required then it should be free and as low maintenance as possible. [Vercel](https://vercel.com/) offer free serverless functions. This is the route I was considering when looking at serving up the random dictionary words. I may still go this route in future. They even offer serverless functions in [Go](https://golang.org/), which I've been interested in learning for years. When I was considering this route, [Go support](https://vercel.com/docs/v2/serverless-functions/supported-languages#go) was only in alpha, so probably wouldn't be super-stable.

### 6. History of previously generated emails

Let users keep a log of the email addresses (with links to the inboxes) that they've generated previously. This should be generated and stored on the client, for both privacy and simplicity.
I went the localStorage route with this. I'm not really concerned with compatibility here, and nothing super-sensitive is getting stored. Whenever a generated email is copied (using the copy to clipboard button), or the go-to-inbox button is clicked, that email address is stored in history. There's a checkbox to choose whether or not to store these for later. If that's checked then a json object of the email history is stored in local storage. Nothing fancy. Individual email addresses can be removed from the history, or if you want the whole lot gone, uncheck the save for later box and leave the page... it won't be there when you come back.

## Conclusion

To be honest, I'm pretty happy with the tool. I'm not a web designer, so it was never going to be gorgeous, but I've effectively made what I intended to... a tool that I actually use regularly myself, that doesn't make my eyes bleed. I learnt a bit about Vue, and I finally _got the point_ of front end frameworks. As a .NET dev who spends nearly all day in MVC land, it took a while for me to understand what all the hype with front-end frameworks was about. I've tried React, Next and Angular in the past... maybe I just didn't have the right project to get my feet wet.

## Future scope

- As mentioned above, I think the random word generator could do with some refinement. It works, but it could be better.
- This could potentially be a PWA, but I don't know if it really adds anything. It's never going to be used offline, and I'd need to change how the history is stored to be PWA compatible. This might not be the right project for that.
- Random name/username generation. One thing I've noticed since I've started using the tool is that when I'm registering on sites, I'm having to come up with usernames and first/last names. There's definitely scope for adding this to the tool, although you can just use the username part of the generate email.

If you have suggestions for more disposable email services, a feature idea, or find something seriously janky with the tool, [raise an issue on GitHub](https://github.com/erresen/throwaway/issues/new) and I'll try to get it sorted!
