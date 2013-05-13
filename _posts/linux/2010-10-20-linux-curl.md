--- 
layout: post
title: Linux curl 详解 
tags: 
- shell
- linux
categories:
- linux
- code
UUID: 201010201136
date: 2010-10-20
---

Linux下载工具Curl也是Linux下不错的命令行下载工具，小巧、高速，唯一的缺点是不支持多线程下载。以下是他的安装和功能。

###安装
<pre id="bash">
$ tar zxvf curl-7.14.0.tar.gz  
$ cd curl-7.14.0/  
$ ./configure  
$ make  
$ make test  
$ make install
</pre>
###参数详情
<table style="width:580px">
  <tbody>
    <tr>
      <th>参数:</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>-M/--manual</hd>
      <td>
      显示全手动
      </td>
    </tr>
    <tr>
      <td>-n/--netrc</hd>
      <td> 
       从netrc文件中读取用户名和密码
      </td>
    </tr>
    <tr>
      <td>
      --netrc-optional
      </hd>
      <td> 
      使用 .netrc 或者 URL来覆盖-n
      </td>
    </tr>
    <tr>
      <td>
       --ntlm
      </hd>
      <td> 
      使用 HTTP NTLM 身份验证
      </td>
    </tr>
    <tr>
      <td>
       -N/--no-buffer
      </hd>
      <td> 
      禁用缓冲输出
      </td>
    </tr>
    <tr>
      <td>
      -o/--output
      </hd>
      <td> 
       把输出写到该文件中
      </td>
    </tr>
    <tr>
      <td>
        -O/--remote-name
      </hd>
      <td> 
       把输出写到该文件中，保留远程文件的文件名
      </td>
    </tr>
    <tr>
      <td>
       -p/--proxytunnel
      </hd>
      <td> 
      使用HTTP代理
      </td>
    </tr>
    <tr>
      <td>
      --proxy-anyauth
      </hd>
      <td> 
       选择任一代理身份验证方法
      </td>
    </tr>
    <tr>
      <td>
      --proxy-basic
      </hd>
      <td> 
      在代理上使用基本身份验证
      </td>
    </tr>
    <tr>
      <td>
      --proxy-digest
      </hd>
      <td> 
       在代理上使用数字身份验证
      </td>
    </tr>
    <tr>
      <td>
       --proxy-ntlm
      </hd>
      <td> 
      在代理上使用ntlm身份验证
      </td>
    </tr>
    <tr>
      <td>
      -P/--ftp-port <address>
      </hd>
      <td> 
      使用端口地址，而不是使用PASV
      </td>
    </tr>
    <tr>
      <td>
      -Q/--quote <cmd>
      </hd>
      <td> 
      文件传输前，发送命令到服务器
      </td>
    </tr>
    <tr>
      <td>
       -r/--range <range>
      </hd>
      <td> 
      检索来自HTTP/1.1或FTP服务器字节范围
      </td>
    </tr>
    <tr>
      <td>
      --range-file  
      </hd>
      <td> 
      读取（SSL）的随机文件
      </td>
    </tr>
    <tr>
      <td>
       -R/--remote-time
      </hd>
      <td> 
      在本地生成文件时，保留远程文件时间
      </td>
    </tr>   
    <tr>
      <td>
      --retry <num>
      </hd>
      <td> 
      传输出现问题时，重试的次数
      </td>
    </tr>
    <tr>
      <td>
      --retry-delay <seconds>
      </hd>
      <td> 
      传输出现问题时，设置重试间隔时间
      </td>
    </tr>
    <tr>
      <td>
      --retry-max-time <seconds>
      </hd>
      <td> 
      传输出现问题时，设置最大重试时间
      </td>
    </tr>
    <tr>
      <td>
      -s/--silent
      </hd>
      <td> 
      静音模式。不输出任何东西
      </td>
    </tr>
    <tr>
      <td>
      -S/--show-error
      </hd>
      <td> 
      显示错误
      </td>
    </tr>
    <tr>
      <td>
      --socks4 <host[:port]>
      </hd>
      <td> 
      用socks4代理给定主机和端口
      </td>
    </tr>	
    <tr>
      <td>
      --socks5 <host[:port]>
      </hd>
      <td> 
      用socks5代理给定主机和端口
      </td>
    </tr>
    <tr>
      <td>
       -t/--telnet-option <OPT=val>
      </hd>
      <td> 
      Telnet选项设置
      </td>
    </tr>
    <tr>
      <td>
      --trace <file>
      </hd>
      <td> 
      对指定文件进行debug
      </td>
    </tr>
    <tr>
      <td>
       --trace-ascii <file> Like
      </hd>
      <td> 
      跟踪但没有hex输出
      </td>
    </tr>
    <tr>
      <td>
      --retry-delay <seconds>
      </hd>
      <td> 
      传输出现问题时，设置重试间隔时间
      </td>
    </tr>
    <tr>
      <td>
      --trace-time
      </hd>
      <td> 
       跟踪/详细输出时，添加时间戳
      </td>
    </tr>
    <tr>
      <td>
      -T/--upload-file <file>
      </hd>
      <td> 
      上传文件
      </td>
    </tr>
    <tr>
      <td>
       --url <URL>
      </hd>
      <td> 
      Spet URL to work with
      </td>
    </tr>
    <tr>
      <td>
       -u/--user <user[:password]>
      </hd>
      <td> 
       设置服务器的用户和密码
      </td>
    </tr>
    <tr>
      <td>
       -U/--proxy-user <user[:password]>
      </hd>
      <td> 
      设置代理用户名和密码
      </td>
    </tr>
    <tr>
      <td>
        -V/--version
      </hd>
      <td> 
      显示版本信息
      </td>
    </tr>
    <tr>
      <td>
        -w/--write-out [format]
      </hd>
      <td> 
      什么输出完成后
      </td>
    </tr>
    <tr>
      <td>
       -x/--proxy <host[:port]>
      </hd>
      <td> 
      在给定的端口上使用HTTP代理
      </td>
    </tr>
    <tr>
      <td>
       -X/--request <command>
      </hd>
      <td> 
      指定什么命令
      </td>
    </tr>
    <tr>
      <td>
        -y/--speed-time
      </hd>
      <td> 
       放弃限速所要的时间。默认为30
      </td>
    </tr>
    <tr>
      <td>
      -Y/--speed-limit
      </hd>
      <td> 
      停止传输速度的限制，速度时间秒
      </td>
    </tr>
    <tr>
      <td>
        -z/--time-cond
      </hd>
      <td> 
      传送时间设置
      </td>
    </tr>
  </tbody>
