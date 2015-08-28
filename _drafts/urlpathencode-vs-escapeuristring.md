---
layout: post
title:  "UrlPathEncode vs Uri.EscapeUriString"
date:   2015-08-28 19:00:00
categories: csharp nunit
---

[TestFixture]
internal class Tests
{
    private string[] urlStrings =
        {
            @"https://msdn.microsoft.com/en-us/library/system.uri.escapestring(v=vs.110).aspx",
            @"https://msdn.microsoft.com/en-us/library/system.uri.escape string(v=vs.110).aspx",
            @"This is my/installer path.exe",
            @"this is a windows\path",
            @"-_.!~*'()",
            @"this/path/has/a%25sign"

        };

    [Test, TestCaseSource("urlStrings")]
    public void CheckDifferences(string url)
    {
        string urlPathEncode = HttpUtility.UrlPathEncode(url);
        string escapeUriString = Uri.EscapeUriString(url);

        Console.WriteLine("UPE: {0}", urlPathEncode);
        Console.WriteLine("EUS: {0}", escapeUriString);
        
        Assert.AreEqual(urlPathEncode, escapeUriString);
    }

    [Test]
    public void ValidPathChars()
    {
        char[] path = Path.GetInvalidPathChars();
        char[] file = Path.GetInvalidFileNameChars();
        string invalidPathChars = string.Concat(path);
        string invalidFileChars = string.Concat(file);

        string invalidChars = string.Concat(invalidPathChars, invalidFileChars);
        Console.WriteLine(invalidChars);
    }
}