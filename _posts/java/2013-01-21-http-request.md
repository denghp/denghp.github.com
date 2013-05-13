--- 
layout: post
title: HTTPRequest实现详解
tags: 
- HTTP
- HTTPRequest
- 研发实践
categories:
- code
- java
UUID: 201301210027
date: 2013-01-21
---

  　　HTTP是一个属于应用层的面向对象的协议，由于其简捷、快速的方式，适用于分布式超媒体信息系统。它于1990年提出，经过几年的使用与发展，得到不断地完善和扩展。目前在WWW中使用的是HTTP/1.0的第六版，HTTP/1.1的规范化工作正在进行之中，而且HTTP-NG(Next Generation of HTTP)的建议已经提出。

###HTTP协议的主要特点
<ol>
<li>支持客户/服务器模式。</li>
<li>简单快速：客户向服务器请求服务时，只需传送请求方法和路径。请求方法常用的有GET、HEAD、POST。每种方法规定了客户与服务器联系的类型不同。由于HTTP协议简单，使得HTTP服务器的程序规模小，因而通信速度很快。</li>
<li>灵活：HTTP允许传输任意类型的数据对象。正在传输的类型由Content-Type加以标记。</li>
<li>无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并收到客户的应答后，即断开连接。采用这种方式可以节省传输时间。</li>
<li>无状态：HTTP协议是无状态协议。无状态是指协议对于事务处理没有记忆能力。缺少状态意味着如果后续处理需要前面的信息，则它必须重传，这样可能导致每次连接传送的数据量增大。另一方面，在服务器不需要先前信息时它的应答就较快。</li>
</ol>

###HTTP协议-URL
  　　http（超文本传输协议）是一个基于请求与响应模式的、无状态的、应用层的协议，常基于TCP的连接方式，HTTP1.1版本中给出一种持续连接的机制，绝大多数的Web开发，都是构建在HTTP协议之上的Web应用。

HTTP URL (URL是一种特殊类型的URI，包含了用于查找某个资源的足够的信息)的格式如下:
<pre id="bash">
http://host[":"port][abs_path]
</pre>
<strong>URL-解释:</strong><br>
<ol>
<li>http表示要通过HTTP协议来定位网络资源；</li>
<li>host表示合法的Internet主机域名或者IP地址；</li>
<li>port指定一个端口号，为空则使用缺省端口80；</li>
<li>abs_path指定请求资源的URI；如果URL中没有给出abs_path，那么当它作为请求URI时，必须以“/”的形式给出，通常这个工作浏览器自动帮我们完成。</li>
</ol>
例如;<br>
1、输入：www.guet.edu.cn<br?
浏览器自动转换成：http://www.guet.edu.cn/<br>
2、http:192.168.0.116:8080/index.jsp <br>

###HTTP协议-请求
http请求由三部分组成，分别是：请求行、消息报头、请求正文

###请求行
请求行以一个方法符号开头，以空格分开，后面跟着请求的URI和协议的版本，格式如下：Method Request-URI HTTP-Version CRLF 

其中 Method表示请求方法；Request-URI是一个统一资源标识符；HTTP-Version表示请求的HTTP协议版本；CRLF表示回车和换行（除了作为结尾的CRLF外，不允许出现单独的CR或LF字符）。

####请求方法
<table style="width:580px">
  <tbody>
    <tr>
      <th style="width:120px">请求方法:</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>
      GET
      </hd>
      <td>
      请求获取Request-URI所标识的资源
      </td>
    </tr>
    <tr>
      <td>
      POST
      </hd>
      <td> 
      在Request-URI所标识的资源后附加新的数据
      </td>
    </tr>
    <tr>
      <td>
      HEAD
      </hd>
      <td> 
      请求获取由Request-URI所标识的资源的响应消息报头
      </td>
    </tr>
    <tr>
      <td>
      PUT
      </hd>
      <td> 
      请求服务器存储一个资源，并用Request-URI作为其标识
      </td>
    </tr>
    <tr>
      <td>
      DELETE
      </hd>
      <td> 
      请求服务器删除Request-URI所标识的资源
      </td>
    </tr>
    <tr>
      <td>
      TRACE
      </hd>
      <td> 
      请求服务器回送收到的请求信息，主要用于测试或诊断
      </td>
    </tr>
    <tr>
      <td>
      CONNECT
      </hd>
      <td> 
      保留将来使用
      </td>
    </tr>
    <tr>
      <td>
      OPTIONS
      </hd>
      <td> 
      请求查询服务器的性能，或者查询与资源相关的选项和需求
      </td>
    </tr>
</tbody>
</table>
strong>举例：</strong>
GET方法：在浏览器的地址栏中输入网址的方式访问网页时，浏览器采用GET方法向服务器获取资源，
<pre id="bash">
GET /form.html HTTP/1.1 (CRLF)
</pre>

POST方法要求被请求服务器接受附在请求后面的数据，常用于提交表单
<pre id="bash">
POST /reg.jsp HTTP/ (CRLF)
Accept:image/gif,image/x-xbit,... (CRLF)
...
HOST:www.guet.edu.cn (CRLF)
Content-Length:22 (CRLF)
Connection:Keep-Alive (CRLF)
Cache-Control:no-cache (CRLF)
</pre>
请求行和标题必须以<CR><LF>作为结尾（也就是，回车然后换行）。空行内必须只 有<CR><LF>而无其他空格。在HTTP/1.1协议中，所有的请求头，除Host外，都是可选的。
user=admin&pwd=1234  //此行以下为提交的数据
###请求头部
<a href="{{site.url}}/2013/01/21/http-response/" alt="HTTP请求报头" target="_bank">请求报头</a>
###请求正文
请求正文(省略)


