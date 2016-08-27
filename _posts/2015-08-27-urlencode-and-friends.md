---
layout: post
title:  "C# UrlEncode and Friends"
date:   2015-08-27 19:53:44
categories: csharp
comments: true
---
I recently ran into a problem whilst rewriting part of an auto update DLL used for keeping internal C# applications up-to-date. I was removing dependencies that weren’t compatible with dotNET4.5.
The auto updater reads an XML feed from a TeamCity continuous integration server, comparing version numbers to see if there’s a newer *Release* version of an application available.

The problem reared its head when applications that had spaces in the names of their binaries tried to download the installer executable for their project’s latest Release. The auto-updater would see that a new version was available, but couldn’t download it. *Personally, I try to avoid having spaces (or any other non-alphanumeric character) within the names of the files for my projects. Although Windows doesn’t always mind, it can make command line and web stuff unpredicable, as not every system and protocol deals with the non-standard characters in the same way.* Further investigation showed that it was also affecting projects that had their installer artefact within a subdirectory of their project’s root on the build server (rather than being in the root). It turns out the problem was how part of URL of the new installer executable was being encoded.

Build artefact’s, such as installers, are available for the auto-updater to download from:

`http://BUILD_SERVER:PORT/repo/download/BUILD_CONFIG_ID/BUILD_ID:id/ARTEFACT_PATH` 

This address is assembled by the auto-updater by concatenating together known values: 

- The `BUILD_SERVER` and `PORT` are always the same for every single project (we have four build agents, but only one build server)
- The `BUILD_CONFIG_ID` is always the same (per project) 
- The `BUILD_ID` and the `ARTEFACT_PATH` come from the XML feed from TeamCity, changing from build to build. 

All of these elements are valid for a HTTP path **except** the `ARTEFACT_PATH`. The `ARTEFACT_PATH` will always be valid file system path, but that doesn’t necessarily make it a valid HTTP path! The path from the TeamCity XML feed is simply a file path from the build's root. The path needs to be encoded. And it was. 
It was being encoded using `System.Web.HttpUtility.UrlEncode()`. Turns out this is the wrong sort of encoding to use to HTTP-ify a file path correctly for this particular use case.

```csharp
// given the path
string artefactPath = "Installer/My Installer.msi";

System.Web.HttpUtility.UrlEncode(artefactPath);
// UrlEncode() returns "Installer%2fMy+Installer.msi"
```

When concatenated with the rest of the path, `UrlEncode()` gives a final path of: 

`http://... .../BUILD_ID:id/Installer%2fMy+Installer.msi`

[xkcd404]: http://xkcd.com/404/
This address returns [404 Not Found][xkcd404], i.e. this path doesn't resolve to the location of the file to download. A solution I found to work well was using `System.Web.HttpUtility.UrlPathEncode()`

```csharp
System.Web.HttpUtility.UrlPathEncode(artefactPath);
// UrlPathEncode() returns "Installer/My%20Installer.msi"
```

This gives us a final path of:

`http://... .../BUILD_ID:id/Installer/My%20Installer.msi`

As you can see, the `UrlEncode()` method encodes spaces and other special characters, whereas `UrlPathEncode()` keeps most characters, only apparently encoding spaces to their hexadecimal notation. This resolves correctly to the file location, and, for the last few months, I thought fixed the issue...

[msdn-urlpathencode]: https://msdn.microsoft.com/en-us/library/system.web.httputility.urlpathencode(v=vs.110).aspx
However... the MSDN page for [`UrlPathEncode()`][msdn-urlpathencode] states not to use it (at least not for dotNET4.5), even though it certainly did the job for me.

[so-question]: http://stackoverflow.com/questions/32253571/urlpathencode-alternative
[msdn-uriescape]: https://msdn.microsoft.com/en-us/library/system.uri.escapeuristring(v=vs.110).aspx
Whilst writing this post I asked a [question on StackOverflow][so-question], looking for an alternative to `UrlPathEncode()`, and as is so often the way, in writing my question, I found my own answer: [`Uri.EscapeUriString()`][msdn-uriescape]. It seems to encode the string in the same way as `UrlPathEncode()`, so now I've got to see whether it's worth switching to the EscapeUriString. 

Generally, if something works well I won't fix it... **but** I'm also keen on doing things *the right way*, i.e. if the docs say not to use it, I don't want to use it. I'll have to write some tests, trying every sort of permutation of artefact path I can dream up and see which method behaves better.

Or just write another StackOverflow question...