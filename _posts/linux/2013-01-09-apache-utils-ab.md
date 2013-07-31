---
layout: post
title: Linux常用的压力测试工具Apache-ab
tags: 
- ab
- Apache
- linux
- 压力测试
categories:
- code
- 测试工具
UUID: 201301092343
---

Apache-ab是超文本传输协议(HTTP)的性能测试工具。 其设计意图是描绘当前所安装的Apache的执行性能， 主要是显示你安装的Apache每秒可以处理多少个请求 ab是Apache超文本传输协议(HTTP)的性能测试工具。 其设计意图是描绘当前所安装的Apache的执行性。 

开发人员应该都知道不少的测试工具，这里给大家列几个，找到合适自己的就行。今天给大家主要介绍Apache-AB。

###功能和性能测试工具AB
ab是Apache超文本传输协议(HTTP)的性能测试工具。 其设计意图是描绘当前所安装的Apache的执行性能， 主要是显示你安装的Apache每秒可以处理多少个请求。
<img src="{{site.static_url}}/media/pub/linux/apache-ab.jpg" alt="Apache-ab"  width="560px" />

#####参数详细介绍
<table style="width:580px">
  <tbody>
    <tr>
      <th style="width:120px">参数:</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>
      -A attribute
      </hd>
      <td>
      对服务器提供BASIC认证信任。 用户名和密码由一个:隔开，并以base64编码形式发送。 无论服务器是否需要(即, 是否发送了401认证需求代码)，此字符串都会被发送。
      </td>
    </tr>
    <tr>
      <td>
      -n requests
      </hd>
      <td> 
      在测试会话中所执行的请求个数。 默认时，仅执行一个请求，但通常其结果不具有代表意义。 
      </td>
    </tr>
    <tr>
      <td>
      -c concurrency 
      </hd>
      <td> 
      一次产生的请求个数。默认是一次一个。
      </td>
    </tr>
    <tr>
      <td>
      -t timelimit
      </hd>
      <td> 
      测试所进行的最大秒数。其内部隐含值是-n 50000。
      </td>
    </tr>
    <tr>
      <td>
      -C attribute
      </hd>
      <td> 
      Add cookie, eg. 'Apache=1234'. (repeatable)
      </td>
    </tr>
    <tr>
      <td>
      -H attribute
      </hd>
      <td> 
      Add Arbitrary header line, eg. 'Accept-Encoding: gzip'
      </td>
    </tr>
    <tr>
      <td>
      -i
      </hd>
      <td> 
      执行HEAD请求，而不是GET。
      </td>
    </tr>
    <tr>
      <td>
      -k
      </hd>
      <td> 
      启用HTTP KeepAlive功能，即, 在一个HTTP会话中执行多个请求。 默认时，不启用KeepAlive功能. 
      </td>
    </tr>
    <tr>
      <td>
      -p POST-file
      </hd>
      <td> 
      包含了需要POST的数据的文件.
      </td>
    </tr>
    <tr>
      <td>
      -X proxy[:port] 
      </hd>
      <td> 
      对请求使用代理服务器。 
      </td>
    </tr>
    <tr>
      <td>
      -T content-type 
      </hd>
      <td> 
      POST数据所使用的Content-type头信息
      </td>
    </tr>
    <tr>
      <td>
      -q
      </hd>
      <td> 
      如果处理的请求数大于150， ab每处理大约10%或者100个请求时，会在stderr输出一个进度计数。 此-q标记可以抑制这些信息。 
      </td>
    </tr>
    <tr>
      <td>
      -w 
      </hd>
      <td> 
      以HTML表的格式输出结果。默认时，它是白色背景的两列宽度的一张表。 
      </td>
    </tr>
    <tr>
      <td>
      -e csv-file 
      </hd>
      <td> 
      产生一个以逗号分隔的(CSV)文件， 其中包含了处理每个相应百分比的请求所需要(从1%到100%)的相应百分比的(以微妙为单位)时间。
      </td>
    </tr>
    <tr>
      <td>
      -g gnuplot-file 
      </hd>
      <td> 
      把所有测试结果写入一个'gnuplot'或者TSV (以Tab分隔的)文件。
      </td>
    </tr>
    <tr>
      <td>
      -h
      </hd>
      <td> 
      显示使用方法。 
      </td>
    </tr>
</tbody>
</table>

