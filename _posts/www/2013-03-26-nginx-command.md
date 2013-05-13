--- 
layout: post
title: Nginx 常用命令
tags: 
- 互联网
- Nginx
- 负载均衡
categories:
- www
- code
UUID: 20130326001010
date: 2013-03-26 00:10:00
---

　　Nginx（发音同enginex）是一款轻量级的Web 服务器/反向代理服务器及电子邮件（IMAP/POP3）代理服务器，并在一个BSD-like 协议下发行。由俄罗斯的程序设计师Igor Sysoev所开发，供俄国大型的入口网站及搜寻引擎Rambler（俄文：Рамблер）使用。其特点是占有内存少，并发能力强，事实上nginx的并发能力确实在同类型的网页服务器中表现较好.中国大陆使用nginx网站用户有：新浪、网易、 腾讯、小米官网等。

###停止操作
停止操作是通过向nginx进程发送信号（什么是信号请参阅linux文 章）来进行.

1、查询nginx主进程号,找到master进程ID
<pre id="bash">
$ ps -ef | grep nginx
nobody   10854 26598  0 11:26 ?        00:00:00 nginx: worker process        
nobody   10855 26598  0 11:26 ?        00:00:00 nginx: worker process        
nobody   10856 26598  0 11:26 ?        00:00:00 nginx: worker process        
nobody   10857 26598  0 11:26 ?        00:00:00 nginx: worker process        
root     11140  8622  0 11:42 pts/0    00:00:00 grep nginx
root     26598     1  0 Jan24 ?        00:00:00 nginx: master process sbin/nginx -c conf/nginx.conf
</pre>
2、 发送停止信号
<pre id="bash">
#从容停止Nginx：
kill -QUIT 主进程号
#快速停止Nginx：
kill -TERM 主进程号
#强制停止Nginx：
pkill -9 nginx
</pre>

*备注:*<br>
另外， 若在nginx.conf配置了pid文件存放路径则该文件存放的就是Nginx主进程号，如果没指定则放在nginx的logs目录下。有了pid文 件，我们就不用先查询Nginx的主进程号，而直接向Nginx发送信号了，命令如下：
<pre id="bash">
kill -信号类型 '/usr/nginx/logs/nginx.pid'
</pre>

###平滑重启
如果更改了配置就要重启Nginx，要先关闭Nginx再打开？不是的，可以向Nginx 发送信号，平滑重启。

*平滑重启命令：*
<pre id="bash">
$ kill -HUP 主进称号或进程号文件路径
#或者使用
$ /usr/local/nginx/sbin/nginx -s reload
</pre>

*备注:*<br>
修改了配置文件后最好先检查一下修改过的配置文件是否正确，以免重启后Nginx出现错误影响服务器稳定运行。判断Nginx配置是否正确命令如下：
<pre id="bash">
$ nginx -t -c /usr/nginx/conf/nginx.conf
#或者
$ /usr/nginx/sbin/nginx -t
</pre>

###平滑升级
如果服务器正在运行的Nginx要进行升级、添加或删除模块时，我们需 要停掉服务器并做相应修改，这样服务器就要在一段时间内停止服务，Nginx可以在不停机的情况下进行各种升级动作而不影响服务器运行。

*步骤1：*

如果升级Nginx程序，先用新程序替换旧程序文件，编译安装的话新程序直接编译到Nginx安装目录中。

*步 骤2：执行命令*
<pre id="bash">
$ kill -USR2 旧版程序的主进程号或进程文件名
</pre>
此时旧的Nginx主进程将会把自己的进程文件改名为.oldbin，然后执行新版 Nginx。新旧Nginx会同市运行，共同处理请求。
这时要逐步停止旧版 Nginx，输入命令：
<pre id="bash">
$ kill -WINCH 旧版主进程号
</pre>
慢慢旧的工作进程就都会随着任务执行完毕而退出，新版的Nginx的工作进程会逐渐取代旧版 工作进程。

此时，我们可以决定使用新版还是恢复到旧版。
不重载配置启动新/旧工作进程
<pre id="bash">
$ kill -HUP 旧/新版主进程号
</pre>
从容关闭旧/新进程
<pre id="bash">
$ kill -QUIT 旧/新主进程号
</pre>
如果此时报错，提示还有进程没有结束就用下面命令先关闭旧/新工作进程，再关闭主进程号：
<pre id="bash">
$ kill -TERM 旧/新工作进程号
</pre>
