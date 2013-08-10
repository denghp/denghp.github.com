--- 
layout: post
title: 浅谈github页面域名绑定
tags: 
- 域名
- Jekyll
categories:
- www
- archives
UUID: 201211092323
source_url: "http://yanping.me/cn/blog/2011/12/04/github-pages-domain/"
---

<p>前段时间看到COS上的各位都有博客，也想开个博，给COS的各位管理员发邮件，向他们请教如何开个像怡轩和太云那样的博客，思喆兄说要向益辉申请空间和cos的二级域名。无奈老大太忙，迟迟没有给我分配空间和域名，只是某次提到有个叫<a target="_blank" href="http://github.com">github</a>的东西，可以在上面建网页，还可以写博客，写博客还可以不用网络哦亲，只要在本地写好，哪天有网络了就一个push过去哦亲，so fashion！<sup id="fnref:1"><a href="#fn:1" rel="footnote">1</a></sup>于是我又给他写了很多邮件，向他请教如何使用该系统，结果，他还是不回复。得，自己研究吧。</p>

<p>关于如何在github上创建页面本文就不讲了，文章末尾会列出参考文献，本文着重介绍github页面的域名绑定问题。
github pages的<a target="_blank" href="http://pages.github.com/">官方主页</a>这样说：</p>

<ul>
<li>假设你github的用户名为<strong>username</strong>，那么创建一个名为username.github.com的代码库（repository）,在这个库中上传html、CSS等静态页面文件，可以用地址 http://username.github.com来访问页面了，这个页面就是你账户的主页面（User pages）。</li>
<li>如果你又创建了个叫<strong>repo</strong>的代码库，在它下面的gh-pages分支里上传了html、CSS等静态页面文件，那么用http://username.github.com/repo这个地址就能访问页面了。</li>
<li>要想生成复杂点的页面，可以用<a target="_blank" href="http://github.com/mojombo/jekyll/">jekyll</a>，语法高亮用<code>pygments</code> 。</li>
        <li>要想域名绑定，在代码库的根目录下放一个CNAME文件就行了，文件里写上想要绑定的域名，然后在域名DNS管理的后台网站建立指向就行。如果想把页面绑定到二级域名，需要创建一个CNAME指向。如果要把页面绑定到顶级域名，需要创建一个A指向。不能用CNAME指向顶级域名，否则会造成冲突。 </li>
        </ul>


<p>现在问题就来自上面的最后一条，当我建立了个用户页面 http://username.github.com并把它的域名绑定为顶级域名example.com之后，我账户下所有代码库页面都变成了example.com下面的二级目录。我想这可能是因为代码库页面原来的网址为http://username.github.com/repo，DNS把http://username.github.com解析成了http://example.com。请看 <a target="_blank" href="https://github.com/lmorchard">https://github.com/lmorchard</a>，他在github上有两个博客， <a target="_blank" href="http://decafbad.com/skein">http://decafbad.com/skein</a> 和 <a target="_blank" href="http://decafbad.com/blog/">http://decafbad.com/blog/ </a></p>

<p><del>然而当我把用户页面的域名绑定为二级域名http://sub.example.com之后，所有代码库的页面都404了。所以我还是建议把顶级域名绑定到用户页面，这样代码库页面也能够正常访问。</del> 今天又试了一下，我把用户页面的域名绑定为二级域名，项目页面还是可以显示的，依然是二级目录的形式。明天我再试试换过来会怎么样。</p>

<p>如果我不给用户页面绑定域名，或者干脆不创建用户页面，是不是可以给代码库页面绑定域名呢？答案是否定的，因为A指向需要提供个IP地址，CNAM需要指向个域名，而不能是http://username.github.com/repo的形式。</p>

<p>如果想充分利用你的域名和子域名，我暂时能想到的就是多开几个github账户吧，关于一台电脑上多个github账户的操作，网上有现成的教程，我会在以后整理出来。 </p>

<p>我也注意到github也有例外，请看<a target="_blank" href="http://gitready.com/">http://gitready.com/</a>这个网站，它在github上的代码地址是<a target="_blank" href="http://github.com/gitready/gitready/">http://github.com/gitready/gitready/</a> , 可以看到它还有别的语言版本，域名分别是<a target="_blank" href="http://de.gitready.com/">http://de.gitready.com/</a>、<a target="_blank" href="http://fr.gitready.com">http://fr.gitready.com</a> 。。。 这是怎么做到的呢？ 我注意到，它这个目录下没有master分支，是跟这个有关吗？ 目前还没有得到作者的回复，也从知晓。感兴趣的同学们来研究一下吧。</p>

<h3 id="section">快速应用</h3>
<p><code>jekyll</code>对初学者太难掌握，有人推荐使用<a target="_blank" href="http://www.octopress.org">octopress</a>、<a target="_blank" href="https://github.com/cloudhead/toto">toto</a>或者<a target="_blank" href="http://alexyoung.org/2011/07/24/pop/">pop</a>等基于Jekyll的静态博客站点生成系统<sup id="fnref:2"><a href="#fn:2" rel="footnote">2</a></sup>，它很大程度上简化了用Jekyll搭建博客的过程。<del>可惜这些系统在windows下都不能顺畅使用，我也没试成功。使用Linux的同学可以试一试。</del><ins>在windows下使用Octopress的教程请看我的<a href="http://chen.yanping.me/cn/blog/2011/12/26/octopress-on-windows/" target="_blank">博客文章</a></ins>。</p>

原文地址：<a href="http://yanping.me/cn/blog/2011/12/04/github-pages-domain/">http://yanping.me/cn/blog/2011/12/04/github-pages-domain/</a>
