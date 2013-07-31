--- 
layout: post
title: 浏览器的用户脚本管理工具
tags: 
- 用户脚本
- 互联网
- firefox
- chrome
- 浏览器
categories:
- www
UUID: 201301142227
---

 　　最近在网上购票的时候，使用了购票助手，当然这些购票助手都是一些热心的IT牛人写的,哈哈，
我们只能站在巨人的肩膀上挖掘更多的价值。这些购票助手的插件都是基于浏览器使用javascript实现的，
自然需要使用用户脚本工具来管理。今天给大家介绍下用户脚本工具使用：

###用户脚本 UserScript
 　　用户脚本（UserScript）是一种强大的客户端（浏览器）Javascript脚本。下载了用户脚本保存在电脑里，
通过浏览器的某些扩展程序（最常用的是Firefox的Greasemonkey扩展），就可以运行于相关页面上。用户脚本可以任意修改HTML页面，
请求其他站点的数据等。比如任意网页上选中了文字，按快捷键就帮你翻译或搜索，把Baidu、Google搜索页重新排版去广告，等等。
介绍可以参见<a href="http://zh.wikipedia.org/wiki/Greasemonkey" target="_bank">维基百科的Greasemonkey条目</a>。

###如何使用安装用户脚本
####火狐Firefox安装
######Greasemonkey扩展<br>
<a href="https://addons.mozilla.org/en-US/firefox/addon/748" alt="Greasemonkey" target="_bank">https://addons.mozilla.org/en-US/firefox/addon/748</a>
官方网站：<br>
<a href="http://www.greasespot.net/" target="_bank">http://www.greasespot.net/</a><br>
######Scriptish扩展：
<a href="https://addons.mozilla.org/en-US/firefox/addon/scriptish/" alt="scriptish" target="_bank">https://addons.mozilla.org/en-US/firefox/addon/scriptish/</a>
官方网站：<br>
<a href="http://scriptish.org/" alt="scriptish" target="_bank">http://scriptish.org/</a><br>
这是Greasemonkey的一个分支项目，使用方式和Greasemonkey差不多<br>
######安装步骤
<ol>
<li>安装火狐浏览器</li>
<li>
点击打开安装<a href="https://addons.mozilla.org/en-US/firefox/addon/748" alt="Greasemonkey" target="_bank">https://addons.mozilla.org/en-US/firefox/addon/748</a>
<img src="{{site.static_url}}/media/pub/web/Greasemonkey.jpg" width="530px"  alt="Greasemonkey" ></img>
</li>

<li>
打开工具-找到附加组件就可以看到自己安装的用户脚本管理工具
<img src="{{site.static_url}}/media/pub/web/userscript.jpg" width="530px"  alt="Greasemonkey" ></img>
</li>
<li>
添加用户脚本<br>
<img src="{{site.static_url}}/media/pub/web/add-userscript.jpg" width="530px"  alt="Greasemonkey" ></img>
</li>
</ol>



####Internet Explorer安装
######IE7Pro扩展：
<a href="http://www.ie7pro.com/" alt="" target="_bank">http://www.ie7pro.com/</a><br>
将*.user.js脚本改为.ieuser.js后缀，放在C:\Program Files\IEPro\userscripts\下，<br>
在IE7Pro的选项的“User Script”面板中启用该脚本。
######Trixie扩展：
<a href="http://www.bhelpuri.net/Trixie/" alt="trixie" target="_bank">http://www.bhelpuri.net/Trixie/</a><br>
把用户脚本放在C:\Program Files\Bhelpuri\Trixie\Scripts文件夹下，<br>
在工具->Trixie Options（Trixie选项）中点击Reload Scripts（重新载入）按钮，再选中该脚本，即可使用<br>

###Google Chrome和Chromium 安装
Google Chrome和Chromium 安装虽然原生支持用户脚本，但是2012年8月后的新版Google Chrome已不允许直接点击安装用户脚本，会显示“只可添加来自 Chrome 网上应用店的扩展程序、应用和用户脚本。”。解决方法有3种：
<ol>
<li>
将用户脚本文件.user.js下载到电脑里；点击Google Chrome浏览器工具栏上的扳手图标；选择工具 > 扩展程序；将用户脚本文件.user.js拖动到“扩展程序”页；点击安装即可完成（参考官方帮助<a href="http://support.google.com/chrome_webstore/bin/answer.py?hl=zh-Hans&hlrm=en&p=crx_warning&answer=2664769" target="_bank">《添加来自其他网站的扩展程序》</a>）
</li>
<li>
带“ --enable-easy-off-store-extension-install”命令行参数运行Google Chrome（Windows下可以建立chrome.exe的快捷方式，快捷方式属性中的目标文件路径末尾添加“ --enable-easy-off-store-extension-install”，并使用此快捷方式打开Google Chrome），这样网上应用店外的扩展、脚本就像以前一样，再也不会被阻止了；
</li>
</ol>

