---
layout: post
title: Linux系统监控工具之vmstat详解
tags: 
- vmstat
- linux
- 系统监控
categories:
- code
- 系统监控
UUID: 20130516002000
date: 2013-05-16 00:20:00
---

　　vmstat是一个查看虚拟内存（Virtual Memory）使用状况的工具，使用vmstat命令可以得到关于进程、内存、内存分页、堵塞IO、traps及CPU活动的信息。本文介绍了虚拟内存的运行原理，继而介绍了vmstat的用法和使用范例。

###参数详细介绍
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
      -a
      </hd>
      <td>
      显示活跃和非活跃内存
      </td>
    </tr>
    <tr>
      <td>
      -f
      </hd>
      <td> 
      显示从系统启动至今的fork数量
      </td>
    </tr>
    <tr>
      <td>
      -m
      </hd>
      <td> 
      显示slabinfo
      </td>
    </tr>
    <tr>
      <td>
      -n
      </hd>
      <td> 
      只在开始时显示一次各字段名称
      </td>
    </tr>
    <tr>
      <td>
      -s
      </hd>
      <td> 
      显示内存相关统计信息及多种系统活动数量。
      </td>
    </tr>
    <tr>
      <td>
      delay
      </hd>
      <td> 
      刷新时间间隔。如果不指定，只显示一条结果。
      </td>
    </tr>
    <tr>
      <td>
      count
      </hd>
      <td> 
      刷新次数。如果不指定刷新次数，但指定了刷新时间间隔，这时刷新次数为无穷。
      </td>
    </tr>
    <tr>
      <td>
      -d
      </hd>
      <td> 
      显示磁盘相关统计信息。
      </td>
    </tr>
    <tr>
      <td>
      -p
      </hd>
      <td> 
      显示指定磁盘分区统计信息
      </td>
    </tr>
    <tr>
      <td>
      -S
      </hd>
      <td> 
      使用指定单位显示。参数有 k 、K 、m 、M ，分别代表1000、1024、1000000、1048576字节（byte）。默认单位为K（1024 bytes）
      </td>
    </tr>
    <tr>
      <td>
       -V
      </hd>
      <td> 
      显示vmstat版本信息
      </td>
    </tr>
</tbody>
</table>

###使用说明
<strong>示例</strong><br>
<code>vmstat 2</code>
<pre id="bash">
procs -----------memory---------- ---swap-- -----io---- --system-- -----cpu-----
 r  b   swpd   free   buff  cache   si   so    bi    bo   in   cs us sy id wa st
 3  0 2406224 9281380 160256 30527940    0    0     2   192    0    0 43  1 56  0  0	
10  0 2406224 9281428 160256 30528192    0    0     4     0 6852 2555 29  0 71  0  0	
16  0 2406224 9280764 160256 30528628    0    0     0  1018 7981 3025 32  0 67  0  0	
 6  0 2406224 9280736 160256 30528884    0    0     0     0 7650 2704 33  0 67  0  0	
 4  0 2406224 9280092 160256 30529224    0    0     0   110 7044 2727 29  0 71  0  0	
 2  0 2406224 9279976 160260 30529504    0    0     0  1136 5914 2822 21  0 79  0  0	
</pre>

<strong>参数说明:</strong><br>
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
       r
      </hd>
      <td>
      运行队列中进程数量
      </td>
    </tr>
    <tr>
      <td>
      b
      </hd>
      <td> 
      等待IO的进程数量
      </td>
    </tr>
    <tr>
      <td>
      swpd
      </hd>
      <td> 
      使用虚拟内存大小,（单位：KB）
      </td>
    </tr>
    <tr>
      <td>
      free
      </hd>
      <td> 
      可用内存大小,（单位：KB）
      </td>
    </tr>
    <tr>
      <td>
      buff
      </hd>
      <td> 
      用作缓冲的内存大小,（单位：KB）
      </td>
    </tr>
    <tr>
      <td>
      cache
      </hd>
      <td> 
      用作缓存的内存大小,（单位：KB）
      </td>
    </tr>
    <tr>
      <td>
      si
      </hd>
      <td> 
      每秒从交换区写到内存的大小,单位：KB/秒。
      </td>
    </tr>
    <tr>
      <td>
      so
      </hd>
      <td> 
      每秒写入交换区的内存大小,单位：KB/秒。
      </td>
    </tr>
    <tr>
      <td>
      bi
      </hd>
      <td> 
      每秒读取的块数,单位：块/秒。
      </td>
    </tr>
    <tr>
      <td>
      bo
      </hd>
      <td> 
      每秒写入的块数,单位：块/秒。
      </td>
    </tr>
    <tr>
      <td>
      in
      </hd>
      <td> 
      每秒中断数，包括时钟中断。
      </td>
    </tr>
    <tr>
      <td>
      cs
      </hd>
      <td> 
      每秒上下文切换数。in,cs这2个值越大，会看到由内核消耗的CPU时间会越多
      </td>
    </tr>
    <tr>
      <td>
      us
      </hd>
      <td> 
      用户进程执行时间(user time)
      </td>
    </tr>
    <tr>
      <td>
      sy
      </hd>
      <td> 
      系统进程执行时间(system time)
      </td>
    </tr>
    <tr>
      <td>
      id
      </hd>
      <td> 
      空闲时间(包括IO等待时间)
      </td>
    </tr>
    <tr>
      <td>
      wa
      </hd>
      <td> 
      等待IO时间
      </td>
    </tr>
</tbody>
</table>

