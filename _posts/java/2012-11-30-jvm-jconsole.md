--- 
layout: post
title: Java内存泄露监控工具：jconsole, jstack
tags: 
- JDK
- Jconsole
categories:
- java
- code
- archives
UUID: 201211301527
date: 2012-11-30
---

本文将对JVM监控工具jstack, jconsole, jinfo, jmap, jdb, jstat进行详细的介绍，具体内容请看下文。

###jconsole
jconsole是基于Java Management Extensions (JMX)的实时图形化监测工具，这个工具利用了内建到JVM里面的JMX指令来提供实时的性能和资源的监控，包括了Java 程序的内存使用，Heap size, 线程的状态，类的分配状态和空间使用等等。

####配置
在tomcat bin/catalina.sh或者catalina.bat脚本中JAVA_OPTS参数配置如下:
<pre id="bash">
JAVA_OPTS="$JAVA_OPTS -Djava.rmi.server.hostname=192.168.10.14"
JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.authenticate=false"
JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.ssl=false"
JAVA_OPTS="$JAVA_OPTS -Dcom.sun.management.jmxremote.port=5679"
</pre>

####启动jconsole
<pre id="bash">
$ $JAVA_HOME/bin/jconsole
</pre>
<img src="{{site.static_url}}/assets/images/java/jconsole-index.jpg" width="580px"></img>

####监控视图
jconsole监控视图还是做的很不错的
<img src="{{site.static_url}}/assets/images/java/jconsole.png" width="580px"></img>

###jstack
如果java程序崩溃生成core文件，jstack工具可以用来获得core文件的java stack和native stack的信息，从而可以轻松地知道java程序是如何崩溃和在程序何处发生问题。另外，jstack工具还可以附属到正在运行的java程序中，看到 当时运行的java程序的java stack和native stack的信息, 如果现在运行的java程序呈现hung的状态，jstack是非常有用的。目前只有在Solaris和Linux的JDK版本里面才有。

###jinfo
jinfo可以从core文件里面知道崩溃的Java应用程序的配置信息，目前只有在Solaris和Linux的JDK版本里面才有。

###jmap
jmap 可以从core文件或进程中获得内存的具体匹配情况，包括Heap size, Perm size等等，目前只有在Solaris和Linux的JDK版本里面才有。

###jdb
jdb 用来对core文件和正在运行的Java进程进行实时地调试，里面包含了丰富的命令帮助您进行调试，它的功能和Sun studio里面所带的dbx非常相似，但 jdb是专门用来针对Java应用程序的。

