---
layout: post
title: Subversion恢复到某个版本
tags: 
- 版本
- Subversion
- Svn
categories:
- code
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

###常用操作
#####还原到某个版本
<pre id="bash">
svn up -r 版本号
svn up -r 版本号 文件名称
</pre>
#####还原改动
对应提交(commit)，要有类似回滚（rollback）的操作。
<pre id="bash">
$ svn revert
</pre>
##### 还原已提交的改动
revert只适合未提交的情况。
如果已经提交，发现问题，要回退到之前的修订版。
首先需要：
<pre id="bash">
$ svn up
</pre>
让本地工作拷贝更新到最新状态。
然后：
<pre id="bash">
$ svn log your_file_path
</pre>
查看文件日志，这时候提交时填写的说明信息就派上用场了。
查看两个修订版之间的不同：
<pre id="bash">
$ svn diff -r 旧修订版序号:新修订版序号 your_file_path
</pre>
决定用哪个旧的修订版号后，用旧的修订版号文件覆盖新的修订版号文件。
<pre id="bash">
$ svn merge -r 新修订版序号:旧修订版序号 your_file_path
</pre>
还需要：
<pre id="bash">
$ svn commit -m “恢复到某修订版（某修订版作废）”
</pre>
这个还原是所谓的，不是用旧的版本号替代，而是将旧文件覆盖新文件。
