--- 
layout: post
title: Solr 4.2 正式发布
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
UUID: 20130313001027
date: 2013-03-13 00:10:27
images: ["/assets/images/solr/solr-logo.jpg"]
---

<a href="{{site.static_url}}/assets/images/solr/solr-logo.jpg" alt="python" target="_bank">
<img src="{{site.static_url}}/assets/images/solr/solr-logo.jpg" alt="solr" width="380px" class="img-center"/>
</a>

 　　Apache Solr是流行的，速度极快，开源的NoSQL的搜索平台，来自于Apache Lucene项目。它的主要功能包括强大的全文搜索，命中高亮显示、面搜索、动态集群、数据库集成、丰富的文档和地理信息搜索。Solr是高度可扩展的、 提供了分布式搜索和索引的容错功能，强大的搜索和导航功能等。

###Lucene/Solr 4.2 主要更新功能
<ol>
<li>包含了一个新的默认编解码器（Lucene42Codec），带来了更高效的docvalues格式和更小的term vectors</li>
<li>简化了doc值外部、codec API及其实现。</li>
<li>重构了facet模块，显著增强了性能，某些case下性能可提升3.8倍。
facet模块中的DrillDownQuery现在支持多选</li>
<li>一个新的DrillSideways类，可以计算facet标签数，以及单次查询中的命中数和几乎发生的失误数。</li>
<li>一个新的docvalues类型SORTED_SET，支持多个值。</li>
<li>一个新的classification模块</li>
<li>自定义节点名称SolrCloud部署</li>
</ol>

<strong>详细信息:</strong><a href="http://wiki.apache.org/lucene-java/ReleaseNote42#referrer=solr.pl" target="_bank" alt="solr-4.2 changes">Apache Solr 4.2 Changelog </a>

###下载地址
<a href="http://lucene.apache.org/solr/" target="_bank" alt="Solr4.2">
<img src="{{site.static_url}}/media/demi/img/download.gif" alt="download-icon" />
</a>


