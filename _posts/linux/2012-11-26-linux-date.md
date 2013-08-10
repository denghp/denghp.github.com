---
layout: post
title: Linux命令 date详解
tags: 
- linux
- shell
- date详解
categories:
- code
- linux
- archives
UUID: 201211261630
date: 2012-11-26
---

date命令可以用来显示和修改系统日期时间，注意不是time命令。

###语法
<pre id="bash">
Usage: date [OPTION]... [+FORMAT]
  or:  date [-u|--utc|--universal] [MMDDhhmm[[CC]YY][.ss]]
</pre>

###常用参数
格式：date 显示当前日期时间</br>
格式：date mmddHHMM   # 简而言之，就是“月日时分”</br>
格式：date mmddHHMMYYYY</br>
格式：date mmddHHMM.SS</br>
格式：date mmddHHMMYYYY.SS</br>
设置当前日期时间，只有root用户才能执行，执行完之后还要执行 clock -w 来同步到硬件时钟。
mm为月份，dd为日期，HH为小时数，MM为分钟数，YYYY为年份，SS为秒数。

格式：date +FORMAT</br>
根据指定格式显示当前时间。比如 date +%Y-%m-%d 就是以 YYYY-mm-dd 的形式显示当前日期，其中YYYY是年份，mm为月份，dd为日期。

### 常用FORMAT
<pre id="wiki">
%Y  YYYY 格式的年份（Year）
%m  mm   格式的月份（），01-12
%d  dd   格式的日期（day of month），01-31
%H  HH   格式的小时数（），00-23
%M  MM   格式的分钟数（），00-59
%S  SS   格式的秒数（），00-59
%F  YYYY-mm-dd 格式的完整日期（Full date），同%Y-%m-%d
%T  HH-MM-SS 格式的时间（Time），同%H:%M:%S
%s  自1970年以来的秒数。C函数time(&t) 或者Java中 System.currentTimeMillis()/1000, new Date().getTime()/1000
%w  星期几，0-6，0表示星期天
%u  星期几，1-7，7表示星期天
</pre>
注意以上格式是可以任意组合的，还可以包括非格式串，比如 date "+今天是%Y-%d-%m，现在是$H:%M:%S"
更多格式 man date 或 info date
 
格式：date -d STRING</br>
格式：date --date=STRING</br>
格式：date -d STRING +FORMAT</br>
显示用STRING指定的日期时间（display time described by STRING, not ‘now’）。
  
格式：date -s STRING</br>
格式：date --set=STRING</br>
设置当前时间为STRING指定的日期时间

###示例
指定日期：
<pre id="bash">
date -d YYYY-mm-dd
</pre>
指定时间，日期是今天：
<pre>
date -d HH:MM:SS
</pre>
指定日期时间：
<pre>
date -d "YYYY-mm-dd HH:MM:SS"
</pre>
指定1970年以来的秒数：
<pre>
date -d '1970-01-01 1251734400 sec utc'      （2009年 09月 01日 星期二 00:00:00 CST）
date -d '1970-01-01 1314177812 sec utc'      （2011年 08月 24日 星期三 17:23:32 CST）
</pre>
今天：
<pre>
date
date -d today
date -d now
</pre>
明天：
<pre>
date -d tomorrow
date -d next-day
date -d next-days
date -d "next day"
date -d "next days"
date -d "+1 day"
date -d "+1 days"
date -d "1 day"
date -d "1 days"
date -d "-1 day ago"
date -d "-1 days ago"
</pre>
昨天：
<pre>
date -d yesterday
date -d last-day
date -d last-days
date -d "last day"
date -d "last days"
date -d "-1 day"
date -d "-1 days"
date -d "1 day ago"
date -d "1 days ago"
</pre>
前天：
<pre>
date -d "2 day ago"
date -d "2 days ago"
date -d "-2 day"
date -d "-2 days"
</pre>
大前天：
<pre>
date -d "3 day ago"
date -d "3 days ago"
date -d "-3 day"
date -d "-3 days"
</pre>
上周，一周前：
<pre>
date -d "1 week ago"
date -d "1 weeks ago"
</pre>
上个星期五（不是上周五）：
<pre>
date -d "last-friday"
date -d "last friday"
</pre>
上月，一月前：
<pre>
date -d last-month
date -d last-months
date -d "-1 month"
date -d "-1 months"
</pre>
下月，一月后：
<pre>
date -d next-month
date -d next-months
date -d "+1 month"
date -d "+1 months"
</pre>
去年，一年前：
<pre>
date -d last-year
date -d last-years
date -d "-1 year"
date -d "-1 years"
</pre>
明年，一年后：
<pre>
date -d next-year
date -d next-years
date -d "+1 year"
date -d "+1 years"
</pre>
一小时前：
<pre>
date -d "last-hour"
date -d "last-hours"
date -d "1 hour ago"
date -d "1 hours ago"
</pre>

###监控进程使用server负载
<pre id="bash">
#记录server load-avg(1m,5m,10m),cpu (user,system),mem (total,used)
echo "current_time : `date '+%F %T'` this crawler rounds $total_rounds pid is $crawl_pid,do runing"
echo "current_time : `date '+%F %T'` this crawler rounds $total_rounds pid is $crawl_pid,do runing" >> $console_log
cpu_info=`top -b  -n 1 | grep  "Cpu(s)" | awk '{print $2 $3}'`
mem_info=`top -b  -n 1 | grep  "Mem" | awk '{print $2,$3,$4,$5}'`
top_info=`top -b  -n 1 | grep  "top -" | awk '{print $8 $9,$10,$11,$12}'`
process_mem=`top -p $crawl_pid -d 1 -b -c  -n 1 | grep $crawl_pid | awk '{print $6}'`
echo "Load-avg : $top_info " >> $console_log
echo "Cpu_info : $cpu_info " >> $console_log
echo "Mem_info : $mem_info " >> $console_log
echo "Pro_use_mem : $process_mem " >> $console_log
echo "Load-avg : $top_info "
echo "Cpu_info : $cpu_info "
echo "Mem_info : $mem_info "
echo "Pro_use_mem  : $process_mem "
</pre>
