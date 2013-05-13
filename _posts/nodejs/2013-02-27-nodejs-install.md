---
layout: post
title: Nodejs认识及简单使用
tags: 
- Nodejs
- linux
- 研发实践
categories:
- code
- linux 
- topic
UUID: 20130227002300
date: 2013-02-27 00:10:00

show_img: "/media/pub/web/nodejs-380x300.png"
---

 　　Node.js是一个基于Google V8引擎构建的服务器端JavaScript平台，致力于提供一套编写高性能并发Web应用的JavaScript框架，完全事件驱动IO，基于V8引擎，很适合中间件和WEB项目开发。 在0.9.4这个不稳定版本中包含了一个<a href="http://blog.nodejs.org/2012/12/20/streams2/" target="新的流API">新的流API</a>。新API称为“streams2”，计划在0.10稳定版中正式发布。

###Node.js是什么？
 　　Node.js 不是一种独立的语言，与 PHP、Python、Perl、Ruby 的“既是语言也是平台”
不同。Node.js 也不是一个 JavaScript 框架，不同于 CakePHP、Django、Rails。Node.js 更不
是浏览器端的库，不能与 jQuery、ExtJS 相提并论。Node.js 是一个让 JavaScript 运行在服务
端的开发平台，它让 JavaScript 成为脚本语言世界的一等公民，在服务端堪与 PHP、Python、
Perl、Ruby 平起平坐。

###Nodejs与JavaScript区别
<ol>
<li>传统意义上，JavaScript 是由 ECMAScript、文档对象模型（DOM）和浏览器对象模型（BOM）组成的，而 Mozilla 则指出 JavaScript 由Core JavaScript 和 Client JavaScript 组成</li>
<li>Node.js 中所谓的 JavaScript 只是 Core JavaScript，或者说是 ECMAScript 的一个
实现，不包含 DOM、BOM 或者 Client JavaScript。</li>
<li>Node.js 是一个让 JavaScript 运行在浏览器之外的平台。它实现了诸如文件系统、模块、
包、操作系统 API、网络通信等 Core JavaScript 没有或者不完善的功能。</li>
<li>Node.js 的 JavaScript 引擎是 V8，来自 Google Chrome 项目。</li>
<li>Node.js 不运行在浏览器中，所以也就不存在 JavaScript 的浏览器兼容性问题，你可以放心地使用 JavaScript 语言的所有特性。</li>
</ol>

###Nodejs主要特点及能做什么？
正如 JavaScript 为客户端而生，Node.js 为网络而生。Node.js 能做的远不止开发一个网
站那么简单，使用 Node.js，你可以轻松地开发：
<ol>
<li>单线程事件模型，简单高效</li>
<li>基于活跃的高性能V8引擎 </li>
<li>异步式 I/O 与事件驱动</li>
<li>具有复杂逻辑的网站；</li>
<li>基于社交网络的大规模 Web 应用；</li>
<li>Web Socket 服务器；</li>
<li>TCP/UDP 套接字应用程序；</li>
<li>命令行工具；</li>
<li>交互式终端程序；</li>
<li>带有图形用户界面的本地应用程序；</li>
<li>单元测试工具；</li>
<li>客户端 JavaScript 编译器。</li>
</ol>

###Ubuntu安装Nodejs
官方推荐方法如下
<pre id="bash">
$ sudo apt-get install python-software-properties python g++ make
$ sudo add-apt-repository ppa:chris-lea/node.js
$ sudo apt-get update
$ sudo apt-get install nodejs npm
</pre>

但是我使用如上安装方式运行node却报如下异常？
<pre id="bash">
axconfig: port 1 not active
axconfig: port 2 not active
</pre>

找了很多解决方案木有搞定，之后自己下载源码直接编译安装就不存在这个问题：<br>
<pre id="bash">
#移除node安装:
$ sudo apt-get remove --purge node 
$ sudo apt-get clean 
#下载源码&编译&安装
$ wgeit http://nodejs.org/dist/v0.8.21/node-v0.8.21.tar.gz
$ sudo ./configure;make;sudo make install
</pre>

###搭建简单HTTP服务器
1、创建server.js文件<br>
2、添加如下server代码
<pre id="js">
var http = require("http");

http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/plain"});
  response.write("Hello Nodejs");
  response.end();
}).listen(8080);
</pre>
3、运行 node server.js
