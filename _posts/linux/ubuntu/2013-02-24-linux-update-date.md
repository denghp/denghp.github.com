--- 
layout: post
title: Linux 重设日期和时间的方法
tags: 
- shell
- Ubuntu
- linux
categories:
- code
- linux
- archives
UUID: 20130224002700
date: 2013-02-24 00:27:00
images: ["/assets/images/linux/october-calendar-date-md.png"]
---

　　Linux 提供了系统的日期和时间；而计算机硬件也提供了一个基于硬件时钟的时间。在大多数情况下，这连个时间可能差别很大。Linux 系统的时间是从1970年1月1日开始计算的。而计算机的硬件时间取决于机器主板上所安装的时钟芯片的类型，并且许多芯片组在使用一段时间后其硬件时间都会变的不准。

　　保持时间的准确性不仅对单个工作很重要，而且在网络环境下尤为重要。备份、预设停机时间，以及其他网络范围的操作都需要准确协调。主要通过以下三种方式重设日期和时间：
<ol>
<li>date —— 用于在命令行中显示、设置或调整系统的日期和时间</li>
<li>hwclock —— 这是一个root用户命令，用于显示、设置和调整硬件与系统的时钟，并使两个时间同步</li>
</ol>

###使用date命令
查看linux系统的当前日期和时间，则使用date命令，如下:
<pre id="bash">
$ sudo date
Sat Feb 23 21:56:28 CST 2013
</pre>

调整系统的时间命令如下：
<pre id="bash">
#按字符串方式修改时间
date -s 

#修改日期，时间,注意需要加双引号
sudo date -s "2013-02-23 22:10:20"

#修改完时间记得输入如下命令,把系统时间写入CMOS
sudo clock -w
</pre>

###使用hwclock命令
使用hwclock命令可以显示和设置Linux系统与硬件的时间，除此之外，还可以同步系统时间和硬件时间。在hwclock命令后跟上 --show选项，就可以查看硬件日期和时间，如下:
<pre id="bash">
$ sudo hwclock --show
Sun 24 Feb 2013 06:07:06 AM CST  -0.218146 seconds
</pre>

使用 hwclock 命令与 --set 和 --date 选项，就可以手动设置硬件时钟，如下:
<pre id="bash">
$ sudo hwclock --set --date "02/24/13 22:20:03"
$ sudo hwclock --show
Sun 24 Feb 2013 22:20:03 AM CST  -0.153243 seconds
</pre>
为了利用机器的硬件的时钟来设置系统的时间，需要使用 --hctosys选项：
<pre id="bash">
$ sudo hwclock --hctosys
</pre>

如果使用系统时间来设置硬件时钟，则使用 --systohc选项：
<pre id="bash">
$ sudo hwclock --systohc
</pre>