</table>
###常用curl实例 
抓取页面内容到一个文件中
<pre id="bash">
$ curl -o home.html  http://www.sina.com.cn 
</pre>
用-O（大写的），后面的url要具体到某个文件，不然抓不下来。我们还可以用正则来抓取东西 
<pre id="bash">
$ curl -O http://www.it415.com/czxt/linux/25002_3.html 
</pre>
模拟表单信息，模拟登录，保存cookie信息 
<pre id="bash">
$ curl -c ./cookie_c.txt -F log=aaaa -F pwd=****** http://blog.51yip.com/wp-login.php 
</pre>
模拟表单信息，模拟登录，保存头信息 
<pre id="bash">
$ curl -D ./cookie_D.txt -F log=aaaa -F pwd=****** http://blog.51yip.com/wp-login.php 
#-c(小写)产生的cookie和-D里面的cookie是不一样的
</pre>
使用cookie文件
<pre id="bash">
$ curl -b ./cookie_c.txt  http://blog.51yip.com/wp-admin 
</pre>
断点续传，-C(大写的)
<pre id="bash">
$ curl -C -O http://www.sina.com.cn 
</pre>
传送数据,最好用登录页面测试，因为你传值过去后，curl回抓数据，你可以看到你传值有没有成功
<pre id="bash">
$ curl -d log=aaaa  http://blog.51yip.com/wp-login.php 
</pre>
显示抓取错误
<pre id="bash">
$ curl -f http://www.sina.com.cn/asdf 
#curl: (22) The requested URL returned error: 404
</pre>
伪造来源地址，有的网站会判断，请求来源地址 
<pre id="bash">
$  curl -e http://localhost http://www.sina.com.cn 
</pre>
当我们经常用curl去搞人家东西的时候，人家会把你的IP给屏蔽掉的,这个时候,我们可以用代理 
<pre id="bash">
$ curl -x 10.10.90.83:80 -o home.html http://www.sina.com.cn 
</pre>
比较大的东西，我们可以分段下载
<pre id="bash">
$  curl -r 0-100 -o img.part1 http://i2.f.itc.cn/thumb/180/bj/6018/b_60178154.jpg 
</pre>
不显示下载进度信息
<pre id="bash">
$  curl -s -o aaa.jpg  
</pre>
显示下载进度条
<pre id="bash">
$  curl -# -O  http://www.it415.com/czxt/linux/25002_3.html  
</pre>
通过ftp下载文件
<pre id="bash">
$  curl -u 用户名:密码 -O http://blog.51yip.com/demo/curtain/bbstudy_files/style.css 
</pre>
通过ftp上传 
<pre id="bash">
$  curl -T xukai.php ftp://xukai:test@192.168.242.144:21/www/focus/enhouse/
</pre>


