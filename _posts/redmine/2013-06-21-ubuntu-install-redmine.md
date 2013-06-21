---
layout: post
title: Ubuntu 安装Redmine
tags: 
- redmine
- 项目管理
categories:
- code
- project
UUID: 20130621002000
date: 2013-06-21 00:20:00
show_img: "/media/pub/web/479px-Redmine_logo.svg.png"
---

 　　Redmine 是一个开源的、基于Web的项目管理和缺陷跟踪工具。它用日历和甘特图辅助项目及进度可视化显示。同时它又支持多项目管理。Redmine是一个自由开放 源码软件解决方案，它提供集成的项目管理功能，问题跟踪，并为多个版本控制选项的支持。

###Redmine主要特性
<ol>
<li>支持多项目</li>
<li>灵活的基于角色的访问控制</li> <li>灵活的问题跟踪系统</li>
<li>甘特图和日历</li>
<li>新闻、文档和文件管理</li>
<li>feeds 和邮件通知</li>
<li>依附于项目的wiki</li>
<li>项目论坛</li>
<li>简单实时跟踪功能</li>
<li>自定义字段的问题，时间项，项目和用户</li>
<li>SCM in集成 (SVN, CVS, Git, Mercurial, Bazaar and Darcs)</li>
<li>多个LDAP认证支持</li>
<li>用户自注册支持</li>
<li>多语言支持</li>
<li>多数据库支持</li>
</ol>

###Redmine安装
#####1、安装依赖的软件包
<pre id="bash">
sudo apt-get install apache2 subversion 
</pre>

#####2、安装MySql数据库
<pre id="bash">
sudo apt-get install mysql mysql-client mysql-server
</pre>

配置mysql字符集
<pre id="bash">
vi /etc/mysql/my.conf
#在mysql client和server端设置字符集,注意server端必须使用 character_set_server=utf8才行，否则启动报错
[client]
default-character-set=utf8
port            = 3306
socket          = /var/run/mysqld/mysqld.sock

# Here is entries for some specific programs
# The following values assume you have at least 32M ram

# This was formally known as [safe_mysqld]. Both versions are currently parsed.
[mysqld_safe]
socket          = /var/run/mysqld/mysqld.sock
nice            = 0

[mysqld]
character_set_server=utf8
#
# * Basic Settings
#
user            = mysql
pid-file        = /var/run/mysqld/mysqld.pid
socket          = /var/run/mysqld/mysqld.sock
port            = 3306
basedir         = /usr
datadir         = /var/lib/mysql
tmpdir          = /tmp
lc-messages-dir = /usr/share/mysql
skip-external-locking
</pre>

#####3、安装Ruby1.8.7 & RubyGems
安装Ruby1.8.7
<pre id="bash">
#1、自编译安装
wget ftp://ftp.ruby-lang.org/pub/ruby/1.8/ruby-1.8.7-p352.tar.gz 
tar zxvf ruby-1.8.7-p352.tar.gz 
cd ruby-1.8.7-p352
./configure 
make & make install

#2、ubuntu直接安装
sudo apt-get install ruby-1.8.7
</pre>

安装RubyGems
<pre id="bash">
wget http://files.rubyforge.vm.bytemark.co.uk/rubygems/rubygems-1.8.15.tgz
tar zxvf rubygems-1.8.15.tgz
cd rubygems-1.8.15
ruby setup.rb
</pre>

#####4、安装rails & bundler 及相关gems
<pre id="bash">
sudo gem install rails
</pre>

install bundler
<pre id="bash">
gem install bundler
</pre>

安装相关的gems
<pre id="bash">
sudo bundler install
</pre>
如果直接安装相关gems无法安装，只好把用到的文件都下载到本地安装,如:
<pre id="bash">
wget https://rubygems.org/gems/mysql2-0.3.11.gem
wget ftp://ftp.uwsg.indiana.edu/linux/gentoo/distfiles/net-ldap-0.3.1.gem

gem install --local mysql2-0.3.11.gem
gem install --local net-ldap-0.3.1.gem
</pre>

#####5、安装Redmine
1、下载代码
<pre id="bash">
svn co http://svn.redmine.org/redmine/trunk redmine
</pre>

2、设置软链或者将redmine拷贝到/var/www目录下
<pre id="bash">
sudo ln -s /media/document/workspace/redmine /var/www/redmine
</pre>

3、redmine数据库配置
redmine数据库配置，将config目录下的数据库配置模板复制一份
<pre id="bash">
cd /var/www/redmine
cp config/database.yml.example config/database.yml
</pre>

修改mysql配置
<pre id="bash">
production:
  adapter: mysql
  database: redmine
  host: localhost
  username: root
  password: "123456"
  encoding: utf8
</pre>

生成session存储加密信息和数据库
<pre id="bash">
cd /var/www/redmine
rake generate_secret_token
RAILS_ENV=production rake db:migrate
RAILS_ENV=production rake redmine:load_default_data
</pre>

4、文件系统权限
<pre id="bash">
mkdir -p tmp tmp/pdf public/plugin_assets
sudo chown -R redmine:redmine files log tmp public/plugin_assets
sudo chmod -R 755 files log tmp public/plugin_assets
</pre>

5、日志文件配置
<pre id="bash">
#Logger.new(PATH,NUM_FILES_TO_ROTATE,FILE_SIZE)
config.logger = Logger.new('/path/to/logfile.log', 2, 1000000)
config.logger.level = Logger::INFO
</pre>

6、运行redmine
<pre id="bash">
ruby script/rails server webrick -e production
#也可以使用apache配置启动
</pre>




