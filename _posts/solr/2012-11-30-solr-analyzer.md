---
layout: post
title: Solr 获取分词
tags: 
- solr
- lucene
- 搜索引擎
categories:
- code
- solr 
UUID: 201211302330
date: 2012-11-30
---

Solr1.4有了对字段的分词。FieldAnalysisRequestHandler可以对某个字段或字段类型的分词器对查询串取到分词数据。
用 solr 的默认配置，如 solr 1.4.0。
我用IKAnalyzer为例,在schema.xml的 types 元素内加：
<pre id="wiki">
&lt;fieldType name="text_cn" class="solr.TextField" positionIncrementGap="100"&gt;
  &lt;analyzer&gt;
      &lt;tokenizer class="org.wltea.analyzer.solr.IKTokenizerFactory"/&gt;
      &lt;filter class="solr.StopFilterFactory"  
          ignoreCase="true" words="stopwords.txt"/&gt;
      &lt;filter class="solr.WordDelimiterFilterFactory"  
          generateWordParts="1"  
          generateNumberParts="1"  
          catenateWords="1"  
          catenateNumbers="1"  
          catenateAll="0"  
          splitOnCaseChange="1"/&gt;
      &lt;filter class="solr.LowerCaseFilterFactory"/&gt;
      &lt;filter class="solr.EnglishPorterFilterFactory"  
          protected="protwords.txt"/&gt;
      &lt;filter class="solr.RemoveDuplicatesTokenFilterFactory"/&gt;
  &lt;/analyzer&gt;  
 &lt;/fieldType&gt;
</pre>

###HTTP请求
http://localhost:6091/solr-web-shop/shop/analysis/field?q=北京烤鸭&analysis.fieldtype=text&indent=on&wt=json
<pre>
{
  responseHeader: {
    status: 0,
    QTime: 3
  },
  analysis: {
    field_types: {
      text: {
        query: [
          "org.wltea.analyzer.lucene.IKTokenizer",
          [
            {
              text: "北京烤鸭",
              start: 0,
              end: 4,
              position: 1,
              positionHistory: [
                1
              ],
              type: "word"
            },
            {
              text: "北京烤",
              start: 0,
              end: 3,
              position: 2,
              positionHistory: [
                2
              ],
              type: "word"
            },
            {
              text: "北京",
              start: 0,
              end: 2,
              position: 3,
              positionHistory: [
                3
              ],
              type: "word"
            },
            {
              text: "烤鸭",
              start: 2,
              end: 4,
              position: 4,
              positionHistory: [
                4
              ],
              type: "word"
            }
          ],
          "org.apache.lucene.analysis.synonym.SynonymFilter",[],
          "org.apache.lucene.analysis.StopFilter",[],
          "org.apache.lucene.analysis.LowerCaseFilter",[],
          "org.apache.solr.analysis.RemoveDuplicatesTokenFilter",[]
        ]
      }
    },
    field_names: {}
  }
}
</pre>

###代码实现
<pre id="java">
public static void main(String[] args) throws MalformedURLException, SolrServerException, IOException {
    CommonsHttpSolrServer solrServer = new CommonsHttpSolrServer("http://localhost:6091/solr-web-shop/shop");

    FieldAnalysisRequest request = new FieldAnalysisRequest("/analysis/field");
    request.addFieldName("shopName");
    request.setFieldValue("text");
    request.setQuery("北京烤鸭");
    FieldAnalysisResponse response = request.process(solrServer);

    Iterator it = response.getFieldNameAnalysis("shopName").getQueryPhases().iterator();
    while(it.hasNext()) {
      AnalysisPhase pharse = (AnalysisPhase)it.next();
      List<TokenInfo> list = pharse.getTokens();
      for (TokenInfo info : list) {
        System.out.println(" text : "+ info.getText());
      }

    }
}
</pre>
