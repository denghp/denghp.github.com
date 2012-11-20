---
layout: post
title: Jenkins PermGen space 问题
tags: 
- Jenkins
- Mavne
categories:
- Jenkins
UUID: 201211192343
date: 2012-11-19
---

首先熟悉tomcat内存溢出三种情况。这里根据平时遇到的情况和相关资料进行一个总结。常见的一般会有下面三种情况：

这里根据平时遇到的情况和相关资料进行一个总结。常见的一般会有下面三种情况：
<pre>
1.OutOfMemoryError: Java heap space
2.OutOfMemoryError: PermGen space
3.OutOfMemoryError: unable to create new native thread.
</pre>

### Tomcat内存溢出解决方案

对于前两种情况，在应用本身没有内存泄露的情况下可以用设置tomcat jvm参数来解决。（-Xms -Xmx -XX:PermSize  -XX:MaxPermSize）

最后一种可能需要调整操作系统和tomcat jvm参数同时调整才能达到目的。

###第一种：是堆溢出。
在JVM中如果98％的时间是用于GC且可用的 Heap size 不足2％的时候将抛出此异常信息。

没有内存泄露的情况下，调整-Xms -Xmx参数可以解决。
-Xms:初始堆大小
-Xmx:最大堆大小

*但堆的大小受下面三方面影响：*

1.相关操作系统的数据模型（32-bt还是64-bit）限制；（32位系统下，一般限制在1.5G~2G；我在2003 server 系统下（物理内存：4G和6G，jdk：1.6）测试 1612M，64为操作系统对内存无限制。）
2.系统的可用虚拟内存限制；
3.系统的可用物理内存限制。
堆的大小可以使用 java -Xmx***M  version 命令来测试。支持的话会出现jdk的版本号，不支持会报错。
-Xms -Xmx一般配置成一样比较好比如:
<pre>
set JAVA_OPTS= -Xms1024m -Xmx1024m
</pre>

###第二种：永久保存区域溢出
PermGen space的全称是Permanent Generation space,是指内存的永久保存区域。这一部分用于存放Class和Meta的信息,Class在被 Load的时候被放入PermGen space区域，它和和存放Instance的Heap区域不同,GC(Garbage Collection)不会在主程序运行期对PermGen space进行清理，所以如果你的APP会LOAD很多CLASS的话,就很可能出现PermGen space错误。这种错误常见在web服务器对JSP进行pre compile的时候。但目前的hibernate和spring项目中也很容易出现这样的问题。可能是由于这些框架会动态class，而且jvm的gc是不会清理PemGen space的，导致内存溢出。

这一个一般是加大-XX:PermSize  -XX:MaxPermSize 来解决问题。
-XX:PermSize 永久保存区域初始大小
-XX:PermSize 永久保存区域初始最大值
这一般结合第一条使用，比如:
<pre>
set JAVA_OPTS= -Xms1024m -Xmx1024m  -XX:PermSize=128M -XX:PermSize=256M
</pre>

###第三种：无法创建新的线程。
这种情况可能是JVM已经被系统分配了大量的内存(比如1.5G)，并且它至少要占用可用内存的一半。有人发现，在线程个数很多的情况下，你分配给JVM的内存越多，那么，上述错误发生的可能性就越大
那么是什么原因造成这种问题呢？

每一个32位的进程最多可以使用2G的可用内存，因为另外2G被操作系统保留。这里假设使用1.5G给JVM，那么还余下500M可用内存。这500M内存中的一部分必须用于系统dll的加载，那么真正剩下的也许只有400M，现在关键的地方出现了：当你使用Java创建一个线程，在JVM的内存里也会创建一个Thread对象，但是同时也会在操作系统里创建一个真正的物理线程(参考JVM规范)，操作系统会在余下的400兆内存里创建这个物理线程，而不是在JVM的1500M的内存堆里创建。在jdk1.4里头，默认的栈大小是256KB，但是在jdk1.5里头，默认的栈大小为1M每线程，因此，在余下400M的可用内存里边我们最多也只能创建400个可用线程。

这样结论就出来了，要想创建更多的线程，你必须减少分配给JVM的最大内存。还有一种做法是让JVM宿主在你的JNI代码里边。

