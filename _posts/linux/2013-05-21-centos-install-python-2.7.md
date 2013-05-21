---
layout: post
title: Centos 安装Django开发环境
tags: 
- python
- linux
- centos
categories:
- code
UUID: 20130521002000
date: 2013-05-21 00:20:00
show_img: '/media/pub/linux/django-logo.jpg'
---

　　Django是一个开源的Web应用框架，由Python写成，并于2005年7月在BSD许可证下发布。Django的主要目标是使得开发复杂的、数据库驱动的网站变得简单。Django采用MVC设计模式注重组件的重用性和“可插拔性”，敏捷开发和DRY法则（Don’t Repeat Yourself）。在Django中Python被普遍使用，甚至包括配置文件和数据模型。本文介绍Django在Linux+Mysql环境下安装、配置的过程，包括安装、运行、添加应用的所有流程，最终建立一个可以从Mysql读取文章并显示的Django应用。文章面向刚接触Python/Django的初学者，所以安装过程都以默认环境为主，用pip可以大大简化安装过程。

###系统环境
CentOS release 6.2
Mysql
Django-1.3.7

###安装Python2.7
系统默认自带python2.6版本
<per id="bash">
$ wget http://www.python.org/ftp/python/2.7.3/Python-2.7.3.tgz
$ tar -zxvf Python-2.7.3.tgz
$ cd Python-2.7.3
$ ./configure
$ sudo make & make install
$ mv /usr/bin/python /usr/bin/python2.6
$ ln -s /usr/local/bin/python2.7 /usr/bin/python
</pre>

<strong>注意：</strong><br>
因为yum依赖python2.6,所以要修改一下yum,否则yum则不能使用
<pre id="bash">
$ vi /usr/bin/yum
将
#!/usr/bin/python 
改成
#!/usr/bin/python2.6
</pre>

###安装Django
<per id = "bash">
$ wget https://www.djangoproject.com/download/1.3.7/tarball/
$ tar -zxvf Django-1.3.7.tar.gz
$ cd Django-1.3.7
$ python setup.py install
</pre>

###安装mysql & MySQL-python
<pre id="bash">
$sudo yum install mysql-server mysql-client
$sudo yum install MySQL-python
</pre>

###安装debug-toolbar
<pre id="bash">
$ git clone git://github.com/django-debug-toolbar/django-debug-toolbar.git
$ sudo python setup.py install
</pre>

如果报如下异常:ImportError: No module named setuptools
1、查看本机是否安装setuptools 如果没安装，则需要安装,安装过的查看版本是否支持<br>
2、安装setuptools<br>
<pre id = "bash">
$ tar zxvf setuptools-0.6c11.tar.gz
$ cd setuptools-0.6c11
$ python setup.py install
</pre>

###验证安装是否成功
1、创建一个django项目
<pre id="bash">
$ django-admin.py startproject mysite
$ cd mysite/
$ python manage.py runserver 
</pre>
2、访问http://host:port/8000
