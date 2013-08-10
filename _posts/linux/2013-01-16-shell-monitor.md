---
layout: post
title: Shell脚本实现监控指定进程负载
tags: 
- shell
- 监控
- linux
- 研发实践
categories:
- code
- linux
- archives
UUID: 201301160023
---

 　　在Linux下监控的工具还真不少，并且非常强大，各有各的好处，但是也有一定缺陷，要想使其达到自己想要的功能，就得自己花点时间啦。
Linux下大家都知道TOP这个命令工具，可以查看系统的负载。但是却无法将监控的数据存储下来，最近用shell写了一个小程序，对自己有点帮助吧。

###监控程序功能支持
<ol>
<li>基于TOP的工具实现</li>
<li>支持监控系统的负载，并格式化存储到文件中</li>
<li>支持监控单个进程的负载,并格式化存储到文件中</li>
<li>支持时间间隔监控，比如2秒钟监控一次</li>
<li>利用存储的数据,可以生成图表</li>
</ol>

###Shell脚本监控程序代码
<pre id="bash">
#!/bin/sh
#用于监控系统cpu及内存等信息
#用法: mytop [pid] [sleeptime (option)] [log_alias (option)]
#参数：pid (必须)  如果需要监控系统性能，那么请将[pid]设置为0
#      sleeptime (可选) 单位为秒,默认1秒
#      log_alias (可选) 默认为top.log


curr_dir=`pwd`
dir=$curr_dir
log_name=top.log
#sleep time (sec)
sleep_time=1

if [ -z $1 ] ; then
  echo 'Usage: mytop [pid] [sleeptime (option)] [log_alias (option)]'
  echo 'system monitor : [pid] = 0'
  exit "Missing paramters!"
fi

if [ -z $2 ] ; then
 echo "sleep $sleep_time "
  else
    sleep_time=$2
 echo "sleep $sleep_time "
fi

if [ -z $3 ] ; then
 echo "to $log_name "
  else
 log_name=top_$3.log 
 echo "to $log_name "
fi

       if [ "$1" != "0" ] ; then
       echo 'PID USER PR  NI  VIRT RES  SHR S %CPU %MEM TIME+' >> $dir/$log_name
       fi

while true
  do
       if [ "$1" = "0" ] ; then
            nowtime=`date +%Y-%m-%d' '%H:%M:%S`
            echo $nowtime >> $dir/$log_name 
            top -b  -n 1 | grep  "top - \|Tasks\|Cpu(s)\|Mem\|Swap" >> $dir/$log_name
            sleep  $sleep_time
            echo "----------------------------------------------------------" >> $dir/$log_name 
       else
             nowtime=`date +%Y-%m-%d' '%H:%M:%S`
             top -p $1 -d 1 -b -c  -n 1 | grep $1 | awk '{print $1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11}'  >> $dir/$log_name
#             echo $nowtime >> $dir/$log_name 
             sleep  $sleep_time
       fi
  done
</pre>

###存储日志格式
<pre id="bash">
PID USER PR  NI  VIRT RES  SHR S %CPU %MEM TIME+
10515 root 20 0 905m 338m 11m S 92 16.9 0:06.24
10515 root 20 0 905m 248m 11m S 0 12.4 0:06.59
10515 root 20 0 905m 248m 11m S 0 12.4 0:06.59
10515 root 20 0 905m 248m 11m S 0 12.4 0:06.59
10515 root 20 0 905m 248m 11m S 0 12.4 0:06.59
10515 root 20 0 905m 248m 11m S 0 12.4 0:06.60
10515 root 20 0 905m 248m 11m S 0 12.4 0:06.60
10515 root 20 0 905m 248m 11m S 0 12.4 0:06.61
10515 root 20 0 905m 248m 11m S 4 12.4 0:06.63
10515 root 20 0 905m 287m 11m S 107 14.4 0:08.14
10515 root 20 0 905m 364m 11m S 0 18.2 0:08.73
10515 root 20 0 905m 364m 11m S 2 18.2 0:08.74
10515 root 20 0 905m 364m 11m S 0 18.2 0:08.76
10515 root 20 0 905m 364m 11m S 0 18.2 0:08.77
</pre>

###生成报告
这里需要人工手动复制数据到excel中生成图表，呵呵
<img src="{{site.static_url}}/assets/images/linux/mytop.jpg" width="560px"  alt="mytop" ></img>
