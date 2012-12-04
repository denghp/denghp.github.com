---
layout: post
title: Solr 使用Tomcat报OutOfMemoryError
tags: 
- solr
- lucene
- 研发实践
categories:
- 研发实践
- solr 
UUID: 201212031130
date: 2012-12-03
---

上一篇文章讲了Solr缓存配置，这里将分析一个solr的环境设置的误区问题。
###异常信息
<pre id="java">
Nov 30, 2012 7:12:23 PM org.apache.solr.common.SolrException log
SEVERE: null:java.lang.OutOfMemoryError: Java heap space
  at org.apache.solr.search.DocSetCollector.<init>(DocSetCollector.java:47)
  at org.apache.solr.search.SolrIndexSearcher.getDocSetNC(SolrIndexSearcher.java:987)
  at org.apache.solr.search.SolrIndexSearcher.getPositiveDocSet(SolrIndexSearcher.java:719)
  at org.apache.solr.search.SolrIndexSearcher.getProcessedFilter(SolrIndexSearcher.java:836)
  at org.apache.solr.search.SolrIndexSearcher.getDocListAndSetNC(SolrIndexSearcher.java:1428)
  at org.apache.solr.search.SolrIndexSearcher.getDocListC(SolrIndexSearcher.java:1256)
  at org.apache.solr.search.SolrIndexSearcher.search(SolrIndexSearcher.java:390)
  at org.apache.solr.handler.component.QueryComponent.process(QueryComponent.java:411)
  at org.apache.solr.handler.component.SearchHandler.handleRequestBody(SearchHandler.java:206)
  at org.apache.solr.handler.RequestHandlerBase.handleRequest(RequestHandlerBase.java:129)
  at org.apache.solr.core.SolrCore.execute(SolrCore.java:1699)
  at org.apache.solr.servlet.SolrDispatchFilter.execute(SolrDispatchFilter.java:455)
  at org.apache.solr.servlet.SolrDispatchFilter.doFilter(SolrDispatchFilter.java:276)
  at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:243)
  at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:210)
  at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:224)
  at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:169)
  at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:168)
  at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:98)
  at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:118)
  at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:407)
  at org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:987)
  at org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:539)
  at org.apache.tomcat.util.net.JIoEndpoint$SocketProcessor.run(JIoEndpoint.java:298)
  at java.util.concurrent.ThreadPoolExecutor$Worker.runTask(ThreadPoolExecutor.java:886)
  at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:908)
  at java.lang.Thread.run(Thread.java:662)

Nov 30, 2012 7:12:23 PM org.apache.solr.common.SolrException log
SEVERE: null:java.lang.RuntimeException: java.lang.OutOfMemoryError: GC overhead limit exceeded
  at org.apache.solr.servlet.SolrDispatchFilter.sendError(SolrDispatchFilter.java:469)
  at org.apache.solr.servlet.SolrDispatchFilter.doFilter(SolrDispatchFilter.java:297)
  at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:243)
  at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:210)
  at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:224)
  at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:169)
  at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:168)
  at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:98)
  at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:118)
  at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:407)
  at org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:987)
  at org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:539)
  at org.apache.tomcat.util.net.JIoEndpoint$SocketProcessor.run(JIoEndpoint.java:300)
  at java.util.concurrent.ThreadPoolExecutor$Worker.runTask(ThreadPoolExecutor.java:886)
  at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:908)
  at java.lang.Thread.run(Thread.java:662)
