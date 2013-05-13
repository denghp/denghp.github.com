---
layout: post
title: "Google Code Prettify 实现代码高亮"
tags: 
- prettify
comment: true
published: true
categories:
- javaScript
UUID: 201211130032
date: 2012-11-13
---

Prettify提供一个Javascript模块和CSS 文件,可以在HTML页面中显示源代码的代码高亮效果。这是用于code.google.com的脚本。

### 语法
<pre id="javascript">
&lt;pre class=&quot;prettyprint&quot; id=&quot;language&quot;&gt;
@*你的代码片断*@
&lt;/pre&gt;
</pre>

### 常用的语言
将id的language改成以下的语言：
<pre>
“bash”, “c”, “cc”, “cpp”, “cs”, “csh”, “cyc”, “cv”, “htm”, “html”, ”java”, “js”, “m”, “mxml”, “perl”, “pl”, “pm”, “py”, “rb”, “sh”, ”xhtml”, “xml”, “xsl”
</pre>


### prettify.js 的使用方法:
##### 1、引入 jQuery 文件和 prettify.js 文件
<pre id="javascript">
&lt;script type=&quot;text/javascript&quot; src=&quot;jquery-1.6.1.min.js&quot;&gt;&lt;/script&gt;
&lt;script src=&quot;prettify.js&quot; type=&quot;text/javascript&quot;&gt;&lt;/script&gt;
</pre>

##### 2、调用 prettify.js 实现代码高亮
<p>在 body 标签上添加调用方法，如下：</p>
<pre id="javascript">
&lt;body onload=&quot;prettyPrint()&quot;&gt;
&lt;/body&gt;
</pre>
<p>将你需要高亮显示的代码片断放在&lt;pre&gt;标记里，如下：</p>
<pre id="javascript">
&lt;pre class=&quot;prettyprint&quot;&gt;
@*你的代码片断*@
&lt;/pre&gt;
</pre>


### 使用 jQuery 小技巧实现优化
<p>上述方法可以实现代码的高亮，但每次手动为&lt;pre&gt;标签添加&quot;prettyprint&quot;类，显示有些麻烦。使用下边的代码片断来解决这个问题并替换掉 body 的&quot;onload&quot;的事件，实现分离：</p>
<pre class="prettyprint" id="javascript">
&lt;script type=&quot;text/javascript&quot;&gt;
$(window).load(function(){
    $(&quot;pre&quot;).addClass(&quot;prettyprint&quot;);
    prettyPrint();
})
&lt;/script&gt;
</pre>
<p>到这我们应该已经成功使用 prettify.js 实现了代码的高亮显示，为了提高页面加载速度，我们应该将引用的 js 文件放置在底部，大家可以参考下本站的放置方法。</p>

### DEMO JAVA代码高亮显示
<pre class="prettyprint linenums" id="java">
package foo;

import java.util.Iterator;

/**
 * the fibonacci series implemented as an Iterable.
 */
public final class Fibonacci implements Iterable&lt;Integer> {
  /** the next and previous members of the series. */
  private int a = 1, b = 1;

  @Override
  public Iterator&lt;Integer> iterator() {
    return new Iterator&lt;Integer>() {
      /** the series is infinite. */
      public boolean hasNext() { return true; }
      public Integer next() {
        int tmp = a;
        a += b;
        b = tmp;
        return a;
      }
      public void remove() { throw new UnsupportedOperationException(); }
    };
  }

  /**
   * the n&lt;sup>th&lt;/sup> element of the given series.
   * @throws NoSuchElementException if there are less than n elements in the
   *   given Iterable's {@link Iterable#iterator iterator}.
   */
  public static &lt;T>
  T nth(int n, Iterable&lt;T> iterable) {
    Iterator&lt;? extends T> it = iterable.iterator();
    while (--n > 0) {
      it.next();
    }
    return it.next();
  }

  public static void main(String[] args) {
    System.out.print(nth(10, new Fibonacci()));
  }
}
</pre>


  
