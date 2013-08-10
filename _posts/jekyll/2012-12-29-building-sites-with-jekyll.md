--- 
layout: post
title: Jekyll快速搭建免费的个人博客
tags: 
- Jekyll
- Github
- 免费博客
categories:
- code
- archives
UUID: 201212291027
images: ["/assets/images/web/Jekyll.jpg"]
---

　　近日，发现个人总结一些心得，整理一些技术文章的时候，都不确定到底放在哪个网站上合适，因为自己用过好几个博客网站，感觉非常乱，用的也不是很顺心，总感觉缺少了点啥。在行业中近几年比较火的搭建个人博客很多采用wordpress来构建，有使用CMS的等等，虽然这些提高了个人搭建的速度，内容的丰富性等等，但是发现免费的空间限制太多，回归想想，自己只需要一个简单的，轻量级的静态网站就OK。今天，我将介绍一种简单的解决方案--[jekyll](http://jekyllrd.com) 使你可以轻而易举地创建属于个人的博客网站。
<img src="{{site.static_url}}/assets/images/web/Jekyll.jpg" width="330px" alt="jekyll-blog" class="img-center"></img>


###Jekyll的含义
　　Jekyll是一种简单的、适用于博客（blog aware）的、静态网站生成引擎。Jekyll网站的宣传语这么说。但，这究竟是什么意思呢？静态网站生成引擎是利用一整套文件生成网站的程序。正如你看到的，我们可以利用一套模板，单独生成内容文件，然后用Jekyll生成网站。“blog aware”意思是我们可以用它来创建博客，或者其他有系列文章（例如合集，英文称portfolio）发布的网站。让我们来尝试一下吧！

###Jekyll搭建博客的好处
<ol>
<li>
免费，无限流量。
</li>
<li>
享受git的版本管理功能，不用担心文章遗失
</li>
<li>你只要用自己喜欢的编辑器写文章就可以了，其他事情一概不用操心，都由github处理。</li>
</ol>

###Jekyll搭建博客的缺点
<ol>
<li>有一定技术门槛，你必须要懂一点git和网页开发。</li>
<li>它生成的是静态网页，添加动态功能必须使用外部服务，比如评论功能就只能用<a href="http://disqus.com">disqus</a></li>
<li>它不适合大型网站，因为没有用到数据库，每运行一次都必须遍历全部的文本文件，网站越大，生成时间越长</li>
</ol>

###安装Jekyll
从安装Jekyll开始；它是一种Ruby Gem，所以可以直接用下面的命令安装：
<pre id="bash">
$ gem install jekyll
</pre>
搭建本地环境，请参考我的另一篇文章：[Linux 安装Jekyll 环境]({{site.url}}/2012/10/30/install-jekyll/)

###Jekyll构成
<pre id="bash">
|-- _config.yml
|-- _includes
|-- _layouts
|   |-- default.html
|   |-- post.html
|-- _posts
|   |-- 2012-12-29-hello-jekyll.md
|-- index.html
|-- media
    |-- css
        |-- style.css
    |-- javascripts
</pre>

<table>
  <tbody>
    <tr>
      <th>组件名称:</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>
      _config.yum
      </hd>
      <td style="width:500px">
      存储站点的配置信息
      </td>
    </tr>
    <tr>
      <td>
      _includes
      </hd>
      <td> 
      这个文件夹用于存放局部展示的视图.
      </td>
    </tr>
    <tr>
      <td>
      _layouts 
      </hd>
      <td> 
      此文件夹的内容将被插入到模板。你能有不同的布局不同的页面或页面部分。
      </td>
    </tr>
    <tr>
      <td>
      _posts
      </hd>
      <td> 
      此文件夹包含您的动态内容/职位。命名格式是需@YEAR-MONTH-DATE-title.MARKUP@
      </td>
    </tr>
    <tr>
      <td>
      _site
      </hd>
      <td> 
      存放所有生成的网站的文件。
      </td>
    </tr>
    <tr>
      <td>
      media
      </hd>
      <td> 
      存放常用的资源文件，比如CSS，images,javascript等
      </td>
    </tr>
  </tbody>
</table>

###创建项目实例
下面，我举一个实例，演示如何在github上搭建blog，你可以跟着一步步做。为了便于理解，这个blog只有最基本的功能。

在搭建之前，你必须已经安装了[git](http://git-scm.com/book/en/Getting-Started-Installing-Git)，并且有[github](http://github.com)账户。

####Step 1 创建项目
建立一个目录，作为项目的主目录
<pre id="bash">
$ mkdir jekyll_demo
</pre>
将目录进行git初始化,如果自己一个人开发，那就直接使用master分支就好啦，提交到github上即可
<pre id="bash">
$ cd jekyll_demo
$ git init
</pre>
####Step 2 创建设置文件
在项目根目录下，建立一个名为_config.yml的文本文件。它是jekyll的设置文件，我们在里面填入如下内容，其他设置都可以用默认选项，具体解释参见[官方网页](https://github.com/mojombo/jekyll/wiki/Configuration)。

<strong>
任何不以下划线开头的文件和目录都会被复制到生成的网站。</strong>
<pre id="bash">
$ vi _config.yml
$ baseurl: /jekyll_demo
</pre>

###Step 3 创建模板文件
在项目根目录下，创建一个_layouts目录，用于存放模板文件。
<pre id="bash">
$ mkdir _layouts
</pre>
进入该目录，创建一个default.html文件，作为Blog的默认模板。并在该文件中填入以下内容。
<pre id="bash">
&lt;!DOCTYPE html&gt;
　　&lt;html&gt;
　　&lt;head&gt;
　　　　&lt;meta http-equiv="content-type" content="text/html; charset=utf-8" /&gt;
　　　　&lt;title&gt;&#123;{page.title }&#125;&lt;/title&gt;
　　&lt;/head&gt;
　　&lt;body&gt;
    &#123;{content}&#125;
&lt;/body&gt;
&lt;/html&gt;
</pre>

#####贴士
1、Jekyll默认的是用[Liquid模板系统](https://github.com/shopify/liquid/wiki/liquid-for-designers),&#123;{page.title}&#125;表示文章标题。&#123;{content}&#125; 表示文章内容，更多模板变量请参考[官方文档](https://github.com/mojombo/jekyll/wiki/Template-Data)。<br>
2、[Jekyll插件](https://github.com/mojombo/jekyll/wiki/Plugins)允许你修改网站内容生成方式<br>
3、你可以用[Liquid](https://github.com/Shopify/liquid/wiki)做更多的事，Jekyll增加了很多[扩展](https://github.com/mojombo/jekyll/wiki/Liquid-Extensions) 。


#####目录结构
<pre id="bash">
/jekyll_demo
    |-- _config.yml
    |-- _layouts
    |   |-- default.html
    |   |-- post.html
    |-- _posts
    |   |-- 2012-12-29-hello-jekyll.md
</pre>

###Step 4 创建文章
在项目的根目录创建一个_posts目录，用于存放blog文章.
<pre id="bash">
$ mkdir _posts
</pre>
进入该目录，创建第一篇文章。文章就是普通的文本文件，文件名假定为2012-12-29-hello-jekyll.md。(注意，文件名必须为"年-月-日-文章标题.后缀名"的格式。如果网页代码采用html格式，后缀名为html；如果采用[markdown]({{site.url}}/2012/11/17/markdown)格式，后缀名为md。）

在该文件中，填入以下内容：（注意，行首不能有空格）

<pre id="bash">
---
layout: default
title: 你好，Jekyll
---
&lt;h2&gt;&#123;{ page.title }&#125;&lt;/h2&gt;
&lt;p&gt;我的第一篇文章&lt;/p&gt;
&lt;p&gt;&#123;{ page.date | date_to_string }&#125;&lt;/p&gt;
</pre>
每篇文章的头部，必须有一个[yaml文件头](https://github.com/mojombo/jekyll/wiki/YAML-Front-Matter)，用来设置一些元数据。它用三根短划线"---"，标记开始和结束，里面每一行设置一种元数据。"layout:default"，表示该文章的模板使用_layouts目录下的default.html文件；"title: 你好，Jekyll"，表示该文章的标题是"你好，Jekyll"，如果不设置这个值，默认使用嵌入文件名的标题，即"hello Jekyll"。

在yaml文件头后面，就是文章的正式内容，里面可以使用模板变量。&#123;{ page.title }&#125;就是文件头中设置的"你好，世界"，&#123;{ page.date }&#125;则是嵌入文件名的日期（也可以在文件头重新定义date变量），"| date_to_string"表示将page.date变量转化成人类可读的格式。

###Step 5 创建文章模板
发布了文章，当然需要文章详情的模板咯,进入_layouts中创建文章详情的模板
<pre id="bash">
$ cd _posts
$ vi post.html
</pre>
<pre >
---
layout: default
---
&lt;div id="content"&gt;
&lt;div class="posttop"&gt;
&lt;h1 class="posttitle"&gt;
&#123;{ page.title }&#125;
&lt;/h1&gt;
&lt;/div&gt;
&lt;div class="meta"&gt;
Posted 
&lt;time class="text" datetime="&#123;{ page.date | date:"%Y-%m-%d" }&#125;"&gt;&#123;{ page.date | date:"%Y-%m-%d" }&#125;&lt;/time&gt;&nbsp; |&nbsp;
&#123;% if page.author != null %&#125;
By &#123;{ page.author }&#125; &nbsp;
&#123;% else %&#125;
By 熊猫人
&#123;% endif %&#125;
&#123;% if page.tags%&#125;
&lt;div class="tag"&gt;
&#123;% for tag in page.tags%&#125;
&lt;a href="&#123;{ site.url }&#125;/tags/#&#123;{tag}&#125;" class="text" title="&#123;{ tag }&#125;" rel="category tag"&gt;&#123;{ tag}&#125;&lt;/a&gt;&nbsp;
&#123;% endfor %&#125;
&lt;/div&gt;
&#123;% endif %&#125;
&lt;/div&gt;
&lt;div class="postcontent-entry"&gt;
&lt;div class="cleared"&gt;&lt;/div&gt;
&#123;{ content }&#125;
&lt;/div&gt;
&lt;/div&gt;
</pre>

###Step 6 创建首页
有了文章以后，还需要有一个首页。回到根目录，创建一个index.html文件，填入以下内容。
<pre >
---
layout: default
title: 我的Blog
---
&lt;h2&gt;&#123;{ page.title }&#125;&lt;/h2&gt;
&lt;p&gt;最新文章&lt;/p&gt;
&lt;ul&gt;
&#123;% for post in site.posts %&#125;
&lt;li&gt;&#123;{ post.date | date_to_string }&#125; &lt;a href="&#123;{ site.url }&#125;&#123;{ post.url }&#125;"&gt;&#123;{ post.title }&#125;&lt;/a&gt;&lt;/li&gt;
&#123;% endfor %&#125;
&lt;/ul&gt;
</pre>
它的Yaml文件头表示，首页使用default模板，标题为"我的Blog"。然后，首页使用了&#123;% for post in site.posts %&#125;，表示对所有帖子进行一个遍历。这里要注意的是，Liquid模板语言规定，输出内容使用两层大括号，单纯的命令使用一层大括号。至于&#123;{site.baseurl}&#125;就是_config.yml中设置的baseurl变量。

###Step 7 发布内容
#####本地发布
1、启动服务，在当前jekyll_demo的目录下，启动jekyll --server<br>
2、访问 http://localhost:4000/

#####发布到github上
<pre >
$ git add .
$ git commit -m "deploy jekyll_demo"
</pre>
然后，前往github的网站，在网站上创建一个名为jekyll_demo的库。接着，再将本地内容推送到github上你刚创建的库。注意，下面命令中的username，要替换成你的username。
<pre>
$ git remote add origin https://github.com/username/jekyll_demo.git
$ git push origin master
</pre>

上传成功之后，等10分钟左右，访问http://username.github.com/jekyll_demo/就可以看到Blog已经生成了（将username换成你的用户名）。

首页

<img src="{{site.static_url}}/assets/images/web/jekyll-blog.jpg" width="330px" alt="jekyll-blog" class="img-center"></img>

文章页面

<img src="{{site.static_url}}/assets/images/web/jekyll-blog-2.jpg" width="330px" alt="jekyll-blog" class="img-center"></img>

###Step 8 域名绑定
域名绑定请参考我的博客中 [浅谈github域名绑定]({{site.url}}/2012/11/09/github-pages-domain/)

###结论
本文介绍了Jekyll——一种简单的、适用于做博客的、静态网站生成引擎。下次如果你想建一个宣传册风格的、小型展示页面，可以试试用Jekyll，如果你成功了，或者在创建用遇到什么困难，请在留言中告诉我,我会尽最大努力帮助您, 再次感谢您的阅读,支持熊猫家族！

[Jekyll_demo]代码地址<a href="https://github.com/denghp/jekyll_demo">https://github.com/denghp/jekyll_demo</a>
