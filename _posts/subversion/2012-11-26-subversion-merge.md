---
layout: post
title: SVN merge branche into trunk [分支与合并]
tags: 
- subversion
- 分支
- 合并
categories:
- code
- svn
- archives
UUID: 201211261730
date: 2012-11-26
---

###创建分支的意义
创建分支的意义，比如我们在一个基础平台上进行开发，每个技术小组负责一个子项目，而基础平台也是有可能会继续更改的，这个时候，如果不创建分支，子项目之间会相互影响，影响最大的就是后期的测试和版本发布，子项目A已经结束，但测试却受到正在进行的子项目B的影响，测试通不过，就别说版本发布了。所以，我们需要从目前的项目（主干trunk）中创建分支（branch），隔离子项目间的相互影响。

###创建分支原理
在svn中,创建分支，实际上就是一个版本拷贝(对应copy to...注意：绝不是简单在客户端上copy一个目录，而是svn仓库中copy，文件版本号会增加。），两边做任何修改发生的版本变化，是一套机制。举例：目前主干版本是100，分支版本是101，主干中增加一个文件，版本为102，分支中再增加一个文件，版本就为103了。两边的版本号是一套，不会重复。


###创建分支的方法
<pre>
$ svn copy http://svn.example.com/repos/calc/trunk \
           http://svn.example.com/repos/calc/branches/my-calc-branch \
                 -m "Creating a private branch of /calc/trunk."
</pre>
从版本库的视点来看，其实这两种方法没有什么区别，两个过程都在版本341建立了一个新目录作为/calc/trunk的一个备份，这些可以在图 4.3 “版本库与复制”看到，注意第二种方法，只是执行了一个立即提交。 [20]这是一个简单的过程，因为你不需要取出版本库一个庞大的镜像，事实上，这个技术不需要你有工作拷贝，这是大多数用户创建分支的方式。

###图 4.3. 版本库与复制
<img src="{{site.static_url}}/assets/images/svn-branch.png" />

###将trunk合并到当前分支
前面的78是开分支之前trunk的版本号，后面的83是merge时trunk的版本号
<pre id="bash">
$ cd branches/mybranche
$ svn merge -r 78:83 ../../trunk/
</pre>

###查看冲突文件
<pre id="bash">
$ svn st|grep ^C
</pre>
解决冲突后提交
<pre id="bash">
$ svn commit -m "merge trunk in branch"
</pre>

###从分支merge到trunk
先从trunk checkout一份新鲜的代码，然后cd到该版本目录下
<pre id="bash">
$ svn co svn://localhost/www/trunk
#78是分支开始的版本号，226是分支结束的版本号svn merge -r78:226 ../branches/my-calc-branch
$ svn ci -m "MERGE branch my-calc-branch [r78]:[229] into trunk"
</pre>

SVN 
获取某个版本的代码
svn up -r r26

###创建tags
<pre id="bash">
$ svn mkdir tags
#将备份的版本copy到tags
$ svn copy trunk/ tags/project_0.5
$ svn commit -m "add project_0.5 to tags"
</pre>



