---
layout: post
title: Ubuntu 中VirtualBox 使用U盾
tags: 
- Ubuntu 
- shell
- VirtualBox
- U盾
categories:
- linux
UUID: 201211201834
date: 2012-11-20
---

运行环境：
操作系统：Ubuntu11.4 Desktop
虚拟机：Virtual Box4.0
Virtual Box操作系统：XP SP3
移动证书：工行U盾

###VirtualBox使用U盾
1. 下载安装VirtualBox。注意去官网上下载最新版的，Ubuntu自带的OSE不支持USB的。
2. 在虚拟机上安装WindowsXP。
3. 配置Ubuntu，注意细节。

a. 新建一个usbfs组：
<pre id="bash">
$ sudo groupadd usbfs
</pre>

b.将当前用户加入这个用户组：
<pre id="bash">
$ sudo adduser $USER usbfs
</pre>

c. 打开/etc/group文件
<pre id="bash">
$ gedit /etc/group
</pre>
找到usbfs，记下ID
例如，我（cdt）的是：
usbfs:x:1001:cdt
上面1001就是ID。


d.打开/etc/fstab文件：
<pre id="bash">
$ sudo gedit /etc/fstab
</pre>
在后面加一行：
<pre id="bash">
none /proc/bus/usb usbfs devmode=0664,devgid=1001, 0 0
</pre>
注意devgid=1001中的1001要改成你刚在group中查到的usbfs组的ID。保存文件。
完成以上后重新启动会提示：
<pre>
An error occurred while mounting /proc/bus/usb
Press S to skip mounting or M for manual recovery 
</pre>

按S进入Ubuntu，运行VirtualBox U盾使用正常。

*注：解决报错提示：*
<pre id="bash">
1.sudo gedit /etc/fstab  注释
＃none /proc/bus/usb usbfs devmode=0664,devgid=1001 0 0
2.sudo gedit /etc/rc.local  
在exit 0上一行加入 
hald --daemon=no 
exit 0
</pre>
重启电脑后不会再有报错，另U盾也可正常使用。

### 配置VirtualBox, 使VirtualBox支持USB设备
1. 关闭xp状态下，在virtualbox上点设置－USB设备，在窗口右边 点那个带+号的u盘图标，确定。
2. ubuntu下选系统－系统管理－用户和组－管理组－vboxusers-属性－在自已的用户名前打勾－ 确定－输入密码。
3. 如果第二步查看用户和组-管理组 无法看到vboxusers，则需要自己手动添加用户组
<pre id="bash">
$ sudo adduser $USERNAME vboxusers
</pre>
注销或重启ubuntu,打开xp就能用你的u盘了


