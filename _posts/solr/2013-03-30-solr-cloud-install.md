--- 
layout: post
title: SolrCloud集群部署
tags: 
- solr
- lucene
- 搜索引擎
- 研发实践
categories:
- code
- solr
- search
- special
- archives
UUID: 20130330001027
date: 2013-03-30 00:10:22
images: ["/assets/images/solr/2shard4serverFull.jpg"]
---

  　　SolrCloud是基于Solr和Zookeeper的分布式搜索方案，是正在开发中的Solr4.0的核心组件之一，它的主要思想是使用Zookeeper作为集群的配置信息中心。它有几个特色功能：
<ol>
<li>集中式的配置信息 </li>
<li>自动容错 </li>
<li>近实时搜索 </li>
<li>查询时自动负载均衡 </li>
</ol>

<a href="{{site.static_url}}/assets/images/solr/2shard4serverFull.jpg" alt="solr" rel="prettyPhoto[{{page.UUID}}]" target="_bank">
<img src="{{site.static_url}}/assets/images/solr/2shard4serverFull.jpg" alt="solr" width="580px" />
</a>

   　　基本可以用上面这幅图来概述，这是一个拥有4个Solr节点的集群，索引分布在两个Shard里面，每个Shard包含两个Solr节点，一个是Leader节点，一个是Replica节点，此外集群中有一个负责维护集群状态信息的Overseer节点，它是一个总控制器。集群的所有状态信息都放在Zookeeper集群中统一维护。从图中还可以看到，任何一个节点都可以接收索引更新的请求，然后再将这个请求转发到文档所应该属于的那个Shard的Leader节点，Leader节点更新结束完成，最后将版本号和文档转发给同属于一个Shard的replicas节点。

###下载相关程序
1、下载Solr-4.x <a href="http://lucene.apache.org/solr/downloads.html" target="_bank">http://lucene.apache.org/solr/downloads.html</a><br>
2、下载Tomcat <a href="http://tomcat.apache.org/download-70.cgi" target="_bank">http://tomcat.apache.org/download-70.cgi</a><br>
3、下载Zookeeper <a href="http://zookeeper.apache.org/releases.html" target="_bank">http://zookeeper.apache.org/releases.html</a><br>

###安装Zookeeper
<strong>单机zookeeper</strong>
<pre id="bash">
#解压
$ tar -zxvf zookeeper-3.4.5.tar.gz
#更改配置
$ cp zookeeper-3.4.5/conf/zoo_sample.cfg zookeeper-3.4.5/conf/zoo.cfg
#启动服务
$ bin/zkServer.sh start
#验证
$ bin/zkCli.sh -server host:port
</pre>
<strong>zookeeper主要配置:</strong>
<pre id="bash">
# Zookeeper 服务器之间或客户端与服务器之间维持心跳的时间间隔，也就是每个 tickTime 时间就会发送一个心跳
tickTime=2000
# 这个配置项是用来配置 Zookeeper 接受客户端（这里所说的客户端不是用户连接 Zookeeper 服务器的客户端，而是 Zookeeper 服务器集群中连接到 Leader 的 Follower 服务器）初始化连接时最长能忍受多少个心跳时间间隔数。当已经超过 5个心跳的时间（也就是 tickTime）长度后 Zookeeper 服务器还没有收到客户端的返回信息，那么表明这个客户端连接失败。总的时间长度就是 5*2000=10 秒
initLimit=10
# 这个配置项标识 Leader 与 Follower 之间发送消息，请求和应答时间长度，最长不能超过多少个 tickTime 的时间长度，总的时间长度就是 2*2000=4 秒
syncLimit=5
# Zookeeper 保存数据的目录，默认情况下，Zookeeper 将写数据的日志文件也保存在这个目录里。
dataDir=/tmp/zookeeper
# 这个端口就是客户端连接 Zookeeper 服务器的端口，Zookeeper 会监听这个端口，接受客户端的访问请求。
clientPort=2181
</pre>

<strong>zookeeper集群</strong><br>
1、在zookeeper-3.4.5/conf/zoo.cfg追加server配置
<pre id="bash">
server.1=192.168.10.14:2888:3888
server.2=192.168.10.12:2888:3888
server.3=192.168.10.16:2888:3888
</pre>
2、在每个Zookeeper保存数据的目录下指定myid文件，对应服务名称ID
<pre id="bash">
#如server.id，则在myid文件中写1即可
$ vi /tmp/zookeeper/myid
</pre>
3、启动zookeeper服务 <code>bin/zkServer.sh start</code>

