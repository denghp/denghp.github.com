---
layout: post
title: "Linux ulimit 设置"
tags: 
- linux
- shell
comment: true
published: true
author: demi-panda
categories:
- linux
UUID: 201211160030
date: 2012-11-16
---


大家都知道Linux系统默认打开文件数是1024，而实际的生产环境中，这个值总是显得太小，而太小的后果就是你的系统会报：too many open files 等这样的错误导致你系统死掉，所以我们总是要修改这个值，虽然表面上看来，Linux提供了ulimit这样的命令让你修改这个文件打开数，但不幸的是，过程远远没有看到的那么简单，下面子猴就谈谈这方面的问题。

### 语法
ulimit 命令的格式为：ulimit [options] [limit]
具体的 options 含义以及简单示例可以参考以下表格。

####ulimit 参数说明
<table border="0" cellpadding="0" cellspacing="0" class="ibm-data-table"><tr><td style="text-align:left; vertical-align:top">
<strong>选项 [options]</strong>
</td><td style="text-align:left; vertical-align:top">
<strong>含义</strong>
</td><td style="text-align:left; vertical-align:top">
<strong>例子</strong>
</td></tr><tr><td style="vertical-align:top">
-H 
</td><td style="vertical-align:top">
设置硬资源限制，一旦设置不能增加。
</td><td style="vertical-align:top">
ulimit – Hs 64；限制硬资源，线程栈大小为 64K。
</td></tr><tr><td style="vertical-align:top">
-S 
</td><td style="vertical-align:top">
设置软资源限制，设置后可以增加，但是不能超过硬资源设置。
</td><td style="vertical-align:top">
ulimit – Sn 32；限制软资源，32 个文件描述符。
</td></tr><tr><td style="vertical-align:top">
-a 
</td><td style="vertical-align:top">
显示当前所有的 limit 信息。
</td><td style="vertical-align:top">
ulimit – a；显示当前所有的 limit 信息。
</td></tr><tr><td style="vertical-align:top">
-c 
</td><td style="vertical-align:top">
最大的 core 文件的大小， 以 blocks 为单位。
</td><td style="vertical-align:top">
ulimit – c unlimited； 对生成的 core 文件的大小不进行限制。
</td></tr><tr><td style="vertical-align:top">
-d 
</td><td style="vertical-align:top">
进程最大的数据段的大小，以 Kbytes 为单位。
</td><td style="vertical-align:top">
ulimit -d unlimited；对进程的数据段大小不进行限制。
</td></tr><tr><td style="vertical-align:top">
-f 
</td><td style="vertical-align:top">
进程可以创建文件的最大值，以 blocks 为单位。
</td><td style="vertical-align:top">
ulimit – f 2048；限制进程可以创建的最大文件大小为 2048 blocks。
</td></tr><tr><td style="vertical-align:top">
-l 
</td><td style="vertical-align:top">
最大可加锁内存大小，以 Kbytes 为单位。
</td><td style="vertical-align:top">
ulimit – l 32；限制最大可加锁内存大小为 32 Kbytes。
</td></tr><tr><td style="vertical-align:top">
-m 
</td><td style="vertical-align:top">
最大内存大小，以 Kbytes 为单位。
</td><td style="vertical-align:top">
ulimit – m unlimited；对最大内存不进行限制。
</td></tr><tr><td style="vertical-align:top">
-n 
</td><td style="vertical-align:top">
可以打开最大文件描述符的数量。
</td><td style="vertical-align:top">
ulimit – n 128；限制最大可以使用 128 个文件描述符。
</td></tr><tr><td style="vertical-align:top">
-p 
</td><td style="vertical-align:top">
管道缓冲区的大小，以 Kbytes 为单位。
</td><td style="vertical-align:top">
ulimit – p 512；限制管道缓冲区的大小为 512 Kbytes。
</td></tr><tr><td style="vertical-align:top">
-s 
</td><td style="vertical-align:top">
线程栈大小，以 Kbytes 为单位。
</td><td style="vertical-align:top">
ulimit – s 512；限制线程栈的大小为 512 Kbytes。
</td></tr><tr><td style="vertical-align:top">
-t 
</td><td style="vertical-align:top">
最大的 CPU 占用时间，以秒为单位。
</td><td style="vertical-align:top">
ulimit – t unlimited；对最大的 CPU 占用时间不进行限制。
</td></tr><tr><td style="vertical-align:top">
-u 
</td><td style="vertical-align:top">
用户最大可用的进程数。
</td><td style="vertical-align:top">
ulimit – u 64；限制用户最多可以使用 64 个进程。
</td></tr><tr><td style="vertical-align:top">
-v 
</td><td style="vertical-align:top">
进程最大可用的虚拟内存，以 Kbytes 为单位。
</td><td style="vertical-align:top">
ulimit – v 200000；限制最大可用的虚拟内存为 200000 Kbytes。
</td></tr></table>


### 查看ulimit 参数 ulimit -a
<pre id="bash">
core file size          (blocks, -c) 0
data seg size           (kbytes, -d) unlimited
scheduling priority             (-e) 0
file size               (blocks, -f) unlimited
pending signals                 (-i) 15951
max locked memory       (kbytes, -l) 64
max memory size         (kbytes, -m) unlimited
open files                      (-n) 1024
pipe size            (512 bytes, -p) 8
POSIX message queues     (bytes, -q) 819200
real-time priority              (-r) 0
stack size              (kbytes, -s) 8192
cpu time               (seconds, -t) unlimited
max user processes              (-u) 15951
virtual memory          (kbytes, -v) unlimited
file locks                      (-x) unlimited
</pre>
open files 系统默认下是1024, 程序中如果有大量的IO文件操作，很可能出现too many open files.

### 修改目标
我们的目标是：让每一个用户登录系统后系统打开的最大文件数都是我们设定好的。
但我这里不得不说的是：非常遗憾，网上很多这方面关于ulimit设置修改资源限制的文章，但没一篇文章管用。
把这个目标分解为两个目标：
####设置对root用户登录系统生效
这个目标可以实现起来不难
####设置对所有用户生效
这个就非常麻烦了，弄不好还会把你的系统给整坏，因为要重编译Linux的内核才行！
所以权衡之下，我只实现了第一个目标，因为第二个目标的风险太大，我想如果我之前知道这点，那么我在装系统的时候我会先做这个处理，但现在我觉得已经晚了。
###修改的地方
####修改/etc/security/limits.conf
通过 vi /etc/security/limits.conf修改其内容，在文件最后加入（数值也可以自己定义）：
<pre id="bash">
* soft  nofile = 32768
* hard  nofile = 65536
</pre>
####修改/etc/profile
通过vi /etc/profile修改，在最后加入以下内容
<pre id="bash">
$ ulimit -n 32768
</pre>
然后重新登录即可生效了。
说明：
其实只修改/etc/profile就可以生效了，但我还是建议把/etc/security/limits.conf也修改一下。
最后强调的是，你如果要使得修改对所有用户都生效，那么现在看来你只能重新编译Linux的内核才行
