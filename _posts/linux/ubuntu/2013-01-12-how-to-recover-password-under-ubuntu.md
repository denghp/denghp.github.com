--- 
layout: post
title: Ubuntu 下如何找回密码？
tags: 
- shell
- Ubuntu
- linux
categories:
- linux
- archives
UUID: 201301121027
---

 　　Ubuntu操作系统已经深得广泛用户的使用，当然对于新手来说想必存在很多问题，今天给大家介绍，如果您忘记了您的Ubuntu操作系统的密码，您可以使用以下步骤恢复：

###Step 1 打开你的电脑
###Step 2 在GRUB提示符下按ESC键
###Step 3 在 kernel ......开头的那行按E进行编辑。
###Step 4 进入到了最后的行,找到kernel参数在最后加上“init=/bin/bash”
###Step 5 按回车键，然后按b键启动您的系统
###Step 6 您的系统会启动将进入root shell 而无须任何密码。
###Step 7 设置密码&重启
<pre id="bash">
#输入 passwd <你的用户名>
Type in passwd username
#设置密码
Set your password.
#输入 reboot 重启后用新密码登陆！
Type in reboot
</pre>
