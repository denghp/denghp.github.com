---
layout: post
title: Ganglia安装配置
tags: 
- Ganglia
- Ubuntu
- 监控
- linux
categories:
- code
- archives
UUID: 201212270050
---

  　　Ganglia是一个集群监控软件，底层使用RRDTool获得数据。Ganglia分为ganglia-monitor和gmetad两部分，前 者运行在集群每个节点上，收集RRDTool产生的数据，后者运行在监控服务器上，收集每个ganglia-monitor的数据，通过Web UI可以看到直观的各种图表。

###Ganglia四大组成部分
####Gmond
  　　gmond负责收集本地机核心指标的基本设置——如CPU使用情况、基础网络和内存数据等。gmond daemons通过多播或单播模式给同一群组的其他gmond daemons发送数据。这样，每个daemon都可在任何时间追踪到全球的计算群组，且每一台均可给gmetad提供完整的数据报告。

####gmetad daemon
  　　gmetad是系统的核心。它从一个或多个gmetad daemon中收集指标，将其存储在RRD文件中留待以后系统恢复之用。gmetad daemon也可以选择其他gmetad来收集其他集成系统的信息。这一过程被称作“联合”，对于分散但有关联的群组，这是了解总体运行状态的有效方式。

####前段数据展示
  　　网络前端构建在PHP上，实际是用来显示数据的。当每一页都已下载完毕，PHP程式需要来自gmetad的相关数据，以便生成需求页。有很 多事先做好的报告，这些报告已提供群组整体运行状态的信息，因此，现在仅将用户报告完成即可。网络前端不像gmetad那样必须在同一台计算机上运行。

####对于不直接支持gmetad的指标
  　　对于不直接支持gmetad的指标，Ganglia和命令行程序gmetric共同追踪附加的指标。这些信息都报告给gmond， gmond可将这些信息和已建立起的统计数据一起传递给gmetad。最新发布的3.1.2版本可通过用c语言或Python语言来编写模块，达到直接扩 展gmond的目的。  

<img src="{{site.static_url}}/assets/images/linux/ganglia-2.jpg" width="380px" alt="ganglia" class="img-center"></img>


###安装步骤
####安装服务、客户端
<pre id="bash">
$ sudo apt-get install ganglia-monitor ganglia-webfrontend
</pre>

###启动服务
####启动gmetad
<pre id="bash">
$ sudo service gmetad start
启动成功：Starting Ganglia Monitor Meta-Daemon: gmetad.
</pre>
####启动ganglia-monitor 
<pre id="bash">
$ sudo service ganglia-monitor start
启动成功 Starting Ganglia Monitor Daemon: gmond
</pre>
####启动apache2
<pre id="bash">
$ sudo /etc/init.d/apache2 restar
</pre>
###验证服务
sysv-rc-conf gmetad on  (ubuntu 下sysv-rc-conf 命令等同redhat 下的chkconfig 命令)
####验证gmetad
<pre id="bash">
$ sysv-rc-conf --list gmetad
GMETAD 0:off 1:off 2:on 3:on 4:on 5:on 6:off 
#验证gmetad 正常工作：telnet localhost 8651就可以得到监控的各个主机的状态。
</pre>
####验证gmond
<pre id="bash">
$ sysv-rc-conf —list gmond 
gmond 0:off 1:off 2:on 3:on 4:on 5:on 6:off
service gmond start Starting GANGLIA gmond: [ OK ]  验证gmond
#正常工作：telnet localhost 8649 就可以获取机群内运行gmond的主机的信息
</pre>

####访问服务
<a href="http://localhost:80/ganglia">http://localhost:80/ganglia</a><br>
有可能无法访问，检查原因可能是因为ganglia-webfront这个包默认将Web相关的代码安装在”/usr/share/ganglia-webfrontend/”路径下，这样apache访问不到。<br>

解决方案：<br>
可以使用软链接，或者直接将目录移到”/var/www/”目录下
<pre id="bash">
$ sudo ln -s /usr/share/ganglia-webfrontend/ /var/www/ganglia
#或者
$ sudo mv /usr/share/ganglia-webfrontend/ /var/www/ganglia
</pre>

###集群环境配置
###服务器端配置
1、修改gmetad.conf 文件
<pre id="bash">
$ sudo vi gmetad.conf
# data_source "my grid" 50 1.3.4.7:8655 grid.org:8651 grid-backup.org:8651  
# data_source "another source" 1.3.4.7:8655  1.3.4.8  
data_source "172.16.205.65" localhost  
data_source "172.16.205.55" 172.16.205.55  
data_source "172.16.205.58" 172.16.205.58  
data_source "172.16.205.64" 172.16.205.64  
data_source "172.16.205.65" 172.16.205.65  
#data_source "172.16.16.25" 172.16.16.25   
</pre>

2、配置集群监控的名称
<pre id="bash">
$ sudo vi gmetad.conf
# tag with this name.  
# default: unspecified  
gridname "cloudsearch"
</pre>

###客户端配置
1、全局配置参数
<pre id="bash">
$sudo vi gmond.conf
globals {
    daemonize = yes              
    setuid = yes             
    user = nobody  
    //必须要与本机gmetad.conf中配置的setuid_username "nobody"一致         
    debug_level = 0               
    max_udp_msg_len = 1472        
    mute = no
    deaf = no
    host_dmax = 0 /*secs */ 
    cleanup_threshold = 300 /*secs */
    gexec = no             
    send_metadata_interval = 0     
} 
</pre>
2、修改监控组名称
<pre id="bash">
cluster { 
  name = "172.16.205.65"  
  //暴露给服务中心的名称default: 8652  
  owner = "unspecified"
  latlong = "unspecified" 
  url = "unspecified" 
} 
</pre>

3、配置完成后重新启动
<pre id="bash">
$ sudo service ganglia-monitor restart
</pre>
<img src="{{site.static_url}}/assets/images/linux/Ganglia_1.jpg" width="550px" alt="gangla-center" class="img-left"></img>

