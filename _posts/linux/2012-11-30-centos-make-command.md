--- 
layout: post
title: CentOS Make Command not Found
tags: 
- CentOS
- linux
- Make
categories:
- linux
- code
UUID: 20121130236
date: 2012-11-30
---

make命令的关键是找出上一次各个文件的修改时间，利用此修改时间来比较相依 赖文件最后一次修改的时间。若目标文件的修改时间早于其相依文件的修 改时间，则必须先对相依文件进行处理（编译），进而来更新目标文件，若目标文件的修改时间迟于其相依文件的修改时间，则不对该相依文件进行处理（编译）。 利用它可以每次只编译自上次编译后发生变化的文件，从而可以减少一些不必要的编译工作，提高效率。

*执行make命令所需要的信息：*
1、用户定义的描述文件，一般为makefile
2、文件系统有关的数据和与时间有关的信息
3、一组后缀规则

###make命令
make命令的一般格式：
make【选项】【make描述文件】【宏定义】【目的文件】
make首先分析所有的宏定义参数（带嵌入等号的参数）并进行赋值，宏命令行覆盖在makefile中进行的定义，然后检验选项标志，最后递归的对每一个目的依赖文件进行检查。

###Make Command not Found 
在centos 5下安装软件遇到的问题，google了一圈，是因为系统没有安装编译器，那安装就是了，嘿嘿。
解决办法，在SSH下输入下面的命令
<pre id="bash">
$ yum -y install gcc automake autoconf libtool make
</pre>


