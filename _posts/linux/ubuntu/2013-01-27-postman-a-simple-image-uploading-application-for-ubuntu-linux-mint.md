--- 
layout: post
title: Linux简单的图像上传工具Postman
tags: 
- shell
- Ubuntu
- linux
- OCR
- 图像文本转换器
categories:
- code
- linux
UUID: 20130127113500
date: 2013-01-27 11:35:00
show_img: "/media/pub/linux/postman.jpg"
---

　　Postman 是一个不错的应用程序，可以上传你的图片到各种服务，目前它支持的 Google Plus, Picasa, Flickr, Ubuntu One。这是一个易于使用的应用程序，寻找图形界面和最小的一组功能，支持拖放功能的图片上传。您还可以设置基本属性，如标题和描述的图像。

<a href="{{site.url}}/media/pub/linux/postman.jpg" alt="postman" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.url}}/media/pub/linux/postman.jpg" width="560px"  alt="postman" />
</a>

###Installing Postman in Ubuntu 12.04/12.10 (or Linux Mint 13/14)
如果你喜欢使用Ubuntu软件中心，然后你就可以安装它从那里，或者只是安装使用下面的命令
<pre id="bash">
sudo apt-get install postman-image-uploader
</pre>

###使用安装的PPA的方式
<pre id="bash">
sudo apt-add-repository ppa:schumifer/postman
sudo apt-get update
sudo apt-get install postman-image-uploader
</pre>



