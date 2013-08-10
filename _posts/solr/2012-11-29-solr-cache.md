---
layout: post
title: Solr 4.0 缓存配置
tags: 
- solr
- lucene
- 搜索引擎
- Solr 缓存
- 缓存
categories:
- code
- solr
- search
- archives
UUID: 201211291130
date: 2012-11-29
---

Solr配置文件[solrconfig.xml]有三种缓存分别是 filterCache，queryResultCache，documentCache但Solr是在什么时候，什么情况下会用到这些缓存呢，通过看Solr的源码，下面对Solr三种缓存做说明:

<ol>
<li>Filter cache（过滤器缓存），用于保存过滤器（fq 参数）和层面搜索的结果</li>
<li>Document cache（文档缓存），用于保存 lucene 文档存储的字段</li>
<li>Query result（查询缓存），用于保存查询的结果</li>
</ol>

通过这3种缓存，可以对solr的搜索实例进行调优。调整这些缓存，需要根据索引库中文档的数量，每次查询结果的条数等。
在调整参数前，需要事先得到 solr 示例中的以下信息：
<ol>
<li>索引中文档的数量</li>
<li>每秒钟搜索的次数</li>
<li>过滤器的数量</li>
<li>一次查询返回最大的文档数量</li>
<li>不同查询和不同排序的个数</li>
</ol>

solr中主要是LRUCache,主要使用的是LRU是Least Recently Used最近最少使用算法。先给大家普及下LRU算法：
###LRU
内存管理的一种算法，对于在内存中但最近又不用的数据块（内存块）叫做LRU，Oracle会根据那些数据属于LRU而将其移出内存而腾出空间来加载另外的数据。

什么是LRU算法? LRU是Least Recently Used的缩写，即最近最少使用页面置换算法，是为虚拟页式存储管理服务的。

　　关于操作系统的内存管理，如何节省利用容量不大的内存为最多的进程提供资源，一直是研究的重要方向。而内存的虚拟存储管理，是现在最通用，最成功的方式—— 在内存有限的情况下，扩展一部分外存作为虚拟内存，真正的内存只存储当前运行时所用得到信息。这无疑极大地扩充了内存的功能，极大地提高了计算机的并发度。虚拟页式存储管理，则是将进程所需空间划分为多个页面，内存中只存放当前所需页面，其余页面放入外存的管理方式。

　　然而，有利就有弊，虚拟页式存储管理减少了进程所需的内存空间，却也带来了运行时间变长这一缺点：进程运行过程中，不可避免地要把在外存中存放的一些信息和内存中已有的进行交换，由于外存的低速，这一步骤所花费的时间不可忽略。因而，采取尽量好的算法以减少读取外存的次数，也是相当有意义的事情。


我们可以通过solr管理界面查看缓存的状态，也可以通过日志进行查看。下图是我进行的参数设置后的状态：
###Plugins / status
<img src="/assets/images/solr/solr-cache.jpg" width="580px"></img>

*参数说明:*
<ol>
<li>lookups: 查询次数</li>
<li>hits: 命中次数</li>
<li>hitratio:命中率</li>
<li>inserts: 插入数量</li>
<li>evictions:剔除数量</li>
</ol>

##缓存配置solrconfig.xml
###filterCache 缓存
filterCache：当搜索请求参数中带有参数"ids"时，Solr会去filterCache里查，filterCache里Key是query,值是DocSet，，也就是无序的Document id，如果有多个ids里包含多个id，则用分隔符“,”分开。如果filterCache中没有对应的值，则通过reader都查找对应的DocSet，并添加到filterCache缓存中。
<pre id="wiki">
 &lt;filterCache class="solr.FastLRUCache"
      size="10240"
      initialSize="8092"
      autowarmCount="4096"/&gt;
</pre>

###queryResultCache 缓存
如果搜索请求参数没有ids参数时，则会不去filterCache缓存里找，而且没有Filter时，才是去queryResultCache里查找，queryResultCache里保存的是有序的DocList。在查到docList后，回去取docSet，即会在filterCache中查，没有的话会加到filterCache中，如果queryResultCache缓存中没有值，也先去取docSet，即通过filterCache，没有对应的值的话，则重新构建，添加到缓存中，则通过一般的查找方式找到。然后添加到queryResultCache缓存中。
<pre id="wiki">
&lt;queryResultCache class="solr.LRUCache"
      size="1024"
      initialSize="1024"
      autowarmCount="512"/&gt;
</pre>

###documentCache 缓存
documentCache 是在通过doc（int i） 方法取document时，用到的。
documentCache 不存在的话，这通过reader去取，取到document后，添加到documentCache 缓存。
<pre id="wiki">
&lt;documentCache class="solr.LRUCache"
      size="10240"
      initialSize="8092"
      autowarmCount="4096"/&gt;
</pre>

###fieldValueCache 缓存
fieldValueCache 缓存是在solr组件FacetComponent组件里发货作用的。条件是如果要统计的Field是multiValued，也就是有多个值的情况，solr 会根据field创建一个field反正类UnInvertedField，通过注解大概了解是节约内存和加速facet统计。
<pre id="wiki">
&lt;fieldValueCache class="solr.FastLRUCache"
      size="512"
      autowarmCount="128"
      showItems="32" /&gt;
</pre>

###httpCache  缓存
Solr httpCache 主要是用来判断当前的搜索请求request的请求头header的If-Modified-Since和If-None-Match的两个值。
