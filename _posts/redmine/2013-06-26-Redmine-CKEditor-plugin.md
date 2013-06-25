---
layout: post
title: Redmine高级编辑插件-CKEditor
tags: 
- redmine
- 项目管理
categories:
- code
- project
UUID: 20130626002000
date: 2013-06-26 00:20:00
show_img: "/media/pub/web/CKEditor-plugin.jpg"
---

 　　redmine自带的高级功能编辑不怎么好用，必须使用代码才能使用，不甚方便，找了一个好用的ckeditor高级功能插件；下面来看看怎么给redmine安装插件吧，其他的插件安装方式应该类似:

###CKEditor plugin安装
1、下载地址
<pre id="bash">
git clone git://github.com/a-ono/redmine_ckeditor.git
</pre>

2、然后拷贝plugin目录到redmine的plugins目录下
<pre id="bash">
cd redmine_ckeditor
cp -r plugin /var/www/redmine/plugins
</pre>

3、Execute migration
<pre id="bash">
rake redmine:plugins:migrate RAILS_ENV=production
</pre>

4、重起redmine
<pre id="bash">
ruby script/rails server webrick -e production
</pre>

5、登录redmine改变文本格式到ckeditor
<a href="{{site.url}}/media/pub/web/redmine-CKEditor.jpg" alt="redmine-CKEditor" rel="prettyPhoto[{{page.UUID}}]">
  <img src="http://demi-panda.com/media/pub/web/redmine-CKEditor.jpg" width="560px"  alt="redmine-CKEditor" />
</a>
然后进入到项目管理中的新建问题或者wiki编辑功能或者讨论区功能，编辑的功能如下:<br>
<a href="{{site.url}}/media/pub/web/CKEditor-plugin.jpg" alt="redmine-CKEditor" rel="prettyPhoto[{{page.UUID}}]">
  <img src="http://demi-panda.com/media/pub/web/CKEditor-plugin.jpg" width="560px"  alt="redmine-CKEditor" />
</a>



