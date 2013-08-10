--- 
layout: post
title: Linux wget 详解 
tags: 
- Ubuntu
- linux
- wget详解
categories:
- linux
- code
- archives
UUID: 201212011036
date: 2012-12-01
---

Wget是一个十分常用命令行下载工具，多数Linux发行版本都默认包含这个工具。如果没有安装可在<a href="http: //www.gnu.org/software/wget/wget.html"> http: //www.gnu.org/software/wget/wget.html</a> 下载最新版本.

###安装
<pre id="bash">
$ tar zxvf wget-1.9.1.tar.gz 
$ cd wget-1.9.1 
$ ./configure 
$ make 
$ make install 
</pre>

###使用方法
wget虽然功能强大，但是使用起来还是比较简单的，基本的语法是：wget [参数列表] URL
<ol>
<li>支持断点下传功能；这一点，也是网络蚂蚁和FlashGet当年最大的卖点，现在，Wget也可以使用此功能，那些网络不是太好的用户可以放心了；</li>
<li>同时支持FTP和HTTP下载方式；尽管现在大部分软件可以使用HTTP方式下载，但是，有些时候，仍然需要使用FTP方式下载软件；</li>
<li>支持代理服务器；对安全强度很高的系统而言，一般不会将自己的系统直接暴露在互联网上，所以，支持代理是下载软件必须有的功能；</li>
<li>设置方便简单；可能，习惯图形界面的用户已经不是太习惯命令行了，但是，命令行在设置上其实有更多的优点，最少，鼠标可以少点很多次，也不要担心是否错点鼠标；</li>
<li>程序小，完全免费；程序小可以考虑不计，因为现在的硬盘实在太大了；完全免费就不得不考虑了，即使网络上有很多所谓的免费软件，但是，这些软件的广告却不是我们喜欢的；</li>
</ol>

###示例
####下载整个http或者ftp站点
<pre id="bash">
$ wget http://place.your.url/here
</pre>
这个命令可以将http://place.your.url/here 首页下载下来。使用-x会强制建立服务器上一模一样的目录，如果使用-nd参数，那么服务器上下载的所有内容都会加到本地当前目录。
<pre id="bash">
$ wget -r http://place.your.url/here
</pre>
这个命令会按照递归的方法，下载服务器上所有的目录和文件，实质就是下载整个网站。这个命令一定要小心使用，因为在下载的时候，被下载网站指向的所有地址 同样会被下载，因此，如果这个网站引用了其他网站，那么被引用的网站也会被下载下来！基于这个原因，这个参数不常用。可以用-l number参数来指定下载的层次。例如只下载两层，那么使用-l 2。

要是您想制作镜像站点，那么可以使用－m参数，例如：wget -m http://place.your.url/here
这时wget会自动判断合适的参数来制作镜像站点。此时，wget会登录到服务器上，读入robots.txt并按robots.txt的规定来执行。
###断点续传
当文件特别大或者网络特别慢的时候，往往一个文件还没有下载完，连接就已经被切断，此时就需要断点续传。wget的断点续传是自动的，只需要使用-c参数，例如：
<pre id="bash">
$ wget -c http://the.url.of/incomplete/file
</pre>
使用断点续传要求服务器支持断点续传。-t参数表示重试次数，例如需要重试100次，那么就写-t 100，如果设成-t 0，那么表示无穷次重试，直到连接成功。-T参数表示超时等待时间，例如-T 120，表示等待120秒连接不上就算超时
###批量下载
如果有多个文件需要下载，那么可以生成一个文件，把每个文件的URL写一行，例如生成文件download.txt，然后用命令：
<pre id="bash">
$ wget -i download.txt
</pre>
这样就会把download.txt里面列出的每个URL都下载下来。（如果列的是文件就下载文件，如果列的是网站，那么下载首页）
###选择性的下载
可以指定让wget只下载一类文件，或者不下载什么文件。例如：
<pre id="bash">
$ wget -m –reject=gif http://target.web.site/subdirectory$ 
</pre>
表示下载http://target.web.site/subdirectory，但是忽略gif文件。–accept=LIST 可以接受的文件类型，–reject=LIST拒绝接受的文件类型。
###密码和认证
wget只能处理利用用户名/密码方式限制访问的网站，可以利用两个参数：
<pre id="bash">
–http-user=USER设置HTTP用户
–http-passwd=PASS设置HTTP密码
</pre>
对于需要证书做认证的网站，就只能利用其他下载工具了，例如curl。
###利用代理服务器进行下载。
如果用户的网络需要经过代理服务器，那么可以让wget通过代理服务器进行文件的下载。此时需要在当前用户的目录下创建一个.wgetrc文件。文件中可以设置代理服务器：
<pre id="bash">
http-proxy = 111.111.111.111:8080
ftp-proxy = 111.111.111.111:8080
</pre>
分别表示http的代理服务器和ftp的代理服务器。如果代理服务器需要密码则使用：
<pre>
–proxy-user=USER设置代理用户
–proxy-passwd=PASS设置代理密码
</pre>
这两个参数。
使用参数–proxy=on/off 使用或者关闭代理。
wget还有很多有用的功能，需要用户去挖掘。

