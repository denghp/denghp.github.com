---
layout: post
title: Linux find命令实践
tags: 
- linux
- shell
categories:
- linux
- archives
UUID: 201211221050
date: 2012-11-22
---

Linux中查找文件的命令通常为“find”命令，“find”命令能帮助我们在使用,管理Linux的日常事务中方便的查找出我们需要的文件。find是个很强大的命令，能够匹配正则，查找对应权限，能够帮你精确的定位你的系统中的任何地方任何目录下的文件。

###语法
<pre id="bash" >
Usage: find [-H] [-L] [-P] [-Olevel] [-D help|tree|search|stat|rates|opt|exec] [path...] [expression]
</pre>

###find 命令选项
<pre id="wiki" style="width:580px">
-name filename      #查找名为filename的文件
-perm               #按执行权限来查找
-user username      #按文件属主来查找
-group groupname    #按组来查找
-mtime -n +n        #按文件更改时间来查找文件，-n指n天以内，+n指n天以前
-atime -n +n        #按文件访问时间来查
-perm               #按执行权限来查找
-user  username     #按文件属主来查找
-group groupname    #按组来查找
-mtime -n +n     #按文件更改时间来查找文件，-n指n天以内，+n指n天以前
-atime -n +n     #按文件访问时间来查找文件，-n指n天以内，+n指n天以前 
-ctime -n +n     #按文件创建时间来查找文件，-n指n天以内，+n指n天以前 
-nogroup         #查无有效属组的文件，即文件的属组在/etc/groups中不存在
-nouser          #查无有效属主的文件，即文件的属主在/etc/passwd中不存
-newer f1 !f2    #找文件，-n指n天以内，+n指n天以前 
-ctime -n +n     #按文件创建时间来查找文件，-n指n天以内，+n指n天以前 
-nogroup         #查无有效属组的文件，即文件的属组在/etc/groups中不存在
-nouser          #查无有效属主的文件，即文件的属主在/etc/passwd中不存
-newer f1 !f2    #查更改时间比f1新但比f2旧的文件
-type  b/d/c/p/l/f  #查是块设备、目录、字符设备、管道、符号链接、普通文件
-size  n[c]         #查长度为n块[或n字节]的文件
-depth              #使查找在进入子目录前先行查找完本目录
-fstype             #查更改时间比f1新但比f2旧的文件
-type b/d/c/p/l/f   #查是块设备、目录、字符设备、管道、符号链接、普通文件
-size n[c]          #查长度为n块[或n字节]的文件
-depth              #使查找在进入子目录前先行查找完本目录
-mount              #查文件时不跨越文件系统mount点
-follow             #如果遇到符号链接文件，就跟踪链接所指的文件
-mount              #查文件时不跨越文件系统mount点
-follow             #如果遇到符号链接文件，就跟踪链接所指的文件
-cpio               #对匹配的文件使用cpio命令，将他们备份到磁带设备中
-prune              #忽略某个目录
</pre>

###find命令示例
<pre id="bash" style="width:580px">
$find ~ -name "*.txt" -print    #在$HOME中查.txt文件并显示
$find . -name "*.txt" -print
$find . -name "[A-Z]*" -pri26nbsp; 
#对匹配的文件使用cpio命令，将他们备份到磁带设备中
$find ~ -name "*.txt" -print    #在$HOME中查.txt文件并显示
$find . -name "*.txt" -print
$find . -name "[A-Z]*" -print #查以大写字母开头的文件
$find /etc -name "host*" -print #查以host开头的文件
$find . -name "[a-z][a-z][0--9].txt" -print 
#查以两个小写字母和两个数字开头的txt文件
$find . -perm 755 -print
$find . -perm -007 -exec ls -l {} /; #查所有用户都可读写执行的文件同-perm 777
$find . -type d -print
$find . ! -type d -print 
$find . -type l -print
$find . -size +1000000c -print #查长度大于1Mb的文件
$find . -size 100c -print      #查长度为100c的文件
$find . -size +10 -print       #查长度超过期作废10块的文件（1块=512字节）
$find etc home apps -depth -print | cpio -ivcdC65536 -o /dev/rmt0
$find /etc -name "passwd*" -exec grep "cnscn" {} /; #看是否存在cnscn用户
$find . -name "yao*" | xargs file
$find . -name "yao*" | xargs echo   "" < /tmp/core.log
$find . -name "yao*" | xargs chmod o-w
</pre>


