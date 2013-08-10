---
layout: post
title: Solr4.0配置IKAnalyzer
tags: 
- solr
- lucene
- 搜索引擎
categories:
- code
- solr
- search
- archives
UUID: 201011252230
date: 2010-11-25
---

IK Analyzer是一个开源的，基于java语言开发的轻量级的中文分词工具包。从2006年12月推出1.0版开始， IKAnalyzer已经推出了4个大版本。最初，它是以开源项目Luence为应用主体的，结合词典分词和文法分析算法的中文分词组件。从3.0版本开始，IK发展为面向Java的公用分词组件，独立于Lucene项目，同时提供了对Lucene的默认优化实现。在2012版本中，IK实现了简单的分词歧义排除算法，标志着IK分词器从单纯的词典分词向模拟语义分词衍化。

###IK Analyzer 2012特性
1.采用了特有的“正向迭代最细粒度切分算法“，支持细粒度和智能分词两种切分模式；

2.在系统环境：Core2 i7 3.4G双核，4G内存，window 7 64位， Sun JDK 1.6_29 64位 普通pc环境测试，IK2012具有160万字/秒（3000KB/S）的高速处理能力。

3.2012版本的智能分词模式支持简单的分词排歧义处理和数量词合并输出。

4.采用了多子处理器分析模式，支持：英文字母、数字、中文词汇等分词处理，兼容韩文、日文字符

5.优化的词典存储，更小的内存占用。支持用户词典扩展定义。特别的，在2012版本，词典支持中文，英文，数字混合词语。

###下载solr & IK 
1、下载solr4.0 <a href="http://www.apache.org/dyn/closer.cgi/lucene/java/4.0.0">http://www.apache.org/dyn/closer.cgi/lucene/java/4.0.0</a>  (注：这里有及时solr的最新版本)

2、下载IKAnalyzer2012_u6.zip <a href="http://code.google.com/p/ik-analyzer/downloads/list">http://code.google.com/p/ik-analyzer/downloads/list</a>(注：这里有IKAnalyzer及时的最新版本，也可附件直接下载)

###schema.xml配置
<pre id="xml">
&lt;fieldType name="text" class="solr.TextField" positionIncrementGap="100"&gt;  
    &lt;analyzer type="index"&gt;  
        &lt;tokenizer class="org.wltea.analyzer.solr.IKTokenizerFactory" 
        isMaxWordLength="false"/&gt;  
        &lt;filter class="solr.SynonymFilterFactory" 
            synonyms="synonyms.txt" 
            ignoreCase="true" 
            expand="true" 
            tokenizerFactory="solr.ChineseTokenizerFactory"/&gt; 
        &lt;filter class="solr.StopFilterFactory" ignoreCase="true" words="stopwords.txt" enablePositionIncrements="true" /&gt;  
        &lt;filter class="solr.WordDelimiterFilterFactory" 
            generateWordParts="1" 
            generateNumberParts="1"   
            catenateWords="1" 
            catenateNumbers="1" 
            catenateAll="0" splitOnCaseChange="0"/&gt;  
        &lt;filter class="solr.LowerCaseFilterFactory"/&gt;  
        &lt;filter class="solr.RemoveDuplicatesTokenFilterFactory"/&gt;
    &lt;/analyzer&gt;  
    &lt;analyzer type="query"&gt;  
        &lt;tokenizer class="org.wltea.analyzer.solr.IKTokenizerFactory"
        isMaxWordLength="true"/&gt;  
        &lt;filter class="solr.SynonymFilterFactory"
            synonyms="synonyms.txt" 
            ignoreCase="true"   
            expand="true" 
            tokenizerFactory="solr.ChineseTokenizerFactory"/&gt;  
        &lt;filter class="solr.StopFilterFactory" 
            ignoreCase="true" 
            words="stopwords.txt" 
            enablePositionIncrements="true"/&gt;  
        &lt;filter class="solr.WordDelimiterFilterFactory" 
            generateWordParts="1" 
            generateNumberParts="1"  
            catenateWords="0" 
            catenateNumbers="0" 
            catenateAll="0" 
            splitOnCaseChange="1"/&gt;  
        &lt;filter class="solr.LowerCaseFilterFactory"/&gt;  
        &lt;filter class="solr.RemoveDuplicatesTokenFilterFactory"/&gt;  
    &lt;/analyzer&gt;  
&lt;/fieldType&gt;
</pre>

###jar包加入solr的WEB-INF/lib下
将它打包放入solr.war中同时还有IK的jar包。如果你不想打包，请去附件下载已经打好的包。或者直接放IK的jar包与所打的包放入apache-tomcat-xxx\webapps\solr\WEB-INF\lib下

###IK配置文件
IKAnalyzer的jar包中默认是带有IKAnalyzer.cfg.xml的配置文件的，如果想覆盖自带的配置文件，则需要在solr的WEB-INF目录中创建classes目录，将自定义的IKAnalyzer.cfg.xml拷贝到下面即可。


