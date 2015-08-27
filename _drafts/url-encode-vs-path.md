I recently ran into a problem whilst rewriting part of an auto update DLL used for internal C# applications. I was updating it to not use certain libraries that weren’t compatible with dotNET4.5.
The auto updater checks an XML feed from a TeamCity continuous integration server, looking if there’s a newer Released version available.
The problem reared its head when applications that had spaces in their solution or project names tried to download the installer executable for the project’s latest Release. The auto-updater would see that a new version was available, but couldn’t download it. After further investigation it was also affecting projects that had their installer artefact with a subdirectory from their project’s root on the build server… Turns out the problem was how the part of URL of the new install file was being encoded.

Build artefact’s, such as installers, are available at http://build_server:port/repo/download/BUILD_CONFIG_ID/BUILD_ID:id/ARTEFACT_PATH 
This address is concatenated together from known values. The build_server and port are always the same. The build_config_id is always the same (per project) and the build_id and the artefact_path come from the XML feed from TeamCity, changing from release to release. All of these variable URL elements are valid for a HTTP path except the artefact_path. The artefact_path could be valid file system path, but that doesn’t make it a valid HTTP path! The path needed to be encoded. And it was. It was being encoded using System.Web.HttpUtility.UrlEncode(). Turns out this is the wrong sort of encoding to use to HTTP-ify a path. You need System.Web.HttpUtility.UrlPathEncode()

{% highlight csharp %}
// given the path
string path = "Installer/My Installer.msi";

// UrlEncode() returns "Installer%2fMy+Installer.msi"
Console.WriteLine(System.Web.HttpUtility.UrlEncode(path));

// UrlPathEncode() returns "Installer/My%20Installer.msi"
Console.WriteLine(System.Web.HttpUtility.UrlPathEncode(path));
{% endhighlight %}

As you can see, the UrlEncode method encodes spaces and other special characters, whereas UrlPathEncode() keeps most characters, only apparently encoding spaces to their hexadecimal notation. 

The MSDN page for UrlPathEncode states not to use it, but it certainly did the job for me.

Uri.EscapeUriString()
