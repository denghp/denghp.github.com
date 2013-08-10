---
layout: post
title: Google Search 无法访问解决方案
tags: 
- 互联网
- Google
- 屏蔽
categories:
- www
- archives
UUID: 20130123223000
date: 2013-01-23 22:30:00
images: ["/assets/images/google/google-search.jpg"]
---


 　　众所周知，在国内出于国内安全和自我保护意识，google的各项服务都是禁止使用的。很多网站主更是有所感受，那么如何才能正常访问的google的各项服务呢？

<a href="{{site.static_url}}/assets/images/google/google-search.jpg" alt="github">
<img src="{{site.static_url}}/assets/images/google/google-search.jpg" alt="google search" class="img-center" width="330px"/>
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
203.208.46.200  www.google.com.hk
203.208.46.200  www.google.cn
203.208.46.200  www.l.google.com
203.208.46.200  www2.l.google.com
203.208.46.200  www3.l.google.com
203.208.46.200  www4.l.google.com
</pre>

###Google Code hosts配置
<pre id="bash">
#Google code
203.208.46.200  autoproxy-gfwlist.googlecode.com
203.208.46.200  chromium.googlecode.com
203.208.46.200  closure-library.googlecode.com
203.208.46.200  earth-api-samples.googlecode.com
203.208.46.200  gmaps-samples-flash.googlecode.com
203.208.46.200  google-code-feed-gadget.googlecode.com
203.208.46.200  codereview.chromium.org
203.208.46.222  smarthosts.googlecode.com
203.208.46.200  code.google.com
203.208.46.200  code.l.google.com 
203.208.46.200  googlecode.l.google.com
203.208.46.200  uploads.code.google.com
203.208.46.202  code-opensocial.googleusercontent.com
</pre>

###Google Drive hosts配置
<pre id="bash">
#google drive and docs
203.208.46.200 0.docs.google.com
203.208.46.200	0.drive.google.com
203.208.46.200	1.docs.google.com
203.208.46.200	1.drive.google.com
203.208.46.200	10.docs.google.com
203.208.46.200	10.drive.google.com
203.208.46.200	11.docs.google.com
203.208.46.200	11.drive.google.com
203.208.46.200	12.docs.google.com
203.208.46.200	12.drive.google.com
203.208.46.200	13.docs.google.com
203.208.46.200	13.drive.google.com
203.208.46.200	14.docs.google.com
203.208.46.200	14.drive.google.com
203.208.46.200	15.docs.google.com
203.208.46.200	15.drive.google.com
203.208.46.200	16.docs.google.com
203.208.46.200	16.drive.google.com
203.208.46.200	2.docs.google.com
203.208.46.200	2.drive.google.com
203.208.46.200	3.docs.google.com
203.208.46.200	3.drive.google.com
203.208.46.200	4.docs.google.com
203.208.46.200	4.drive.google.com
203.208.46.200	5.docs.google.com
203.208.46.200	5.drive.google.com
203.208.46.200	6.docs.google.com
203.208.46.200	6.drive.google.com
203.208.46.200	7.docs.google.com
203.208.46.200	7.drive.google.com
203.208.46.200	8.docs.google.com
203.208.46.200	8.drive.google.com
203.208.46.200	9.docs.google.com
203.208.46.200	9.drive.google.com
</pre>

###获取Google最新hosts配置地址
访问googlecode网站获得，<a href="https://smarthosts.googlecode.com/svn/trunk/hosts" alt="google hosts" target="_bank">https://smarthosts.googlecode.com/svn/trunk/hosts</a>，这里提供了最新的映射IP地址，将获得的hosts文件附加到自己电脑的hosts中就可以

###小贴士
以上hosts文件的获得肯定只是临时的，想要经常性的在国内使用google服务肯定要开展一个旷日持久的拉锯战，咱们处于国家安全考虑还是要尊重政府的决定的。如果您试了如上方式可行，就麻烦您点击分享按钮把内容分享给广大的网友朋友们。

