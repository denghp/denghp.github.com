--- 
layout: post
title: python 调用Linux的Shell命令
tags: 
- python
- linux
- shell
- 研发实践
categories:
- code
- archives
UUID: 201301251427
date: 2013-01-25 08:27:22
images: ["/assets/images/python/486px-Python_logo.png"]
---

<a href="{{site.url}}/assets/images/python/486px-Python_logo.png" alt="python" target="_bank">
<img src="{{site.aliyun_oss}}/assets/images/python/486px-Python_logo.png" alt="python" width="380px" class="img-center"/>
</a>

  　　Python是一种即译式的，互动的，面向对象的编程语言，它包含了模组式的操作，异常处理，动态资料形态，十分高层次的动态资料结构，以及类别的使用。它具有很多优秀的脚本语言的特点：解释的，面向对象的，内建的高级数据结构，支持模块和包，支持多种平台，可扩展。而且它还支持交互式方式运行，图形方式运行。它拥有众多的编程界面支持各种操作系统平台以及众多的各类函数库。介绍下Python调用Linux的shell命令.

###os 模块
1、os模块的exec方法族。Python的exec系统方法同Unix的exec系统调用是一致的。这些方法适用于在子进程中调用外部程序的情况，因为外部程序会替换当前进程的代码，不会返回。

2、os.system(cmd) os模块的system方法。system方法会创建子进程运行外部程序，方法只返回外部程序的运行结果。这个方法比较适用于外部程序没有输出结果的情况。比如在Ubuntu下，使用下面命令在桌面上显示一条提示信息。
<pre id="bash">
denghp@denghp:~/temp$ python
Python 2.7.3 (default, Aug  1 2012, 05:14:39) 
[GCC 4.6.3] on linux2
Type "help", "copyright", "credits" or "license" for more information.
>>> import os
>>> os.system('ls -lt')
total 32
-rw-rw-r-- 1 denghp denghp  209 Jan 21 15:37 0752.tar.gz
drwxrwxr-x 2 denghp denghp 4096 Jan 21 15:37 test
-rw-rw-r-- 1 denghp denghp    5 Jan 17 17:43 0752.txt
-rw-rw-r-- 1 denghp denghp    4 Jan 17 17:43 abc0752abc.txt
-rw-rw-r-- 1 denghp denghp    4 Jan 17 17:43 abc0752.txt
-rw-rw-r-- 1 denghp denghp    4 Jan 17 17:23 c.txt
-rw-rw-r-- 1 denghp denghp    8 Jan 17 17:23 b.txt
-rw-rw-r-- 1 denghp denghp    6 Jan 17 17:23 a.txt
0
</pre>
3、使用os模块的popen方法。当需要得到外部程序的输出结果时，本方法非常有用。比如使用urllib调用Web API时，需要对得到的数据进行处理。os.popen(cmd) 要得到命令的输出内容，只需再调用下read()或readlines()等 如a=os.popen(cmd).read()
<pre id="bash">
>>> print os.popen('ls -lt').read()
total 32
-rw-rw-r-- 1 denghp denghp  209 Jan 21 15:37 0752.tar.gz
drwxrwxr-x 2 denghp denghp 4096 Jan 21 15:37 test
-rw-rw-r-- 1 denghp denghp    5 Jan 17 17:43 0752.txt
-rw-rw-r-- 1 denghp denghp    4 Jan 17 17:43 abc0752abc.txt
-rw-rw-r-- 1 denghp denghp    4 Jan 17 17:43 abc0752.txt
-rw-rw-r-- 1 denghp denghp    4 Jan 17 17:23 c.txt
-rw-rw-r-- 1 denghp denghp    8 Jan 17 17:23 b.txt
-rw-rw-r-- 1 denghp denghp    6 Jan 17 17:23 a.txt
</pre>

###commands 模块
使用commands模块的getoutput方法，这种方法同popend的区别在于popen返回的是一个文件句柄，而本方法将外部程序的输出结果当作字符串返回，很多情况下用起来要更方便些。<br>
<strong>主要方法:</strong>
commands.getstatusoutput(cmd) 返回(status, output).<br>
commands.getoutput(cmd) 只返回输出结果<br>
commands.getstatus(file) 返回ls -ld file的执行结果字符串，调用了getoutput，不建议使用此方法.<br>
<pre id="bash">
>>> import commands
>>> commands.getstatusoutput('find -name "*.txt" ')
(0, './abc0752.txt\n./a.txt\n./c.txt\n./0752.txt\n./test/abc0752.txt\n./test/0752.txt')
>>> result = commands.getstatusoutput('find -name "*.txt"|head -n1')
>>> print result
(0, './abc0752.txt')
</pre>

###使用subprocess模块
使用subprocess模块，这个模块比较复杂，可以对子进程做更多控制。根据Python官方文档说明，subprocess模块用于取代上面这些模块。有一个用Python实现的并行ssh工具—mssh，代码很简短，不过很有意思，它在线程中调用subprocess启动子进程来干活。


