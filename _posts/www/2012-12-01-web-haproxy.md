--- 
layout: post
title: 负载均衡工具haproxy安装，配置，使用
short_title: Haproxy安装，配置，使用
tags: 
- Haproxy
- linux
- 负载均衡
categories:
- www
- code
- archives
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
#####################################
# HAProxy 配置文件
#####################################

global
# 使用系统的syslog记录日志（通过udp，默认端口号为514）
log 127.0.0.1 local0 # info [err warning info debug]
chroot /opt/haproxy-1.3.25

#限制单个进程的最大连接数
maxconn 65535

# 让进程在后台运行，即作为守护进程运行，正式运行的时候开启，此处先禁止，等同于在命令行添加参数 -D
# daemon
# 指定作为守护进程运行的时候，要创建多少个进程，默认只创建一个，需要daemon开启模式
# nbproc 1

# 设置debug模式运行，与daemon模式只能互斥，等同于在命令行添加参数 -d
# debug
pidfile /opt/haproxy-1.3.25/haproxy.pid    # not work

defaults
# 在连接失败或断开的情况下，允许当前会话被重新分发
option redispatch
# 设置在一个服务器上链接失败后的重连次数
retries 2
# 设置服务器分配算法
balance roundrobin

# 不记录空连接
option dontlognull

# 设置等待连接到服务器成功的最大时间
timeout connect 5000ms
# 设置客户端的最大超时时间
timeout client 1800000ms
# 设置服务器端的最大超时时间
timeout server 1800000ms

# Enable the sending of TCP keepalive packets on both sides, clients and servers
# NOTE: 在服务器CPU强劲的情况下，最好不要开启保活，这样可减少资源消耗
#option tcpka

##################################
###  统计页面配置
##################################

listen admin_stat
# 监听端口
bind *:8011
# http的7层模式
mode http
option httplog
log global
# 统计页面自动刷新时间
stats refresh 30s
# 统计页面URL
stats uri /admin?stats
# 统计页面密码框上提示文本
stats realm Haproxy\ Statistics
# 统计页面用户名和密码设置
stats auth yoyoadm:yoyoadm
# 隐藏统计页面上HAProxy的版本信息
stats hide-version


################################
### HTTP连接的监听配置
################################

listen  http-in
bind *:80
mode http
option httplog
log global


# insert: to create a new cookie and assign the server identifier to it
# indirect: remove the cookie for direct accesses
# nocache: ensure that no upstream cache will store it
#cookie SERVERID insert indirect nocache
#cookie JSESSIONID prefix
#appsession JSESSIONID len 32 timeout 86400000

# force connection:close, thus disabling HTTP keep-alive  
#option httpclose


# 设置健康检查模式
#option httpchk OPTIONS * HTTP/1.1\r\nHost:\ web
#option smtpchk

# 后台服务器
#server ssweb1 172.16.205.188:8080 cookie yoyo_app_1 weight 3 check inter 2000 rise 2 fall 3
#server ssweb2 172.16.205.189:8080 cookie yoyo_app_2 weight 3 check inter 2000 rise 2 fall 3
server ssweb1 172.16.205.188:8080 weight 3 check inter 2000 rise 2 fall 3
server ssweb2 172.16.205.189:8080 weight 3 check inter 2000 rise 2 fall 3                        
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
webbench – Simple web Benchmark 1.5
Copyright (c) Radim Kolar 1997-2004, GPL Open Source Software.
Benchmarking: GET http://localhost:1080/phpinfo.php
100 clients, running 30 sec.
Speed=26508 pages/min, 20929384 bytes/sec.
Requests: 13254 susceed, 0 failed.
</pre>
说明：haproxy监听的端口是1080，代理192.168.18.2:10000，127.0.0.1:10000
统计监听的是8888端口 http://localhost:8888/haproxy-stats

###监控页面
<img src="{{site.static_url}}/assets/images/web/haproxy-300x76.jpg"></img>


###配置说明
1.4系列参考配置文件
<a rel="nofollow" href="http://haproxy.1wt.eu/download/1.4/doc/configuration.txt">http://haproxy.1wt.eu/download/1.4/doc/configuration.txt</a>

1.3系列参考配置文件
<a rel="nofollow" href="http://haproxy.1wt.eu/download/1.3/doc/configuration.txt">http://haproxy.1wt.eu/download/1.3/doc/configuration.txt</a>
