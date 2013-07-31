---
layout: post
title: "Generating SSH Keys"
tags: 
- SSH
- Github
comment: true
published: true
author: demi-panda
categories:
- Github
UUID: 201211141035
date: 2012-11-14
---

如果你不使用推荐的HTTPS方法，可以使用SSH密钥建立安全连接您的计算机和GitHub。下面的步骤将引导您通过生成一个SSH密钥，然后添加到您的GitHub的帐户的公共密钥。

### Step 1: Check for SSH keys
确认你本机的密钥,如果你有现有的密钥，则直接跳到step 4。

首先，我们需要检查您的计算机上现有的SSH密钥。打开终端并运行：
<pre id="bash">
$ cd ~/.ssh
#确认".ssh" 目录是否存在
</pre>
If it says "No such file or directory" skip to step 3. Otherwise continue to step 2.

### Step 2: 备份并移除存在的SSH keys
<pre id="bash">
$ ls
# Lists all the subdirectories in the current directory
 config  id_rsa  id_rsa.pub  known_hosts

$ mkdir key_backup
# Makes a subdirectory called "key_backup" in the current directory

cp id_rsa* key_backup
# Copies the id_rsa keypair into key_backup

rm id_rsa*
# Deletes the id_rsa keypair
</pre>

### Step 3: Generate a new SSH key
要生成新的SSH密钥，输入下面的代码。修改默认值，要求输入一个文件，保存密钥，只需按Enter键。
<pre id="bash">
$ ssh-keygen -t rsa -C "your_email@youremail.com"
# Creates a new ssh key using the provided email

Generating public/private rsa key pair.
Enter file in which to save the key (/home/you/.ssh/id_rsa):
</pre>
按回车保存到默认位置，再稍等出来提示输入密码短语，输完按回车要输两遍；它用来加密私钥，也就是以后使用私钥的时候要输这个密码；
<pre id="bash">
Enter passphrase (empty for no passphrase): [Type a passphrase]
Enter same passphrase again: [Type passphrase again]
</pre>
密钥生成成功，则会提示如下：
<pre id="bash">
Your identification has been saved in /home/you/.ssh/id_rsa.
Your public key has been saved in /home/you/.ssh/id_rsa.pub.
The key fingerprint is:
01:0f:f4:3b:ca:85:d6:17:a1:7d:f0:68:9d:f0:a2:db your_email@youremail.com
</pre>

### Step 4: 添加SSH key to GitHub
<pre id="bash">
sudo apt-get install xclip
#Downloads and installs xclip

xclip -sel clip < ~/.ssh/id_rsa.pub
# Copies the contents of the id_rsa.pub file to your clipboard
</pre>
警告：重要的是要复制的关键，完全不添加换行符或空格。值得庆幸的是xclip的命令可以很容易地完全执行此设置。

<ol>
<li>Go to your <a href="https://github.com/settings">Account Settings</a>
<p>
<img src="{{site.static_url}}/media/pub/github/userbar-account-settings.png"  alt="">
</p>
</li>
<li>Click <a href="https://github.com/settings/ssh">&quot;SSH Keys&quot;</a> in the left sidebar
<p><img src="{{site.static_url}}/media/pub/github/settings-sidebar-ssh-keys.png" width="320px" alt=""></p>
</li>
<li>Click &quot;Add SSH key&quot;
<p><img src="{{site.static_url}}/media/pub/github/ssh-add-ssh-key.png" width="320px" alt=""></p></li>
<li>Paste your key into the &quot;Key&quot; field
<p><img src="{{site.static_url}}/media/pub/github/ssh-key-paste.jpg" width="320px" alt=""></p></li>
<li>Click &quot;Add key&quot;
<p><img src="{{site.static_url}}/media/pub/github/ssh-add-key.png" width="320px" alt=""></p></li>
<li>Confirm the action by entering your GitHub password</li>
</ol>

### Step 5: 测试
<pre id="bash">
$ ssh -T git@github.com
# Attempts to ssh to github
</pre>

You may see this warning:
<pre id="bash">
The authenticity of host github.com (207.97.227.239) can't be established.
RSA key fingerprint is 16:27:ac:a5:76:28:2d:36:63:1b:56:4d:eb:df:a6:48.
Are you sure you want to continue connecting (yes/no)?
</pre>

输入"yes",验证的指纹相匹配.
<pre id="bash">
Hi username! You've successfully authenticated, but GitHub does not
provide shell access.
</pre>
