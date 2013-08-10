--- 
layout: post
title: ASCII和中文互转 
tags: 
- java
- ASCII
categories:
- java
- code
- archives
UUID: 201003111527
date: 2010-03-11
---

我们在开发使时常会用到资源文件，这可能是为了多语言、国际化的需要，也可能是使用了国外开源项目的原因，这就需要中文转ascii将中文转换为 ASCII 编码，或者将 ASCII 转换为中文，那么我们就可以使用 JDK 自带的转换工具 native2ascii 。

###中文转换为 ASCII 编码
<pre id="bash">
$ echo parameter.project.title=这是中文 > chinese.txt
$ native2ascii -encoding UTF-8 chinese.txt ascii.txt
$ cat ascii.txt
$ parameter.project.title=\u8fd9\u662f\u4e2d\u6587
</pre>

### ASCII 编码转换为中文
<pre id="bash">
$ echo "" > chinese.txt #清空chinese.txt内容
$ native2ascii -reverse -encoding UTF8 ascii.txt chinese.txt
$ cat chinese.txt
$ parameter.project.title=这是中文 
</pre>


