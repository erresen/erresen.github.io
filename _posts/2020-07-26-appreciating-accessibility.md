---
layout: post
title: "Appreciating accessibility - Keyboard shortcut guidelines"
date: 2020-07-26 20:05:00
categories: csharp dotnet accessibility shortcuts visualstudio 
comments: true
---

You know what really sucks? Breaking bones. I'd been watching too many mountain biking videos on YouTube and after the first jump on a ride at my local bike trails, I came to realise that my enthusiasm and confidence far outweighed my skill. After over-jumping the jump, hitting a tree, flying over the bars and landing directly on my left shoulder 4 metres down the trail, I now have a broken clavicle (collar bone). 

Living in the UK, we have public health care, so my brother drove me straight to Accident and Emergency. An x-ray soon confirmed that I'd snapped my collar bone in two, but apparently there's not very much to be done. They gave me a sling, told me I'd need to take some pain killers for a few days, and booked me in at the fracture clinic for the following day. At the fracture clinic I go through the x-rays with a specialist doctor while he tells me about the next ten weeks of my life are going to be like. At this point I can barely move my arm. My shoulder's the size of a water melon and turning yellow. Ten weeks like this. Shit. 

I work as a software developer. Mainly ASP.NET and C# stuff. This means I live in Visual Studio... all day, everyday. Have you ever tried to work in VS one handed? Give it a try. It can be done but it's not easy. One of the hardest things are keyboard shortcuts. Alt+Enter especially. I've got big hands, but even I struggle with that one using only my right hand. Luckily most functionality is available through context menus or through other parts of the UI. 

A fantastic thing about VS is that nearly all keyboard shortcuts are remappable. I'd never thought of this as an accessibility feature before, but it really is. I've resisted changing anymore keyboard shortcuts than strictly necessary, as I'm intending to start using both arms again one day, but it's fantastic that this is available in a tool that I rely on to work and pay the bills. 

The majority of my work as a developer is web based, so when considering accessibility I tend to think about making things accessible for those with visual impairments; the blind and the partially sighted. Ensuring that the site works with screen readers and making sure controls and text have sufficient size and contrast is where a lot of accessibility effort is generally focused. There's also things like not making tap targets not too close together, which is as much a mobile friendliness consideration as an accessibility consideration.

As most of my work is for the web, I don't develop very many piece of software that utilise keyboard shortcuts extensively. If any of my future work does incorporate keyboard shortcuts, I'm certainly going to be considering how people with physical restrictions will be able to use them. 

I don't know what the "official" guidelines for keyboard shortcut accessibility are (or whether there are any guidelines!), but during the last few weeks of convalescence I've found thought about the guidelines that I'd appreciate. 

## Accessibility guidelines for keyboard shortcuts

- **Single handed shortcuts:** Prefer shortcut keys that can be reached with a single hand. Most shortcuts are comprised of a modifier key (Shift, Alt, Ctrl, Win, Cmd) along with another "normal" key. Try to keep the "normal" key within reasonable reach of the modifier. Shift and Ctrl *usually* have keys on both sides of the keyboard, so more keys can be paired with these. Note that although Alt appears on both sides of the space bar, the right hand key is AltGr. They are actually two different keys, so keep that in mind when mapping shortcuts.
- **Remappable:** It's not always reasonable to make all the default keyboard shortcuts single-handed. It's also likely that for able bodied users, some single handed shortcuts may actually be less comfortable or convenient than shortcuts that require both hands (or are more comfortable using both hands). That's fine, and it's a good idea to cater to your primary demographic. It's also a good idea to allow users to remap these shortcuts. It's not simply an accessibility feature, it's great for the types that love to customise everything. 
- **Provide alternatives:** Providing an interface to allow users to remap their keyboard shortcuts isn't always feasible. Maybe there's no budget, or the scope of the project simply doesn't allow for it. In these cases it's simple and quick to provide alternatives to more complex or finger-stretching shortcuts. It doesn't have to be every shortcut, but for commonly used shortcuts that are more comfortable with two hands, consider adding single-handed alternatives. 

That's it. Nothing fancy or too technical. If in doubt about whether a keyboard shortcut complies with these guidelines, just try it with one hand! Imagine having to do that every time you require that shortcut... you'll soon figure out whether it's accessible or not. 
