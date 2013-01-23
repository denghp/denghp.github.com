---
layout: post
title: Google Search 无法访问解决方案
tags: 
- 互联网
- Google
- 屏蔽
categories:
- www
UUID: 20130123223000
date: 2013-01-23 22:30:00
show_img: "/media/pub/google/google-search.jpg"
---


 　　众所周知，在国内出于国内安全和自我保护意识，google的各项服务都是禁止使用的。很多网站主更是有所感受，那么如何才能正常访问的google的各项服务呢？

<a href="{{site.url}}/media/pub/google/google-search.jpg" alt="github">
<img src="{{site.url}}/media/pub/google/google-search.jpg" alt="google search" class="img-center" width="330px"/>
</a>


###Windows下修改hosts
用记事本打开C:\Windows\System32\drivers\etc下的hosts

###Linux下修改hosts
<pre id="bash">
sudo vi /etc/hosts
</pre>

###Google 搜索hosts配置
<pre id="bash">
#Search
74.125.39.99    www.google.com
74.125.39.103   www.google.com
74.125.39.104   www.google.com
74.125.39.105   www.l.google.com
</pre>

###Google Code hosts配置
<pre id="bash">
#Code
74.125.53.9     code.google.com   
74.125.45.9     code.google.com   
64.233.161.9    code.google.com   
74.125.39.102   code.google.com   
209.85.137.9    code.google.com   
74.125.39.139   code.l.google.com
</pre>

###Google Drive hosts配置
<pre id="bash">
74.125.224.231 drive.google.com
</pre>

###获取Google最新hosts配置地址
访问googlecode网站获得，<a href="https://smarthosts.googlecode.com/svn/trunk/hosts" alt="google hosts" target="_bank">https://smarthosts.googlecode.com/svn/trunk/hosts</a>，这里提供了最新的映射IP地址，将获得的hosts文件附加到自己电脑的hosts中就可以

###小贴士
以上hosts文件的获得肯定只是临时的，想要经常性的在国内使用google服务肯定要开展一个旷日持久的拉锯战，咱们处于国家安全考虑还是要尊重政府的决定的。如果您试了如上方式可行，就麻烦您点击分享按钮把内容分享给广大的网友朋友们。

