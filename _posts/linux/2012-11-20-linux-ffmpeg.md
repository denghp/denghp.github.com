---
layout: post
title: Linux下的命令行下转换媒体格式工具FFMPEG详解 
short_title: 媒体格式工具FFMPEG详解
tags: 
- linux
- shell
- ffmpeg
categories:
- linux
- archives
UUID: 201211201849
date: 2012-11-20
---

在windows下有格式工厂之类的软件可以转换媒体格式，在linux 下 呢？又没有这样的软件呢？既然linux喜欢命令行式操作，那linux迷就将命令行进行到底。今天介绍怎么在linux命令行下转换媒体格式，要用到的 工具就是ffmpeg。ffmpeg是一个Linux下音频视频格式转换的通用工具. 下面几条我觉得还不错，常用，就分享给linux迷爱好者了。

### avi电影音频提取
用下面这个命令行能够把电影里的音频提取出来, 成为一个独立的mp3文件, 这样可以听电影:
<pre id="bash">
$ ffmpeg -i input.avi -ab 128k output.mp3
</pre>

其中指定了mp3压缩码率为128k, 我想应能满足大多数人的要求了.
### ac3音频提取
这个例子和上一个例子类似, 不过由于音频是ac3编码的, 因此参数稍有不同:
<pre id="bash">
$ ffmpeg -i The.Devil.Wears.Prada.AC3.x264.mkv -acodec libmp3lame -ab 128 -ac 2 The.Devil.Wears.Prada.mp3
</pre>

###无损音频转换
我有一个ipod, 为了把网上下到的ape/flac格式的文件转成苹果的无损格式, 我使用的是下面的命令:
<pre id="bash">
$ ffmpeg -i input.ape -acodec alac output.m4a
</pre>

一般来说, 一个专辑里面有多个文件, 下面的循环能够做批量转换, 这个例子里面是对当前目录下所有的flac音乐进行转换.
<pre id="bash">
for i in *.flac
do
    ffmpeg -i "$i" -acodec alac "`basename "$i" .flac`.m4a"
done
</pre>

###视频转换成flash视频
我的手机能够播放flv这种flash视频文件, 有时候我会把喜欢的电视剧转成flv文件放在手机上播放, 下面是批量转换的例子:
<pre id="bash">
for file in *
do
    bsnm=`basename $file .avi`
    ffmpeg -i $file -s qvga -ar 44100 "$bsnm".flv
done
</pre>
