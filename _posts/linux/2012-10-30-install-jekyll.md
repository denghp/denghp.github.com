--- 
layout: post
title: Linux 安装Jekyll 环境
tags: 
- Ubuntu
- linux
- Jekyll
categories:
- linux
- code
UUID: 201210301036
date: 2012-10-30
---

Jekyll是一套blog框架，利用他和github的page页就可以搭建个人的blog了。git的好处和安装使用就不多说了，主要介绍下如何在Ubuntu安装和配置Jekyll。

*参考资料*
<a href="https://github.com/mojombo/jekyll">https://github.com/mojombo/jekyll</a>
<a href="http://jekyllbootstrap.com/">http://jekyllbootstrap.com/</a>

###Github上创建blog项目
在[gituhub dashboard](https://github.com/)上建立一个新项目，名字为username.github.com。注意username为你github的账号，这个项目一定要用这个名字，这个名字的项目github会自动建立一个username.github.com的页面，将你在这个项目里的文件依照Jekyll摸板进行解析

###安装Jekyll-Bootstrap
其实就是下载Jekyll摸板并上传
<pre id="bash">
$ git clone https://github.com/plusjade/jekyll-bootstrap.git USERNAME.github.com
</pre>

如果碰到https证书验证错误之类的提示可以加上sudo试一下。不过如果sudo后要用chgrp和chown把用户改回来，不然之后会很麻烦.
<pre id="bash">
$ cd USERNAME.github.com
$ git remote set-url origin git@github.com:USERNAME/USERNAME.github.com.git
$ git push origin master
</pre>
一切正常的话几分钟后就会收到github发来的邮件通知你页面建立完毕。可以通过username.github.com进行访问了。

###本地调试Jekyll
其实可以把所有的修改直接上传到github上让服务器帮忙解析网页来观察效果，但是如果想在本地调试的话本地也要装一套jekyll

<pre id="bash">
$ sudo gem install jekyll
</pre>
Jekyll requires the gems directory_watcher, liquid, open4, maruku and classifier. These are automatically installed by the gem install command.
安装ruby1.9.1-dev
<pre id="bash">
$ sudo apt-get install ruby1.9.1-dev
</pre>
Red Hat / CentOS / Fedora systems 需要使用如下命令:
<pre id="bash">
$ sudo yum install ruby-devel
</pre>

###安装RDiscount
<pre id="bash">
$ sudo gem install rdiscount
</pre>
And run Jekyll with the following option:
<pre id="bash">
$ jekyll --rdiscount
</pre>

###安装Pygments语法高亮
####On OS X Leopard, Snow Leopard
<pre id="bash">
$ sudo easy_install Pygments
</pre>

####Alternatively on OS X with MacPorts:
<pre id="bash">
$ sudo port install python25 py25-pygments
</pre>
####On Archlinux
<pre id="bash">
$ sudo pacman -S python-pygments
</pre>
####On Ubuntu and Debian:
<pre id="bash">
$ sudo apt-get install python-pygments
</pre>
####On Fedora and CentOS:
<pre id="bash">
$ sudo yum install python-pygments
</pre>
