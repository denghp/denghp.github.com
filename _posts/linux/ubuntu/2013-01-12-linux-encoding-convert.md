--- 
layout: post
title: Linux下GBK->UTF-8文件编码批量转换命令
short_title: Linux下文件编码批量转换命令
tags: 
- shell
- Ubuntu
- UTF-8
- GBK
- 编码转换
categories:
- code
- linux
- archives
UUID: 201301121027
---

   　　在工作中，经常会遇到使用操作系统不一样的环境，从而导致在不同环境下的文件编辑的编码是不一样的，Windows默认是GBK编码格式，Linux默认是UTF-8的格式，这样就会出现把GBK编码的文件拷贝到Linux下出现乱码情况，很是让人头疼，下面给大家介绍下GBK->UTF-8文件编码批量转换。


###Linux命令-enca 查看文件的编码
####enca语法
<pre id="bash">
Usage:  enca [-L LANGUAGE] [OPTION]... [FILE]...
        enconv [-L LANGUAGE] [OPTION]... [FILE]...
        Detect encoding of text files and convert them if required.
</pre>

####enca用法
<pre id="bash">
$ enca -L zh_CN file 检查文件的编码
$ enca -L zh_CN -x UTF-8 file 将文件编码转换为"UTF-8"编码
$ enca -L zh_CN -x UTF-8 file1 file2 如果不想覆盖原文件可以这样
</pre>

除了有检查文件编码的功能以外，”enca”还有一个好处就是如果文件本来就是你要转换的那种编码，它不会报错，还是会print出结果来， 而”iconv”则会报错。这对于脚本编写是比较方便的事情。

####转换单个文件的编码
<pre id="bash">
$ enca -L none -x utf-8  index.html
</pre>

####转换多个文件的编码
<pre id="bash">
$ enca -x utf-8 *
</pre>

###Linux文件名编码批量转换--convmv
####convmv语法
<pre id="bash">
$ convmv -f 源编码 -t 新编码 [选项] 文件名
</pre>

####convmv 常用参数
<pre id="bash">
-r 递归处理子文件夹
–notest 真正进行操作，请注意在默认情况下是不对文件进行真实操作的，而只是试验。
–list 显示所有支持的编码
–unescap 可以做一下转义，比如把%20变成空格
</pre>

####示例
转换一个文件由GBK转换成UTF-8
<pre id="bash">
convmv -f GBK -t UTF-8 --notest utf8 filename
</pre>

GBK->UTF-8文件编码批量转换脚本 
<pre id="bash">
$ find default -type f -exec convmv -f GBK -t UTF-8 --notest utf8 {} -o utf/{} \;
</pre>

###使用iconv 转换
####iconv语法
<pre id="bash">
iconv -f encoding -t encoding inputfile
</pre>

####示例
单个文件转换
<pre id="bash">
$ iconv -f GBK -t UTF-8 file1 -o file2
</pre>

批量转换
<pre id="bash">
$ find default -type d -exec mkdir -p utf/{} \;
$ find default -type f -exec iconv -f GBK -t UTF-8 {} -o utf/{} \;
</pre>
这两行命令将default目录下的文件由GBK编码转换为UTF-8编码，目录结构不变，转码后的文件保存在utf/default目录下。
