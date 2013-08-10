---
layout: post
title: Socket TIME_WAIT 解决方案
tags: 
- Socket
- linux
- TIME_WAIT
categories:
- Socket
- code
- archives
UUID: 201212270032
---

 　　最近在使用nginx做代理时，后端服务无任何异常报出，但是就是无法提供正常服务,重起之后还是这样，经过使用 netstat -an 查明原因，原来发现操出现非常多的TIME_WAIT的状态，如果长时间处于大量的TIME_WAIT状态并未关闭，则socket端口和句柄被用尽，系统无法再发起新的连接！

###分析出现 TIME_WAIT 原因
####首先了解TCP建立连接的过程
详情请阅读<a href="{{site.url}}/2012-12-27-TCP-status/">TCP 3次握手连接协议和4次握手断开连接协议</a>

####什么情况下会进入 TIME_WAIT 状态 ?
1、server 收到 client 的 FIN, server 发送 ACK，进入 TIME_WAIT<br>
2、当 server 还在 FIN_WAIT_1 时，client 发送同时带 FIN 和 ACK 的报文，server 回复 ACK，将直接进入 TIME_WAIT，不经过 FIN_WAIT_2<br>
<strong>注意：</strong><br>
根据TCP协议，主动关闭的一端会才会进入 TIME_WAIT 状态，被动关闭的一端进入 CLOSED 状态。持续2*MSL(Max Segment Lifetime)，缺省为240秒，在这个post中简洁的介绍了为什么需要这个状态。

###为啥要有 TIME_WAIT 状态
1、防止上一次连接中的包，迷路后重新出现，影响新连接（经过2MSL，上一次连接中所有的重复包都会消失）<br>
2、可靠的关闭TCP连接，在主动关闭方发送的最后一个 ack(fin) ，有可能丢失，这时被动方会重新发fin, 如果这时主动方处于 CLOSED 状态 ，就会响应 rst 而不是 ack。所以主动方要处于 TIME_WAIT 状态，而不能是 CLOSED 

###TIME_WAIT 负面影响
<ol>
<li>TCB 的增多会导致更多内存的消耗</li>
<li>降低 avtive connection 的连接速度</li>
<li>降低 MSL 可能导致系统的不稳定</li>
</ol>

###TIME_WAIT解决方案
<pre id="bash">
$ vi /etc/sysctl.conf
#修改如下参数
net.ipv4.tcp_syncookies = 1 
net.ipv4.tcp_tw_reuse = 1 
net.ipv4.tcp_tw_recycle = 1 
net.ipv4.tcp_fin_timeout = 30
#使如上修改生效，执行如下代码
/sbin/sysctl -p
</pre>
net.ipv4.tcp_syncookies = 1 表示开启SYN Cookies。当出现SYN等待队列溢出时，启用cookies来处理，可防范少量SYN攻击，默认为0，表示关闭；<br>
net.ipv4.tcp_tw_reuse = 1 表示开启重用。允许将TIME-WAIT sockets重新用于新的TCP连接，默认为0，表示关闭； <br>
net.ipv4.tcp_tw_recycle = 1 表示开启TCP连接中TIME-WAIT sockets的快速回收，默认为0，表示关闭。<br>
net.ipv4.tcp_fin_timeout 修改系統默认的 TIMEOUT 时间.<br>