<pre id="bash" style="width:580px">
$find -name april*              #在当前目录下查找以april开始的文件
$find -name april* fprint file  
#在当前目录下查找以april开始的文件，并把结果输出到file中
$find -name ap* -o -name may*   #查找以ap或may开头的文件
$find /mnt -name tom.txt -ftype vfat  
#在/mnt下查找名称为tom.txt且文件系统类型为vfat的文件
$find /mnt -name t.txt ! -ftype vfat  
#在/mnt下查找名称为tom.txt且文件系统类型不为vfat的文件
$find /tmp -name wa* -type l    #在/tmp下查找名为wa开头且类型为符号链接的文件
$find /home -mtime -2           #在/home下查最近两天内改动过的文件
$find /home   -atime -1         #查1天之内被存取过的文件
$find /home -mmin   +60         #在/home下查60分钟前改动过的文件
$find /home -amin +30           #查最近30分钟前被存取过的文件
$find /home -newer tmp.txt      #在/home下查更新时间比tmp.txt近的文件或目录
$find /home -anewer tmp.txt     #在/home下查存取时间比tmp.txt近的文件或目录
$find /home -used -2            #列出文件或目录被改动过之后，在2日内被存取过的文件或目录
$find /home -user cnscn         #列出/home目录内属于用户cnscn的文件或目录
$find /home -uid +501           #列出/home目录内用户的识别码大于501的文件或目录
$find /home -group cnscn        #列出/home内组为cnscn的文件或目录
$find /home -gid 501            #列出/home内组id为501的文件或目录
$find /home -nouser             #列出/home内不属于本地用户的文件或目录
$find /home -nogroup            #列出/home内不属于本地组的文件或目录
$find /home -name tmp.txt -maxdepth 4 #列出/home内的tmp.txt 查时深度最多为3层
$find /home -name tmp.txt -mindepth 3 #从第2层开始查
$find /home -empty              #查找大小为0的文件或空目录
$find /home -size +512k         #查大于512k的文件
$find /home -size -512k         #查小于512k的文件
$find /home -links +2           #查硬连接数大于2的文件或目录
$find /home -perm 0700          #查权限为700的文件或目录
$find /tmp -name tmp.txt -exec cat {} /;
$find /tmp -name tmp.txt -ok rm {} /;
$find / -amin -10       #查找在系统中最后10分钟访问的文件
$find / -atime -2       #查找在系统中最后48小时访问的文件
$find / -empty          #查找在系统中为空的文件或者文件夹
$find / -group cat      #查找在系统中属于 groupcat的文件
$find / -mmin -5        #查找在系统中最后5分钟里修改过的文件
$find / -mtime -1       #查找在系统中最后24小时里修改过的文件
$find / -nouser         #查找在系统中属于作废用户的文件
$find / -user fred      #查找在系统中属于FRED这个用户的文件
</pre>

###查当前目录下的所有普通文件
查当前目录下的所有普通文件，并在-exec选项中使用ls -l命令将它们列出
<pre id="bash" style="width:580px">
$find . -type f | xargs ls -lt {}\;
-rw-rw-r-- 1 root root  2245 Nov 19 09:40 ./2008-09-23-java-annotation.md
-rw-rw-r-- 1 root root  1094 Nov 19 09:40 ./2009-04-27-a-python-program.md
-rw-rw-r-- 1 root root  1239 Nov 19 09:40 ./2009-09-09-about-form-get-post.md
-rw-rw-r-- 1 root root  7078 Nov 19 09:40 ./2010-07-21-hash-table.md
</pre>

在/logs目录中查找更改时间在5日以前的文件并删除它们：
<pre id="bash" style="width:580px">
$ find logs -type f -mtime +5 | xargs -ok rm {}\;
</pre>
查询当天修改过的文件
<pre id="bash" style="width:580px">
$find ./ -mtime -1 -type f | xargs ls -l {}\;
</pre>

查询并交给awk去处理
<pre id="bash" style="width:580px">
$ who | awk '{print $1"/t"$2}'
</pre>

Linux字符编码转换
<pre id="bash" style="width:580px">
find default -type d -exec mkdir -p utf/{} \;
find default -type f -exec iconv -f GBK -t UTF-8 {} -o utf/{} \;
</pre>
这两行命令将default目录下的文件由GBK编码转换为UTF-8编码，目录结构不变，转码后的文件保存在utf/default目录下。

从M个文件中查找包含某个字符的文件并移动到另一个目录
<pre id="bash" style="widht:580px">
grep -l "data-thread-key" ./* | xargs -i -i mv {} test/
</pre>
