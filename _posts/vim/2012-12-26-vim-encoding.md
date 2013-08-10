--- 
layout: post
title: Vim编码知识,乱码问题
tags: 
- 编码
- vim
categories:
- code
- linux
- archives
images: ["/assets/images/linux/vim_logo.png"]
UUID: 201212260010
---

  　　在vim的初始学习阶段，乱码经常是困扰新手的一个比较烦躁的问题，本文试图阐述Vim的编码知识，及设置，针对乱码的原因和解决方案。

###文本编码
  　　常见的文本编码包括:ASCII、GBK、GB2312、GB18030、UTF8、UTF16等，各种编码的来源与详细知识请参考以下的这篇文档：<a href="http://hi.baidu.com/sinper9527/blog/item/4b6a58020b06c481d43f7c81.html">http://hi.baidu.com/sinper9527/blog/item/4b6a58020b06c481d43f7c81.html</a>

###Vim编码选项
####encoding- 简写enc
  　　encoding 是 Vim 内部使用的字符编码方式。当我们设置了 encoding 之后，Vim 内部所有的 buffer、寄存器、脚本中的字符串等，全都使用这个编码。

  　　由于 encoding 选项涉及到 Vim 中所有字符的内部表示，因此只能在 Vim 启动的时候设置一次。在 Vim 工作过程中修改 encoding 会造成非常多的问题。Linux操作系统默认编码都是UTF-8,如果没有特殊情况，最好设置encoding为UTF-8。为了避免在非 UTF-8 的系统如 Windows 下，菜单和系统提示出现乱码，可同时做这几项设置：
<pre id="bash">
$ vim ~/.vimrc
#添加如下设置
set encoding=utf-8
set langmenu=zh_CN.UTF-8
language message zh_CN.UTF-8
</pre>

###termencoding
  　　故明思意termencoding 是 Vim 用于屏幕显示的编码，在显示的时候，Vim 会把内部编码转换为屏幕编码，再用于输出。内部编码中含有无法转换为屏幕编码的字符时，该字符会变成问号，但不会影响对它的编辑操作。如果 termencoding 没有设置，则直接使用 encoding 不进行转换。

###fileencoding
  　　当 Vim 从磁盘上读取文件的时候，会对文件的编码进行探测。如果文件的编码方式和 Vim 的内部编码方式不同，Vim 就会对编码进行转换。转换完毕后，Vim 会将 fileencoding 选项设置为文件的编码。当 Vim 存盘的时候，如果 encoding 和 fileencoding 不一样，Vim 就会进行编码转换。因此，通过打开文件后设置 fileencoding，我们可以将文件由一种编码转换为另一种编码。

###fileencodings
  　　编码的自动识别是通过设置 fileencodings 实现的，注意是复数形式。fileencodings 是一个用逗号分隔的列表，列表中的每一项是一种编码的名称。当我们打开文件的时候，VIM 按顺序使用 fileencodings 中的编码进行尝试解码，如果成功的话，就使用该编码方式进行解码，并将 fileencoding 设置为这个值，如果失败的话，就继续试验下一个编码。

<pre id="bash">
set fileencodings=ucs-bom,utf-8,cp936,gb18030,big5,euc-jp,euc-kr,latin1
</pre>

####注意
latin1 是一种非常宽松的编码方式,如果你把 latin1 放到了 fileencodings 的第一位的话，打开任何中文文件都是乱码也就是理所当然的了。

###Vim编码转换流程图
借用网友的一张流程图

<img src="{{site.static_url}}/assets/images/linux/0_1274779296pVNL.gif" width="330px" alt="vim" class="img-center"></img>

###乱码的原因分析
1、操作系统的语言环境, 使用 locale 查看<br>
2、Vim的enc 设置,enc是用于VIM做内部表示的,也就是说VIM内部处理的是以enc编码的文本流，所以实际上enc的值和显示是否乱码没有根本上的必要联系。只不过enc的值通常是tenc的取值来源而已，所以这里暂且将它列举为可能引起乱码的一个因素。 <br>
3、Vim的tenc 设置<br>

###解决方案
1、从上面的原因来分析，tenc是用于告诉VIM终端的locale值是什么的，那么，如果tenc告诉VIM的值是错误的话，那就肯定乱码。所以乱码的最根本原因就是tenc的值和locale的值不同而造成的。<br>
(1) 在Native Linux/Unix环境下，locale的值与tenc的值不同 <br>
(2) 在Windows环境下，终端软件设置的Encoding（可以认为是locale）的值与tenc的值不同 <br>

2、遵循简单而统一的原则<br>
(1) 中文环境GBK码 <br>
将你的locale设置为zh_CN.gbk，然后将VIM设置如下:<br>
<pre id="bash">
set enc=gbk 
set fencs=gbk,gb2312,gb18030,cp936,utf8 
</pre>
(2) 中文环境utf8码 <br>
将你的locale设置为zh_CN.utf8，然后将VIM设置如下：<br>
<pre id="bash">
set enc=utf8 
set fencs=utf8,gbk,gb2312,gb18030,cp936 
</pre>
(3) 英文环境ASCII码
最简单的就这个了，啥都不用设置了,建议还是用英文环境最好...

3、可以设置系统变量
<pre id="bash">
$ vi ~/.bash_profile 或者 vi /etc/profile
#添加如下代码
export LANG="zh_CN.UTF-8"              或者"en_US.UTF-8"
export LC_ALL="zh_CN.UTF-8"           或者"en_US.UTF-8"
</pre>

