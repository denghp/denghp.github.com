---
layout: post
title: Carrot2 搜索结果聚合聚类引擎
tags: 
- lucene
- 搜索引擎
- 聚合,聚类引擎
- java
categories:
- code
- search
- archives
UUID: 2013100852230
images: ["/assets/images/search/carrot2.jpg"]
---

   基于Java的开源 <a href="http://search.carrot2.org/" target="_bank">Carrot2 搜索结果聚合聚类引擎 2.0</a>发布了. Carrot2 可以自动的把自然的搜索结果归类（聚合聚类）到相应的语义类别中，这个功能是通过Carrot2一个现成的组件完成的，除此之外Carrot2 还包括了很多其他的搜索结果聚合聚类算法 search results clustering algorithms 非常值得一看。

   如果以前对聚类没有任何的印象，可以打开网址：<a href="http://search.carrot2.org/stable/search" target="_bank" >http://search.carrot2.org/stable/search</a>，这是Carrot2的一个搜索页面，你可能注意到在搜索框的上面有Bing、Yahoo等搜索引擎的名字，的确，这个页面演示的并不是一个真正的搜索引擎，而是一种叫元搜索的东西，也就是Carrot2从一些搜索引擎比如Yahoo、Bing等搜索引擎取得结果，然后对这些结果进行聚类并显示出来，你可以试着搜搜：Asian Football 看看，结果如下:

<a href="{{site.aliyun_oss}}/assets/images/search/carrot2.jpg" rel="prettyPhoto[{{page.UUID}}]" alt="carrot2">
<img class="lazy" src="{{site.aliyun_oss}}/assets/img/grey.gif" data-original="{{site.aliyun_oss}}/assets/images/search/carrot2.jpg" width="770px" alt="carrot2" ></img>
</a>

###添加Carrot2 到maven项目中
Clustering algorithms and document sources:
<pre id="xml">
&lt;dependency&gt;
    &lt;groupId&gt;org.carrot2&lt;/groupId&gt;
    &lt;artifactId&gt;carrot2-core&lt;/artifactId&gt;
    &lt;version&gt;3.8.0&lt;/version&gt;
&lt;/dependency&gt;
</pre>

Clustering algorithms only:
<pre id="xml">
&lt;dependency&gt;
  &lt;groupId&gt;org.carrot2&lt;/groupId&gt;
  &lt;artifactId&gt;carrot2-mini&lt;/artifactId&gt;
  &lt;version&gt;3.8.0&lt;/version&gt;
&lt;/dependency&gt;
</pre>

###源码地址
Carrot2源码地址:<a href="https://github.com/carrot2/carrot2" target="_bank">https://github.com/carrot2/carrot2</a>

###示例
代码示例需要自己去看官方的example

###Carrot2聚类工具简介
Carrot2聚类工具简介<a href="http://pan.baidu.com/s/1c7hW" target="_bank">http://pan.baidu.com/s/1c7hW</a>
