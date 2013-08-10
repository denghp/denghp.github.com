--- 
layout: post
title: Solr 4.1 正式发布
tags: 
- solr
- lucene
- 搜索引擎
- 研发实践
categories:
- code
- solr
- search
- archives
UUID: 201301231027
date: 2013-01-23 12:27:22
images: ["/assets/images/solr/solr-logo.jpg"]
---

<a href="{{site.static_url}}/assets/images/solr/solr-logo.jpg" alt="python" target="_bank">
<img src="{{site.static_url}}/assets/images/solr/solr-logo.jpg" alt="solr" width="380px" class="img-center"/>
</a>

 　　Apache Solr是流行的，速度极快，开源的NoSQL的搜索平台，来自于Apache Lucene项目。它的主要功能包括强大的全文搜索，命中高亮显示、面搜索、动态集群、数据库集成、丰富的文档和地理信息搜索。Solr是高度可扩展的、 提供了分布式搜索和索引的容错功能，强大的搜索和导航功能等。

###主要组件的版本
<ol>
<li>Apache Tika 1.2</li>
<li>Carrot2 3.6.2</li>
<li>Velocity 1.7 and Velocity Tools 2.0</li>
<li>Apache UIMA 2.3.1</li>
<li>Apache ZooKeeper 3.4.5</li>
</ol>

###新增加的功能
<ol>
<li>Solr的大部分功能，包括复制，实现自定义目录和DirectoryFactory实现</li>
<li>索引的长期偏移，可指定通过"storeOffsetsWithPositions"标志字段定义的架构</li>
<li>solr的QParsers可能现在可以直接调用Lucene的查询语法,通过localParams和_query_,例如:foo AND &#123;!term f=myfield v=$qq&#125;</li>
<li>Solr的解析请求参数（URL或发送POST使用内容类型application/x-www的形式,进行了urlencoded,不再依赖于容器的特殊配置</li>
<li>Directory IO速率限制的基础上的IO方面</li>
<li>分布式搜索为MoreLikeThis的支持</li>
<li>Multi-core: On-demand core loading and LRU-based core unloading afterreaching a user-specified maximum number</li>
<li>The new Solr 4 spatial fields now work with the {!geofilt} and {!bbox}query parsers. The score local-param works too.</li>
<li>Extra statistics to RequestHandlers - 5 & 15-minute reqs/sec rolling averages; median, 75th, 95th, 99th, 99.9th percentile request times.</li>
<li>Configurable Content-Type headers for PHPResponseWriters and PHPSerializedResponseWriter</li>
<li>PostingsHighlighter支持</li>
</ol>

更多详细:<a href="http://lucene.apache.org/solr/4_1_0/changes/Changes.html" alt="solr 4.1.0" target="_bank">http://lucene.apache.org/solr/4_1_0/changes/Changes.html</a>
