--- 
layout: post
title: 使用命令行配置Ubuntu Networking
tags: 
- shell
- Ubuntu
- Networking
categories:
- linux
- archives
UUID: 201301021027
---

　　基本上任何网络*无主机是传输控制协议/网际协议（传输控制协议/网际协议）结合三。这个组合包括互联网协议（知识产权），传输控制协议（传输控制协议），和通用数据报协议（协议）。

　　默认用户配置的网卡已经安装在Ubuntu操作系统中。你可以用ifconfig命令，在shell终端或者Ubuntu graphical network configuration tools，如network-admin，可以在你的系统中编辑系统的网络设备的信息或添加或删除网络设备。

###在网卡上配置DHCP地址
　　如果你想配置动态主机协议地址，你需要编辑/etc/network/interfaces，你需要输入以下eth0替换您的网络接口。
<pre id="bash">
$ sudo vi /etc/network/interfaces
</pre>
Note: 如果你没有安装图形界面，则使用vim编辑器<br>
　　如果你安装了图形界面，则使用如下命令<br>
<pre id="bash">
$ gksudo gedit /etc/network/interfaces
</pre>
<pre id="bash">
# The primary network interface -- use DHCP to find our address
auto eth0
iface eth0 inet dhcp
</pre>
配置静态地址到您的网卡中<br>
如果你想配置静态地址，你需要编辑 /etc/network/interfaces，需要输入以下线取代eth0与您的网络接口。
<pre id="bash">
$ sudo vi /etc/network/interfaces
</pre>
Note: 如果你没有安装图形界面，则使用vim编辑器<br>
　　如果你安装了图形界面，则使用如下命令<br>
<pre id="bash">
$ gksudo gedit /etc/network/interfaces
</pre>
配置如下：
<pre id="bash">
# The primary network interface
auto eth0
iface eth0 inet static
address 192.168.3.90
gateway 192.168.3.1
netmask 255.255.255.0
network 192.168.3.0
broadcast 192.168.3.255
</pre>
细节:你需要重新启动网络服务,使用下面的命令
<pre id="bash">
$ sudo /etc/init.d/networking restart
</pre>

###在Ubuntu上添加多个IP地址和虚拟IP地址
 　　如果你是一个服务器的系统管理员或用户通常有时候需要配置两个或者多个IP地址在你的机器网卡上,此时你需要编辑/etc/network/interfaces文件，您需要添加下面的语法。下面是唯一的一个例子，你需要根据您的网络地址设置变化。
<pre id="bash">
$ sudo vi /etc/network/interfaces
</pre>
Note: 如果你没有安装图形界面，则使用vim编辑器<br>
　　如果你安装了图形界面，则使用如下命令<br>
<pre id="bash">
$ gksudo gedit /etc/network/interfaces
</pre>
配置如下：
<pre id="bash">
auto eth0:1
iface eth0:1 inet static
address 192.168.1.60
netmask 255.255.255.0
network x.x.x.x
broadcast x.x.x.x
gateway x.x.x.x
</pre>
你需要输入的所有配置，如地址，子网掩码，网络，广播和网关等输入所有的值后保存此文件，您需要重新启动网络服务软件包使用以下命令生效的新的IP地址。
<pre id="bash">
$ sudo /etc/init.d/networking restart
</pre>

###配置操作系统的hostname
在ubuntu上设置hostname则是非常简单的事情,你可以直接查询，或设置，主机的命令。

作为用户，您可以看到您的当前主机名
<pre id="bash">
$ sudo /bin/hostname
</pre>
#####示例
To set the hostname directly you can become root and run
<pre id="bash">
$ sudo /bin/hostname newname
</pre>
当你的系统启动时会自动读取主机的文件/etc/hostname

###配置DNS
<pre id="bash">
$ sudo vi /etc/resolv.conf
search test.com
nameserver 192.168.3.2
</pre>

