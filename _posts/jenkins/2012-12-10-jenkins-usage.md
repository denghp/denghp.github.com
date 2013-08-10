---
layout: post
title: 基于Jenkins搭建集群部署环境
categories:
- Jenkins
- code
- archives
tags:
- Jenkins
- Hudson
- CI
- 集群部署
UUID: 201212101019
date: 2012-12-10
---

###概述
  　　在开发一个软件的过程中，测试或者项目经理经常需要得到软件的最新版本.如果每次都是开发手动编译给他们，有点浪费时间，也不科学.所以这个任务可以交给计算机来作，每当你有代码提交的时候或者每当系统定期检测到有代码更新的时候，系统自动进行编译打包，并可以通过浏览器来下载最新的软件版本。你也许会说，这个不是持续集成的一部分么？哈哈，的确是。  
  
  　　这里使用的CI（持续集成）软件是 Jenkins CI，以前叫做Hudson ci后来迫于oracle的相关政策，年初的时候改名了。[https://github.com/jenkinsci](https://github.com/jenkinsci)  这里是其代码.其实CI囊括的东西远远不止自动编译了，还可以有代码提交后的自动化测试，生成各种测试报告，自动打包部署等等。   

###安装配置
<ol>
<li>
安装java环境,linux环境参考[linux安装jdk环境]
</li>
<li>
如果使用ant，则需要安装ant,下载ant
</li>
<li>安装tomcat</li>
<li>安装部署jenkins,将下载好的jenkins.war包拷贝到tomcat/webapps目录下即可</li>
<li>启动tomcat</li>
<pre id="bash">
$ $TOMCAT_HOME/bin/catalina.sh run
</pre>
</ol>
启动成功，可以从浏览器中输入<a href="http://localhost:8080/jenkins">http://localhost:8080/jenkins</a>,就可以正常访问jenkins控制页面
<img src="/assets/images/jenkins/jenkin-console.jpg" width="580px" alt="jenkins,hudson"></img>

###jenkins 配置
####进入Manager Jenkins页面
点击jenkins主页上的[Manager Jenkins](http://localhost:6082/jenkins/manage)链接，则显示如下图界面:
<img src="/assets/images/jenkins/jenkins-manager.jpg" width="580px" alt="jenkins,hudson"></img>

####进入Configure System页面
<img src="/assets/images/jenkins/jenkins-configure.jpg" width="580px" alt="jenkins,hudson"></img>
<img src="/assets/images/jenkins/jenkins-email.jpg" width="580px" alt="jenkins email,hudson"></img>
####备注:
1、配置JDK installations<br>
  　　name:jdk名称，最好与你安装的jdk名称版本一致，如:jdk1.6.0_30<br>
  　　JAVA_HOME:jdk的安装路径，如:/home/denghp/software/jdk1.6.0_30

2、配置Ant installations<br>
  　　name: ant名称,最好与你安装的jdk名称版本一致，如:apache-ant-1.8.2<br>
  　　ANT_HOME:ant的安装路径，如:/home/denghp/software/apache-ant-1.8.2

3、配置Maven installations<br>
  　　name: maven名称<br>
  　　MAVEN_HOME:maven的安装路径，跟JAVA_HOME,ANT_HOME类似
####配置Jenkins URL
<pre>
http://localhost:8080/jenkins/
</pre>　　

####配置邮件通知E-mail Notification
邮件通知，主要是在编译，部署项目失败,成功时发送邮件通知.
<img src="/assets/images/jenkins/jenkins-email.jpg" width="580px" alt="jenkins email,hudson"></img>

###构建工程
####创建项目
在jenkins的主页上选择，New Job链接,建立一个项目。填入一个项目名，选择Build a free-style software project，点击ok创建即可。
<img src="/assets/images/jenkins/jenkins-job.jpg" width="580px" alt="jenkins job,hudson job"></img>
####项目配置
在创建项目单击ok按钮后会自动调整到配置项目页面，其配置如下图，单击save按钮保存。
<img src="/assets/images/jenkins/jenkins-job-1.jpg" width="580px" alt="jenkins job,hudson job"></img>

<strong>备注:</strong><br>
1、Discard Old Builds<br>
  　　1.1、Days to keep builds 保留最近多少天的构建<br>
  　　1.2、Max # of builds to keep 保留多少个builds结果<br>
2、填写Subversion说明<br>
  　　2.1、Repository URL为svn资源的访问地址<br>
  　　2.2、Local module directory(optional)是自动生成<br>

<img src="/assets/images/jenkins/jenkins-job-2.jpg" width="580px" alt="jenkins job,hudson job"></img>
<strong>备注:</strong><br>
1、勾选Poll SCM选项出现Schedule选项<br>
  　　1.1、Schedule选项为当svn代码库代码发生修改后多长时间开始执行hudson重构,值* * * * *表示代码更新一分后开始执行hudson重构。具体的格式说明单击 进行查看<br>
####部署
jenkins部署方式支持多种:
1、可以使用ssh，加shell命令进行部署
2、可以使用tomcat-manager方式进行部署，下面介绍下tomcat-manager部署方式：
需要部署的tomcat使用manager模块管理，配置conf/tomcat-user.xml如下:
<pre id="xml">
&lt;?xml version='1.0' encoding='utf-8'?&gt;
&lt;tomcat-users&gt;
  &lt;role rolename="admin"/&gt;
  &lt;role rolename="admin-gui"/&gt;
  &lt;role rolename="admin-script"/&gt;
  &lt;role rolename="manager"/&gt;
  &lt;role rolename="manager-gui"/&gt;
  &lt;role rolename="manager-script"/&gt;
  &lt;role rolename="tomcat"/&gt;
  &lt;user username="admin" password="admin" roles="admin,admin-gui,admin-script,manager,manager-gui,manager-script"/&gt;
&lt;/tomcat-users&gt;
</pre>
进入tomcat manager管理界面就OK
<img src="/assets/images/jenkins/tomcat-manager.jpg" width="580px" alt="jenkins job,hudson job"></img>

####jenkins 使用tomcat部署配置
<img src="/assets/images/jenkins/jenkins-job-3.jpg" width="580px" alt="jenkins job,hudson job"></img>
<strong>备注:</strong><br>
1、Deploy war/ear to a container 部署war/ear到容器中<br>
2、WAR/EAR files 配置war或者ear的名称<br>
3、Context path 解压后的项目路径名称<br>
4、Container 容器,包括:tomcat,jobss, Glass Fish,这里使用tomcat<br>
  　　4.1、Manager user name , Manager password, Tomcat URL 指定tomcat管理员用户名,密码,URL地址<br>

###Jenkins权限配置
配置经过验证的用户才能进行页面的操作,如下图:
<img src="/assets/images/jenkins/jenkins-admin.jpg" width="580px" alt="jenkins job,hudson job"></img>
<strong>说明：</strong><br>
1、打开全局配置页面<br>
  　　勾选Enable security选项<br>
  　　当选中Enable security后会出现Security Realm和Authorization两个选项<br>
2、在Security Realm中选择Jenkins own user database，同时选中Allow users to sign up（容许进行用户注册，因为刚开始时没有注册用户，当进行了全部用户注册后可以把这个选择项去掉）<br>
3、在Authorization中选择Logged-in users can do anything，让登陆后才能做任何事情，单击save按钮后，在页面右上角有login和sign up链接<br>
4、单击sign up链接进行登陆注册，<br>
<img src="/assets/images/jenkins/jenkins-admin-2.jpg" width="580px" alt="jenkins job,hudson job"></img>
注册成功后会自动跳转到登陆页面，或者单击有上角的login链接进入登陆页面

####创建其他用户并设置权限
1、首先创建用户<br>
2、然后设置每个用户的权限
<img src="/assets/images/jenkins/jenkins-admin-1.jpg" width="580px" alt="jenkins job,hudson job"></img>








