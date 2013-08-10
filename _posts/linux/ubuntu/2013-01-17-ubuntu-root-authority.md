--- 
layout: post
title: Ubuntu root 权限详解
tags: 
- shell
- Ubuntu
- linux
categories:
- code
- linux
- archives
UUID: 201301171027
---

   　　Ubantu是一个比较大的Linux发行版本，而其中有关Linux root权限的问题很值得讨论。新接触ubuntu的人（base on debian），大多会因为安装中没有提示root密码而不太清楚为什么会这样。根据ubuntu的中文文档，总结了本文，看过之后肯定会清楚有关 Ubantu Linux root权限的问题。

###如何设定/改变/启用 root 使用者的密码?
######启用 root 帐号 (也就是 设置一个口令) 
<pre id="bash">
$ sudo passwd root
[sudo] password for denghp: 
Enter new UNIX password: 
Retype new UNIX password: 
passwd: password updated successfully
</pre>

###### root 帐号禁用
<pre id="bash">
$ sudo passwd -l root
passwd: password expiry information changed.
#验证是否禁用
$ sudo - 
#或者
$ sudo root
Password: 
su: Authentication failure #输入正确密码，提示失败，表示已经禁用
</pre>

###如何在终端机模式下切换到 root 身份?
<pre id="bash">
$ sudo -
#或者
$ sudo root
Password: #在这注明您的密码>缺省禁止 root 的好处包括了以下内容.
</pre>
<ol>
<li>起初 Ubuntu 的开发团队团队希望安装尽可能的简单. 不设置 root ,这样在安装过程中,用户的设置可以剩掉.</li>
<li>如果在安装中设置了 root, 用户将被要求永远记住他们设置的密码--即使很少使用到. 对 Unix 安全模型不熟悉的用户经常忘记 Root 密码.</li>
<li>它防止了在默认登录时,进行一些容易影响到系统目录或系统设置之类的操作,或一些对系统稳定或安全有影响的操作,将被提示输入口令,这可以使你考虑你这样做的结果. 如果你作为 root 登录, 你的这些操作,将不会被提示,但如果你的操作错误，那时已经就没得救拉.它是让长时间使用 "su-command-^D"操作,来代替一直在root shell下工作的,除非你做重大的系统维护 (那时你仍然可以使用 "sudo su").</li>
<li>Sudo 增加了对运行命令的日志记录 (在 /var/log/auth.log). 如果陷入困境, 总是可以返回并看见那些运行的命令.</li>
</ol>

###安全问题
<ol>
<li>
与传统的 superuser 模型相比，这种方法有不同的利弊，两者都不总是好的.
</li>
<li>
在鼓励使用 root 权限执行一个单独的命令, sudo 好过打开一个 shell
</li>
<li>
减少使用 root 权限的时间总耗用, 降低了不注意使用 root 执行命令的风险
</li>
<li>提供了有用的审核痕迹</li>
<li>有一个单独的 root 密码 (传统模型) 提供了一层额外的保护，当如果一个管理员的密码被侵害时。</li>
<li>无论怎样, 如果管理员 (使用 sudo 或 su 变成 root) 被侵害, 攻击者一般可以通过一次间接的攻击来获得 root</li>
</ol>

