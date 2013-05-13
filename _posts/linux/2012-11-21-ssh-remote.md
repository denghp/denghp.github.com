---
layout: post
title: SSH登陆响应慢的问题
tags: 
- SSH
- linux
- shell
categories:
- linux
UUID: 201211212334
date: 2012-11-21
---

###常见问题
第一种情况比较常见，也有很多资料提及到，就是在SSH登陆时服务器端会对客户端的IP进行反解析造成登陆响应慢的问题，通常改sshd_config的“UseDNS no”即可以。

第二种情况，服务器端启用了GSSAPI[1]。登陆的时候客户端需要对服务器端的IP地址进行反解析，如果服务器的IP地址没有配置PTR记录，那么就容易在这里卡住了。

对于这种情况，就有必要禁用GSSAPI认证以加速SSH登陆。

###解决方案

解法一：sh命令时使用附加的参数：
<pre id="bash">
ssh -o GSSAPIAuthentication=no server_address
</pre>

解法二：修改客户端 ssh_config
<pre id="bash">
$ vi /etc/ssh/ssh_config | vi ~/.ssh/config
GSSAPIAuthentication no
</pre>

解法三：修改服务器端的sshd_config
<pre id="bash">
$ vi /etc/ssh/ssd_config
GSSAPIAuthentication no
</pre>