###HTTP协议-版本号
超文本传输协议已经演化出了很多版本，它们中的大部分都是<a href="http://zh.wikipedia.org/zh-cn/%E5%90%91%E4%B8%8B%E5%85%BC%E5%AE%B9" alt="" target="_bank">向下兼容</a>的。在<a href="http://tools.ietf.org/html/rfc2145" target="_bank" alt="RFC_2145">RFC 2145</a>中描述了HTTP版本号的用法。客户端在请求的开始告诉 服务器它采用的协议版本号，而后者则在响应中采用相同或者更早的协议版本。

####0.9
已过时。只接受GET一种请求方法，没有在通讯中指定版本号，且不支持请求头。由于该版本不支持POST方法，因此客户端无法向服务器传递太多信 息。
####HTTP/1.0
这是第一个在通讯中指定版本号的HTTP协议版本，至今仍被广泛采用，特别是在<a href="http://zh.wikipedia.org/zh-cn/%E4%BB%A3%E7%90%86%E6%9C%8D%E5%8A%A1%E5%99%A8" alt="代理服务器" target="_bank">代理服务器</a>中。
####HTTP/1.1
当前版本。持久连接被默认采用，并能很好地配合代理服务器工作。还支持以<a href="http://zh.wikipedia.org/zh-cn/HTTP%E7%AE%A1%E7%BA%BF%E5%8C%96" alt="管道方式" target="_bank">管道方式</a>在同时发送多个请求，以便降低线路负载，提高传输速度。

####HTTP/1.1相较于HTTP/1.0协议的区别
<ol>
<li>缓存处理</li>
<li>带宽优化及网络连接的使用</li>
<li>错误通知的管理</li>
<li>消息在网络中的发送</li>
<li>互联网地址的维护</li>
<li>安全性及完整性</li>
</ol>

###HTTPRequest实现代码
<pre id="java">
package com.cpy.nio.broker.http;

import com.cpy.nio.broker.buffer.ByteBufferOutputStream;
import static com.cpy.nio.broker.utils.Utils.*;
import java.io.DataOutputStream;
import java.io.IOException;
import java.io.OutputStream;
import java.net.URL;
import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

public final class HttpRequest {

  public static final String GET_METHOD = "GET";
  public static final String POST_METHOD = "POST";
  private String method;
  private String path;
  private List<Header> headers = new ArrayList<Header>();
  private byte[] body;
  private String version;
  private String host;

  public boolean keepAlive() {
    if (headers.isEmpty()) {
      return true;
    }
    for (Header nv : headers) {
      if (nv.getName().equalsIgnoreCase(CONN_DIRECTIVE)
              && nv.getValue().toLowerCase().indexOf("close") > -1) {
        return false;
      }
    }
    return true;
  }

  public String getHost() {
    return host;
  }

  public HttpRequest(URL url, String method, String version) {
    String query = "";
    if (url.getQuery() != null && url.getQuery().length() > 0) {
      query = "?" + url.getQuery();
    }
    this.method = method;
    this.version = version;
    this.host = url.getHost() + ((url.getPort() != -1) ? (":" + url.getPort()) : "");
    this.path = url.getPath() + query;

    if (path == null || path.length() == 0) {
      this.path = "/";
    }

    addHeader(new Header("Host", host));
    addHeader(new Header("User-Agent", "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.11 (KHTML, like Gecko) Chrome/23.0.1271.97 Safari/537.11"));
    addHeader(new Header("Accept-Charset","ISO-8859-1,utf-8;q=0.7,*;q=0.3"));
    addHeader(new Header("Accept-Encoding", ""));
    addHeader(new Header("Connection", "close"));

  }

  public HttpRequest(URL url, String method) {
    this(url, method, HTTP_1_1);
  }

  public void addHeader(Header header) {
    headers.add(header);
  }

  public void setBody(byte[] body) {
    this.body = body;
  }

  public ByteBuffer toBuffer() throws IOException {
    ByteBufferOutputStream bufferStream = new ByteBufferOutputStream();
    writeTo(bufferStream);
    return bufferStream.toByteBuffer();
  }

  private void writeTo(OutputStream os) throws IOException {
    DataOutputStream dos = new DataOutputStream(os);
    dos.write(method.toUpperCase().getBytes());
    dos.write(" ".getBytes());
    dos.write(path.getBytes());
    dos.write(" ".getBytes());
    dos.write(version.getBytes());
    dos.write(CR);
    dos.write(LF);

    dos.write(TARGET_HOST.getBytes());
    dos.write(": ".getBytes());
    dos.write(host.getBytes());
    dos.write(CR);
    dos.write(LF);

    if (!headers.isEmpty()) {
      for (Header e : headers) {
        dos.write(e.getName().getBytes());
        dos.write(": ".getBytes());
        dos.write(e.getValue().getBytes());
        dos.write(CR);
        dos.write(LF);
      }
    }

    if (body != null) {
      dos.write(CONTENT_LEN.getBytes());
      dos.write(": ".getBytes());
      dos.write(body.length);
      dos.write(CR);
      dos.write(LF);
    }

    dos.write(CR);
    dos.write(LF);

    if (body != null) {
      dos.write(body);
    }

  }
}
</pre>
