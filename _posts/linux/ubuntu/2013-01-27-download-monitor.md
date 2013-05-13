--- 
layout: post
title: Download Monitor监控上传和下载流量
tags: 
- shell
- Ubuntu
- linux
- Download
- Monitor
categories:
- code
- linux
- topic
UUID: 20130127013000
date: 2013-01-27 01:30:00
show_img: "/media/pub/linux/download-monitor.jpg"
---

   　download-monitor 通过网络上传和下载的数据量。显示此网络使用情况的图形。允许设置配额，并发出警告时，它是即将超过。监控随着时间的推移在网络上下载和上传的数据的量。容易阅读的图表显示此数据。允许设置一个使用配额，并警告说，当超出配额或即将被超越。对需要限制数据流量计划的人非常有用。

###Ubuntu12.04 &12.10 安装download monitor
打开终端，运行下面的命令
<pre id="bash">
$ sudo apt-get install download-monitor
</pre>
如果显示如下信息，则需要修复其相关依赖
<pre id="bash">
Reading package lists... Done
Building dependency tree       
Reading state information... Done
download-monitor is already the newest version.
You might want to run 'apt-get -f install' to correct these:
The following packages have unmet dependencies:
 download-monitor : Depends: vnstat but it is not going to be installed
 E: Unmet dependencies. Try 'apt-get -f install' with no packages (or specify a solution).
</pre>
需要修复依赖问题,再安装
<pre id="bash">
$ sudo apt-get -f install
$ sudo apt-get install download-monitor 
</pre>

###Download monitor  Overview
<a href="{{site.url}}/media/pub/linux/download-monitor.jpg" alt="download monitor" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.url}}/media/pub/linux/download-monitor.jpg" width="560px"  alt="download monitor" />
</a>

###Download Monitor 设置
设置配额是要通过其统一发射器的设置配额执行，点击它，召唤一个对话框哪里下载配额，上传配额和配额总量是要调整;后的首选配额值是进入，超过数据的使用（超过设定的配额）通过通知的通知。

<a href="{{site.url}}/media/pub/linux/download-monitor-setting.jpg" alt="download monitor" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.url}}/media/pub/linux/download-monitor-setting.jpg" width="330px" class="img-center" alt="download monitor" />
</a>


