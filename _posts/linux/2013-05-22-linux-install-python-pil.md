---
layout: post
title: Linux 64位系统安装Python PIL模块
tags: 
- vmstat
- linux
- 系统监控
categories:
- code
- archives
UUID: 20130522002000
date: 2013-05-22 00:20:00
---

 　　最近在使用django图片上传时遇到如下很郁闷的问题，在ubuntu12.04 32位操作系统上无法出现，但是在ubuntu64系统上就报如下异常<code>IOError: decoder jpeg not available</code>，从google上找方案，大家都是直接安装<code>python-imaging</code>,<code>libjpeg62 libjpeg62-dev</code>,设置软连就OK啦，可是我这里居然无法搞定，centos下已经解决，唯独ubuntu64下没解决，希望大家有解决方案的一起讨论。

###异常信息
<pre id="bash">
decoder jpeg not available
Request Method: POST
Request URL:  http://localhost:8000/admin/superstar/person/add/
Django Version: 1.3.7
Exception Type: IOError
Exception Value:  
decoder jpeg not available
Exception Location: /usr/local/lib/python2.7/dist-packages/PIL/Image.py in _getdecoder, line 385
Python Executable:  /usr/bin/python
Python Version: 2.7.3
Python Path:  
['/home/denghp/workspace/lucida',
  '/usr/local/lib/python2.7/dist-packages/django_debug_toolbar-0.9.4-py2.7.egg',
  '/usr/lib/python2.7',
  '/usr/lib/python2.7/plat-linux2',
  '/usr/lib/python2.7/lib-tk',
  '/usr/lib/python2.7/lib-old',
  '/usr/lib/python2.7/lib-dynload',
  '/usr/local/lib/python2.7/dist-packages',
  '/usr/local/lib/python2.7/dist-packages/PIL',
  '/usr/lib/python2.7/dist-packages',
  '/usr/lib/python2.7/dist-packages/gst-0.10',
  '/usr/lib/python2.7/dist-packages/gtk-2.0',
  '/usr/lib/pymodules/python2.7',
  '/usr/lib/python2.7/dist-packages/ubuntu-sso-client',
  '/usr/lib/python2.7/dist-packages/ubuntuone-client',
  '/usr/lib/python2.7/dist-packages/ubuntuone-control-panel',
  '/usr/lib/python2.7/dist-packages/ubuntuone-couch',
  '/usr/lib/python2.7/dist-packages/ubuntuone-installer',
  '/usr/lib/python2.7/dist-packages/ubuntuone-storage-protocol']
</pre>

###centos 下解决方案
1、安装PIL所需的系统库
<pre id="bash">
$ yum install zlib zlib-devel 
$ yum install libjpeg libjpeg-level 
$ yum install freetype freetype-devel 
</pre>

2、删除Python下安装的PIL
<pre id="bash">
rm -rf /usr/lib/python2.7/site-packages/PIL
rm /usr/lib/python2.7/site-packages/PIL.pth
#或者
rm -rf /usr/lib/python2.7/dist-packages/PIL
rm /usr/lib/python2.7/dist-packages/PIL.pth
#如果/usr/local/python2.7/dist-packages/PIL存在最好也全部删除
</pre>

3、下载安装PIL
<pre id="bash">
$ wget http://effbot.org/media/downloads/Imaging-1.1.7.tar.gz
$ tar -zxvf Imaging-1.1.7
$ cd Imaging-1.1.7
$ python setup.py build_ext -i  #用来进行安装前的检查
$ #修改setup.py
TCL_ROOT = "/usr/lib64/"
JPEG_ROOT = "/usr/lib64/"
ZLIB_ROOT = "/usr/lib64/"
TIFF_ROOT = "/usr/lib64/"
FREETYPE_ROOT = "/usr/lib64/"
LCMS_ROOT = "/usr/lib64/"

$ #安装
$ python setup.py install
</pre>

4、安装成功
<pre id="bash">
PIL 1.1.7 TEST SUMMARY 
--------------------------------------------------------------------
Python modules loaded from ./PIL
Binary modules loaded from ./PIL
--------------------------------------------------------------------
--- PIL CORE support ok
--- TKINTER support ok
--- JPEG support ok
--- ZLIB (PNG/ZIP) support ok
--- FREETYPE2 support ok
*** LITTLECMS support not installed
</pre>

5、验证是否成功
<pre id="bash">
$ python
>>> from PIL import Image
>>> im = Image.open("/home/denghp/photo.jpg")
>>> im.rotate(45)
>>> &lt;PIL.Image.Image image mode=RGB size=1169x640 at 0x7F2EE1AD2B90&gt;
</pre>

正常显示结果不报错，基本上就OK啦，可是我在ubuntu64位下以上都第4，5都没问题，可是在实际运行还是报上面的异常。centos却没问题。下面是网上的方案，我验证了在我这里无法成功

###ubuntu 安装Python PIL模块
1、安装依赖库
<pre id="bash">
sudo apt-get build-dep python-imaging
sudo apt-get install libjpeg62 libjpeg62-dev libfreetype6-dev libjpeg libjpeg-dev
</pre>

2、下载安装PIL
  跟centos下一致,安装成功出现如下centos安装步骤4点信息

3、修改软链
<strong>32-bit version</strong>
<pre id="bash">
sudo ln -s /usr/lib/i386-linux-gnu/libz.so /usr/lib/libz.so
sudo ln -s /usr/lib/i386-linux-gnu/libjpeg.so /usr/lib/libjpeg.so
sudo ln -s /usr/lib/i386-linux-gnu/libfreetype.so /usr/lib/libfreetype.so
</pre>

<strong>64-bit version</strong>
<pre id="bash">
sudo ln -s /usr/lib/x86_64-linux-gnu/libz.so /usr/lib/libz.so
sudo ln -s /usr/lib/x86_64-linux-gnu/libjpeg.so /usr/lib/libjpeg.so
sudo ln -s /usr/lib/x86_64-linux-gnu/libfreetype.so /usr/lib/libfreetype.so
</pre>

###求解决方法 ubuntu 64位安装Python PIL模块的方案
如果大家有好的解决方案，麻烦占用你几分钟时间给我出出主意，谢谢.

