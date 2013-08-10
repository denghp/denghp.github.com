---
layout: post
title: Linux 下使用find命令查找最近修改文件
tags: 
- shell
- find
- linux
- 研发实践
categories:
- code
- linux
- archives
UUID: 201301250023
date: 2013-01-25 14:23:22
---

  　　经常会在Linux有查找某个目录下的一些特殊文件，然后根据最近修改的时间来查找，然后获取TOP-N数量返回，今天介绍下根据时间来查找，然后进行相应的处理。

###find 命令详解
请参考我的另一篇文章:<a href="{{site.url}}/2012/11/22/linux-find-practice/" alt="Linux find命令实践" target="_bank">Linux find命令实践</a>

###按时间查找参数
<ol>
<li>-atime 访问时间</li>
<li>-ctime 改变状态的时间</li>
<li>-mtime 修改的时间,但要注意，这里的时间是以24小时为单位</li>
<li>-mmin  搜索当前目录中，所有过去n分钟修改的文件</li>
<li>-cmin  过去n分钟改变状态的文件</li>
<li>-amin  过去n分钟访问</li>
</ol>

###示例
查看所有文件
<pre id="bash">
denghp@denghp:~/temp$ ls -lt 
total 32
-rw-rw-r-- 1 denghp denghp   12 Jan 25 17:22 b.txt
-rw-rw-r-- 1 denghp denghp    9 Jan 25 17:22 a.txt
-rw-rw-r-- 1 denghp denghp  209 Jan 21 15:37 0752.tar.gz
drwxrwxr-x 2 denghp denghp 4096 Jan 21 15:37 test
-rw-rw-r-- 1 denghp denghp    5 Jan 17 17:43 0752.txt
-rw-rw-r-- 1 denghp denghp    4 Jan 17 17:43 abc0752abc.txt
-rw-rw-r-- 1 denghp denghp    4 Jan 17 17:43 abc0752.txt
-rw-rw-r-- 1 denghp denghp    4 Jan 17 17:23 c.txt
</pre>

查找最近10分钟更新以.txt结尾的文件
<pre id="bash">
denghp@denghp:~/temp$ find . -name "*.txt" -mmin -10
./a.txt
./b.txt
</pre>

查找最近10分钟更新的.txt结尾文件，并俺时间排序，返回前面TOP1
<pre id="bash">
denghp@denghp:~/temp$ find . -name "*.txt" -mmin -10 | xargs ls -lta | head -n1
-rw-rw-r-- 1 denghp denghp 12 Jan 25 17:22 ./b.txt
</pre>

查找目录并移动到指定位置,指定查找目录的深度
<pre id="bash">
find -maxdepth 1 -name "abc" -type d -exec mv {} test/ \;
</pre>

查找文件夹并删除
<pre id="bash">
find . -name "*.svn" | xargs rm -rf;
</pre>

查找文件名称包含的字符串，移动到另一目录
<pre id="bash">
find . -name "*0752*" | xargs -i -i cp {} test/;
</pre>

查找目录并重命名
<pre id="bash">
查找目录并重命名
find . -maxdepth 1 -name 'aa*' -type d -exec mv {} tast \;
</pre>
