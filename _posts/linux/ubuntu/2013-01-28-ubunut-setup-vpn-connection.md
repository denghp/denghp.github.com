--- 
layout: post
title: Ubuntu/Linux 配置VPN连接
tags: 
- shell
- Ubuntu
- linux
- VPN
categories:
- code
- linux
UUID: 20130128013000
date: 2013-01-28 01:30:00
show_img: "/media/pub/linux/vpn-step-3.jpg"
---

　　互联网上对于那些想需要更高的安全性，使用VPN (Virtual Private Network)连接是非常不错的选择，同样可以解决在国内无法访问国外被墙网站的问题。所有的网络流量将被加密。所以，即使你正在浏览一个非SSL的网站 - 您的信息（如登录信息）也是安全的VPN。

　　即使你只是一个网络浏览者或下载，你可以尝试VPN来挽救自己从常见的间谍（互联网服务供应商和电子政务），它也将允许你绕过地域限制（这意味着如果您使用的是美国基于VPN，那么你就可以浏览CBS和Hulu的视频在世界任何地方）。

###选择哪个VPN供应商？
国内有很多VPN供应商，国外就不用说啦，个人上网建议使用<a href="http://shayunet.info/170850" alt="鲨鱼加速器免费VPN" target="_bank">鲨鱼加速器免费VPN</a>, <a href="http://gjsq.me/659897" alt="GreenVPN网络加速器" target="_bank">GreenVPN网络加速器</a>, <a href="http://a.wy002.info/in.html?userid=195596" target="_bank" alt="51VPN" >51VPN</a> 这些供应商注册用户都可以提用免费的使用，即使收费也只有十几元一个月，个人感觉还可以吧。

###Ubuntu/Linux Mint设置VPN(PPTP)
<div class="module method-related-notes">
   <div class="content-item tab-content current method-tab-content">
     <ul><li class="methods">
        <span class="step">Step 1</span>
        <p class="desc">
        单击右上角网络图标,“配置VPN”<br>
        <a href="{{site.url}}/media/pub/linux/vpn-step-1.jpg" alt="VPN" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.url}}/media/pub/linux/vpn-step-1.jpg" width="300px"  alt="VPN" class="img-center" />
</a>
        </p>
     </li>
     <li class="methods">
        <span class="step">Step 2</span>
        <p class="desc">
        单击添加，弹出如下窗口，点击新建,然后选择VPN类型 - 选择PPTP<br>
<a href="{{site.url}}/media/pub/linux/vpn-step-2.jpg" alt="VPN" rel="prettyPhoto[page.UUID]">
<img src="{{site.url}}/media/pub/linux/vpn-step-2.jpg" width="300px"  alt="VPN" class="img-center" />
</a>

        </p>
    </li><!-- // .methods -->
    <li class="methods">
      <span class="step">Step 3</span>
      <p class="desc">
      弹出如下窗口，Gateway一项填写<a href="https://www.grjsq.biz/user-xianlu.html" target="_bank">服务器域名（点击查看）</a>，Optional几项填写在网站注册的用户名和密码，NT Domain不用填写。<br>
<a href="{{site.url}}/media/pub/linux/vpn-step-3.jpg" alt="VPN" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.url}}/media/pub/linux/vpn-step-3.jpg" width="300px"  alt="VPN" class="img-center" />
</a>
      </p>
   </li><!-- // .methods -->
   <li class="methods">
   <span class="step">Step 4</span>
   <p class="desc">
   单击上图Advanced选项，弹出如下窗口，取消EAP选项，勾选Use point-to-point encryption(MPPE)项，点击确定<br>
<a href="{{site.url}}/media/pub/linux/vpn-step-4.jpg" alt="VPN" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.url}}/media/pub/linux/vpn-step-4.jpg" width="300px"  alt="VPN" class="img-center" />
</a>
   </p>
   </li>
   <li class="methods">
   <span class="step">Step 5</span>
   <p class="desc">
   点击网络图标并切换到VPN模式，连接成功后，会看到图标上有一把锁<br>
<a href="{{site.url}}/media/pub/linux/vpn-step-5.jpg" alt="VPN" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.url}}/media/pub/linux/vpn-step-5.jpg" width="300px"  alt="VPN" class="img-center" />
</a>
   </p>
   </li>
   </ul>
   </div><!-- // .content-item -->
</div>



