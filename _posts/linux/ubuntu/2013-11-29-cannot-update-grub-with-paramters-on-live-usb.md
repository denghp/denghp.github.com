--- 
layout: post
title:  U盘启动修复GRUB
tags: 
- shell
- ubuntu
- linux
categories:
- code
- linux
- archives
UUID: 20131129102700
date: 2013-11-29
images: ["/assets/images/linux/win7-ubuntu-800x600.jpg"]
---

　　最近在安装Win7与ubuntu双系统的时候遇到的问题总结下,双系统的安装就不在介绍了，网上的方法很多，最好用的就是使用U盘制作启动引导,这里有个网友的详细介绍:<a href="http://jingyan.baidu.com/article/60ccbceb18624464cab197ea.html">http://jingyan.baidu.com/article/60ccbceb18624464cab197ea.html</a>


### 使用U盘安装ubuntu,无法启动
1、异常情况,启动报错
<pre id="bash">
error: file not found
grub rescue>
</pre>

2、异常情况,无法找到ubuntu的启动项

###解决方案
1、使用U盘引导进入试用系统<br>
2、打开终端
<pre id="bash">
ctrl+alt+t
</pre>
3、更新grub
<pre id="bash">
denghp@denghp:~/workspace/denghp.github.com$ sudo update-grub
Generating grub.cfg ...
Found linux image: /boot/vmlinuz-3.5.0-40-generic
Found initrd image: /boot/initrd.img-3.5.0-40-generic
Found linux image: /boot/vmlinuz-3.5.0-37-generic
Found initrd image: /boot/initrd.img-3.5.0-37-generic
Found linux image: /boot/vmlinuz-3.5.0-36-generic
Found initrd image: /boot/initrd.img-3.5.0-36-generic
Found linux image: /boot/vmlinuz-3.5.0-34-generic
Found initrd image: /boot/initrd.img-3.5.0-34-generic
Found linux image: /boot/vmlinuz-3.2.0-43-generic
Found initrd image: /boot/initrd.img-3.2.0-43-generic
Found memtest86+ image: /boot/memtest86+.bin
Found Windows 7 (loader) on /dev/sda2
done
</pre>
正常情况是可以grub上win7系统,但是可能会出现如下情况:
<pre id="bash">
/usr/sbin/grub-probe: error: failed to get canonical path of /cow.
</pre>
出现这种情况，则需要把linux的镜像挂载上，往下走:
4、查看系统分区情况
<pre id="bash">
denghp@denghp:~/workspace/denghp.github.com$ sudo fdisk -l
[sudo] password for denghp:

Disk /dev/sda: 500.1 GB, 500107862016 bytes
255 heads, 63 sectors/track, 60801 cylinders, total 976773168 sectors
Units = sectors of 1 * 512 = 512 bytes
Sector size (logical/physical): 512 bytes / 512 bytes
I/O size (minimum/optimal): 512 bytes / 512 bytes
Disk identifier: 0x1ef334c2

   Device Boot      Start         End      Blocks   Id  System
/dev/sda1              63       80324       40131   de  Dell Utility
/dev/sda2   *       81920     1617919      768000    7  HPFS/NTFS/exFAT
/dev/sda3         1617920   253966335   126174208    7  HPFS/NTFS/exFAT
/dev/sda4       253968382   976771071   361401345    f  W95 Ext'd (LBA)
/dev/sda5       489193472   751491071   131148800    7  HPFS/NTFS/exFAT
/dev/sda6       751493120   976771071   112638976    7  HPFS/NTFS/exFAT
/dev/sda7       253968384   261965823     3998720   82  Linux swap / Solaris
/dev/sda8       261967872   489179135   113605632   83  Linux
</pre>

5、执行sudo mount /dev/sda1 /mnt命令，挂载引导分区
<pre id="bash">
sudo mount /dev/sda# /mnt
#sda#写你自己的linux安装所在的分区
</pre>
如果你有一个单独的/boot分区，我们需要将它安装在/mnt/boot
<pre id="bash">
sudo mount /dev/sda# /mnt/boot
</pre>
这应该挂载它有足够的访问，如果需要得到规范的路径，但我们很可能不需要这个。

更新的grub用正确的<code>root</code>和<code>target</code>：
<pre id="bash">
sudo grub-install --root-directory=/mnt /dev/sda
</pre>

挂载完，更新grub
<pre id="bash">
sudo update-grub
</pre>
出现第三步的信息,则表示都挂载上,重起可以到到win7 + ubuntu系统啦.