###可根据需要选择用下面的参数：
<pre>
$ wget -c -r -nd -np -k -L -p -A c,h www.xxx.org/pub/path/
</pre>
-c   断点续传
-r   递归下载，下载指定网页某一目录下（包括子目录）的所有文件
-nd 递归下载时不创建一层一层的目录，把所有的文件下载到当前目录
-np 递归下载时不搜索上层目录，如wget -c -r www.xxx.org/pub/path/
没有加参数-np，就会同时下载path的上一级目录pub下的其它文件
-k   将绝对链接转为相对链接，下载整个站点后脱机浏览网页，最好加上这个参数
-L   递归时不进入其它主机，如wget -c -r www.xxx.org/ 如果网站内有一个这样的链接：
www.yyy.org，不加参数-L，就会像大火烧山一样，会递归下载www.yyy.org网站
-p   下载网页所需的所有文件，如图片等
-A   指定要下载的文件样式列表，多个样式用逗号分隔
-i   后面跟一个文件，文件内指明要下载的URL

###附录 

####命令格式
<pre id="bash">
wget [参数列表] [目标软件、网页的网址]
-V 版本信息
-h 帮助信息
-b 后台执行Wget
-o filename 把记录放在文件filename
-a filename 把记录附加在文件filename
-d 显示调试信息
-q 无输出下载方式
-v 详细的屏幕输出（默认）
-nv 简单的屏幕输出
-i inputfiles 从文本文件内读取地址列表
-F forcehtml 从html文件内读取地址列表
-t number number次重试下载(0时为无限次)
-O output document file 写文件到文件
-nc 不覆盖已有的文件
-c 断点下传
-N 时间时间戳。该参数指定wget只下载更新的文件，也就是说，与本地目录中的对应文件的长度和最后修改日期一样的文件将不被下载。
-S 显示服务器响应
-T timeout 超时时间设置(单位秒)
-w time 重试延时(单位秒)
-Y proxy=on/off 是否打开代理
-Q quota=number 重试次数
</pre>
###目录:
<pre id="bash">
-nd –no-directories 不建立目录.
-x, –force-directories 强制进行目录建立的工作.
-nH, –no-host-directories 不建立主机的目录.
-P, –directory-prefix=PREFIX 把档案存到 PREFIX/…
–cut-dirs=NUMBER 忽略 NUMBER 个远端的目录元件.
</pre>
###HTTP 选项
<pre id="bash">
–http-user=USER 设 http 使用者为 USER.
–http0passwd=PASS 设 http 使用者的密码为 PASS.
-C, –cache=on/off 提供/关闭快取伺服器资料 (正常情况为提供).
–ignore-length 忽略 `Content-Length’ 标头栏位.
–proxy-user=USER 设 USER 为 Proxy 使用者名称.
–proxy-passwd=PASS 设 PASS 为 Proxy 密码.
-s, –save-headers 储存 HTTP 标头成为档案.
-U, –user-agent=AGENT 使用 AGENT 取代 Wget/VERSION 作为识别代号.
</pre>
###FTP 选项
<pre id="bash">
–retr-symlinks 取回 FTP 的象徵连结.
-g, –glob=on/off turn file name globbing on ot off.
–passive-ftp 使用 “passive” 传输模式.
</pre>
###使用递回方式的取回
<pre id="bash">
-r, –recursive 像是吸入 web 的取回 — 请小心使用!.
-l, –level=NUMBER 递回层次的最大值 (0 不限制).
–delete-after 删除下载完毕的档案.
-k, –convert-links 改变没有关连的连结成为有关连.
-m, –mirror 开启适合用来映射的选项.
-nr, –dont-remove-listing 不要移除 `.listing’ 档.
</pre>
###递回式作业的允许与拒绝选项:
<pre id="bash">
-A, –accept=LIST 允许的扩充项目的列表
. -R, –reject=LIST 拒绝的扩充项目的列表.
-D, –domains=LIST 允许的网域列表.
–exclude-domains=LIST 拒绝的网域列表 (使用逗号来分隔).
-L, –relative 只跟随关联连结前进.
–follow-ftp 跟随 HTML 文件里面的 FTP 连结.
-H, –span-hosts 当开始递回时便到外面的主机.
-I, –include-directories=LIST 允许的目录列表.
-X, –exclude-directories=LIST 排除的目录列表.
-nh, –no-host-lookup 不透过 DNS 查寻主机.
-np, –no-parent 不追朔到起源目录.
</pre>
