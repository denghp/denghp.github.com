--- 
layout: post
title: jQuery插件-Lazy Load延迟加载图片
tags: 
- 互联网
- jQuery
- LazyLoad
- 延迟加载图片
categories:
- www
- code
show_img: "/media/pub/web/jquery-lazy-load-plugin.png"
UUID: 201212012227
description: Lazy Load 是一个用 JavaScript 编写的 jQuery 插件. 它可以延迟加载长页面中的图片. 在浏览器可视区域外的图片不会被载入, 直到用户将页面滚动到它们所在的位置. 这与图片预加载的处理方式正好是相反的.
---

Lazy Load 是一个用 JavaScript 编写的 jQuery 插件. 它可以延迟加载长页面中的图片. 在浏览器可视区域外的图片不会被载入, 直到用户将页面滚动到它们所在的位置. 这与图片预加载的处理方式正好是相反的.

在包含很多大图片长页面中延迟加载图片可以加快页面加载速度. 浏览器将会在加载可见图片之后即进入就绪状态. 在某些情况下还可以帮助降低服务器负担.

<img src="/media/pub/web/jquery-lazy-load-plugin.png" width="580px"></img>

Lazy Load 灵感来自 Matt Mlinac 制作的 [YUI ImageLoader](http://developer.yahoo.com/yui/imageloader/) 工具箱. 这是[演示页面](http://www.appelsiini.net/projects/lazyload/enabled.html).

<p>
这里有几个可用的 demo 页面提供给那些匆忙的人参考: <a href="http://www.appelsiini.net/projects/lazyload/enabled.html" rel="nofollow external">基本选项</a>, <a href="http://www.appelsiini.net/projects/lazyload/enabled_fadein.html" rel="nofollow external">淡入展示效果</a>, <a href="http://www.appelsiini.net/projects/lazyload/enabled_noscript.html" rel="nofollow external">script 脚本缺失的降级处理</a>, <a href="http://www.appelsiini.net/projects/lazyload/enabled_wide.html" rel="nofollow external">水平滚动</a>, <a href="http://www.appelsiini.net/projects/lazyload/enabled_wide_container.html" rel="nofollow external">容器内水平滚动</a>, <a href="http://www.appelsiini.net/projects/lazyload/enabled_container.html" rel="nofollow external">容器内垂直滚动</a>, <a href="http://www.appelsiini.net/projects/lazyload/enabled_gazillion.html" rel="nofollow external">页面内存在超多图片</a>, <a href="http://www.appelsiini.net/projects/lazyload/enabled_timeout.html" rel="nofollow external">延时加载图片</a></p>
<p><strong>查看 demo 中每个请求间浏览器缓存的内容.</strong> 你可以通过开发者控制台 (Chrome 和 Safari), Firebug (Firefox) 或者 HTTPHeaders (IE) 检测到实际加载的内容.
</p>

###怎样使用?
Lazy Load 依赖于 [jQuery](jQuery.com). 请将下列代码加入页面 head 区域:
<pre >
&lt;script src="jquery.js" type="text/javascript"&gt;&lt;/script&gt;
&lt;script src="jquery.lazyload.js" type="text/javascript"&gt;&lt;/script&gt;
</pre>

你必须修改 HTML 代码. 在 src 属性中设置展位符图片, demo 页面使用 1x1 像素灰色 GIF 图片. 并且需要将真实图片的 URL 设置到 data-original 属性. 这里可以定义特定的 class 以获得需要延迟加载的图片对象. 通过这种方法你可以简单地控制插件绑定.
<pre>
&lt;img class="lazy" src="img/grey.gif" data-original="img/example.jpg"  width="640" heigh="480"&gt;
</pre>

处理图片的代码如下.
<pre>
$("img.lazy").lazyload();
</pre>

这将使所有 class 为 lazy 的图片将被延迟加载. 可以参考[基本选项 demo](http://www.appelsiini.net/projects/lazyload/enabled.html)

###占位图片
你还可以设定一个占位图片并定义事件来触发加载动作. 这时需要为占位图片设定一个 URL 地址. 透明, 灰色和白色的 1x1 象素的图片已经包含在插件里面.

###事件触发加载
事件可以是任何 jQuery 时间, 如: click 和 mouseover. 你还可以使用自定义的事件, 如: sporty 和 foobar. 默认情况下处于等待状态, 直到用户滚动到窗口上图片所在位置. 在灰色占位图片被点击之前阻止加载图片, 你可以这样做:
<pre>
$("img").lazyload({
    placeholder : "img/grey.gif",
        event : "click"
});
</pre>

###设置敏感度
几乎所有浏览器的 JavaScript 都是激活的. 然而可能你仍希望能在不支持 JavaScript 的客户端展示真实图片. 当浏览器不支持 JavaScript 时优雅降级, 你可以将真实的图片片段在写 &lt;noscript&gt; 标签内.
<pre>
&lt;img class="lazy" src="img/grey.gif" data-original="img/example.jpg"  width="640" heigh="480"&gt;
&lt;noscript&gt;&lt;img src="img/example.jpg" width="640" heigh="480"&gt;&lt;/noscript&gt;
</pre>
可以通过 CSS 隐藏占位符.
<pre>
.lazy {
  display: none;
  }
</pre>
在支持 JavaScript 的浏览器中, 你必须在 DOM ready 时将占位符显示出来, 这可以在插件初始化的同时完成.
<pre>
$("img.lazy").show().lazyload();
</pre>
这些都是可选的, 但如果你希望插件平稳降级这些都是应该做的.
###设置敏感度
默认情况下图片会出现在屏幕时加载. 如果你想提前加载图片, 可以设置 threshold 选项, 设置 threshold 为 200 令图片在距离屏幕 200 像素时提前加载.
<pre>
$("img.lazy").lazyload({ threshold : 200 });
</pre>

###使用特效
how() 方法来将图显示出来. 其实你可以使用任何你想用的特效来处理. 下面的代码使用 FadeIn 效果. 这是效果演示页面.
<pre>
$("img.lazy").lazyload({ 
    effect : "fadeIn"
});
</pre>
###图片在容器里面
<p>
你可以将插件用在可滚动容器的图片上, 例如带滚动条的 DIV 元素. 你要做的只是将容器定义为 jQuery 对象并作为参数传到初始化方法里面. 这是<a rel="nofollow external" href="http://www.appelsiini.net/projects/lazyload/enabled_container.html">水平滚动演示页面</a>和<a rel="nofollow external" href="http://www.appelsiini.net/projects/lazyload/enabled_wide_container.html">垂直滚动的演示页面</a>.
</p>
<pre>
#container {
    height: 600px;
        overflow: scroll;
}
</pre>        
<pre>
$("img.lazy").lazyload({         
     container: $("#container")
});
</pre>

###当图片不顺序排列
滚动页面的时候, Lazy Load 会循环为加载的图片. 在循环中检测图片是否在可视区域内. 默认情况下在找到第一张不在可见区域的图片时停止循环. 图片被认为是流式分布的, 图片在页面中的次序和 HTML 代码中次序相同. 但是在一些布局中, 这样的假设是不成立的. 不过你可以通过 failurelimit 选项来控制加载行为.
<pre>
$("img.lazy").lazyload({ 
    failure_limit : 10
});
</pre>
将 failurelimit 设为 10 令插件找到 10 个不在可见区域的图片是才停止搜索. 如果你有一个猥琐的布局, 请把这个参数设高一点.

###延迟加载图片
Lazy Load 插件的一个不完整的功能, 但是这也能用来实现图片的延迟加载. 下面的代码实现了页面加载完成后再加载. 页面加载完成 5 秒后, 指定区域内的图片会自动进行加载. 这是[延迟加载演示页面](http://www.appelsiini.net/projects/lazyload/enabled_timeout.html).
<pre>
$(function() {          
    $("img:below-the-fold").lazyload({
        event : "sporty"
    });
});
$(window).bind("load", function() { 
    var timeout = setTimeout(function() {$("img.lazy").trigger("sporty")}, 5000);
});
</pre>

###加载隐藏的图片
可能在你的页面上埋藏可很多隐藏的图片. 比如插件用在对列表的筛选, 你可以不断地修改列表中各条目的显示状态. 为了提升性能, Lazy Load 默认忽略了隐藏图片. 如果你想要加载隐藏图片, 请将 skip_invisible 设为 false
<pre>
$("img.lazy").lazyload({ 
    skip_invisible : false
});
</pre>
###下载插件
最新版本[源代码](https://raw.github.com/tuupola/jquery_lazyload/master/jquery.lazyload.js)和[压缩的代码](https://raw.github.com/tuupola/jquery_lazyload/master/jquery.lazyload.min.js). 插件已经在 OSX 的 Safari 5.1, Safari 6, Chrome 20, Firefox 12 浏览器上, Windows 的 Chrome 20, IE 8 and IE 9 浏览器上, 以及 iOS5 (iPhone 和 iPad) 的 Safari 5.1 浏览器上测试过.

文章转自：<a href="http://www.neoease.com/lazy-load-jquery-plugin-delay-load-image/">http://www.neoease.com/lazy-load-jquery-plugin-delay-load-image/</a>
