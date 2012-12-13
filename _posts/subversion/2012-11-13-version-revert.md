---
layout: post
title: Subversion恢复到某个版本
tags: 
- 研发实践
- Subversion
categories:
- 研发实践
- Subversion
UUID: 201212131829
---

　　Subversion将文件存放在中心版本库里，这个版本库很像一个普通的文件服务器。不同的是，它可以记录每一次文件和目录的修改情况，这样就可以在需要的回滚时，将数据恢复到以前的版本，并可以查看数据的更改细节。

###问题描述
假设原来的版本为 r10，我修改了工作副本，并提交，变成r11；后来又修改，提交，变成r12。

最终我发现这两次提交都有问题，如何让代码仓库中的内容恢复到r10的内容呢？（最好是放弃r11和r12，或者可以使r13的内容跟r10相同）

###解决方案
<pre id="bash">
$ svn merge -r 12:10 http://svn.example.com/repos/myproject/trunk -m "message"
</pre>

