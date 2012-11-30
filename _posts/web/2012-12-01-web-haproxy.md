--- 
layout: post
title: 负载均衡工具haproxy安装，配置，使用
tags: 
- Web
- haproxy
categories:
- Web
- haproxy
- Linux
- 研发实践
UUID: 201212010027
date: 2012-12-01
---

HAProxy提供高可用性、负载均衡以及基于TCP和HTTP应用的代 理，支持虚拟主机
，它是免费、快速并且可靠的一种解决方案。HAProxy特别适用于那些负载特大的web站点，这些站点通常又需要会话保持或七层处理。 HAProxy运行在当前的硬件上，完全可以支持数以万计的并发连接。并且它的运行模式使得它可以很简单安全的整合进您当前的架构中， 同时可以保护你的web服务器不被暴露到网络上。

###安装haproxy
下载列表地址:<a rel="nofollow" href="http://haproxy.1wt.eu">http://haproxy.1wt.eu</a>

<pre id="bash">
$ wget http://haproxy.1wt.eu/download/1.4/src/haproxy-1.4.8.tar.gz
$ tar zxvf haproxy-1.4.8.tar.gz
$ cd haproxy-1.4.8
$ uname -a           //查看linux内核版本
$ make TARGET=linux26 PREFIX=/usr/local/haproxy
$ make install PREFIX=/usr/local/haproxy
</pre>

###配置haproxy
<pre id="bash">
$ vi /usr/local/haproxy/haproxy.cfg
global                                                                                                                                                                   
  log 127.0.0.1 daemon debug  
  maxconn 5120  
  chroot /home/denghaiping/document/search/solr/haproxy-1.3.14.2  
  
uid 99  
#  user haproxy  
gid 99  
#  group ha-group  
  daemon  
#  quiet  
#  nbproc   2   # number of processes  
  pidfile /home/sgcc/demo/haproxy-1.3.14.2/haproxy.pid  
  
  
defaults  
#  log     global  
  log 127.0.0.1 local3  
  mode http  
  option   httplog  
  option   dontlognull  
  option redispatch  
  log 127.0.0.1 local3  
  retries 3   
  
  maxconn 2000  
  contimeout    5000  
  clitimeout    50000  
  srvtimeout    50000  
  
  
listen yoyoseg_proxy   
  bind :10001  
  mode tcp   
  
# status monitor  
#stats uri /haproxy-stats  
#  stats realm Haproxy\ statistics  
#  stats auth yoyo:yoyocc8ha  
     
  balance roundrobin  
  
# insert: to create a new cookie and assign the server identifier to it  
# indirect: remove the cookie for direct accesses  
# nocache: ensure that no upstream cache will store it  
#  cookie SERVERID insert indirect nocache  
  
#  cookie PHPSESSID prefix  
#  appsession PHPSESSID len 32 timeout 86400000  
    
# force connection:close, thus disabling HTTP keep-alive    
#  option httpclose  
    
# if the application needs to log the original client’s IP,   
# use the 'forwardfor' option which will add an 'X-Forwarded-For'  
# header with the original client's IP address.  
#  option forwardfor    
# health checking  
#option httpchk HEAD /check.txt HTTP/1.0  
  
  # inter:    interval between health checking in milliseconds  
  # fall:     the number of failures supported before declaring that the server has fallen down  
  # rise:     the number of valid checks needed for the server to fully get up  
  
  server seg_server_1 localhost:10002  
  server seg_server_1 localhost:10003   
  server seg_server_1 localhost:10004   
  server seg_server_1 localhost:10005  
  server seg_server_1 localhost:10006  
  
#  server app_server_2 59.57.14.176:8008 cookie yoyo_app_2 check inter 2000 rise 2 fall 5  
#  server app_bbs2 192.168.169.118:80 cookie app1inst2 check inter 2000 rise 2 fall 5                                                                                   
                                                     
</pre>

###启动haproxy
<pre id="bash">
#启动haproxy
$ /usr/local/haproxy/haproxy -f /usr/local/haproxy/haproxy.cfg
#查看是否启动
$ haproxy]$ ps -e|grep haproxy
</pre>

###压力测试
<pre id="bash">
$ /usr/local/bin/webbench -c 100 -t 30 http://localhost:1080/phpinfo.php
Webbench – Simple Web Benchmark 1.5
Copyright (c) Radim Kolar 1997-2004, GPL Open Source Software.
Benchmarking: GET http://localhost:1080/phpinfo.php
100 clients, running 30 sec.
Speed=26508 pages/min, 20929384 bytes/sec.
Requests: 13254 susceed, 0 failed.
</pre>
说明：haproxy监听的端口是1080，代理192.168.18.2:10000，127.0.0.1:10000
统计监听的是8888端口 http://localhost:8888/haproxy-stats

###监控页面
<img src="/media/pub/web/haproxy-300x76.jpg"></img>


###配置说明
1.4系列参考配置文件
<a rel="nofollow" href="http://haproxy.1wt.eu/download/1.4/doc/configuration.txt">http://haproxy.1wt.eu/download/1.4/doc/configuration.txt</a>

1.3系列参考配置文件
<a rel="nofollow" href="http://haproxy.1wt.eu/download/1.3/doc/configuration.txt">http://haproxy.1wt.eu/download/1.3/doc/configuration.txt</a>