###示例
<pre id="bash">
[denghp@denghp src] $ ab -n 100 -c 10 http://demi-panda.com/2013/01/02/dongtian-chihuoguo/
This is ApacheBench, Version 2.3 <$Revision: 655654 $>
Copyright 1996 Adam Twiss, Zeus Technology Ltd, http://www.zeustech.net/
Licensed to The Apache Software Foundation, http://www.apache.org/

Benchmarking demi-panda.com (be patient).....done


Server Software:        GitHub.com
Server Hostname:        demi-panda.com
Server Port:            80

Document Path:          /2013/01/02/dongtian-chihuoguo/
Document Length:        28906 bytes

Concurrency Level:      10
Time taken for tests:   40.546 seconds
Complete requests:      100
Failed requests:        0
Write errors:           0
Total transferred:      2918700 bytes #整个场景中的网络传输量
HTML transferred:       2890600 bytes #整个场景中的HTML内容传输量
Requests per second:    2.47 [#/sec] (mean)  #相当于LR 中的 每秒事务数 ，后面括号中的 mean 表示这是一个平均值
Time per request:       4054.636 [ms] (mean) #相当于 LR 中的 平均事务响应时间 ，后面括号中的 mean 表示这是一个平均值
Time per request:       405.464 [ms] (mean, across all concurrent requests) 
Transfer rate:          70.30 [Kbytes/sec] received #平均每秒网络上的流量


#网络上消耗的时间
Connection Times (ms)
              min  mean[+/-sd] median   max
              Connect:      379  566 567.6    401    3510
              Processing:  1553 2728 2375.2   1975   20318
              Waiting:      381  530 894.5    402    9134
              Total:       1954 3294 2402.6   2392   20819

#下面是整个场景中所有请求的响应报告。其中 50％ 的用户响应时间小于 2392 毫秒,最大响应时间是20819毫秒.
Percentage of the requests served within a certain time (ms)
              50%   2392
              66%   3263
              75%   3654
              80%   3793
              90%   5182
              95%   8093
              98%   9811
              99%  20819
              100%  20819 (longest request)

</pre>

###推荐几款常用的压力测试工具
#####Loadrunner工业标准级负载测试工具
<a href="http://learnloadrunner.com/" alt="LoadRunner" taget="_bank">LoadRunner </a>是一种预测系统行为和性能的负载测试工具。通过以模拟上千万用户实施并发负载及实时性能监测的方式来确认和查找问题，LoadRunner 能够对整个企业架构进行测试。通过使用LoadRunner ，企业能最大限度地缩短测试时间，优化性能和加速应用系统的发布周期。

虽然工具很强大，很多大型的企业和专业人员都会选择它，但是相对小企业的选型就很难选择这么庞大的工具。
<img src="{{site.static_url}}/media/pub/linux/LoadRunner.jpg" alt="Loadrunner"  width="560px" />

这里有一个网站转门介绍了Loadrunner的教材，很全面，有兴趣的可以去学习<a href="http://www.ltesting.net/ceshi/ceshijishu/rjcsgj/mercury/loadrunner/">http://www.ltesting.net/ceshi/ceshijishu/rjcsgj/mercury/loadrunner/</a>

#####功能测试工具Rational Robot
<a href="http://www-142.ibm.com/software/products/cn/zh/robot" alt="Rational" taget="_bank">IBM Rational Robot </a>是业界最顶尖的功能测试工具，它甚至可以在测试人员学习高级脚本技术之前帮助其进行成功的测试。可针对电子商务、客户端/服务器和企业资源规划 (ERP) 应用程序自动执行回归、功能和配置测试。它用于根据各种各样的用户界面技术测试应用程序。该软件与 IBM Rational TestManager 解决方案集成，为所有测试活动提供桌面管理支持。
<img src="{{site.static_url}}/media/pub/linux/Rational-Robot.png" alt="Rational-Robot"  width="560px" />

#####功能和性能测试的工具JMeter
<a href="http://jmeter.apache.org/" alt="JMeter" target="_bank">JMeter</a>是Apache组织的开放源代码项目，它是功能和性能测试的工具，100%的用java实现。

前段时间在针对webservice压力测试就使用了Jmeter，个人比较喜欢。
<img src="{{site.static_url}}/media/pub/java/json-http-test-plan.jpg" alt="Jmeter"  width="560px" />

