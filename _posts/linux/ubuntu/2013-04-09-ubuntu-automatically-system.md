--- 
layout: post
title: Ubuntu 开机自动挂载分区
tags: 
- shell
- Ubuntu
- linux
categories:
- code
- linux
UUID: 20130409001000
date: 2013-04-09 00:10:00
show_img: "/media/pub/linux/fstab-info.jpg"
---

在64位Ubuntu 12.04以后的版本中,ntfs写入支持程序,不能正常运行。所以想ubuntu自动挂载ntfs分区就要手动编辑/etc/fstab 文件。  /etc/fstab包含了挂在磁盘的必要信息，在系统启动时读入。

###查看磁盘信息<code>fdisk</code>
<pre id="bash">
$ sudo fdisk -l
</pre>
<a href="{{site.url}}/media/pub/linux/fdisk-info.jpg" alt="disk-info" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.url}}/media/pub/linux/fdisk-info.jpg" width="560px"  alt="fdisk-info" />
</a>
/dev/sda5，/dev/sda6是要挂载的两个分区。

###修改/etc/fstab文件
<pre id="bash">
$ sudo gedit /etc/fstab
</pre>
可以看到一些已经定义好的加载点:
<a href="{{site.url}}/media/pub/linux/fstab-info.jpg" alt="fstab" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.url}}/media/pub/linux/fstab-info.jpg" width="560px"  alt="fstab" />
</a>

每一行使用一个tab分成6列，分别为filesystem, mountpoint, type, options, dump, pass<br>
分别表示:原来在文件系统的位置，加载点位置，类型，参数等，可以使用man fstab来查看各个参数的定义<br>
将以下内容添加到/etc/fstab 文件尾部，保存，重启即可自动挂载其他分区了。
<pre id="bash">
#Other分区
/dev/sda5    /media/Other    ntfs    defaults,locale=zh_CN.UTF-8,umask=000 0 0
#Data分区
/dev/sda6    /media/Data    ntfs    defaults,locale=zh_CN.UTF-8,umask=000 0 0
</pre>

###Ubuntu开机自动挂载的ntfs硬盘的权限问题
Ubuntu开机自动挂载的分区默认是没有写权限的，必须有root权限才能写，如何更改这个设置呢？<br>
用man mount查看手册页，发现里面有几个有用的选项：<br>
<code>umask, fmask, dmask, uid, gid</code>

1、主要设置fmask,dmask权限:
<pre id="bash">
dmask=022,fmask=133
</pre>

*备注:*<br>
目录:所有用户可执行（进入），其他人可读可执行（进入），只有自己可写（修改、添加、删除里面的文件（名））

文件:所有用户可读，自己可写，其他人不可写。

2、设置uid和gid
<pre id="bash">
#username为本机的用户名
$ id username
uid=1000(denghp) gid=1000(denghp) groups=1000(denghp),4(adm),24(cdrom),27(sudo),30(dip),46(plugdev),109(lpadmin),124(sambashare),126(vboxusers)
</pre>
如果不设的话，上面的“自己可写”那个“自己”就不是的用户权限

3、最终自动挂载加权限设置配置如下:
<pre id="bash">
#Other分区
/dev/sda5    /media/other    ntfs    defaults,locale=en_US.UTF-8,uid=1000,gid=1000,dmask=022,fmask=133 0 0
#Data分区
/dev/sda6    /media/document    ntfs    defaults,locale=en_US.UTF-8,uid=1000,gid=1000,dmask=022,fmask=133 0 0
</pre>
<a href="{{site.url}}/media/pub/linux/fstab-info-2.jpg" alt="fstab-info" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.url}}/media/pub/linux/fstab-info-2.jpg" width="560px"  alt="fstab-info" />
</a>

