--- 
layout: post
title: Centos 6.6 Linux 安装JDK
tags: 
- JDK
- linux
- shell
categories:
- java
- code
UUID: 201003171527
---

   　　JDK（Java Development Kit）是Sun Microsystems针对Java开发员的产品。自从Java推出以来，JDK已经成为使用最广泛的Java SDK。JDK 是整个Java的核心，包括了Java运行环境、Java工具和Java基础类库。JDK是学好Java的第一步。而专门运行在x86平台的Jrocket在服务端运行效率也要比Sun JDK好很多。从SUN的JDK5.0开始，提供了泛型等非常实用的功能，其版本也不断更新，运行效率得到了非常大的提高。

###下载
下载对应操作系统的jdk，操作系统是32位的就下32位的jdk，64位的就下64位的jdk。下错了装不上的。

下载地址：<a href="http://www.oracle.com/technetwork/java/javase/downloads/index.html">http://www.oracle.com/technetwork/java/javase/downloads/index.html</a>

*32位jdk具体下载地址：jdk-6u37-linux-i586-rpm.bin*<br>
<a href="http://download.oracle.com/otn-pub/java/jdk/6u37-b06/jdk-6u37-linux-i586-rpm.bin">
http://download.oracle.com/otn-pub/java/jdk/6u37-b06/jdk-6u37-linux-i586-rpm.bin
</a>

*64位jdk具体下载地址：jdk-6u37-linux-x64-rpm.bin*<br>
<a href="http://download.oracle.com/otn-pub/java/jdk/6u37-b06/jdk-6u37-linux-x64-rpm.bin">
http://download.oracle.com/otn-pub/java/jdk/6u37-b06/jdk-6u37-linux-x64-rpm.bin
</a>

###安装
给所有用户添加可执行的权限：
<pre id="bash">
$ cd /usr/local/java
$ sudo chmod +x jdk-6u37-linux-x64-rpm.bin
</pre>
执行安装
<pre id="bash">
$ ./ jdk-6u37-linux-x64-rpm.bin
</pre>
会出现一段协议，需要按确定键，回车就OK。可以查看安装后的文件列表：
<pre id="bash">
$ ls -lt 
-r--r--r--  1 root root     4892 Apr 27  2012 register_zh_CN.html
-r--r--r--  1 root root     5294 Apr 27  2012 register.html
-r--r--r--  1 root root     6816 Apr 27  2012 register_ja.html
drwxr-xr-x  7 root root     4096 Apr 27  2012 jre
drwxr-xr-x  3 root root     4096 Apr 27  2012 lib
drwxr-xr-x  7 root root     4096 Jun 22  2010 db
drwxr-xr-x  3 root root     4096 Jun 22  2010 include
drwxr-xr-x  4 root root     4096 Jun 22  2010 man
drwxr-xr-x  9 root root     4096 Jun 22  2010 sample
drwxr-xr-x  2 root root     4096 Jun 22  2010 bin
drwxr-xr-x 10 root root     4096 Jun 22  2010 demo
-r--r--r--  1 root root     3339 Jun 22  2010 COPYRIGHT
-r--r--r--  1 root root    28230 Jun 22  2010 README.html
-r--r--r--  1 root root    25317 Jun 22  2010 README_ja.html
-r--r--r--  1 root root    20663 Jun 22  2010 README_zh_CN.html
-r--r--r--  1 root root   183173 Jun 22  2010 THIRDPARTYLICENSEREADME.txt
-rw-r--r--  1 root root 19159297 Jun 22  2010 src.zip
</pre>
###设置JDK环境变量
####修改/etc/profile文件 
   　　如果你的计算机仅仅作为开发使用时推荐使用这种方法，因为所有用户的shell都有权使用这些环境变量，可能会给系统带来安全性问题。<br>
1、vi打开profile
<pre id="bash">
$ sudo vi /etc/profile
</pre>
2、在profile文件后追加如下配置
<pre id="bash">
JAVA_HOME=/usr/local/java/jdk-6u37-linux
export PATH=$JAVA_HOME/bin:$PATH:
export JAVA_BIN=$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar
export JAVA_HOME JAVA_BIN PATH CLASSPAT
</pre>
注意：<br>
a. 你要将 /usr/local/java/jdk-6u37-linux 改为你的jdk安装目录<br>
b. linux下用冒号“:”来分隔路径<br>
c. $PATH / $CLASSPATH / $JAVA_HOME 是用来引用原来的环境变量的值,在设置环境变量时特别要注意不能把原来的值给覆盖掉了，这是一种常见的错误。<br>
d. CLASSPATH中当前目录“.”不能丢,把当前目录丢掉也是常见的错误。<br>
e. export是把这三个变量导出为全局变量。<br>
f. 大小写必须严格区分。<br>

3、使用source执行，使之生效
<pre id="bash">
$ sudo source /etc/profile
</pre>

####修改.bashrc文件 
   　　这种方法更为安全，它可以把使用这些环境变量的权限控制到用户级别，如果你需要给某个用户权限使用这些环境变量，你只需要修改其个人用户主目录下的.bashrc文件就可以了<br>
1、使用vi 打开当前用户下的.bashrc文件
<pre id="bash">
$ vi ~/.bashrc
</pre>
2、追加如下配置
<pre id="bash">
JAVA_HOME=/usr/local/java/jdk-6u37-linux
export PATH=$JAVA_HOME/bin:$PATH:
export JAVA_BIN=$JAVA_HOME/bin
export CLASSPATH=.:$JAVA_HOME/lib/tools.jar:$JAVA_HOME/lib/dt.jar
export JAVA_HOME JAVA_BIN PATH CLASSPAT
</pre>
跟使用profile配置一样<br>
3、使用source执行，使之生效
<pre id="bash">
$ sudo source /etc/profile
</pre>
###如果机器默认安装gij编译器，我们需要更改jdk的选择
####方案一
如果$JAVA_HOME/bin 放在$PATH后面则默认使用系统自带JDK版本，需要放在$PATH前面<br>

####方案二
使用root权限，执行如下步骤
<ol>
<li>将操作系统默认的java版本替换<br>
<pre id="bash" style="width:500px">
sudo update-alternatives --install /usr/bin/java java /home/denghp/software/jdk1.6.0_30/bin/java 300
</pre></li>
<li>查看操作系统的所有的java信息<br>
<pre id="bash" style="width:500px">
$ sudo update-alternatives --config java 
</pre>
<img src="http://demi-panda.com/media/pub/java/jdk-1.jpg" width="480px" alt="jdk-info"></img>
</li>
<li>选择自己需要指定的java版本<br>
<img src="http://demi-panda.com/media/pub/java/jdk-2.jpg" width="480px" alt="jdk-info"></img>
</li>
</ol>
