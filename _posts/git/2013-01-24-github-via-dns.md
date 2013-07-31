---
layout: post
title: GitHub 无法访问解决方案
tags: 
- 互联网
- Github
- 屏蔽
categories:
- www
- topic
UUID: 20130124003000
date: 2013-01-24 00:30:00
show_img: "/media/pub/github/github-logo.jpg"
description: 被称为“程序员的天堂”的GitHub，因服务器被“12306订票助手”拖垮而为国人所熟知，网友猜测，我国地区无法访问GitHub，或是受到12306抢票插件的影响，12306抢票插件搞垮美国Github服务器。
---

<a href="{{site.static_url}}/media/pub/github/github-logo.jpg" alt="github" rel="prettyPhoto[{{page.UUID}}]" >
<img src="{{site.static_url}}/media/pub/github/github-logo.jpg" alt="github" class="img-center" />
</a>

　　被称为“程序员的天堂”的GitHub，因服务器被“12306订票助手”拖垮而为国人所熟知，网友猜测，我国地区无法访问GitHub，或是受到12306抢票插件的影响，12306抢票插件搞垮美国Github服务器。

　　李开复于22日的微博上，在强烈抗议封锁GitHub中提到，“在GitHub的300万会员中，中国是第四大国。GitHub是程序员学习和与世界接轨的首选工具。GitHub并无意识形态，也没有反动内容。封锁GitHub毫无道理。”

###修改hosts解决访问github方案
<pre id="bash">
sudo vi /etc/hosts
#添加如下配置
#github
207.97.227.239 github.com
65.74.177.129 www.github.com
207.97.227.252 nodeload.github.com
207.97.227.243 raw.github.com
204.232.175.78 documentcloud.github.com
204.232.175.78 pages.github.com
</pre>

###使用VPN访问github
####<a href="http://a.wy002.info/in.html?userid=195596" alt="51VPN" target="_bank">51VPN</a>
其实有很多优质的VPN是搜索不到的，当我发现<a href="http://a.wy002.info/in.html?userid=195596" alt="51VPN" target="_bank">51VPN</a>的时候，他们已经创办了两年多，并且已经有了11万多的用户量。可见他们的服务一直都得还都挺不错的。

<a href="http://a.wy002.info/in.html?userid=195596" alt="51VPN" target="_bank">51VPN</a>的免费VPN限制了流量，每个月是500M。这个流量，临时看看网页或者干啥的也都够了。要是不够的话，嘿嘿，可以多注册一个帐号的。接下来给大家详细介绍一下51VPN。

####<a href="http://shayunet.info/170850" alt="鲨鱼加速器免费VPN" target="_bank">鲨鱼加速器免费VPN</a>
<ol>
<li>没有使用时间限制，随时连随时用，不怕掉线；</li>
<li>没有速度限制，速度真的很快；</li>
<li>支持OpenVPN，更加的稳定。而且很多公司限制了PP[......]</li>
</ol>

####<a href="http://gjsq.me/659897" alt="GreenVPN网络加速器" target="_bank">GreenVPN网络加速器 免费美国绿色VPN</a>
可能许多朋友都听说过<a href="http://gjsq.me/659897" alt="GreenVPN网络加速器" target="_bank">GreenVPN网络加速器</a>，这是一家开办已经3年多的VPN商家，拥有成熟的VPN技术与稳定的客源。目前已经增加到70多条VPN线路，线路包括北美23条、香港4条、日本3条、韩服4条、国内7条、英国2条、德国2条、法国2条、俄罗斯1条、台湾4条。


###GitHub Pages服务迁移方法
<ol>
<li>保证自己有一个可以修改DNS的域名，非顶级域名也可，例如：demi-panda.com。</li>
<li>在pages所在根目录新建名为CNAME的文件将域名写入后push：echo "demi-panda.com" >> CNAME。</li>
<li>去域名提供商修改A记录，将demi-panda.com指向：204.232.175.78。</li>
</ol>