Caused by: java.lang.OutOfMemoryError: GC overhead limit exceeded
  at java.util.AbstractList.listIterator(AbstractList.java:315)
  at java.util.AbstractList.listIterator(AbstractList.java:284)
  at java.util.AbstractList.equals(AbstractList.java:502)
  at org.apache.lucene.search.BooleanQuery.equals(BooleanQuery.java:516)
  at java.util.concurrent.ConcurrentHashMap$Segment.get(ConcurrentHashMap.java:338)
  at java.util.concurrent.ConcurrentHashMap.get(ConcurrentHashMap.java:769)
  at org.apache.solr.util.ConcurrentLRUCache.get(ConcurrentLRUCache.java:89)
  at org.apache.solr.search.FastLRUCache.get(FastLRUCache.java:125)
  at org.apache.solr.search.SolrIndexSearcher.getPositiveDocSet(SolrIndexSearcher.java:716)
  at org.apache.solr.search.SolrIndexSearcher.getProcessedFilter(SolrIndexSearcher.java:836)
  at org.apache.solr.search.SolrIndexSearcher.getDocListAndSetNC(SolrIndexSearcher.java:1428)
  at org.apache.solr.search.SolrIndexSearcher.getDocListC(SolrIndexSearcher.java:1256)
  at org.apache.solr.search.SolrIndexSearcher.search(SolrIndexSearcher.java:390)
  at org.apache.solr.handler.component.QueryComponent.process(QueryComponent.java:411)
  at org.apache.solr.handler.component.SearchHandler.handleRequestBody(SearchHandler.java:206)
  at org.apache.solr.handler.RequestHandlerBase.handleRequest(RequestHandlerBase.java:129)
  at org.apache.solr.core.SolrCore.execute(SolrCore.java:1699)
  at org.apache.solr.servlet.SolrDispatchFilter.execute(SolrDispatchFilter.java:455)
  at org.apache.solr.servlet.SolrDispatchFilter.doFilter(SolrDispatchFilter.java:276)
  at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:243)
  at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:210)
  at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:224)
  at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:169)
  at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:168)
  at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:98)
  at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:118)
  at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:407)
  at org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:987)
  at org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:539)
  at org.apache.tomcat.util.net.JIoEndpoint$SocketProcessor.run(JIoEndpoint.java:300)
  at java.util.concurrent.ThreadPoolExecutor$Worker.runTask(ThreadPoolExecutor.java:886)
  at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:908)
Nov 30, 2012 7:12:25 PM org.apache.solr.common.SolrException log
SEVERE: null:java.lang.RuntimeException: java.lang.OutOfMemoryError: GC overhead limit exceeded
  at org.apache.solr.servlet.SolrDispatchFilter.sendError(SolrDispatchFilter.java:469)
  at org.apache.solr.servlet.SolrDispatchFilter.doFilter(SolrDispatchFilter.java:297)
  at org.apache.catalina.core.ApplicationFilterChain.internalDoFilter(ApplicationFilterChain.java:243)
  at org.apache.catalina.core.ApplicationFilterChain.doFilter(ApplicationFilterChain.java:210)
  at org.apache.catalina.core.StandardWrapperValve.invoke(StandardWrapperValve.java:224)
  at org.apache.catalina.core.StandardContextValve.invoke(StandardContextValve.java:169)
  at org.apache.catalina.core.StandardHostValve.invoke(StandardHostValve.java:168)
  at org.apache.catalina.valves.ErrorReportValve.invoke(ErrorReportValve.java:98)
  at org.apache.catalina.core.StandardEngineValve.invoke(StandardEngineValve.java:118)
  at org.apache.catalina.connector.CoyoteAdapter.service(CoyoteAdapter.java:407)
  at org.apache.coyote.http11.AbstractHttp11Processor.process(AbstractHttp11Processor.java:987)
  at org.apache.coyote.AbstractProtocol$AbstractConnectionHandler.process(AbstractProtocol.java:539)
  at org.apache.tomcat.util.net.JIoEndpoint$SocketProcessor.run(JIoEndpoint.java:300)
  at java.util.concurrent.ThreadPoolExecutor$Worker.runTask(ThreadPoolExecutor.java:886)
  at java.util.concurrent.ThreadPoolExecutor$Worker.run(ThreadPoolExecutor.java:908)
  at java.lang.Thread.run(Thread.java:662)
