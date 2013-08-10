---
layout: post
title: Solr集群Replication配置与实践
tags: 
- solr
- lucene
- 搜索引擎
- apache
categories:
- code
- solr
- search
- archives
UUID: 201211252230
date: 2012-11-25
---

Solr作为一个搜索服务器，在并发搜索请求的场景下，可能一台服务器很容易就垮掉，这是我们可以通过使用集群技术，设置多台Solr搜索服务器同时对外提供搜索服务，在前端使用类似Nginx的负载均衡软件，可以通过配置使得并发到达的搜索请求均匀地反向代理到Solr集群中的每一台服务器上，这样每台Solr搜索服务器搜索请求的压力可以大大减小，增强了每台服务器能够持续提供服务器的能力。

*然而，这时我们面临的问题有：*
<ol>
<li>集群中的每台服务器在线上要保证索引数据都能很好地的同步，使得每台搜索服务器的索引数据在一定可以承受的程度上保持一致性；
</li>
<li>集群中某台服务器宕机离线，人工干预重启后继续与集群中其它服务器索引数据保持一致，继续提供搜索服务；
</li>
<li>集群中某台服务器的索引数据，由于硬盘故障或人为原因无法提供搜索服务，需要一种数据恢复机制；
</li>
<li>集群中最先接受数据更新的Master服务器，在将索引更新传播到Slave服务器上时，避免多台Slave服务器同一时间占用大量网络带宽，从而影响了Master提供搜索服务。
</li>
</ol>

事实上，Solr框架在上面的几个方面都能做到不错的支持，具有很大的灵活性。基于上述的几个问题，我们来配置Solr集群的Replication，并实践集群复制的功能。

###结构图
<img src="/assets/images/solr/solr-replication.jpg"></img>

### 配置
ReplicationHandler是个RequestHandler，如果需要使用它，也就是在solrconfig.xml中配置它，下面介绍ReplicationHandler的配置参数。

#### master
master的配置示例如下：
<pre id="wiki">
&lt;requestHandler name="/replication" class="solr.ReplicationHandler" &gt;
  &lt;lst name="master"&gt;
    &lt;str name="replicateAfter"&gt;startup&lt;/str&gt;
    &lt;str name="replicateAfter"&gt;commit&lt;/str&gt;
    &lt;str name="confFiles"&gt;schema.xml,stopwords.txt&lt;/str&gt;
  &lt;/lst&gt;
&lt;/requestHandler&gt;
</pre>
*说明：*

1.  replicateAfter可取startup、commit、optimize，表示触发复制的时机。使用中，这三个值都可以配上。
2.  confFiles表示在复制时需要将配置文件复制到slave的文件列表。


#### slave
Slave的配置示例如下：

<pre id="wiki">
&lt;requestHandler name="/replication" class="solr.ReplicationHandler" &gt;
  &lt;lst name="slave"&gt;
     &lt;str name="masterUrl"&gt;http://master_host:port/solr/corename/replication&lt;/str&gt;
     &lt;str name="pollInterval"&gt;00:30:00&lt;/str&gt;
     &lt;str name="httpConnTimeout"&gt;5000&lt;/str&gt;
     &lt;str name="httpReadTimeout"&gt;10000&lt;/str&gt;
  &lt;/lst&gt;
&lt;/requestHandler&gt;
</pre>

*说明：*

上面的参数也不需要太多解释，其中pollInterval参数表明slave从master复制数据的频率。如果对实时性要求不高，通常5-10分钟即可，也避免slave的indexsearcher频繁的切换，同时，master的commit频率也可相对保持一致。

###ReplicationHandler 的 HTTP API
可以通过以下 HTTP 命令来控制 ReplicationHandler 的操作
<pre>
http://master_host:port/solr/replication?command=enablereplication
</pre>
使主服务器的复制可用
<pre>
http://master_host:port/solr/replication?command=disablereplication
</pre>
使主服务器的复制不可用
<pre>
http://host:port/solr/replication?command=indexversion
</pre>
获得主服务器或从服务器最新的索引版本
<pre>
http://slave_host:port/solr/replication?command=fetchindex
</pre>
强制从服务器从主服务器拉取索引，该过程可以传递 &lt;lst name=”slave”&gt; 下的参数，如主服务的url、压缩参数等
<pre>
http://slave_host:port/solr/replication?command=abortfetch
</pre>
让某从服务器不再从主服务器拉取索引
<pre>
http://slave_host:port/solr/replication?command=enablepoll
</pre>
使某从服务器可以从主服务器拉取修改的索引
<pre>
http://slave_host:port/solr/replication?command=details
</pre>
返回配置和当前状态
<pre>
http://host:port/solr/replication?command=filelist&indexversion=&lt;index-version-number&gt;
</pre>
返回指定主机的索引文件列表，可以指定版本号
<pre>
http://master_host:port/solr/replication?command=backup
</pre>
如果有新的commit，将备份索引库，该命令在阶段备份索引时很有用
