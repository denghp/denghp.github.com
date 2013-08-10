---
layout: post
title: sudo apt-get 命令大全
categories:
- linux
- archives
tags:
- 安全
- linux
- apt-get
UUID: 201103152255
---

apt-get是一条linux命令，适用于deb包管理式的操作系统，主要用于自动从互联网的软件仓库中搜索、安装、升级、卸载软件或操作系统。

###apt命令用法
<pre id="bash">
$ apt-cache search # ------(package 搜索包)
$ apt-cache show #------(package 获取包的相关信息，如说明、大小、版本等)
$ sudo apt-get install # ------(package 安装包)
$ sudo apt-get install # -----(package - - reinstall 重新安装包)
$ sudo apt-get -f install # -----(强制安装?#"-f = --fix-missing"当是修复安装吧...)
$ sudo apt-get remove #-----(package 删除包)
$ sudo apt-get remove --purge # ------(package 删除包，包括删除配置文件等)
$ sudo apt-get autoremove --purge # ----(package 删除包及其依赖的软件包+配置文件等（只对6.10有效，强烈推荐）)
$ sudo apt-get update #------更新源
$ sudo apt-get upgrade #------更新已安装的包
$ sudo apt-get dist-upgrade # ---------升级系统
$ sudo apt-get dselect-upgrade #------使用 dselect 升级
$ apt-cache depends #-------(package 了解使用依赖)
$ apt-cache rdepends # ------(package 了解某个具体的依赖?#当是查看该包被哪些包依赖吧...)
$ sudo apt-get build-dep # ------(package 安装相关的编译环境)
$ apt-get source #------(package 下载该包的源代码)
$ sudo apt-get clean && sudo apt-get autoclean # --------清理下载文件的存档 && 只清理过时的包
$ sudo apt-get check #-------检查是否有损坏的依赖
</pre>
###apt-get install
apt-get install <package>
下载 <package> 以及所有倚赖的包裹,同时进行包裹的安装或升级.如果某个包裹被设置了 hold (停止标志,就会被搁在一边(即不会被升级).更多 hold 细节请看下面.
###apt-get update
升级来自 Debian 镜像的包裹列表,如果你想安装当天的任何软件,至少每天运行一次,而且每次修改了/etc/apt/sources.list 后,必须执行.
###apt-get upgrade [-u]
升 级所以已经安装的包裹为最新可用版本.不会安装新的或移除老的包裹.如果一个包改变了倚赖关系而需要安装一个新的包裹,那么它将不会被升级,而是标志为 hold .apt-get update 不会升级被标志为 hold 的包裹 (这个也就是 hold 的意思).请看下文如何手动设置包裹为 hold .我建议同时使用 '-u' 选项,因为这样你就能看到哪些包裹将会被升级.
###apt-get dist-upgrade [-u]
和 apt-get upgrade 类似,除了 dist-upgrade 会安装和移除包裹来满足倚赖关系.因此具有一定的危险性.
###apt-get remove [--purge] <package>
移除 <package> 以及任何倚赖这个包裹的其它包裹.--purge 指明这个包裹应该被完全清除 (purged) ,更多信息请看 dpkg -P .
###apt-cache search <pattern>
搜索满足 <pattern> 的包裹和描述.
###apt-cache show <package>
显示 <package> 的完整的描述.
###apt-cache showpkg <package>
显示 <package> 许多细节,以及和其它包裹的关系.
###杂谈
<pre id="bash">
$ sudo apt-get install ntfs-3g ntfs-config #ntfs写入支持，装完后运行ntfs-config,把两个钩打上即可。楼下方法作废
$ sudo apt-get install googleearth googlizer gtalk#google相关，skyx友情提示:不推荐马甲 gtalk
$ sudo apt-get install ghex #GNOME 上的十六进制文件编辑器
$ sudo apt-get install kvm #Full virtualization on x86 hardware 推荐
$ sudo apt-get install vmware-player #Free virtual machine player from VMware
$ sudo apt-get install makeself #utility to generate self-extractable archives
$ sudo apt-get install sun-java6-jre#安装JAVA6环境
$ sudo apt-get install sun-java6-jdk #安装JAVA6环境#
$ sudo update-alternatives --config java#设定JAVA环境
$ sudo apt-get install rox-filer#一个简单的文件管理软件
$ sudo apt-get install socks4-server socks4-clients #一个socks 代理服务器/soks4代理客户端
$ sudo apt-get install mc #类似norton commander 工具，skyx 吐血推荐
$ sudo apt-get install liferea #超强的rss reader ，明显比akregator好用， 由zhuqin_83吐血推荐
$ sudo apt-get install axel-kapt gwget aria2#多线程下载工具,也可在论坛search 超强工具prozilla，由雕啸长空吐血推荐
$ sudo apt-get install privoxy tor mixmaster anon-proxy socat#突破风锁线和雁过无痕
$ sudo apt-get install kdebluetooth #超简单的ubuntu与蓝牙手机互传文件工具
$ sudo apt-get install build-essential #build-essential
$ sudo apt-get install proxychains #一个socks4 socks5代理软件 ，可以支持apt-get代理
$ sudo apt-get install language-support-zh language-pack-zh#安装中文语言支持
$ sudo apt-get install rxvt yakuake tilda kuake konsole multi-gnome-terminal pyqonsole #几个终端
$ sudo apt-get install viewglob #一个shell相关的工具
$ sudo apt-get install nautilus-open-terminal #在右键菜单中加入打开终端
$ sudo apt-get instll eva amsn wengophone skype licq #安装im语音视频聊天软件
$ sudo apt-get install beryl emerald emerald-themes#安装beryl
$ sudo apt-get install pcmanx-gtk2 qterm mozilla-plugin-pcmanx #安装bbs 客户端
$ sudo apt-get install gkrell* #很好的一个东东，装了就知道了
$ sudo apt-get install conky# 有意思的一个系统monitor
$ sudo apt-get install nmapfe #nmap前端
$ sudo apt-get install meld #一个文件、目录比较器
$ sudo apt-get install imagemagick# e大力推荐的批量修改图片的软件，现在论坛个别人在搞个人崇拜
$ sudo apt-get install kolourpaint #又一个画图软件
$ sudo apt-get install tuxpaint #好玩的画图软件
$ sudo apt-get install kompare # 又一个文件比较器
$ sudo apt-get install gnome-commander #gnome 上类似Total commander的工具
$ sudo apt-get install krusader #kde 上类似Total commander的工具
$ sudo sudo apt-get install bum #系统服务管理软件
$ sudo apt-get install rbot # ruby写的irc bot
$ sudo apt-get install sysv-rc-conf #一款基于perl的开机进程调整工具,sysv-rc-conf执行命令即可
$ sudo apt-get install rcconf # Debian Runlevel configuration tool
$ sudo apt-get install rar unrar p7zip* #安装rar 7zip
$ sudo apt-get install rpm alien #安装rpm支持
$ sudo apt-get install xpdf xpdf-chinese-simplified #安装pdf查看软件
$ sudo apt-get install xchm xpdf-chinese* #安装chm查看软件
$ sudo apt-get install gqview #一个图片浏览器
$ sudo apt-get install gnomebaker k3b#安装刻录软件
$ sudo apt-get install brasero #gnome上的刻录软件
$ sudo apt-get install ksnapshot #一个抓屏程序
$ sudo apt-get install kinstaller #application installer
$ sudo apt-get install vncserver #vncserver,vncview默认已经安装了
$ sudo apt-get install tightvncserver tightvnc-java #另一个vnc
$ sudo apt-get install apt-build #frontend to apt to build, optimize and install packages
$ sudo apt-get install vim-full #vim无法高亮显示,然后编辑 /etc/vim/vimrc,取消syntax on前面的"注释符号
$ sudo apt-get install firestarter #图形接口的防火墙设定程序
$ sudo apt-get install smbfs #smbfs挂载支持
$ sudo apt-get install flashplugin-nonfree #安装浏览器Flash插件
$ sudo apt-get install gftp kftpgrabber filezilla kasablanca#安装ftp客户端
$ sudo apt-get install sun-java5-jdk #安装Java环境
$ sudo apt-get install sun-java5-plugin #安装Java环境
$ sudo apt-get install build-essential # 安装编译环境
$ sudo apt-get install yum rpm #redhat相关
$ sudo apt-get install mysql-client mysql-server #安装mysql服务
$ sudo apt-get install kde-i18n-zhcn kde-i18n-zhtw#k程序中文支持，很讨厌kde ,但不太讨厌qt程序可以这样装
$ sudo apt-get install qt4-qtconfig#qt4 gui配制工具, 如字体等，很讨厌kde ,但不太讨厌qt程序可以这样装
$ sudo apt-get install kcontrol #k程序gui配制工具，很讨厌kde ,但不太讨厌qt程序可以这样装
$ sudo apt-get apache2 mysql-server php4 php4-gd php4-mysql #安装LAMP
$ sudo apt-get install sysstat #安装sar, iostat and mpstat
$ sudo apt-get install nmap #网络端口扫描工具
$ sudo apt-get install nfs-common #nfs
$ sudo apt-get install samba nfs-kernel-server #samba
$ sudo apt-get install xvidcap gnome-splashscreen-manager #安装屏幕视频录制 / splash 管理
$ sudo apt-get install istanbul #Desktop session recorder
$ sudo apt-get install sysinfo xsysinfo#系统信息查看
</pre>
###网络 
<pre id="bash">
sudo apt-get install d4x //这是linux上的flashget，在apt中可以找到
$ sudo apt-get install amule //这是linux上的emule，在apt中可以找到
$ sudo apt-get install eva //这是linux下的qq，只不过狡猾的腾讯修改了协议，用了eva以后再用就必须输入验证码才能进入
$ sudo apt-get install tor privoxy //匿名动态代理，与之类似的还有JAP和freedom，据说freedom速度更快一些
$ sudo apt-get install liferea //一个GTK的离线RSS阅读器
$ sudo apt-get install curl //一个利用URL语法在命令行下工作的文件传输工具
</pre>
###系统 
<pre id="bash">
$ sudo apt-get install rar //安装rar支持，装了以后，压缩包管理器就可以支持rar格式了
$ sudo apt-get install bum //一个不错的安装系统启动程序管理器
$ sudo apt-get install xpdf-chinese-simplified  //xpdf的中文字体支持，
#不过经过试用，貌似乱码依旧，这个问题可以参考ubuntu 下Evince看pdf文档的乱码解决方案 
$ sudo apt-get install gnome-commander //类似norton-commander的文件管理器，功能还不错，比较适合用惯了norton-commander的用户
$ sudo apt-get install nautilus-open-terminal //在nautilus的右键菜单里打开终端，要重登录才起效
$ sudo apt-get install nautilus-gksu //在nautilus中以管理员身份打开，要重登录才起效
$ sudo apt-get install ntp //系统时间与internet时间保持同步
$ sudo apt-get install meld //基于gonme的目录差异比较工具，可以比较文件夹和文件的变化
$ sudo apt-get install enca //一个非常不错的编码转换工具
$ sudo apt-get install keepassx //一个密码管理软件，具有windows版本和linux版本
$ sudo apt-get gparted //图形化分区工具
$ sudo apt-get install gcolor2 //一个不错的基于gtk的图形化吸取颜色的工具。
$ sudo apt-get install unison-gtk //一个基于gtk的文件和目录同步工具，具有比较和合并功能。
$ sudo apt-get install conduit //一个很牛的资源同步工具，可以同步网络相册，文件夹，邮件、照片等等资源，非常牛X
$ sudo apt-get install manpages-zh //中文man手册，linux操作系统的必备资料
</pre>
###多媒体 
<pre id="bash">
sudo apt-get install ksnapshot //抓图工具
$ sudo apt-get install ogle ogle-gui  //dvd 播放器
$ sudo apt-get install mkisofs //貌似是和刻录光盘有关
$ sudo apt-get install wink //一个屏幕录像工具，可以用来制作视频教程
$ sudo apt-get install gsopcast //一个网络电视
$ sudo apt-get install gonmebaker //一个gonme下的刻录光盘软件
$ sudo apt-get install isomaster //一个管理和生成ISO镜像的小工局，可以提取、修改、删除添加文件，功能挺全的。
$ sudo apt-get krita //一个小巧的图像编辑软件，比GIMP小巧，但功能对付一般的照片修改已经足够了。
$ sudo apt-get install xaralx imagemagick //一个巨好的免费矢量图绘制工具，功能不是一般的强，windows下收费，linux下免费。
$ sudo apt-get install gnome-subtitles //linux下的divx电影的字幕调校工具，可视化的哦
</pre>

