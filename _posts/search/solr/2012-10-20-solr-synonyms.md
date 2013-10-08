---
layout: post
title: Solr 同义词搜索 synonyms
tags: 
- solr
- lucene
- 同义词
- 搜索引擎
categories:
- code
- solr
- search
- archives
UUID: 20121020202012
date: 2012-11-20
---

Solr同义词搜索是一个很好的功能实现，解决了产品需求中很大的问题，如：搜索用户搜索"刮胡刀" 更好的展示结果是把 "刮胡刀"跟"剃须刀"都显示给用户，这样就可以达到更好的效果。下面讲下具体实现:
solr.SynonymFilterFactory
###Creates SynonymFilter
Matches strings of tokens and replaces them with other strings of tokens.
<ol>
<li>The synonyms parameter names an external file defining the synonyms.</li>
<li>If ignoreCase is true, matching will lowercase before checking equality.</li>
<li>If expand is true, a synonym will be expanded to all equivalent synonyms. If it is false, all equivalent synonyms will be reduced to the first in the list.</li>
<li>The optional tokenizerFactory parameter names a tokenizer factory class to analyze synonyms (see https://issues.apache.org/jira/browse/SOLR-319 ), which can help with the synonym+stemming problem described in http://search-lucene.com/m/hg9ri2mDvGk1 .</li>
</ol>

###schema.xml配置
<pre id="xml">
&lt;fieldType name="text" class="solr.TextField" positionIncrementGap="100"&gt;  
    &lt;analyzer type="index"&gt;  
        &lt;tokenizer class="solr.ChineseTokenizerFactory"/&gt;  
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
        &lt;tokenizer class="solr.ChineseTokenizerFactory"/&gt;  
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

###synonyms.txt配置
<pre>
# blank lines and lines starting with pound are comments.  
#Explicit mappings match any token sequence on the LHS of "=>"
#and replace with all alternatives on the RHS.  These types of mappings  
#ignore the expand parameter in the schema.  
#Examples:  
#-----------------------------------------------------------------------  
#some test synonym mappings unlikely to appear in real input text  
aaafoo => aaabar  
bbbfoo => bbbfoo bbbbar  
cccfoo => cccbar cccbaz  
fooaaa,baraaa,bazaaa  

# Some synonym groups specific to this example  
GB,gib,gigabyte,gigabytes  
MB,mib,megabyte,megabytes  
Television, Televisions, TV, TVs   
#notice we use "gib" instead of "GiB" so any WordDelimiterFilter coming  
#after us won't split it into two words.  
飞利浦刮胡刀,飞利浦剃须刀  

# Synonym mappings can be used for spelling correction too  
pixima => pixma  

a\,a => b\,b  
</pre>

