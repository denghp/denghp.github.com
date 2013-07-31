---
layout: post
title: .bash_profile .bashrc profile 文件的作用的执行顺序
tags: 
- linux
- shell
- bashrc
- profile
- bash_profile
categories:
- linux
UUID: 201211220950
date: 2012-11-22
---

##登陆shell与交互式非登陆shell的区别
<img src="{{site.static_url}}/media/pub/linux/bash-profile.jpg" alt="bashrc profile" width="560px"/> 

###登录shell
所谓登录shell,指的是当用户登录系统时所取的那个   shell。登录shell属于交互式shell。
登录shell将查找4个不同的启动文件来处理其中的命令。 bash shell处理文件的顺序如下：
<pre id="bash">
1: /etc/profile
2: /etc/profile.d等待配置文件
3: $HOME/.bash_profile
4: $HOME/.bash_login
5: $HOME/.profile
</pre>

/etc /profile是bash shell在系统上的主默认启动文 件，系统上 每一个用户在登陆时都将执行此文件。

通过设置这个文件，超级用户可以为全系统内的所有bash用户建立默认特征。不同 Linux版本在此文件放置的命令不尽相同，

在redflag中，该文件设置了几个重要的变量，如：PATH USER LOGNAME MAIL HOSTNAME HISTSIZE  INPUTRC，详情可以查看具体的文件。

其余3个文件具备相同的功能——提供特定于用户的启动文件。大多 数Linux版本只使用其中之一。如：RedFlag使用.bash_profile   ubuntu使用.profile . 
<pre>
shell依次查找~/.bash_profile、
~/.bash_login、
~/.profile(~是用户主目录的速记符)，
</pre>

并执行它找到的首个文件中的命令。
可以将命令放置在这些文件中以覆盖掉/etc/profile文件中的默认设置。
也就是后面的文件可以覆盖或者修改前面的设置 。

###交互式非登录shell
如果启动了一个bash shell而没有等录系统（如在CLI提示符中键入bash）,则启动了一个交互式非登录shell.

而登录shell的初始化文件(比如.bash_profile)通常会运行这个文件。这样，登录shell和非登录shell都可以使用.bashrc中的命令。

如以X Window环境登录Linux时，在X环境所起动的终端，那些shell都是非登录shell.

在交互式非登录shell中并不执行前面提到的初始化文件中的命令。然而，交互式非登录shell从登录shell继承了由这些初始化文件设置的 shell变量。
<pre id="bash">
$HOME/.bashrc
</pre>

交互式非登录shell执行~/.bashrc文件中的命令.在每次执行shell脚本时，都会重新读取这个文件，所以是最完整的。

但是万事都不是一样的，debain系列的是不同的，如ubuntu

/etc/profile--</etc/environment--<$HOME/.profile
