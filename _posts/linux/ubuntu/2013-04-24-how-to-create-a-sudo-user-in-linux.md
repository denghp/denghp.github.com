--- 
layout: post
title: Linux 创建sudo用户权限
tags: 
- shell
- Ubuntu
- linux
categories:
- code
- linux
UUID: 20130424001000
date: 2013-04-24 00:10:00
show_img: "/media/pub/linux/create-user-sudo.jpg"
---


###创建用户(Create a User)
在linux中创建一个用户在，打开终端（按Ctrl + Alt+ T），并执行命令,执行如下命令:
<pre id="bash">
$ sudo adduser user_name
</pre>
按照相应提示输入信息，就可以创建新用户了。
<a href="{{site.url}}/media/pub/linux/create-user-sudo.jpg" alt="create user sudo" rel="prettyPhoto[{{page.UUID}}]">
  <img src="/media/pub/linux/create-user-sudo.jpg" width="560px"  alt="create user sudo" />
</a>

创建完成后，一般需要增加sudo权限，这时就要用到visudo这个命令。

###给用户授予sudo权限
现在如果创建好了用户，接下来就可以将创建的用户添加到sudo组,(sudo组是系统默认的，你也可以添加到admin组.)
<pre id="bash">
$ sudo adduser user_name sudo
OR
$ sudo adduser user_name admin
</pre>

如果sudo组不存在，或者你想使用自己创建的群组，使用如下命令:

###创建用户组(Creating a group)
创建用户组命令:
<pre id="bash">
$sudo addgroup group_name
</pre>

将用户组添加到sudoers file,使用如下命令:
<pre id="bash">
$ sudo visudo
</pre>

在文件的最后，添加如下命令，保存退出。
<pre id="bash">
%group_name  ALL=(ALL:ALL) ALL
</pre>

虽然创建组是没有必要的，但它使用户管理（具有不同的权限）容易得多。无论如何，如果你只是想授予root权限的任何用户，然后将此行添加到sudoers文件 
<pre id="bash">
user_name  ALL=(ALL:ALL) ALL
</pre>
