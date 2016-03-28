---
layout: post
title:  "SVN externals and pre-build events"
date:   2015-09-21 09:23:45
categories: csharp dotnet svn
---
![VS Logo]({{ site.url }}/assets/images/vslogo.png)
Just solved a source control problem for a co-worker that I thought was worth sharing.

The source control setup at work is that we have an externals SVN repository that’s used for common DLL’s used in multiple projects, and then several project repo’s that don’t allow DLL’s into the repo, by way of a pre-commit hook. This stops people committing the same DLL’s over and over again in different projects, therefore reducing repository size. Our usual method used externals is to have a libs folder in the solution directory, and then checkout the external libraries to the libs folder, by way of SVN externals. These externals are then referenced by the solution’s projects.

The aim of this is to allow any engineer to check out a project and build it without dicking around (finding referenced libraries etc.). These projects are then built on our TeamCity continuous integration server, checking that the build works from checkout, run tests, check coding standard conformance etc.

So, we have two, slightly conflicting rules:
1.	No DLL’s to be placed in the main projects repository.
2.	Ensure project can build from checkout.

These rules work fine 99 out of 100 times, using only the method described above, but we just experienced the 1 / 100.

My co-worker had a Visual Studio project that required an externally produced DLL to be placed in the project directory. Not referenced under project references, as per usual, but actually copied into the project folder. He couldn’t checkout the external DLL’s directly into the project directory, either individually, file by file, because SVN doesn’t allow single file externals from different repositories, or by checking out the whole externals folder into the project directory, as SVN doesn’t allow this either.

The solution we came to was to stick with our usual SVN externals procedure, and use a pre-build event to copy the files from the libs folder (described above) to the project directory.

{% highlight csharp %}
xcopy /Y "$(SolutionDir)libs\LibraryName\library.dll" "$(ProjectDir)"
{% endhighlight %}

We don’t tend to use too many pre or post build events, so this solution isn’t the most obvious to the chaps in my office, but conforms to the rules above; there are no DLL’s in the project repo, and the project can build directly from checkout… Win!

I should probably make a script for cleaning up, but for now, this works.