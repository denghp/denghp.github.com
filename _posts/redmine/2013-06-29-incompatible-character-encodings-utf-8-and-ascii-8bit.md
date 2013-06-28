---
layout: post
title: Redmine incompatible character encodings UTF-8 and ASCII-8BIT
short_title: Encoding UTF-8 and ASCII-8BIT
tags: 
- redmine
- 项目管理
- 研发实践
categories:
- code
- project
UUID: 20130629002000
date: 2013-06-29 00:20:00
---

###异常信息
After migrating Redmine to a new server, I’ve encountered such an error:
<pre id="ruby">
ActionView::Template::Error (incompatible character encodings: ASCII-8BIT and UTF-8):
    55:         &lt;%= yield :sidebar %&gt;
    56:         &lt;%= view_layouts_base_sidebar_hook_response %&gt;
    57:     &lt;/div&gt;
    58: 
    59:     &lt;div id="content"&gt;
    60:         &lt;%= render_flash_messages %&gt;
    61:         &lt;%= yield %&gt;
  app/views/layouts/base.html.erb:58:in `_app_views_layouts_base_html_erb__1607427593261861101_37006840
</pre>

###解决方案
1、Make sure config.encoding = "utf-8" is in the application.rb file.<br>
2、Make sure config.encoding = "utf-8" is in the application.rb file.<br>
3、Make sure you are using the 'mysql2' gem.<br>
4、Put # encoding: utf-8 at the top of file containing UTF-8 characters.<br>
5、Above the <App Name>::Application.initialize! line in the environment.rb file, add following two lines:
<pre id="bash">
Encoding.default_external = Encoding::UTF_8
Encoding.default_internal = Encoding::UTF_8
</pre>
6、make database.yml config 
<pre id="bash">
production:
  adapter: mysql2
  database: redmine
  host: localhost
  username: root
  password: "123456"
  encoding: utf8
</pre>
注意：adapter: mysql2 必须是mysql2,如果使用mysql则就会出现上面的问题<br>
7、<code>locale</code>确认操作系统的编码是否UTF-8
<pre id="bash">
LANG=en_US.UTF-8
LANGUAGE=
LC_CTYPE=zh_CN.UTF-8
LC_NUMERIC="en_US.UTF-8"
LC_TIME="en_US.UTF-8"
LC_COLLATE="en_US.UTF-8"
LC_MONETARY="en_US.UTF-8"
LC_MESSAGES="en_US.UTF-8"
LC_PAPER="en_US.UTF-8"
LC_NAME="en_US.UTF-8"
LC_ADDRESS="en_US.UTF-8"
LC_TELEPHONE="en_US.UTF-8"
LC_MEASUREMENT="en_US.UTF-8"
LC_IDENTIFICATION="en_US.UTF-8"
LC_ALL=
</pre>
可以设置下操作系统的编码
<pre id="bash">
vi ~/.bashrc或者/etc/profile
export LANGUAGE=en_US.UTF-8
export LANG=en_US.UTF-8
export LC_ALL=en_US.UTF-8
</pre>

