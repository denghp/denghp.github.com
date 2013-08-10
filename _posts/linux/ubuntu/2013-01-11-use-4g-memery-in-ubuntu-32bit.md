--- 
layout: post
title: Ubuntu32位使用4G内存的解决方案
tags: 
- shell
- Ubuntu
- linux
categories:
- code
- linux
- archives
UUID: 201301111027
---

  　　新升级系统内存，从原来的2G加到4G，但是在使用命令查看的时候只能看到3291M，今天给大家分享我的解决方案。如下：

###查看内存 free -m
<pre id="bash">
$ free -m
             total       used       free     shared    buffers     cached
Mem:          3291       801        2489          0        236       95
-/+ buffers/cache:       363       2054
Swap:         1906          0       1906
</pre>

上面的信息显示，默认32bit的Linux系统只能识别出3291 (3G) 内存，所以如果想在32位的系统上使用大于3G的内存，需要安装Physical Address Extension (PAE) ，在Ubuntu上的具体步骤如下：

###更新内核
<pre id="bash">
$ sudo apt- get  update  
$ sudo sudo apt-get  install linux-headers-server linux-image-server linux-server  
$ sudo reboot 
</pre>

###重新启动系统后，查看内存情况
<pre id="bash">
$ free -m  
             total       used       free     shared    buffers     cached  
Mem:          3862       3732        129          0        127       1149  
-/+ buffers/cache:       2455       1406  
Swap:         5720        170       5550  
</pre>
