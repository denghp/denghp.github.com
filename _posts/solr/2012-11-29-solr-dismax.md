---
layout: post
title: Solr Dismax查询解析器
tags: 
- solr
- lucene
- 搜索引擎
- Dismax
categories:
- code
- solr 
UUID: 201211291350
date: 2012-11-29
---

Solr 支持多种查询解析，给搜索引擎开发人员提供灵活的查询解析。Solr 中主要包含这几个查询解析器：标准查询解析器、DisMax 查询解析器，扩展 DisMax 查询解析器（eDisMax）

###Dismax
Dismax handler比standard handler多如下功能：
<ol>
<li>以不同的权值来搜索多个field。 </li>
<li>限制查询语法为一个小的集合并且用无语法错误。该特性是强制的并是不可配置的 </li>
<li>整个搜索查询的自动的短语boosting </li>
<li>便利的查询boosting参数，通常同函数查询一块使用 </li>
<li>能指定单词匹配的最少个数，这取决于查询串中的单词数.</li>
</ol>

###Dismax query parser
这里提到的所有应用于dismax的也都适用于edismax，除非明确说明不适用。其实edismax就是打算在未来的发布版本中替代dismax的。

###Lucene DisjunctionMaxQuery
dismax可以查询多个field，并且每个field使用不同的boost。这个功能是由lucene的DisjunctionMaxQuery查询类型来支持。以下的讨论都是高级内容，不用刻意理解。只是记住dismax针对多个字段的查询会设置tie参数为0.1，这也是合理的选择。

举个例子。如果有一个简单查询rock。dismax可能会将它配置为DisjunctionMaxQuery为fieldA:rock^2 fieldB:rock^1.2 fieldC:rock^0.5,如果是boolean查询的话会跟这个查询有些不同，不同的地方也就是得分。类似的boolean查询的得分会基于这三个条文的总和，也就是DisjunctionMaxQuery会使用每一个的最大值。针对多个字段查询同一个term的情况，并且有些字段相对于另一些字段更重要，那么dismax应该更好的处理得分。API文档中的一个例子对这个特征的解释是，如果用户查询albino elephant，那么假如有一种情况是albino匹配一个字段，elephant匹配另一个字段，另一种情况是albino匹配两个字段，但是elephant没有一个匹配，那么dismax保证第一种情况的得分高于第二种情况。
另一个dismax得分的难题就是tie参数，tie的取值是0-1，默认是0，在实践中设置为0.1效果最好。

###Boosting:Automatic phrase boosting
dismax会把phrase查询也就是引号引起来的查询进行转换，来改进得分。例如查询billy joel 会转换为+(billy joel) "billy joel"也就是说，如果一个文档包含billy joel，那么它不仅匹配原始term而且还匹配billy和joel，也就是匹配三个term，如果另一个文档不匹配短语billy joel，只是含有两个单词，那么lucene的得分算法会给第一个文档更高的得分。

###Configuring automatic phrase boosting
automatic phrase boosting默认是不启用的。要使用的话可以使用pf参数，就是phrase fields的缩写。语法与qf相同。用相同的值作为开始并做相应的调整，从qf到pf变化通常的原因有以下几点：
<ol>
<li>使用不同的boost因素让短语增强的影响没有压倒性。一些经验可以来引导你做这些调整。</li>
<li>忽略那些只有一个term的字段。比如唯一标识字段。</li>
<li>忽略那些含有太大的文本值的字段，因为它可能全使查询效率大大降低。</li>
<li>使用一个具体相同值，但是使用不同analyzed的字段来替换这个字段</li>
</ol>
同样的强烈推荐使用common-grams和shingling来提高执行效率。

###Phrase slop configuration
phrase slop就是短语后跟一个波浪线和一个数字，就像这样"billy joel"~1
对于所有明确指定的短语查询dismax会自动添加两个参数来设置slop：qs和phrase boosting：ps，如果slop没有指定那么就相当于是0。
<str name="qs">1</str><str name="ps">0</str>

###Partial phrase boosting
如果查询的是两个单词，那么edismax支持增强为连续的单词对，如果是三个单词，那么可以增强三倍。例如查询how now brown cow
会变为：
+(how now brown cow) "how now brown cow" "how now" "now brown" "brown cow" "how now brown" "now brown cow"
这个特征不会被ps参数影响，ps只应用于entire phrase boost。

###Boosting：boost queries
dismax的bq参数可以用来指定多个查询，类似于automatic phrase boost。以类似的方式被添加到用户的查询中。记住一点，boosting只是用来影响q参数指定的用户查询所匹配到的那些文档的scoring。如果匹配的结果还匹配bq查询，那么这个文档的得分会更高。
(*:* -r_type:aaa)^2增强所有文档得分，但是除了aaa。
boost queries不如boost functions有用。

###Boosting：boost functions
boost functions提供一个强大的功能就是使用用户设置的公式来对文档的score进行计算。这里所说的公式也就是solr的function queries，使用bf参数来操作score。edismax支持boost参数来进行function query。可以使用bf或boost多次。
<pre id="wiki">
&lt;str name="boost"&gt;recip(map(rord(r_event_date),0,0,99000),1,95000,95000)&lt;/str&gt;
</pre>
函数中不能有空格。bf和boost两个参数其实并没有以相同的方式解析。bf参数允许多种boost functions使用相同的参数，以空格分开，二者选一的话还是使用bf参数。还可以在bf参数中乘以因子在函数的结尾。比如^100
