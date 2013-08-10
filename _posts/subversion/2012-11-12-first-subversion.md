---
layout: post
title: "Subversion 文件状态含义"
tags:
- Subversion
- Svn
comment: true
published: true
categories:
- svn
- code
- archives
UUID: 20121112101820
date: 2012-11-12
---

打印工作拷贝文件和目录的状态。如果没有参数，只会打印本地修改的项目(不会访问版本库)，使用--show-updates选项，会添加工作修订版本和服务器过期信息。使用--verbose会打印每个项目的完全修订版本信息。
输出的前六列都是一个字符宽，每一列给出了工作拷贝项目的每一方面的信息。
第一列指出一个项目的是添加、删除还是其它的修改

### 语法
<pre>
svn status [PATH...]
</pre>

### 详细介绍
<pre>' ' item</pre>
没有修改。

<pre>'A' item</pre>
文件、目录或是符号链item预定加入到版本库。

<pre>'C' item</pre>
文件item发生冲突，在从服务器更新时与本地版本发生交迭，在你提交到版本库前，必须手工的解决冲突。

<pre>'D' item</pre>
文件、目录或是符号链item预定从版本库中删除。

<pre>'M' item</pre>
文件item的内容被修改了。

<pre>'R' item</pre>
文件、目录或是符号链item预定将要替换版本库中的item，这意味着这个对象首先要被删除，另外一个同名的对象将要被添加，所有的操作发生在一个修订版本。

<pre>'X' item</pre>
目录没有版本化，但是与Subversion的外部定义关联，关于外部定义，可以看“外部定义”一节。

<pre>'?' item</pre>
文件、目录或是符号链item不在版本控制之下，你可以通过使用svn status的--quiet（-q）参数或父目录的svn:ignore属性忽略这个问题，关于忽略文件的使用，见“svn:ignore”一节。

<pre>'!' item</pre>
文件、目录或是符号链item在版本控制之下，但是已经丢失或者不完整，这可能因为使用非Subversion命令删除造成的，如果是一个目录，有可能是检出或是更新时的中断造成的，使用svn update可以重新从版本库获得文件或者目录，也可以使用svn revert file恢复原来的文件。

<pre>'~' item</pre>
文件、目录或是符号链item在版本库已经存在，但你的工作拷贝中的是另一个。举一个例子，你删除了一个版本库的文件，新建了一个在原来的位置，而且整个过程中没有使用svn delete或是svn add。

<pre>'I' item</pre>
文件、目录或是符号链item不在版本控制下，Subversion已经配置好了会在svn add、svn import和svn status命令忽略这个文件，关于忽略文件，见“svn:ignore”一节。注意，这个符号只会在使用svn status的参数--no-ignore时才会出现—否则这个文件会被忽略且不会显示！


<pre>'L' item </pre>
项目已经锁定。
第四列只在预定包含历史添加的项目出现。

<pre>'+' item</pre>
历史预定要伴随提交。
第五列只在项目跳转到相对于它的父目录时出现(见“使用分支(http://i18n-zh.googlecode.com/svn/www/svnbook-1.4/svn.branchmerge.switchwc.html)”一节)。

  <pre>'S' item</pre>
  项目已经转换。

  <pre>' ' item </pre>
  当使用--show-updates，文件没有锁定。如果不使用--show-updates，这意味着文件在工作拷贝被锁定。

  <pre>'K' item </pre>
  文件锁定在工作拷贝。

  <pre>'O' item</pre>
  文件被另一个工作拷贝的另一个用户锁定，只有在使用--show-updates时显示。

  <pre>'T' item </pre>
  文件锁定在工作拷贝，但是锁定被“窃取”而不可用。文件当前锁定在版本库，只有在使用--show-updates时显示。

  <pre>'B' item</pre>
  文件锁定在工作拷贝，但是锁定被“破坏”而不可用。文件当前锁定在版本库，只有在使用--show-updates时显示。
  过期信息出现在第七列(只在使用--show-updates选项时出现)。

  <pre>'*' </pre>
  在服务器这个项目有了新的修订版本。
  余下的字段是可变得宽度且使用空格分隔，如果使用--show-updates或--verbose选项，工作修订版本是下一个字段。
  如果传递--verbose选项，最后提交的修订版本和最后的提交作者会在后面显示。
  工作拷贝路径永远是最后一个字段，所以它可以包括空格。


