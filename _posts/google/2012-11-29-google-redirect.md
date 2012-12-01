---
layout: post
title: 取消 Google 搜索结果链接重定向
tags: 
- 浏览器
- Google 
categories:
- Search
- Google
UUID: 201211292330
date: 2012-11-29
---

Google 是个我用得最多的搜索引擎, 非常好用, 但因为某些原因, 在中国大陆地区表现很差. 我相信经常用谷歌搜索的人会遇到过这样的问题: 在 Google 搜索结果页面点击一些链接后出现网络错误.

这里要介绍一下 Google 重定向的作用, 带来的问题, 以及消除的方法.

###搜索结果链接重定向
几乎所有的搜索引擎, 包括百度都对搜索结果中的链接进行了重定向. 比如 WordPress 的网站链接是 http://wordpress.org, 但在 Google 页面搜索点进网站时其实进入的链接如下:

http://www.google.com/url?sa=t&rct=j&q=&esrc=s&source=web&cd=1&ved=0CDQQFjAA&url=http%3A%2F%2Fwordpress.com%2F&ei=H0ay

搜索结果的链接会变成 Google 重定向链接, 这个链接最后也会转跳到原网站链接 http://wordpress.org, 如下图.
<img src="/media/pub/google/google-redirects.png" width="580px"></img>

###重定向带来的问题
但因为网络问题和其他一些原因, Google 的服务器在国内访问其实会遇到很多麻烦, 搜索结果经常打不开. 就算你用了某些代理来解决这些问题, 也避免不了网速变慢带来的不愉悦感.

依我的观察, Google 重定向经历了几个阶段, 最开始的时候是将重定向链接输出到页面上的 (百度和 360 现在就这么干), 如果这样的话我们没有任何办法. 幸好 Google 现在选择用 JavaScript 脚本来处理, 点用户按下鼠标时才跟换 URL 地址, 所以只要我们禁止这个 JavaScript 操作, 就可以避免出现错误页面, 也减免了代理出国再过来的网络开销, 就会变成下图所示.
<img src="/media/pub/google/direct-links.png" width="580px"></img>

Google 通过重定向统计搜索结果的点击次数和记录用户的搜索历史, 取消掉重定向将导致用户看不到搜索历史记录.

###浏览器扩展和插件
看了前两段, 也许你觉得这里会有一大段代码, 然后告诉你按某些步骤添加到哪里哪里... 其实没那么复杂, 我也懒得弄. 很多浏览器有类似插件:
<ul>
<li>Firefox: <a href="https://addons.mozilla.org/en-us/firefox/addon/google-no-tracking-url/" rel="external">Remove google search redirects</a></li>
<li>Chrome: <a href="https://chrome.google.com/webstore/detail/remove-google-redirects/ccenmflbeofaceccfhhggbagkblihpoh" rel="external">Remove Google Redirects</a></li>
<li>Opera: <a href="https://addons.opera.com/zh-cn/extensions/details/remove-google-redirects/" rel="external">Remove Google Redirects</a></li>
</ul>