给出一个有关能够创建线程的最大个数的估算公式：
<pre>
(MaxProcessMemory - JVMMemory - ReservedOsMemory) / (ThreadStackSize) = Number of threads
#对于jdk1.5而言，假设操作系统保留120M内存：
1.5GB JVM: (2GB-1.5Gb-120MB)/(1MB) = ~380 threads
1.0GB JVM: (2GB-1.0Gb-120MB)/(1MB) = ~880 threads

#对于栈大小为256KB的jdk1.4而言，
1.5GB allocated to JVM: ~1520 threads
1.0GB allocated to JVM: ~3520 threads 
</pre>

如果我没有记错的话，在2000/XP/2003里头有一个启动选项，好像是：/PAE /3G ，可以让用户进程最大内存扩充至3G，这时操作系统只能占用最多1G的虚存。那样应该可以让JVM创建更多的线程。

### 解决Jekins内存溢出的方案：
经过以上的了解，咱们就能快速的定位问题的所在，如果Jekins运行在tomcat中，或者使用Java命令运行，长时间运行，就会导致有大量的class类被加载,并保存在JVM PermGen Space空间中，这样就会导致内存溢出,然后报以下异常：
<pre id="java" style="font-size:10px; width:560px">
Exception in thread "main" java.lang.OutOfMemoryError: PermGen space
at java.lang.ClassLoader.defineClass1(Native Method)
at java.lang.ClassLoader.defineClassCond(ClassLoader.java:631)
at java.lang.ClassLoader.defineClass(ClassLoader.java:615)
at java.security.SecureClassLoader.defineClass(SecureClassLoader.java:141)
at java.net.URLClassLoader.defineClass(URLClassLoader.java:283)
at java.net.URLClassLoader.access$000(URLClassLoader.java:58)
at java.net.URLClassLoader$1.run(URLClassLoader.java:197)
at java.security.AccessController.doPrivileged(Native Method)
at java.net.URLClassLoader.findClass(URLClassLoader.java:190)
at org.codehaus.plexus.classworlds.realm.ClassRealm.loadClassFromSelf(ClassRealm.java:386)
codehaus.plexus.classworlds.strategy.SelfFirstStrategy.loadClass(SelfFirstStrategy.java:42)
at org.codehaus.plexus.classworlds.realm.ClassRealm.loadClass(ClassRealm.java:244)
at org.codehaus.plexus.classworlds.realm.ClassRealm.loadClass(ClassRealm.java:230)
at org.apache.maven.cli.MavenCli.execute(MavenCli.java:545)
at org.apache.maven.cli.MavenCli.doMain(MavenCli.java:196)
at org.apache.maven.cli.MavenCli.main(MavenCli.java:141)
at sun.reflect.NativeMethodAccessorImpl.invoke0(Native Method)
at sun.reflect.NativeMethodAccessorImpl.invoke(NativeMethodAccessorImpl.java:39)
at sun.reflect.DelegatingMethodAccessorImpl.invoke(DelegatingMethodAccessorImpl.java:25)
at java.lang.reflect.Method.invoke(Method.java:597)
at org.codehaus.plexus.classworlds.launcher.Launcher.launchEnhanced(Launcher.java:290)
at org.codehaus.plexus.classworlds.launcher.Launcher.launch(Launcher.java:230)
at org.codehaus.plexus.classworlds.launcher.Launcher.mainWithExitCode(Launcher.java:409)
at org.codehaus.plexus.classworlds.launcher.Launcher.main(Launcher.java:352)
</pre>

### 解决方案
我们可以通过设置MaxPermSize,和XX:PermSize来解决这个问题,一般这两个参数是结合Xmx,Xms来设置,只需要将Tomcat或者Java运行环境设置如下参数即可：

<pre id="bash">
JAVA_OPTS="-Djava.awt.headless=true -Dfile.encoding=UTF-8 
-server -Xms1536m -Xmx1536m
-XX:NewSize=256m -XX:MaxNewSize=256m -XX:PermSize=256m 
-XX:MaxPermSize=256m -XX:+DisableExplicitGC" 
</pre>