###SolrCloud使用Zookeeper管理集群的基本流程
<strong>第一台Solr服务器启动过程:</strong></br>
<ol>
<li>启动第一台zookeeper服务器，作为集群状态信息的管理者</li>
<li>将自己这个节点注册到/node_states/目录下,同时将自己注册到/live_nodes/目录下</li>
<li>创建/overseer_elect/leader，为后续Overseer节点的选举做准备，新建一个Overseer</li>
<li>更新/clusterstate.json目录下json格式的集群状态信息</li>
<li>本机从Zookeeper中更新集群状态信息，维持与Zookeeper上的集群信息一致</li>
<li>上传本地配置文件到Zookeeper中，供集群中其他solr节点使用,后面启动solr则不会上传配置文件，因为都是使用第一台solr服务启动上传的配置文件为准.</li>
<li>启动本地的Solr服务器,Overseer会得知shard中有第一个节点进来，更新shard状态信息，并将本机所在节点设置为shard1的leader节点，并向整个集群发布最新的集群状态信息。</li>
<li>本机从Zookeeper中再次更新集群状态信息，第一台solr服务器启动完毕。</li>
</ol>
<strong>第二台solr服务器的启动过程:</strong></br>
<ol>
<li>连接到集群所在的Zookeeper</li>
<li>将自己这个节点注册到/node_states/目录下,同时将自己注册到/live_nodes/目录下</li>
<li>本机从Zookeeper中更新集群状态信息，维持与Zookeeper上的集群信息一致</li>
<li>从集群中保存的配置文件加载Solr所需要的配置信息</li>
<li>启动本地solr服务器,将本节点注册为集群中的shard，并将本机设置为shard2的Leader节点</li>
<li>本机从Zookeeper中再次更新集群状态信息，第二台solr服务器启动完毕.</li>
</ol>

###SolrCloud安装配置
包含2个shard的集群，每个shard中有replica节点

<a href="{{site.static_url}}/assets/images/solr/2shard4server.jpg" alt="solr" rel="prettyPhoto[{{page.UUID}}]" target="_bank">
<img src="{{site.static_url}}/assets/images/solr/2shard4server.jpg" alt="solr" width="330px" />
</a>

<ol>
<li>安装Tomcat</li>
<li>安装zookeeper集群,启动，我这里就使用上面的zookeeper集群</li>
<li>
拷贝solr项目中的solr配置文件到指定路径
<pre id="bash" style="width:540px">
$ copy -r solr $TOMCAT_HOME1/conf
$ copy -r solr $TOMCAT_HOME2/conf
$ copy -r solr $TOMCAT_HOME3/conf
$ copy -r solr $TOMCAT_HOME4/conf
</pre>
</li>
<li>
更改第一台tomcat的启动脚本catalina.sh，添加solr_home及配置信息到JAVA_OPTS,添加到开头就行,在catalina.sh指定solr_home,也可以在solr.war包中的web.xml中配置

<a href="{{site.static_url}}/assets/images/solr/config-1.jpg" alt="solr" rel="prettyPhoto[{{page.UUID}}]" target="_bank">
<img src="{{site.static_url}}/assets/images/solr/config-1.jpg" alt="solr" width="540px" />
</a>

</li>
<li>
更改第二台及其他tomcat的启动脚本catalina.sh

<a href="{{site.static_url}}/assets/images/solr/config-2.jpg" alt="solr" rel="prettyPhoto[{{page.UUID}}]" target="_bank">
<img src="{{site.static_url}}/assets/images/solr/config-2.jpg" alt="solr" />
</a>

</li>
<li>
配置完所有的solr服务，则从第一台开始启动<code>$TOMCAT_HOME1/bin/catalina.sh run</code>
</li>
</ol>
<a href="{{site.static_url}}/assets/images/solr/solrcloud.jpg" alt="solr" rel="prettyPhoto[{{page.UUID}}]" target="_bank">
<img src="{{site.static_url}}/assets/images/solr/solrcloud.jpg" alt="solr" width="540px" />
</a>

####备注
1、solr.xml配置文件解释
<pre id="xml">
&lt;cores adminPath="/admin/cores" defaultCoreName="deals" host="${host:}" hostPort="${jetty.port:}" hostContext="${hostContext:}" leaderVoteWait="${leaderVoteWait:1000}"&gt;
    &lt;core name="deals" instanceDir="deals" /&gt;
&lt;/cores&gt;
</pre>
hostContext:指定服务名称<br>
hostPort:指定端口<br>
leaderVoteWait:选举leader的等待时间ms


