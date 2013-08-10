--- 
layout: post
title: Jmeter http 压力测试使用csv文件发送json数据
short_title: Jmeter Http 发送json数据
tags: 
- 测试
- 压力测试
- jmeter
- JSON
- CSV
categories:
- code
- java
- archives
UUID: 201301081427
description: Apache JMeter( http://jakarta.apache.org/jmeter/ )是来自 Apache Jakarta 项目的一个压力测试工具, 目前版本2.0.3, JMeter 支持 HTTP, FTP, SOAP/XML-RPC, JDBC 等多种目标的压力测试。 最近在工作中实现了一个webservice，支持json的post请求，使用JMeter来进行压力测试显得就非常简单啦。
---

 　　Apache JMeter( http://jakarta.apache.org/jmeter/ )是来自 Apache Jakarta 项目的一个压力测试工具, 目前版本2.0.3, JMeter 支持 HTTP, FTP, SOAP/XML-RPC, JDBC 等多种目标的压力测试。
最近在工作中实现了一个webservice，支持json的post请求，使用JMeter来进行压力测试显得就非常简单啦。

###Step 1 创建测试计划
<img src="{{site.static_url}}/assets/images/java/json-http-test-plan.jpg" width="560px"  alt="json-http-test-plan" ></img>

###Step 2 添加Header Manager
<img src="{{site.static_url}}/assets/images/java/json-http-header-manager.jpg" width="560px"  alt="json-http-header-manager" ></img>

###Step 3 添加CSV
<img src="{{site.static_url}}/assets/images/java/json-http-request-csv.jpg" width="560px"  alt="json-http-request-csv.jpg" ></img>

您需要填写至少3个值：<br>
<ol>
<li>文件名：如果您的文件在/bin目录中，这可能是仅仅是文件名。如果是在别的地方，使用该文件的完整路径。</li>
<li>变量名：这相当于在电子表格中的“列名”。</li>
<li>分隔符：逗号是默认的分隔符，但如果你的文件使用制表符，这是地方说出这样的话。</li>
</ol>

###Step 4 CSV中的JSON格式
<pre id="json">
{
  "searchRequest": [
    "http://192.168.10.14:9001/search/search.json?word=%E7%83%A4%E9%B1%BC",
    "http://192.168.10.14:9001/search/search.json?word=%E7%83%A4%E9%B1%BC&cityId=1"
      ]
}
</pre>

###Step 5 创建HttpRequest
<img src="{{site.static_url}}/assets/images/java/json-http-search-request.jpg" width="560px"  alt="json-http-search-request.jpg" ></img>




