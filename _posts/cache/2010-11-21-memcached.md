---
layout: post
title: 清空,删除memcache缓存
tags: 
- memcached
- 缓存
categories:
- code
- archives
UUID: 201011212330
date: 2010-11-21
---

默认memcache会监听11221端口，如果想清空服务器上memecache的缓存，大家一般使用的是:
###方案一
<pre id="bash">
$ telnet localhost 11211
$ flush_all
</pre>

###方案二
<pre id="bash">
$ echo "flush_all" | nc localhost 11211
</pre>
使用flush_all 后并不是删除memcache上的key，而是置为过期

###根据KEY删除缓存
<pre id="bash">
get SEARCH_28ef886463f514c373310bf2376db074
delete SEARCH_28ef886463f514c373310bf2376db074
DELETED    <--这是返回的结果，表示删除成功
</pre>
