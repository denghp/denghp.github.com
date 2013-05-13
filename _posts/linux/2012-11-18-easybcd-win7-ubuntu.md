---
layout: post
title: Win7 + Ubuntu12.04 + EasyBCD安装
tags: 
- OS
- linux
- Ubuntu
- EasyBCD
- Windows7
categories:
- OS
- linux
UUID: 201211182243
date: 2012-11-18
---

有时候为了满足不同的需求,很多用户选择安装双系统。双系统在安装的时候，两个系统是分别装在不同的分区内，后安装的系统不会覆盖前一个系统。而且每个单独的系统都有自己的分区格式，不会造成冲突的。安装了双系统后，在启动的时候，有一个多重启动的选择菜单，可以选择进入哪个操作系统。当前状态下，只有一个系统是在运行的，不能随意的切换。如果想要进入另外一个，就要重新启动，重新选择。

### 安装双系统 Windows7 + Ubuntu12.04
二个系统不在同一文件夹下就可以了.可以同盘的.文件夹名一定要不一样.如果装微软的，低版本先装再装高版本。如果是微软的和红旗，就要先装微软的 。

###系统分区
可以使用计算机系统自带的分区工具，也可以使用DiskGenius软件。
装Ubuntu分配的硬盘大小最好是(20G以上）不要太小，这里请注意，ubuntu和windows文件系统完全不同，所以我们划好要给ubuntu的分区后，删除卷。到时候，安装好的ubuntu的分区，在windows下是看不到的，但是进入ubuntu是可以访问windows的磁盘的。这才叫双系统的吧，和wubi那种不一样哦。

###软件准备
准备两个东西EasyBCD软件和iso镜像(我用的easybcd是2.0版，就下载1.7之后版就行，要那种安装版的，不要绿色版)

###EasyBCD使用

选择“Add New Entry”-> 选择NeoGrub

<img src="/media/pub/os/EasyBCD-GRUB.jpg"></img>
<p>
选NeoGrub 然后点Install NeoGrub点Save ，接着是Configure
</p>
<img src="/media/pub/os/easybcd-2.jpg"></img>
<p>
然后就会出现一个menu.lst文件,我们需要编辑这个文件,因为系统启动需要依靠这个文件找到我们的ubuntu的ios.
把下面的配置复制进去，把原来的全覆盖掉:
</p>
<pre>
title Install Ubuntu
root (hd0,0)
kernel (hd0,0)/vmlinuz boot=casper iso-scan/filename=/ubuntu-12.04-amd64.iso ro quiet splash locale=zh_CN.UTF-8
initrd (hd0,0)/initrd.lz
</pre>

*特别注意:*

ubuntu-12.04-amd64.iso是你的iso的名字，别写成我的了，这个要改成你的。

对于有的电脑上你的第一个盘符并不是C盘，在磁盘管理中可以看出，所以安装时需将(hd0,0)改为（hd0,1）【假设为第二个】。

关闭-保存。

接下来,把准备好的iso用压缩软件或者虚拟光驱打开，或者解压,然后找到casper文件夹，复制initrd.lz和vmlinuz到C盘根目录,然后在把iso也拷贝到C盘根目录。

*重启*
你就会看到有2个启动菜单给你选择,我们选择第2个NeoGrub
默认桌面有2个文档,一个是演示的不用管,我们选择安装Ubuntu ，

记得在这之前要按 `Ctrl+Alt+T`  打开终端，取消掉对光盘所在驱动器的挂载，否则分区界面找不到分区。
<pre id="bash">
sudo umount -l /isodevice
</pre>

###开始安装
根据自己的爱好，选择语言,选择安装类型，可以自定义.
<img src="/media/pub/os/ubuntu-install.jpg"></img>
挂在分区的方案如下(以30G为例)：
<pre id="wiki">
/ 20G  ext4（根分区可以大点）
SWAP  2G
/home  8G ext4（剩下的给/home）
</pre>
<img src="/media/pub/os/ubuntu-install-1.jpg"></img> 
<img src="/media/pub/os/ubuntu-install-2.jpg"></img> 
<img src="/media/pub/os/ubuntu-install-3.jpg"></img> 

*注意:*
<p>
(1)在选择安装启动引导器的设备时，可以选择我们分好的 / 区，也可以新建一个/boot区。
</p>
<p>
(2)若重启就会发现原来 windows进不去了。
<p>

打开终端输入命令
<pre id="bash">
$ sudo vi /etc/default/grub
#修改GRUB_TIMEOUT="10"
</pre>
然后在终端中输入
<pre id="bash">
$ sudo update-grub
</pre>
update 命令会自动找到 windows 7 启动项。并且自动更新 /boot/grub/grub.cfg 文件。这样重启就能进windows了。
<p>
(3)最后进入Window7，打开EasyBCD删除安装时改的menu.lst文件，按Remove即可。
然后去我们的c盘 删除vmlinuz，initrd.lz和系统的iso文件。
利用EasyBCD可以更改启动项菜单按Edit Boot Menu按钮，可以选择将Windows7设为默认开机选项。
<p>

###filesystem type is ntfs partition type 0x7 异常<br>
####描述
boot引导成功<br>
选择安装界面成功<br>
到filesystem type is ntfs, partition type 0x7<br>

####原因分析
1、文件系统为ntfs,linux的文件系统不是ntfs<br>
2、安装的分区不对

####解决方案
1、对于有的电脑上你的第一个盘符并不是C盘，在磁盘管理中可以看出，所以安装时需将(hd0,0)改为（hd0,1）
2、网上还有一种写法，没经过检验：
<pre>
loopback loop (hd0,N)/maverick-desktop-i386.iso
linux (loop)/vmlinuz boot=capser iso-scan/filename=/ubuntu-12.04-amd64.iso noprompt
initrd (loop)/casper/initrd.lz
boot
</pre>
