--- 
layout: post
title: whereis,which输出命令的位置
tags: 
- shell
- Ubuntu
- linux
categories:
- code
- linux
UUID: 20130224012700
date: 2013-02-24 01:27:00
show_img: "/media/pub/linux/whereis-images.jpg"
---

　　Linux 中经常会遇到，安装的软件却忘记了具体的安装路径，通过使用whereis,which命令可以解决这个问题：
<ol>
<li>which —— 查看可执行文件的位置 </li>
<li>whereis —— 命令只能用于程序名的搜索，而且只搜索二进制文件</li>
</ol>

###whereis 命令
语法:
<pre id="bash">
whereis [options] file
</pre>
参数说明:<br>
-b ： 只找二进制文件 <br>
-m ： 只找在说明文件manual路径下的文件 <br>
-s ： 只找source源文件 <br>
-u ： 没有说明文档的文件 <br>

例如:<br>
<pre id="bash">
$ whereis mysql
mysql: /usr/bin/mysql /etc/mysql /usr/bin/X11/mysql /usr/share/man/man1/mysql.1.gz
</pre>

### which 命令
语法:
<pre id="bash">
$ which file
</pre>

例如:
<pre id="bash">
$ which mysql
/usr/bin/mysql
</pre>
