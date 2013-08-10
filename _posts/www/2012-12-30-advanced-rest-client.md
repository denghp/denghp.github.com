--- 
layout: post
title: REST client 基于浏览器的测试工具
short_title: Rest Web Service测试工具
tags: 
- 互联网
- Chrome
- REST
- Client
- 测试工具
categories:
- www
- code
- archives
UUID: 201212301027
---
    

 　　以前在开发webservice服务，都是自己基于HTTP协议，自己写一个测试程序来进行测试，最近在研究RestFul，对以前webservice服务进行了重构，总结了不少经验，今天就给大家介绍下几款Rest Client的测试工具。


###REST介绍
 　　所谓REST，是Representational State Transfer，这个词汇的中文翻译很不统一，而且很晦涩，有叫“具象状态传输”，有叫“表象化状态转变”，等等。

 　　REST风格的Web服务，是通过一个简洁清晰的URI来提供资源链接，客户端通过对URI发送HTTP请求获得这些资源，而获取和处理资源的过程让客户端应用的状态发生改变（不像那些远程过程调用那么直接地发生改变）。

 　　常用的对资源进行CRUD（Create, Read, Update 和 Delete）的四种HTTP方法分别是POST, GET, PUT, DELETE。

###基于浏览器的Rest Client工具
 　　在chrome或者firefox浏览器都有很多插件，我一般都是使用chrome浏览器，在chrome的webstore中可以搜索到自己想要的插件。这里就讲讲[Advance REST Client](https://chrome.google.com/webstore/detail/advanced-rest-client/hgmloofddffdnphfgcellkdfbfbjeloo/details),[Postman-REST Client](https://chrome.google.com/webstore/detail/postman-rest-client/fdmmgilgnpjigdojojpjoooidkmcomcm?utm_source=chrome-ntp-icon),[DEV HTTP CLIENT](https://chrome.google.com/webstore/detail/dev-http-client/aejoelaoggembcahagimdiliamlcdmfm?utm_source=chrome-ntp-icon),[Simple REST Client](https://chrome.google.com/extensions/detail/fhjcajmcbmldlhcimfajhfbgofnpcjmb)，火狐下的[RESTClient插件](https://addons.mozilla.org/zh-CN/firefox/addon/9780/)。

###Advanced REST client
 　　网页开发者辅助程序来创建和测试自定义HTTP请求。它是一款非常强大，使用简单的客户端测试工具，得到了程序员的好评。每周超过50k的开发者使用此应用程序。如此多的人是不会错的！
<img src="{{site.static_url}}/assets/images/web/advance-rest-client.jpg" width="580px"></img>


####支持的功能
<ol>
<li> Make a HTTP request (via XmlHttpRequest level 2)</li>
<li>Debug socket (via web socket API).</li>
<li>JSON response viewer</li>
<li>XML response viewer</li>
<li>set custom headers - even does not supported by XmlHttpRequest object</li>
<li>help with filling HTTP headers (hint + code completion)</li>
<li>add headers list as raw data or via form</li>
<li>construct POST or PUT body via raw input, form or send file(s) with request</li>
<li>set custom form encoding</li>
<li>remember latest request (save current form state and restore on load)</li>
<li> save (Ctrl+S) and open (Ctrl+O) saved request forms</li>
<li>history support</li>
<li>data import/export</li>
</ol>

###Postman -REST client
 　　Postman可以帮助你更有效的针对API工作。Postman是一个scratch-your-own-itch项目。它需要的是开发者有效的在项目中创建APIS，能够对API测试进行收藏保留。
<img src="{{site.static_url}}/assets/images/web/postman-rest-client.jpg" width="580px"></img>


####支持功能
<ol>
<li>HTTP requests 支持文件上传</li>
<li>格式化API响应的JSON and XML</li>
<li>打开 responses 的HTML文件在一个新窗口展示</li>
<li>支持REST准则的超媒体应用状态的引擎- HATEOS </li>
<li>图像预览</li>
<li>Request history</li>
<li>基本oauth 1.0助手</li>
<li>Autocomplete for URL and header values</li>
<li>可以在URL参数中使用 key/value编辑添加参数或header值</li>
<li>使用环境变量容易转移之间设置。可用于测试，生产，分期或本地设置。</li>
<li>使用全局变量的值是在整个 APIs</li>
<li>使用快速查找功能预览变量和它们的值使用状况</li>
<li>键盘快捷方式，最大限度地提高您的生产力</li>
</ol>

###Simple REST Client
 　　[Simple REST Client插件](https://chrome.google.com/extensions/detail/fhjcajmcbmldlhcimfajhfbgofnpcjmb)，提供了一个简单的表单进行各种HTTP操作，并可以看到返回的信息。构建自定义HTTP请求直接测试您的网络服务。
<img src="{{site.static_url}}/assets/images/web/Simple-REST-Client-560x491.jpg" width="580px"></img>

###Firefox下的RESTClient
 　　Firefox[RESTClient](https://addons.mozilla.org/zh-CN/firefox/addon/9780/)的插件，这款插件由国人开发，功能上支持Basic和OAuth的登录header发送，并且对于返回的XML数据还可以高亮显示

<img src="{{site.static_url}}/assets/images/web/RESTClient-560x420.jpg" width="580px"></img>

###Linux常用的工具CURL
 　　CURL是一个很强大的支持各种协议的文件传输工具，用它来进行RESTful Web Services的测试简直是小菜一碟。

CURL的命令参数非常多，一般用于RESTful Web Services测试要用到下面四种参数：<br>
<ul>
<li>-d/–data <data>：POST数据内容</li>
<li>-X/–request <command>：指定请求的方法（使用-d时就自动设为POST了）</li>
<li>-H/–header <line>：设定header信息</li>
<li>-I/–head：只显示返回的HTTP头信息</li>
</ul>

###Java GUI rest-client
 　　这是一个用Java写的测试小工具，[项目主页](http://code.google.com/p/rest-client/)上提到它有命令行和GUI两种版本。为了方便操作我们选择GUI版本来看看。既然是一款软件，显然就比刚才介绍的浏览器插件功能更加强大。它支持应答正文的JSON和XML缩排和高亮，还可以一键搭建一个RESTful服务端，另外还提供了单元测试的功能。

<img src="{{site.static_url}}/assets/images/web/RESTClient-Java-491x600.jpg" width="580px"></img>

