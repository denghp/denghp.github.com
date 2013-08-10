--- 
layout: post
title: Solr3.x与SolrCloud的区别
tags: 
- solr
- lucene
- 搜索引擎
- 研发实践
categories:
- code
- search
- solr
- archives
UUID: 20130323001027
date: 2013-03-23 00:10:22
---

###在Solr3.x中，Solr的功能：
<ol>
<li>索引和其他的所有改动被复制到其他的solr实例.</li>
<li>在分布式搜索,查询发送到多个solr实例，然后把每个实例的结果组合成一个输出结果.</li>
<li>添加documents的可用性必须在solr commit之后才可用,这需要花费昂贵的时间，无法达到非常实时.</li>
<li>Sharding的工作必须使用手动完成，通常是通过SolrJ或类似的工具，并且没有分布式索引，如果想要实现分布式索引，必须根据你的shard模式来实现.</li>
<li>Replication 必须手动配置,可以减缓访问最新的内容，因为系统服务需要等待commit和触发replication来完成.</li>
<li>故障恢复可能导致索引损坏,并很难恢复建立索引的过程。</li>
</ol>

###SolrCloud的分布式功能
<ol>
<li>SolrCloud自动索引更新分发到相应的碎片，分布搜索分布在多个shards,和在shard上分配可用的replicas</li>
<li>近实时搜索的支持</li>
<li>索引自动访问你的sharding schema</li>
<li>自动replication实现备份目的</li>
<li>强大的恢复功能，并且是自动实现.</li>
<li>使用zookeeper来管理solr的集群状态.</li>
</ol>
