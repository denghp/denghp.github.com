--- 
layout: post
title: Linux下常用的编辑器
tags: 
- shell
- 编辑器
- vim
- Emacs
categories:
- code
- linux
- archives
images: ["/assets/images/linux/vim_logo.png"]
UUID: 201212250010
---

 　　在Linux下开发也有三年多时间啦,也看过Unix的设计思想，收获非常大，现在也算是一个linux中的一员菜鸟啦，今天就让我来给大家介绍下Linux常用的编辑器：Vim, Emacs,Gedit

###Vim
VIM是VI的加强版，比vi更容易使用。vi的命令几乎全部都可以在vim上使用。备受程序员和开源社区推崇的“神一样的编辑器”，支持很多的插件，把这些插件都用起来是一件令人非常愉快的事情,网上介绍成堆，这里就不多嘴介绍了。
<img src="{{site.static_url}}/assets/images/linux/vim.jpg" width="330px" alt="vim" class="img-center"></img>

####主页
<a href="http://www.vim.org/">http://www.vim.org/ </a>

####安装
<pre id="bash">
$ sudo apt-get install vim
</pre>
或者使用新立得中安装即可,安装成功，在命令行输入vi或者vim就可以看到如下界面，然后可以根据提示进行使用：

####Vim评分
<table>
  <tbody>
  <tr>
    <td style="width:300px">简易程度</td>
    <td style="width:50px;margin-right: 0px;color:#999;">1</td>
    <td style="width:300px">外观</td>
    <td style="width:50px;margin-right: 0px;color:#999;">5</td>
  </tr>
  <tr>
    <td style="width:300px">内容编辑</td>
    <td style="width:50px;margin-right: 0px;color:#999;">5</td>
    <td style="width:300px">简易HTML编辑</td>
    <td style="width:50px;margin-right: 0px;color:#999;">3</tr>
  <tr>
    <td style="width:300px">自定义</td>
    <td style="width:50px;margin-right: 0px;color:#999;">5.5</td>
    <td style="width:300px;color:red;">总分</td>
    <td style="width:50px;margin-right: 0px;color:#999;">19.5</td>
  </tr>
</table>

###Emacs
Emacs 实质上是一组文本编辑器的集合。Emacs的标语就是“可扩展、可定制、自文档化的实时显示编辑器。”要注意的是，在它的口号中，并没有提到“易用”或者是“直观”。这并不是为那些需要“所见即所得”软件的用户而设的;如果你需要一些像拼写检查这样的写作工具，它也不适合你。
<img src="{{site.static_url}}/assets/images/linux/emacs.jpg" width="330px" alt="emacs" class="img-center"></img>

####主页
<a href="http://www.gnu.org/software/emacs/">http://www.gnu.org/software/emacs/</a>

####安装
<pre id="bash">
$ sudo apt-get install emacs23
</pre>
同样在新立得中也可以安装，个人还是喜欢使用命令。

####Emacs评分
<table>
  <tbody>
  <tr>
    <td style="width:300px">简易程度</td>
    <td style="width:50px;margin-right: 0px;color:#999;">1</td>
    <td style="width:300px">外观</td>
    <td style="width:50px;margin-right: 0px;color:#999;">4</td>
  </tr>
  <tr>
    <td style="width:300px">内容编辑</td>
    <td style="width:50px;margin-right: 0px;color:#999;">5</td>
    <td style="width:300px">简易HTML编辑</td>
    <td style="width:50px;margin-right: 0px;color:#999;">5</tr>
  <tr>
    <td style="width:300px">自定义</td>
    <td style="width:50px;margin-right: 0px;color:#999;">5</td>
    <td style="width:300px;color:red;">总分</td>
    <td style="width:50px;margin-right: 0px;color:#999;">20</td>
  </tr>
</table>

###gEdit Editor
gedit是GNOME桌面环境的默认文本编辑器。这是一个兼容UTF-8的文本编辑器。
<img src="{{site.static_url}}/assets/images/linux/0935035064-2.png" width="330px" alt="emacs" class="img-center"></img>

####主页:<a href="http://projects.gnome.org/gedit/">http://projects.gnome.org/gedit/</a>

####安装
一般的Linux操作系统都会自带，不需要安装

####gEdit评分
<table>
  <tbody>
  <tr>
    <td style="width:300px">简易程度</td>
    <td style="width:50px;margin-right: 0px;color:#999;">8</td>
    <td style="width:300px">外观</td>
    <td style="width:50px;margin-right: 0px;color:#999;">7</td>
  </tr>
  <tr>
    <td style="width:300px">内容编辑</td>
    <td style="width:50px;margin-right: 0px;color:#999;">7</td>
    <td style="width:300px">简易HTML编辑</td>
    <td style="width:50px;margin-right: 0px;color:#999;">5</tr>
  <tr>
    <td style="width:300px">自定义</td>
    <td style="width:50px;margin-right: 0px;color:#999;">5</td>
    <td style="width:300px;color:red;">总分</td>
    <td style="width:50px;margin-right: 0px;color:#999;">32</td>
  </tr>
</table>

###总结
Linux下的编辑器还有很多，我这里只举例说了其中的三个，个人觉得Vim用的很愉快，在开发过程中也用到了不少插件，开发起来非常的清新，大家可以根据个人的喜爱来选择，大家可以后续的关注我的vim其他文章，会陆续的介绍Vim的使用经验。
