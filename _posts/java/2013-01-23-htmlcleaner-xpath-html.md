--- 
layout: post
title: HtmlCleaner+XPath抓取HTML中的数据
tags: 
- 爬虫
- HtmlCleaner
- XPath
- 抓取html
- 研发实践
categories:
- code
- java
- archives
UUID: 201301231027
date: 2013-01-23 10:27:22
---

　　以前用过<a href="http://nutch.apache.org/" alt="apache-nutch" target="_bank">apache-nutch</a>,功能虽然很强大，可以配置抓取的线程数，抓取页面的频率，创建索引实现搜索功能等等，但是在现实工作中，往往是针对不同的功能，需求，使用不同的技术实现，最近有一个小小的需求：对国内的招聘网站的职位类别的数据进行抓取。针对这个需求可以使用htmlcleaner+xpath来实现,因为htmlcleaner实用性很强，而且非常容易上手。

###HtmlCleaner Html文档解析器
　　HtmlCleaner是一个开源的Java语言的Html文档解析器。HtmlCleaner能够重新整理HTML文档的每个元素并生成结构良好(Well-Formed)的 HTML 文档。默认它遵循的规则是类似于大部份web浏览器为创文档对象模型所使用的规则。然而，用户可以提供自定义tag和规则组来进行过滤和匹配。它被设计的小，快速，灵活而且独立。解析后编程轻量级文档对象，能够很容易的被转换到DOM或者JDom标准文档，或者通过各种方式(压缩，打印)连续输出XML。

####HtmlCleaner主要功能
<ol>
<li>HtmlCleaner的<a href="http://baike.baidu.com/view/758570.htm" target="_bank">文档对象模型</a>现在拥有了一些函数，处理节点和属性，所以现在在序列化之前搜索或者编辑是非常容易的。</li>
<li>提供基本HtmlCleaner DOM的XPath支持</li>
<li>使用XML配置文件让创建定制tag变得更加容易</li>
</ol>

###XPath
　　XPath即为XML路径语言（XML Path Language），它是一种用来确定XML文档中某部分位置的语言。XPath基于XML的树状结构，提供在数据结构树中找寻节点的能力。起初 XPath 的提出的初衷是将其作为一个通用的、介于XPointer与XSL间的语法模型。但是 XPath 很快的被开发者采用来当作小型查询语言。

<strong>XPath语法:<a href="http://baike.baidu.com/view/307399.htm" target="_bank">http://baike.baidu.com/view/307399.htm</a></strong>

###代码实现
####下载HtmlCleaner的jar包
<pre id="wiki">
http://www.java2s.com/Code/Jar/h/Downloadhtmlcleanerjar.htm
</pre>
####使用XPath获取Document路径
1、使用firefox安装firebug,firepath<br>
2、打开需要抓取页面，然后按F12或者点击firebug图标打开firebug界面，获取XPath路径<br>
3、XPath定位路径<br>
<pre id="java">
.//*[@id='wrapper']/div[3]/div[4]/dl
</pre>
<a href="{{site.static_url}}/assets/images/java/firebug_firepath.jpg" alt="firebug firepath">
<img src="{{site.static_url}}/assets/images/java/firebug_firepath.jpg" width="580px"  alt="firebug firepath" ></img>
</a>

####Spider代码
<pre id="java">
package com.cpy.spider;

import java.io.IOException;
import org.htmlcleaner.HtmlCleaner;
import org.htmlcleaner.XPatherException;

public class Spider {

  private static final HtmlCleaner cleaner = new HtmlCleaner();

  public static void main(String[] args) throws IOException, XPatherException {
    fetchGanji("http://bj.ganji.com/zhaopin/");
  }

  public static void fetchGanji(String url) throws IOException, XPatherException {
    TagNode node = cleaner.clean(new URL(url), "utf-8");
    Object[] ns=node.getElementsByName("title", true);  

    if(ns.length > 0){  
      System.out.println("title是："+((TagNode) ns[0]).getText());//取title值  
    }  
    Object[] ns = node.evaluateXPath(".//*[@id='wrapper']/div[3]/div[4]/dl");
    for (Object object : ns) {
      TagNode node2 = (TagNode) object;
      Object[] nsDts = node2.evaluateXPath("/dt");
      for (Object obj : nsDts) {
        TagNode node3 = (TagNode) obj;
        System.out.println("一级职位类别 : " + node3.getText());
      }

      Object[] nsDds = node2.evaluateXPath("/dd");
      for (Object objDd : nsDds) {
        TagNode dd = (TagNode) objDd;
        System.out.println("二级职位类别 : " + dd.getText());
      }
    }
  }
}

</pre>