Caused by: java.lang.OutOfMemoryError: GC overhead limit exceeded
  at org.wltea.analyzer.dic.DictSegment.match(DictSegment.java:105)
  at org.wltea.analyzer.dic.DictSegment.match(DictSegment.java:80)
  at org.wltea.analyzer.dic.Dictionary.matchInKeywordDict(Dictionary.java:545)
  at org.wltea.analyzer.seg.KeywordSegmenter.nextLexeme(KeywordSegmenter.java:87)
  at org.wltea.analyzer.IKSegmentation.next(IKSegmentation.java:87)
  at org.wltea.analyzer.lucene.IKTokenizer.incrementToken(IKTokenizer.java:49)
  at org.apache.lucene.analysis.synonym.SynonymFilter.parse(SynonymFilter.java:358)
  at org.apache.lucene.analysis.synonym.SynonymFilter.incrementToken(SynonymFilter.java:624)
  at org.apache.lucene.analysis.util.FilteringTokenFilter.incrementToken(FilteringTokenFilter.java:50)
  at org.apache.lucene.analysis.core.LowerCaseFilter.incrementToken(LowerCaseFilter.java:54)
  at org.apache.lucene.analysis.miscellaneous.RemoveDuplicatesTokenFilter.incrementToken(RemoveDuplicatesTokenFilter.java:54)
  at org.apache.lucene.analysis.CachingTokenFilter.fillCache(CachingTokenFilter.java:90)
  at org.apache.lucene.analysis.CachingTokenFilter.incrementToken(CachingTokenFilter.java:55)
  at org.apache.lucene.queryparser.classic.QueryParserBase.newFieldQuery(QueryParserBase.java:513)
  at org.apache.lucene.queryparser.classic.QueryParserBase.getFieldQuery(QueryParserBase.java:474)
  at org.apache.solr.search.SolrQueryParser.getFieldQuery(SolrQueryParser.java:169)
  at org.apache.lucene.queryparser.classic.QueryParserBase.handleBareTokenQuery(QueryParserBase.java:1068)
  at org.apache.lucene.queryparser.classic.QueryParser.Term(QueryParser.java:358)
  at org.apache.lucene.queryparser.classic.QueryParser.Clause(QueryParser.java:257)
  at org.apache.lucene.queryparser.classic.QueryParser.Query(QueryParser.java:181)
  at org.apache.lucene.queryparser.classic.QueryParser.Clause(QueryParser.java:261)
  at org.apache.lucene.queryparser.classic.QueryParser.Query(QueryParser.java:212)
  at org.apache.lucene.queryparser.classic.QueryParser.Clause(QueryParser.java:261)
  at org.apache.lucene.queryparser.classic.QueryParser.Query(QueryParser.java:181)
  at org.apache.lucene.queryparser.classic.QueryParser.TopLevelQuery(QueryParser.java:170)
  at org.apache.lucene.queryparser.classic.QueryParserBase.parse(QueryParserBase.java:120)
  at org.apache.solr.search.LuceneQParser.parse(LuceneQParserPlugin.java:72)
  at org.apache.solr.search.QParser.getQuery(QParser.java:143)
  at org.apache.solr.search.FunctionQParser.parseNestedQuery(FunctionQParser.java:238)
  at org.apache.solr.search.ValueSourceParser$19.parse(ValueSourceParser.java:270)
  at org.apache.solr.search.FunctionQParser.parseValueSource(FunctionQParser.java:354)
  at org.apache.solr.search.FunctionQParser.parseValueSourceList(FunctionQParser.java:215)
</pre>
###分析原因
1、首先报异常信息为Java heap space JVM堆内存空间不够。
2、OutOfMemoryError: GC overhead limit exceeded异常出现原因是堆太小。导致异常。
3、从堆,栈异常信息来看：在search调用FastLRUCache过程中堆内存不够，导致如上异常

###查看filterCache 缓存配置
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
###JVM参数配置
<pre id="bash">
JAVA_OPTS="-Xms4096m -Xmx4096m $JAVA_OPTS"
</pre>

###解决方案
1、检查代码是否有使用大内存的代码
2、可以添加JVM的启动参数来限制使用内存：-XX:-UseGCOverheadLimit，但是这不能解决问题的根本。
3、调整JVM -Xms及-Xmx的参数大小
4、调整solr cache的配置

####调整solr cache的配置参数
我这里是采用减少FastLRUCache的配置
<pre id="wiki">
 &lt;filterCache class="solr.FastLRUCache"
      size="2048"
      initialSize="2048"
      autowarmCount="512"/&gt;
</pre>

####压力测试 
CASE-1: 
20个线程，每分钟5000次请求,使用jconsole监控，Heap Memory Usage
<img href="/media/pub/solr/solr-cache-loader.jpg" width="580px" />
CASE-2:
solr cache参数关闭压力测试,20个线程，每分钟5000次请求,使用jconsole监控,从jconsole中查看是Heap Memory Usage 使用一样的低.

