---
layout: post
title: "Git常用命令"
tags: 
- Github
- Git
comment: true
published: true
author: demi-panda
categories:
- Github
- code
- archives
UUID: 201211271035
date: 2012-11-27
---

git是一款分布式的版本控制软件，相比SVN，功能更强大，自然而然操作更复杂一些。git在本地也是以git版本库的形式管理，而SVN在本地管理的仅是一个版本库的副本。很明显的一个不同点：git你可以在本地做一些修改，然后commit到本地的版本库，最后push到服务器，而SVN只要一commit，更改就已经提交到服务器。

###git clone
这是较为简单的一种初始化方式，当你已经有一个远程的Git版本库，只需要在本地克隆一份
<pre>
$ git clone git://github.com/someone/some_project.git some_project
</pre>
命令就是将
<pre>
$ git://github.com/someone/some_project.git
</pre>
这个URL地址的远程版 本库完全克隆到本地some_project目录下面


###git init和git remote
这种方式稍微复杂一些，当你本地创建了一个工作目录，你可以进入这个目录，使用’git init’命令进行初始化，Git以后就会对该目录下的文件进行版本控制，这时候如果你需要将它放到远程服务器上，可以在远程服务器上创建一个目录，并把 可访问的URL记录下来，此时你就可以利用’git remote add’命令来增加一个远程服务器端。
<pre>
$ git remote add origin git://github.com/someone/another_project.git
#这条命令就会增加URL地址为
git: //github.com/someone/another_project.git
</pre>
称为origin的远程服务器，以后提交代码的时候只需要使用 origin别名即可.

现在我们有了本地和远程的版本库，让我们来试着用用Git的基本命令吧：

###git pull
从其他的版本库（既可以是远程的也可以是本地的）将代码更新到本地，例如：
<pre>
$ git pull origin master
</pre>
就是将origin这个版本库的代码更新到本地的master主枝，该功能类似于SVN的update


### git add
是将当前更改或者新增的文件加入到Git的索引中，加入到Git的索引中就表示记入了版本历史中，这也是提交之前所需要执行的一步.
<pre>
$ git add app/model/user.rb
</pre>
就会增加app/model/user.rb文件到Git的索引中


###git rm
从当前的工作空间中和索引中删除文件
<pre >
$ git rm app/model/user.rb
</pre>

###git commit
提交当前工作空间的修改内容，类似于SVN的commit命令
<pre>
$ git commit -m “story #3, add user model”
</pre>
提交的时候必须用-m来输入一条提交信息

###git push
将本地commit的代码更新到远程版本库中
<pre id="bash">
$git push origin
</pre>
将本地的代码更新到名为orgin的远程版本库中

###git log
查看历史日志

###git revert
还原一个版本的修改，必须提供一个具体的Git版本号
<pre id="bash">
$ git revert bbaf6fb5060b4875b18ff9ff637ce118256d6f20
</pre>
Git的版本号都是生成的一个哈希值

上面的命令几乎都是每个版本控制工具所公有的，下面就开始尝试一下Git独有的一些命令：
###git branch
对分支的增、删、查等操作
<pre>
$ git branch new_branch
</pre>
会从当前的工作版本创建一个叫做new_branch的新分支

<pre>
$ git branch -D new_branch
</pre>
就会强制删除叫做new_branch的分支

<pre>
$ git branch
</pre>
就会列出本地所有的分支

<pre>
$ git branch -r 
</pre>
就会列出远程所有的分支

###git checkout
Git的checkout有两个作用，其一是在不同的branch之间进行切换
<pre>
$ git checkout new_branch
</pre>
就会切换到new_branch的分支上去；另一个功能是还原代码的作用
<pre>
$ git checkout app/model/user.rb
</pre>
就会将user.rb文件从上一个已提交的版本中更新回来，未提交的内容全部会回滚

### git rebase
用下面两幅图解释会比较清楚一些，rebase命令执行后，实际上是将分支点从C移到了G，这样分支也就具有了从C到G的功能.
<img src="{{site.static_url}}/assets/images/github/git.jpg" width="580px" alt="">

###git reset
将当前的工作目录完全回滚到指定的版本号，假设如下图，我们有A-G五次提交的版本，其中C的版本号是 bbaf6fb5060b4875b18ff9ff637ce118256d6f20，我们执行了’git reset bbaf6fb5060b4875b18ff9ff637ce118256d6f20’那么结果就只剩下了A-C三个提交的版本
<img src="{{site.static_url}}/assets/images/github/git-reset.jpg" width="580px" alt="">

###git stash
将当前未提交的工作存入Git工作栈中，时机成熟的时候再应用回来，这里暂时提一下这个命令的用法，后面在技巧篇会重点讲解

###git config
利用这个命令可以新增、更改Git的各种设置
<pre>
$ git config branch.master.remote origin
</pre>
就将master的远程版本库设置为别名叫做origin版本库，后面在技巧篇会利用这个命令个性化设置你的Git，为你打造独一无二的 Git

###git tag
可以将某个具体的版本打上一个标签，这样你就不需要记忆复杂的版本号哈希值
<pre>
$ git tag revert_version bbaf6fb5060b4875b18ff9ff637ce118256d6f20
</pre>
来标记这个被你还原的版本，那么以后你想查看该版本时，就可以使用 revert_version标签名，而不是哈希值了

将tag push到远程
<pre>
$ git push --tags
</pre>

删除远程tag
<pre>
$ git tag -d tagname
#删除本地tag
$ git push origin :refs/tags/tagname
#删除远程tag
</pre>
