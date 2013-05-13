--- 
layout: post
title: Hadoop 动态添加节点datanode及tasktracker
tags: 
- CentOS
- linux
- Hadoop
categories:
- linux
- Hadoop
- code
UUID: 201105061236
date: 2011-05-06
---
有的时候， datanode或者tasktracker crash，或者需要向集群中增加新的机器时又不能重启集群。下面方法也许对你有用。
<ol>
<li>
把新机器的增加到conf/slaves文件中（datanode或者tasktracker crash则可跳过） 
</li>
<li>
在新机器上进入hadoop安装目录 
</li>
<pre id="bash">
$ bin/hadoop-daemon.sh start datanode 
$ bin/hadoop-daemon.sh start tasktracker 
</pre>
<li>在namenode上 </li>
<pre id="bash">
$ bin/hadoop balancer
</pre>
</ol>
