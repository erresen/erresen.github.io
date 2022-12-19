---
layout: post
title: "Nullable object must have a value - C#"
date: 2022-04-08 7:45:00
tags: dotnet csharp
comments: true
permalink: "/dotnet/csharp/2022/04/08/nullable-object.html"
---

I recently came across an error I haven't seen before (or certainly can't remember):

`InvalidOperationException: Nullable object must have a value.`

It was thrown in a C# MVC view and the Visual Studio debugger (unhelpfully) didn't break at the line that was throwing the error. As such it was more challenging than usual to track down the cause of the bug.

We'd recently updated how the data objects that are used on this page were created. They're now able to be made at an earlier stage where not all information is available.

A while ago, a fellow developer had added some code for choosing an html class for a DOM object (for styling). The code chooses the html class to use by getting the value of a nullable enum property on the model, and then checking a custom attribute on that enumeration value. What he'd done (and shamefully wasn't picked up on a code review), was he'd accessed the `MyModel.MyProperty.Value` without null checking.

The reason that this took so long to come to light was that in the past these properties were never null.

Long story short, if you ever come across this error, look in your code for any access to `.Value` on a nullable object, without an associated `.HasValue` or `!= null` null check.

I think I'd not seen this error before as I'm pretty militant about null checking. I probably err too much on the side of caution and over-null-check.

At first I thought it was a little strange that this wasn't simply a null reference exception, but `.Value` is a property of `Nullable<T>` and will always throw an `InvalidOperationException` if you try to access it when `.HasValue` is false. Here's the MSDN page if you're interested: [Nullable&lt;T&gt;.Value Property](https://docs.microsoft.com/en-us/dotnet/api/system.nullable-1.value)

There's still one unknown; why didn't the debugger break on the line in the view that caused the error? I think this is to do with Visual Studio and debugging of .cshtml views, but any pointers on this would be appreciated.
