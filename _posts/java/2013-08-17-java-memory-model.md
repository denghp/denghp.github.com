---
layout: post
title: Java主内存和工作内存
tags:
- java
- memory
- jmm
- 研发实践
categories:
- code
- java
- archives
UUID: 20130817001027
date: 2013-08-17 00:10:27
images: ["/assets/images/java/java-memory-model.jpg"]
---
　　Java内存模型的主要目标是定义程序中各个变量的访问规则，即在虚拟机中将变量存储到内存和从内存中取出变量这样的底层细节。此处的变量（variable）与java编程中所说的变量略有区别，它包括了实例字段、静态字段和构成数组对象的元素，但是不包括局部变量与方法参数，因为后者是线程私有的，不会被共享，自然就不存在竞争问题。

　　Java内存模型规定了所有的变量都存储在主内存中。每条线程还有自己的工作内存，线程的工作内存中保存了被该线程使用到的变量的主内存副本拷贝，线程对变量的所有操作（读取、赋值等）都必须在工作内存中进行，而不能直接读写主内存中的变量。不同的线程之间也无
法直接访问对方工作内存的变量，线程间变量的传递均需要通过主内存来完成，线程、主内存、工作内存三者的交互关系如图：

<a href="{{site.aliyun_oss}}/assets/images/java/java-memory-model.jpg" alt="java-memory-model" target="_bank" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.aliyun_oss}}/assets/images/java/java-memory-model.jpg" width="580px" alt="java-memory-model" class="img-center" />
</a>

这里讲的主内存与工作内存并不是Java内存区域中的Java堆,栈,方法区等不是一个层次的划分。

###内存交互操作
    关于主内存与工作内存之间的具体交互协议，即一个变量如何从主内存拷贝到工作内存，如何从工作内存同步到主内存之类的实现细节。主要有八个步骤：
<code>lock(锁定)</code>:作用于主内存的变量，它把一个变量标识巍峨诶一条线程独占的状态。

<code>unlock(解锁)</code>:作用于主内存的变量，它把一个变量处于锁定状态给释放出来，释放后的变量才能被其他线程锁定。

<code>read(读取)</code>:作用于主内存的变量，它把一个变量的值从主内存传输到线程的工作内存中，以便以后的load操作使用。

<code>load(载入)</code>:作用于工作内存中的变量，它把工作内存中得到的变量值放入工作内存的变量副本中。

<code>use(使用)</code>:作用于工作内存中的变量，它把工作内存中一个变量的值传递给执行引擎，每当虚拟机遇到一个需要使用到变量的值的字节码指令时将会执行这个操作。

<code>assign(赋值)</code>:作用于工作内存中的变量，它把一个从执行引擎接收到的值赋值给工作内存的变量，每当虚拟机遇到一个需要使用到变量的值的字节码指令时将会执行这个操作。

<code>store(存储)</code>:作用于工作内存中的变量，它把工作内存中一个变量的值传递给主内存中，以便随后的write操作使用.

<code>write(写入)</code>:作用于主内存中的变量，它把store操作从工作内存中得到的变量的值放入主内存的变量中。

<strong>注意：</strong>

如果把一个变量从主内存复制到工作内存，那就要按顺序地执行<code>read</code>和<code>load</code>操作,如果要把工作内存变量同步回主内存，
就要按顺序<code>store</code>和<code>write</code>操作。