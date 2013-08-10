---
layout: post
title: Linux kill多个进程
tags: 
- shell
- kill
- linux
- 进程
- 研发实践
categories:
- code
- linux
- archives
UUID: 20130125182300
date: 2013-01-25 18:23:22
description: kill 送出一个特定的信号 (signal) 给行程 id 为 pid 的行程根据该信号而做特定的动作,若没有指定，预设是送出终止 (TERM) 的信号.
---

   　　kill 送出一个特定的信号 (signal) 给行程 id 为 pid 的行程根据该信号而做特定的动作,若没有指定，预设是送出终止 (TERM) 的信号.

###语法
<pre id="bash">
kill [-s sigspec | -n signum | -sigspec] pid | jobspec … or kill -l [sigspec]
</pre>

-s (signal) : 其中常用的讯号有 HUP (1),KILL (9),TERM (15),分别代表着重跑，砍掉,结束; 详细的信号可以用 kill -l （见下结果，可用数字带入）<br>
-p : 印出 pid,并不送出信号<br>
-l (signal) : 列出所有可用的信号名称<br>

###进程
　　进程是Linux系统中一个非常重要的概念。Linux是一个多任务的操作系统，系统上经常同时运行着多个进程。我们不关心这些进程究竟是如何分配的，或者是内核如何管理分配时间片的，所关心的是如何去控制这些进程，让它们能够很好地为用户服务。

　　Linux操作系统包括三种不同类型的进程，每种进程都有自己的特点和属性。交互进程是由一个Shell启动的进程。交互进程既可以在前台运行，也可以在后台运行。批处理进程和终端没有联系，是一个进程序列。监控进程(也称系统守护进程)是Linux系统启动时启动的进程，并在后台运行。例如，httpd 是著名的Apache服务器的监控进程。

###kill命令的工作原理
　　向Linux系统的内核发送一个系统操作信号和某个程序的进程标识号，然后系统内核就可以对进程标识号指定的进程进行操作。比如在top命令中，我们看到系统运行许多进程，有时就需要使用kill中止某些进程来提高系统资源。在讲解安装和登陆命令时，曾提到系统多个虚拟控制台的作用是当一个程序出错造成系统死锁时，可以切换到其它虚拟控制台工作关闭这个程序。此时使用的命令就是kill，因为kill是大多数Shell内部命令可以直接调用的。

###示例
kill单个进程
<pre id="bash">
#查找进程的pid
$ ps -aux | grep "java" | cut -c 9-15
#kill 进程
$ kill -9 pid
</pre>
<strong>说明:</strong><br>
<ol>
<li>管道符“|”用来隔开两个命令，管道符左边命令的输出会作为管道符右边命令的输入</li>
<li>ps -aux  查看所有进程的命令。这时检索出的进程将作为下一条命令grep "java"的输入</li>
<li>grep "java" 选出所有含有关键字"java"的进程。</li>
<li>"cut -c 9-15" 截取输入行的第9个字符到第15个字符，而这正好是进程号PID</li>
</ol>

###kill 多个进程
<pre id="bash">
$ ps -aux | grep "java" | cut –c 9-15 | xargs kill –9
$ ps -aux | grep nobody | awk '{print $2}'| sudo xargs -n 1 kill -9 
$ ps -aux | grep nginx | awk '{print $2}' | sudo xargs -L 1  kill -9
</pre>
<strong>说明:</strong><br>
xargs -n 1 表示运行 Command 参数，且使用尽可能多的标准输入自变量，直到 Number 参数指定的最大值。如果满足以下条件，则 xargs 命令使用更少的自变量：<br>
如果积累的命令行长度超出了由 -s Size 标志指定的字节。<br>
最后的迭代有少于 Number（但是非零）的自变量保留。<br>
注： -L、-I（小写的 L）和 -n 标志是互相排斥的；最后指定的标志生效。<br>

xargs -L 1 用从标准输入读取的指定行数的非空参数运行 Command 命令。如果保留少于指定的 Number，Command 参数的最后调用可以有少数几个参数行。行以第一个换行字符结束，除非该行的最后一个字符是一个空格或制表符。后续的空格表示延续至下一个非空行。
