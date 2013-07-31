--- 
layout: post
title: 简单的Solr安装配置
tags: 
- solr
- lucene
- 搜索引擎
- 研发实践
categories:
- code
- solr
- topic
UUID: 20130313001027
date: 2013-03-13 00:10:22
show_img: "/media/pub/solr/solr-logo.png"
---

<a href="{{site.static_url}}/media/pub/solr/solr-logo.png" alt="solr" rel="prettyPhoto[{{page.UUID}}]" target="_bank">
<img src="{{site.static_url}}/media/pub/solr/solr-logo.png" alt="solr" width="380px" class="img-center"/>
</a>

 　　Apache Solr是流行的，速度极快，开源的NoSQL的搜索平台，来自于ApacheLucene项目。Solr的运行在Java servlet容器,如：JBoss,Jetty,Resin,Tomcat,Weblogic,WebSphere的服务容器中，wiki上也有详细的介绍。这里主要讲下Tomcat,Jetty的简单安装与配置：

###下载Solr安装包
下载地址:<a href="http://lucene.apache.org/solr/" target="_bank">http://lucene.apache.org/solr/</a>

###Tomcat,Jetty安装步骤
1、解压solr的安装包到你自己想要的位置,我这里下载的是solr-xxx-src.tgz,你可以直接下载编译好的文件
<pre id="bash">
$ tar -zxvf solr-xxx-src.tgz
#编译
$ ant dist 
</pre>
2、安装Tomcat容器
3、复制solr.war到tomcat容器的webapps目录下，可以更改为自己想要的服务名称
<pre id="bash">
cp solr-xxx/solr/dist/solr.war $TOMCAT_HOME/webapps/solr.war
</pre>
4、复制Solr Home目录<code>apache-solr-xxx/example/solr</code> 到你想存储的Solr Home位<br>
<strong>配置方式一：</strong><br>
<pre id="bash">
#打开tomcat的启动脚本,添加如下配置指定Solr Home
$ vi $TOMCAT_HOME/bin/catalina.sh 

##如下代码是指定SolrHome,注意我这里的Solr Home目录是放在$TOMCAT_HOME/conf下
SOLR_HOME=
SEARCHSERVER_HOME=`dirname $0`
SEARCHSERVER_HOME=`cd ${SEARCHSERVER_HOME}/..; pwd`
if [ -z "$SOLR_HOME" ]; then
  SOLR_HOME=$SEARCHSERVER_HOME/conf/solr_home
fi

echo "Using SOLR_HOME:  "$SOLR_HOME
JAVA_OPTS="-Dsolr.solr.home=$SOLR_HOME"
JAVA_OPTS="-Xms1024m -Xmx2048m $JAVA_OPTS"
</pre>
<strong>配置方式二:</strong><br>
<pre id="bash">
#打开solr的web.xml
$ vi $TOMCAT_HOME/webapps/solr/WEB-INF/web.xml
</pre>
solr的web.xml中配置solr环境
<pre id="xml">
&lt;env-entry&gt;
  &lt;env-entry-name&gt;solr/home&lt;/env-entry-name&gt;
  &lt;env-entry-value&gt;/put/your/solr/home/here&lt;/env-entry-value&gt;
  &lt;env-entry-type&gt;java.lang.String&lt;/env-entry-type&gt;
&lt;/env-entry&gt;
</pre>
<strong>配置方式三:</strong><br>
直接配置java环境变量中
<pre id="bash">
#编辑.bashrc,添加如下配置指定solr_home
$ vi ~/.bashrc
JAVA_HOME=/usr/java/default
JAVA_OPTIONS="-Dsolr.solr.home=/opt/solr/solr $JAVA_OPTIONS"
</pre>
<strong>注意：</strong><br>
只需要将Solr Home目录指定在java系统变量中即可,如solr自带的jetty启动<code>java -Dsolr.solr.home=/some/dir -jar start.jar</code>

5、启动服务
<pre id="bash">
#tomcat启动
$TOMCAT_HOME/bin/catalina.sh run
#jetty启动
$JETTY_HOME/jetty.sh start
</pre>

<a href="{{site.static_url}}/media/pub/solr/solr-admin.jpg" alt="solr" rel="prettyPhoto[{{page.UUID}}]" target="_bank">
<img src="{{site.static_url}}/media/pub/solr/solr-admin.jpg" alt="solr" width="580px" />
</a>

访问地址: http://localhost:port/solr/admin

###提交索引文档
在解压的solr目录中的exampledocs目录是SimplePostTool，一个基于Java的命令行工具，post.jar，其中可以使用的文件的索引。现在不要担心太多索引和基本数据操作部分的所有细节。

要查看一些有关使用post.jar，请使用-help选项。
<pre id="bash">
$ java -jar post.jar -help
</pre>
在的SimplePostTool是一个简单的命令行工具，用于自检原始XML到Solr的端口。 XML数据可以读取指定的文件作为命令行参数，原始命令行参数字符串，或通过STDIN。

<strong>示例:</strong>
<pre id="bash">
java -Ddata=files -jar post.jar *.xml
java -Ddata=args -jar post.jar '&lt;delete&gt;&lt;id&gt;42&lt;/id&gt;&lt;/delete&gt;'
java -Ddata=stdin -jar post.jar &lt; hd.xml
</pre>

也可以使用post.sh工具
<pre id="bash">
#post.sh中可以指定host
./post.sh xxx.xml
</pre>
