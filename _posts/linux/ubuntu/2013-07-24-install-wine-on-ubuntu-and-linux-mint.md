--- 
layout: post
title: Wine 1.6 Released – Install on Ubuntu 13.04/12.10/12.04/11.10 and Linux Mint 15/13
short_title: Installation of Wine 1.6
tags: 
- shell
- Ubuntu
- linux
- Wine
categories:
- code
- linux
UUID: 20130724122000
date: 2013-07-24 12:50:22
show_img: "/media/pub/linux/wine.jpg"
---

　　wine，是一款优秀的Linux系统平台下的模拟器软件，用来将Windows系统下的软件在Linux系统下稳定运行，该软件更新频繁，日臻完善，可以运行许多大型Windows系统下的软件。另外英语单词wine是葡萄酒的意思。

###编译安装
1、下载wind软件包
<pre id="bash">
http://jaist.dl.sourceforge.net/project/wine/Source/wine-1.5.22.tar.bz2
</pre>
2、解压，安装
<pre id="bash">
tar -jxvf wine-1.5.22.tar.bz2
cd wine-1.5.22
#检查编译环境
./configure 
#若上一步成功的话，即可进行编译
make
#安装
make install 
</pre>

###下载安装
<pre id="bash">
$ sudo add-apt-repository ppa:ubuntu-wine/ppa
$ sudo apt-get update
$ sudo apt-get install wine1.6
$ sudo apt-get install winetricks
</pre>

###配置Wine
运行 winecfg 即可，里面有详尽的配置。

注意：Wine 1.1.27以上版本的 winecfg 已经是中文界面了

###中文乱码
<strong>>Wine 1.1.4</strong> 以上版本的中文支持得到了极大改善。如果您在使用较低版本的WINE或者对WINE的中文支持不满意，可以把下面文字保存为 zh.reg 文件，运行 wine regedit 导入它即可
<pre id="bash">
REGEDIT4
[HKEY_LOCAL_MACHINE\Software\Microsoft\Windows NT\CurrentVersion\FontSubstitutes]
"Arial"="WenQuanYi Zenhei"
"Arial CE,238"="WenQuanYi Zenhei"
"Arial CYR,204"="WenQuanYi Zenhei"
"Arial Greek,161"="WenQuanYi Zenhei"
"Arial TUR,162"="WenQuanYi Zenhei"
"Courier New"="WenQuanYi Zenhei"
"Courier New CE,238"="WenQuanYi Zenhei"
"Courier New CYR,204"="WenQuanYi Zenhei"
"Courier New Greek,161"="WenQuanYi Zenhei"
"Courier New TUR,162"="WenQuanYi Zenhei"
"FixedSys"="WenQuanYi Zenhei"
"Helv"="WenQuanYi Zenhei"
"Helvetica"="WenQuanYi Zenhei"
"MS Sans Serif"="WenQuanYi Zenhei"
"MS Shell Dlg"="WenQuanYi Zenhei"
"MS Shell Dlg 2"="WenQuanYi Zenhei"
"System"="WenQuanYi Zenhei"
"Tahoma"="WenQuanYi Zenhei"
"Times"="WenQuanYi Zenhei"
"Times New Roman CE,238"="WenQuanYi Zenhei"
"Times New Roman CYR,204"="WenQuanYi Zenhei"
"Times New Roman Greek,161"="WenQuanYi Zenhei"
"Times New Roman TUR,162"="WenQuanYi Zenhei"
"Tms Rmn"="WenQuanYi Zenhei"
</pre>
