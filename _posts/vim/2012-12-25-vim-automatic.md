--- 
layout: post
title: vim 自动补全插件推荐
tags: 
- vim
- 自动补全
- 插件
- shell
categories:
- code
show_img: "/media/pub/linux/vim_logo.png"
UUID: 201212250032
---

 　　前面已经介绍过Linux下常用的编辑器，其中就有个人非常热衷的Vim,现在来给大家介绍下Vim 自动补全的插件。主要包括,java,html,css,xml,python,javascript


###下载插件
<pre id="bash">
$ wget http://www.vim.org/scripts/download_script.php?src_id=6738
</pre>

###解压
<pre id="bash">
$ unzip -x javacomplete.zip
</pre>
1、把autoload文件夹下的javacomplete.vim java_parser.vim 加入到 
/usr/share/vim/vimcurrent/autoload目录
<pre id="bash">
$ sudo cp javacomplete.vim java_parser.vim /usr/share/vim/vimcurrent/autoload
</pre>
2、然后把压缩包中的 Reflection.java编译，把生成的.class 文件拷贝到 $JAVA_HOME 的某个目录下。配置到系统环境变量的$CLASSPATH中
<pre id="bash">
$ javac Reflection.java
$ cp Reflection.class $JAVA_HOME
$ vi ~/.bashrc 
$ export export CLASSPATH=.:$JAVA_HOME:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar
$ echo $CLASSPATH
</pre>

3、然后把 doc下的javacomplete.txt拷贝到 vimcurrent的doc目录下
<pre id="bash">
$ cp javacomplete.txt /usr/share/vim/vimcurrent/doc
</pre>

4、也可以在.vimrc中这样配置
<pre id="bash">
setlocal omnifunc=javacomplete#Complete
setlocal completefunc=javacomplete#CompleteParamsInfo
inoremap &lt;buffer&gt; &lt;C-X&gt;&lt;C-U&gt; &lt;C-X&gt;&lt;C-U&gt;&lt;C-P&gt;
inoremap &lt;buffer&gt; &lt;C-S-Space&gt; &lt;C-X&gt;&lt;C-U&gt;&lt;C-P&gt;
autocmd Filetype java inoremap &lt;buffer&gt; . .&lt;C-X&gt;&lt;C-O&gt;&lt;C-P&gt;
</pre>
<strong>注意最后一条命令的两个点号之间是有空格的。</strong>
其中第一条命令也可以换成：
<pre id="bash">
autocmd Filetype java setlocal omnifunc=javacomplete#Complete
</pre>

###修改vim配置
<img src="/media/pub/linux/vim-javacomplete.jpg" width="480px" alt="vim" class="img-center"></img>

最终效果如图如下：<br>
<img src="/media/pub/linux/vim-javacomplete-2.jpg" width="480px" alt="vim" class="img-center"></img>

###小贴士
<ol>
<li>快捷键 按CTRL+X ,CTRL+O，可显示补全菜单</li>
<li>其他的插件安装方式一样</li>
<li>花点时间了解下vim的常用命令,后续会介绍到，敬请期待.</li>
</ol>
