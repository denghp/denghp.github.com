--- 
layout: post
title: tools.jar is not in IDEA classpath
tags: 
- idea
- Ubuntu
categories:
- idea
- code
UUID: 20130729122000
date: 2013-07-29 12:50:22
---

　　IDEA 全称<a href="http://www.jetbrains.com/idea/">IntelliJ IDEA</a>，是java语言开发的集成环境，IntelliJ在业界被公认为最好的java开发工具之一，尤其在智能代码助手、代码自动提示、重构、J2EE支持、Ant、JUnit、CVS整合、代码审查、 创新的GUI设计等方面的功能可以说是超常的。IDEA是JetBrains公司的产品，这家公司总部位于捷克共和国的首都布拉格，开发人员以严谨著称的东欧程序员为主。

最近下载了idea 12.1.4的神器来玩玩，感觉不错,不过遇到了一个小小的问题，拿出来给大家分享下:

###问题描述
1、系统环境 <code>ubuntu 12.10 64bit,jdk-1.6.0_45,idea-12.1.4</code><br>
2、JAVA_HOME,tools.jar是在当前用户.bashrc文件中设置
<pre id="bash">
export JAVA_HOME=/home/denghp/software/jdk1.6.0_45
export PATH=$PATH:$JAVA_HOME/bin:$MVN_HOME/bin:$ANT_HOME/bin
export JAVA_BIN=$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar
export JAVA_HOME JAVA_BIN PATH CLASSPATH
</pre>
3、正常安装idea,然后使用<code>./bin/idea.sh</code>可以正常运行,可是使用快捷键点击运行就会报如下异常：
<pre id="bash">
'tools.jar' is not in IDEA classpath.
Please ensure JAVA_HOME points to JDK rather than JRE.
</pre>

###解决方案
1、升级jdk-1.6的版本到jdk-1.7，12.1.4默认支持1.7版本<br>
2、把JAVA_HOME配置在<code>/etc/profile</code>文件中设置，设置为所有用户都可以使用<br>
<strong>注意:</strong>
一般系统都是自带jdk安装，如果你在配置文件中设置<code>JAVA_HOME</code>配置，使用<code>java -version</code>查看版本是否安装正确,
如果还是系统自带jdk，则需要更改系统jdk的选项:
<pre id="bash">
sudo update-alternatives --install /usr/bin/java java /home/denghp/software/jdk1.6.0_30/bin/java 300
</pre>
详情参考<a href="{{site.url}}/2012/12/11/linux-jdk-install/">{{site.url}}/2012/12/11/linux-jdk-install/</a>


