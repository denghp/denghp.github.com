---
layout: post
title: "Linux 创建用户"
tags: 
- linux
- shell
- 创建用户
comment: true
published: true
author: demi-panda
categories:
- linux
UUID: 201211152330
date: 2012-11-15
---

Linux 系统是一个多用户多任务的分时操作系统，任何一个要使用系统资源的用户，都必须首先向系统管理员申请一个账号，然后以这个账号的身份进入系统。用户的账号一方面可以帮助系统管理员对使用系统的用户进行跟踪，并控制他们对系统资源的访问；另一方面也可以帮助用户组织文件，并为用户提供安全性保护。每个用户账号都拥有一个惟一的用户名和各自的口令。用户在登录时键入正确的用户名和口令后，就能够进入系统和自己的主目录。

实现用户账号的管理，要完成的工作主要有如下几个方面：
· 用户账号的添加、删除与修改。
· 用户口令的管理。
· 用户组的管理。

### Linux 系统账户用户管理
用户账号的管理工作主要涉及到用户账号的添加、修改和删除。
添加用户账号就是在系统中创建一个新账号，然后为新账号分配用户号、用户组、主目录和登录Shell等资源。刚添加的账号是被锁定的，无法使用。

### 创建用户 useradd
<pre id="bash">
$useradd testuser
#创建用户testuser
$ passwd testuser
#给已创建的用户testuser设置密码
</pre>
说明：新创建的用户会在/home下创建一个用户目录testuser
usermod --help 修改用户这个命令的相关参数
userdel testuser

### 常用命令
<table>
  <tbody>
    <tr>
      <th>命令</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
  <tr>
    <td>-c, --comment COMMENT</hd>
    <td>指定一段注释性描述。 </td>
  </tr>
  <tr>
    <td>-d, --home-dir HOME_DIR</hd>
    <td>指定用户主目录,如果此目录不存在，则同时使用-m选项，可以创建主目录。</td>
  </tr>
  <tr>
    <td> -m, --create-home</hd>
    <td>创建主目录</td>
  </tr>
  <tr>
    <td>-g, --gid GROUP</hd>
    <td>指定用户所属的用户组</td>
  </tr>
  <tr>
    <td>-G, --groups GROUPS</hd>
    <td>用户组,指定用户所属的附加组。</td>
  </tr>
  <tr>
    <td>-s, --shell SHELL</hd>
    <td>指定用户的登录Shell</td>
  </tr>

  </tbody>
</table>


#### 示例
<pre id="bash">
$ useradd –d /usr/sam -m sam
#此命令创建了一个用户sam，
#其中-d和-m选项用来为登录名sam产生一个主目录/usr/sam（/usr为默认的用户主目录所在的父目录）。
</pre>

### 删除用户
如果一个用户的账号不再使用，可以从系统中删除。删除用户账号就是要将/etc/passwd等系统文件中的该用户记录删除，必要时还删除用户的主目录。删除一个已有的用户账号使用userdel命令，其格式如下：
#### 语法
<pre id="bash">
userdel 选项 用户名
</pre>
常用的选项是-r，它的作用是把用户的主目录一起删除。

#### 示例
<pre id="bash">
$ usrdel -r testuser
#删除用户,并删除testuser所在目录
</pre>

###修改帐号
修改用户账号就是根据实际情况更改用户的有关属性，如用户号、主目录、用户组、登录Shell等。
修改已有用户的信息使用usermod命令，其格式如下：

####语法
<pre id="bash">
$ usermod 选项 用户名
</pre>
常用的选项包括-c, -d, -m, -g, -G, -s, -u以及-o等，这些选项的意义与useradd命令中的选项一样，可以为用户指定新的资源值。另外，有些系统可以使用如下选项：

#### 示例
<pre id="bash">
$ -l 新用户名
</pre>
这个选项指定一个新的账号，即将原来的用户名改为新的用户名
<pre id="bash">
$ usermod -s /bin/ksh -d /home/z –g developer sam
</pre>
此命令将用户sam的登录Shell修改为ksh，主目录改为/home/z，用户组改为developer。

###linux修改用户密码：
<pre id="wiki">
如果是以root身份登录,修改root密码.只要输入
passwd
就会出现:
New password: 
Retype new password: 
按提示输入密码确认即可.
如果想更改其他用户密码,只要输入passwd username即可.
如:passwd testuser
New password: 
Retype new password:
</pre>
