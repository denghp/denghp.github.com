---
layout: post
title: Linux培训笔记
categories:
- OS
tags:
- Linux
UUID: 20100731
---

### 一.Shell相关

shell命令在进行运行前都先进行一些必要的替换

echo $PATH 变量替换  
echo * 通配符,比如这里的*,代表当前目录中的所有文件  
反引号` 替换反引号中的命令为其输出 echo `ls`  
alias替换  
shell外部命令调用，fork子进程，和父进程一模一样，在子进程中exec，并将子进程替换，并只继承原来的环境变量，shell进行wait等待子进程结束。  
没有进行export的变量，shell脚本是看不到的  

unix 中，任何命令尽量做成外部命令。  

kill 外部命令内部化，shell一看是kill，就不去fork子进程，就直接帮你做了。  

ELF(Executable and Linkable Format)即可执行连接文件格式，脚本文件u+s是没有用的。
{% highlight bash %}  
#！脚本文件 #！是给内核看的，但是解释器不需要看#！，所以在脚本中#为注解  
{% endhighlight %}
### 二.内存管理相关

用过windows的同学很容易会把虚拟内存理解错了，windows中所谓的虚拟内存其实应该叫做交换内存。  

什么情况下我们才应该认为计算机系统内存不够了呢？  

内存频繁换入换出说明内存不够  

内核会将空闲的部分内存用来做cache和buffer  
cache多 buffer少  

overcommit(过提交) 容易造成OOM killer,可以关闭过提交  

多进程原理，中断处理，保存现场，进到内核，恢复现场的时候内核里可能有很多现场，内核就选一个恢复。信号的实现就是基于中断。  
 
### 三.文件系统相关

一些标识

-普通文件  
d 目录  
l 链接文件  
c 字符文件  
b 块文件   
p 管道文件   
s socket文件  

u+s 执行命令的时候，赋予命令宿主的权限  

bitmap，用来记录文件系统的容量使用情况  
块位图，索引节点位图。  

硬连接 两个文件项指向同一个inode  
符号链接 一个符号链接就是一个文本文件，存了一个字符串 把符号连接的内容替换其，形成一个新的路径。符号连接中写绝对路径。  