--- 
layout: post
title: 三谈github页面域名绑定:域名跳转
short_title: 三谈github页面域名绑定
tags: 
- 域名
- Jekyll
categories:
- www
UUID: 201211092023
source_url: "http://yanping.me/cn/blog/2012/02/06/github-pages-domain-3/"
---

之前我写过<a href="{{site.baseurl}}/2012/11/09/github-pages-domain/" target="_blank">浅谈github页面域名绑定</a>和<a href="/2012/11/09/github-pages-domain-2/" target="_blank">再谈github页面域名绑定</a>，在后文提到的域名跳转方法是错的。本文提供了一种正确的方法。

<h2 id="section">为什么要跳转域名</h2>
<p>假设github上的用户名是 <em>username</em>，创建代码库名为username.github.com的代码库，在master分支下建立github页面，设置好域名为 <em>mydomain.com</em> ，则用http://username.github.com访问页面github会自动跳转到http://mydomain.com。</p>

<p>但是如果在已经设置了username.github.com域名之后，把项目代码库repo的gh-pages分支下的网站设置域名 <em>mydomain2.com</em> ，用http://username.github.com/repo访问的时候只会自动跳转到http://mydomain.com/repo，不会跳转到http://mydomain2.com 。虽然http://mydomain.com/repo的形式也可以访问，但是用于网页地址里相对路径的不同，造成很多资源（比如css和js文件）无法访问，网页变得面目全非，例如<a href="http://hsatac.github.com/octo/">http://hsatac.github.com/octo/</a>，它实际绑定的域名应该是<a href="http://blog.hsatac.net/">http://blog.hsatac.net/</a>，前者不能正常显示。</p>


<h2 id="javascript">用javascript实现域名跳转</h2>
<p>原来我以为用.htaccess文件可以实现网址跳转，后来发现当初跳转成功是因为浏览器缓存了解析的域名，给github发信咨询，得到的回复是github现在还不支持.htaccess，以后可能会考虑把这个功能加上。</p>

<p>我也考虑过用下面的代码实现转址</p>
<pre id="bash">
&lt;meta http-equiv=&quot;refresh&quot;content=&quot;0; url=http://mydomain2.com&quot;&gt;
</pre>

<p>但是，问题是这样跳转后其实还是转到了自己这个网页，只不过换了个地址。这样这段代码会反复执行，在firefox和chrome下没有感觉，但是在IE下就很明显了。</p>

<p>我想到了用javascript来检测网页的地址，然后跳转到目标地址。只需要将将下面的代码放到<code>&lt;head&gt;</code>和<code>&lt;/head&gt;</code>之间，注意把网址替换成自己的。</p>
<pre id="bash">
&lt;script language="javascript" type="text/javascript"&gt;

if (location.href == "http://chen.yanping.me/art/") {
    window.location.replace("http://art.yanping.me/");
    }

    &lt;/script&gt;
</pre>
注意：域名末尾的<em>/</em>一定要有，我之前就因为没发现这点，所以才浪费了很长时间。

原文地址:<a href="http://yanping.me/cn/blog/2012/02/06/github-pages-domain-3/">http://yanping.me/cn/blog/2012/02/06/github-pages-domain-3/</a>
