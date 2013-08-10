--- 
layout: post
title: Solr 4.1 特性-存储字段压缩
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
UUID: 20130131002700
date: 2013-01-31 00:27:00
---

尽管Lucene和Solr在4.0版本包含大量的新特性以及性能的提升，今天来看看Solr 4.1版本的变化。当我们使用更多的field存储，索引的大小问题是我们考虑优化的因素，4.1版本的这些变化将被存储领域的压缩，以减少索引大小。让我们来看看，看看它是如何工作的。

###补充些理论
如果我们的索引中包含的许多存储领域，相比其他索引中的信息时，可以消耗大部分空间。如何知道存储领域采取多大的空间？它很容易 - 只要去握着你的索引的目录和检查。FDT扩展名的文件需要多大的空间。尽管事实上，存储领域不直接影响搜索性能，I / O子系统和它的缓存可以被强制工作更难，因为大量的磁盘上的数据。正因为如此，你的查询执行长，您可能需要更多的时间来索引你的数据。

在Lucene4.1版本中，存储字段将引入<a href="http://code.google.com/p/lz4/" alt="LZ4算法" target="_bank">LZ4算法</a>，当我们使用高数目的存储字段,应降低的大小的指数，但也不宜CPU的要求来压缩和解压。

###Test Data
对于所讨论的功能测试中，我们已经使用了波兰语维基百科的文章的数据，从2012年11月10号（<a href="http://dumps.wikimedia.org/plwiki/20121110/plwiki-20121110-pages-articles.xml.bz2" alt="维基百科数据" target="_bank">http://dumps.wikimedia.org/plwiki/20121110/plwiki-20121110-pages-articles.xml.bz2</a>）。解压缩后的XML文件是约4.7GB磁盘上的。

###Index structure
我们已经使用了下面的索引结构，索引上面的数据：
<pre id="xml">
&lt;field name="id" type="string"  indexed="true" stored="true" required="true"/&gt;
&lt;field name="title" type="text" indexed="true" stored="true"/&gt;
&lt;field name="revision" type="int" indexed="true" stored="true"/&gt;
&lt;field name="user" type="string" indexed="true" stored="true"/&gt;
&lt;field name="userId" type="int" indexed="true" stored="true"/&gt;
&lt;field name="text" type="text" indexed="true" stored="true"/&gt;
&lt;field name="timestamp" type="date" indexed="true" stored="true"/&gt;
&lt;field name="_version_" type="long" indexed="true" stored="true"/&gt;
</pre>

###DIH configuration
我们用下面的DIH配置，以指数维基百科的数据：
<pre id="xml">
&lt;dataConfig&gt;
&lt;dataSource type="FileDataSource" encoding="UTF-8" /&gt;
&lt;document&gt;
&lt;entity name="page" processor="XPathEntityProcessor" stream="true" forEach="/mediawiki/page/" url="/home/data/wikipedia/plwiki-20121110-pages-articles.xml" transformer="RegexTransformer,DateFormatTransformer"&gt;
&lt;field column="id" xpath="/mediawiki/page/id" /&gt;
&lt;field column="title" xpath="/mediawiki/page/title" /&gt;
&lt;field column="revision" xpath="/mediawiki/page/revision/id" /&gt;
&lt;field column="user" xpath="/mediawiki/page/revision/contributor/username" /&gt;
&lt;field column="userId" xpath="/mediawiki/page/revision/contributor/id" /&gt;
&lt;field column="text" xpath="/mediawiki/page/revision/text" /&gt;
&lt;field column="timestamp" xpath="/mediawiki/page/revision/timestamp" dateTimeFormat="yyyy-MM-dd'T'hh:mm:ss'Z'" /&gt;
&lt;field column="$skipDoc" regex="^#REDIRECT .*" replaceWith="true" sourceColName="text"/&gt;
&lt;/entity&gt;
&lt;/document&gt;
&lt;/dataConfig&gt;
</pre>

###Indexing time
在这两种情况下，索引的时间是非常类似的，对于相同量的文件（索引文件后有1.301.394）。在<strong>Solr的4.0索引了14分33秒</strong>。在<strong>Solr的4.1索引的情况下，花了14分43秒</strong>。正如你可以看到Solr的4.1稍微慢一些，但在我的笔记本电脑，因为我做了测试，我们可以假设索引的性能是非常相似的。

###Index size
在Solr的4.0的情况下创建的索引与维基百科的数据索引大小约为<strong>5.1GB - 5.464.809.863bytes</strong>。在Solr的4.1的情况下，索引大小<strong>3.24GB - 3.480.457.399bytes</strong>。因此，当比较指数由Solr的4.0创建一个Solr的4.1，我们得到了<strong>约35％</strong>更小的索引。

###总结
你可以清楚地看到，压缩存储领域的增益是相当大的。尽管事实是，我们需要额外的CPU周期压缩处理，我们受益于较少的I/O子系统的压力，我们可以肯定的收益将大于损失一些CPU周期。
Lucene4.1及更高版本的压缩存储领域默认打开情况下。但是，现在如果你想关闭该行为，你需要实现自己的编解码器 - 一个不使用压缩。但是你做到这一点，再次显示了强大的，灵活的索引是不需要修改Lucene的代码。

