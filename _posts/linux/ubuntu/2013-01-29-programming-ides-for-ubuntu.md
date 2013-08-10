--- 
layout: post
title: Ubuntu 常用的编程开发环境IDEs
tags: 
- shell
- Ubuntu
- linux
- IDE
categories:
- code
- linux
- special
- archives
UUID: 20130129003000
date: 2013-01-29 00:30:00
images: ["/assets/images/java/eclipse.jpg"]
---

 　　IDE集成开发环境提供了一个先进的开发环境，很多功能和自动化的各种无聊的任务。虽然，在大多数情况下，一个功能强大的文本编辑器VIM或Emacs等将是更好的选择，但有时这是很好的有IDE，特别是如果你正在处理的非常复杂的东西。如没有Eclipse的Android开发将是多痛苦的。

 　　SO，这里是一些常用和最强大的IDE列表可能对您有用。其中有些是沉重的，而有些是轻量级的IDE。

###IDEs for Java/Android Programmers
###Eclipse
Eclipse是一个伟大的IDE，有很多功能，并提供了一个通用的平台。所以，如果你是一个Java程序员，或者希望为Android开发本地应用程序（使用Java，因为有其他的方法来为Android平台开发应用程序） - Eclipse是最好的选择。

<a href="{{site.static_url}}/assets/images/java/eclipse.jpg" alt="eclipse" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.static_url}}/assets/images/java/eclipse.jpg" width="550px"  alt="eclipse"  />
</a>

####Install Eclipse
<pre id="bash">
sudo apt-get install eclipse-platform
#Install JDT for Java Development
sudo apt-get install eclipse-jdt
</pre>

###Netbeans
NetBeans是另一个伟大的IDE特定功能，为Java/ C/ C++/ PHP开发人员，这是一个很好的IDE。它支持各种语言和大量的免费插件是可扩展的默认功能。这是快速，简便，适合初学Java程序员，学习曲线并不陡峭的像Eclipse。
<a href="{{site.static_url}}/assets/images/java/netbeans-ide-550x270.jpg" alt="netbeans" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.static_url}}/assets/images/java/netbeans-ide-550x270.jpg" width="550px"  alt="netbeans"  />
</a>

####Install Netbeans(version 7.x)
<pre id="bash">
sudo apt-get install netbeans
</pre>

###IDEs for C/C++ programmers
尽管Eclipse是良好的FR C / C ++，但KDevelop是更好的C / C ++。它的重量轻（到Eclipse），速度快，它提供了很多很酷的功能，C / C++开发人员。它具有多种功能强大的工具，它是高度可定制的。

<a href="{{site.static_url}}/assets/images/java/kdevelop-IDE-550x331.png" alt="kdevelop" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.static_url}}/assets/images/java/kdevelop-IDE-550x331.png" width="550px"  alt="kdevelop"  />
</a>

####Install KDevelop IDE 
<pre id="bash">
sudo apt-get install kdevelop
</pre>
Netbeans和Eclipse，也是不错的C / C ++，你只需要安装所需的插件。

###IDEs for Web Developers
如果你是一名Web开发人员，那么你可以考虑使用Geany。
<a href="{{site.static_url}}/assets/images/java/geany-ide-snapshot-550x383.jpg" alt="kdevelop" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.static_url}}/assets/images/java/geany-ide-snapshot-550x383.jpg" width="550px"  alt="kdevelop"  />
</a>

####Install Geany
<pre id="bash">
sudo apt-get install geany
</pre>

###For HTML/CSS/JAVASCRIPT
Eclipse也有插件的Web编程，但如果你想要一个全功能的HTML / CSS / JS的专用IDE然后尝试Bluefish Editor。

<a href="{{site.static_url}}/assets/images/java/bluefish-editor-snapshot-550x442.png" alt="bluefish" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.static_url}}/assets/images/java/bluefish-editor-snapshot-550x442.png" width="550px"  alt="bluefish"  />
</a>

####Install Bluefish Editor
<pre id="bash">
sudo apt-get install bluefish
</pre>

###For PHP
使用KDevelop或NetBeans，他们很好地支持PHP。在KDevelop，如果你想使用PHP，然后再安装PHP插件 
<pre id="bash">
sudo apt-get install kdevelop-php
</pre>

###For Python
IDLE – is a good IDE for python developers.
<pre id="bash">
sudo apt-get install idle-python2.7
#If you want to use Python 3.2 then
sudo apt-get install idle-python3.2
</pre>
