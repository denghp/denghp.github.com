--- 
layout: post
title: HTTPResponse实现详解
tags: 
- HTTP
- HTTPResponse
- 研发实践
categories:
- code
- java
- archives
UUID: 201301211427
date: 2013-01-21 08:20:20
---

　　上一篇介绍了HTTPRequest的详细实现，及主要知识点，这一篇了解下HTTPResponse的主要知识点，及代码实现。

###HTTP协议-状态行
所有HTTP响应的第一行都是状态行，依次是当前HTTP版本号，3位数字组成的状态代码，以及描述状态的短语，彼此由空格分隔。

状态代码的第一个数字代表当前响应的类型：
<ol>
<li>1xx消息——请求已被服务器接收，继续处理</li>
<li>2xx成功——请求已成功被服务器接收、理解、并接受</li>
<li>3xx重定向——需要后续操作才能完成这一请求</li>
<li>4xx请求错误——请求含有词法错误或者无法被执行</li>
<li>5xx服务器错误——服务器在处理某个正确请求时发生错误</li>
</ol>

详情参考:<a href="{{site.static_url}}/2012/11/21/http-status/" target="_bank" alt="HTTP状态码">HTTP状态码</a>

###HTTP协议-消息报头
 　　HTTP消息由客户端到服务器的请求和服务器到客户端的响应组成。请求消息和响应消息都是由开始行（对于请求消息，开始行就是请求行，对于响应消息，开始行就是状态行），消息报头（可选），空行（只有CRLF的行），消息正文（可选）组成。

HTTP消息报头包括普通报头、请求报头、响应报头、实体报头。
每一个报头域都是由名字+“：”+空格+值 组成，消息报头域的名字是大小写无关的。
####普通报头
在普通报头中，有少数报头域用于所有的请求和响应消息，但并不用于被传输的实体，只用于传输的消息。
####请求报头
请求报头允许客户端向服务器端传递请求的附加信息以及客户端自身的信息。
<table style="width:580px">
  <tbody>
    <tr>
      <th style="width:120px">参数:</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>
      Accept
      </hd>
      <td>
      Accept请求报头域用于指定客户端接受哪些类型的信息。eg：Accept：image/gif，表明客户端希望接受GIF图象格式的资源；Accept：text/html，表明客户端希望接受html文本。
      </td>
    </tr>
    <tr>
      <td>
      Accept-Charset
      </hd>
      <td> 
      Accept-Charset请求报头域用于指定客户端接受的字符集。eg：Accept-Charset:iso-8859-1,gb2312.如果在请求消息中没有设置这个域，缺省是任何字符集都可以接受。
      </td>
    </tr>
    <tr>
      <td>
      Accept-Encoding
      </hd>
      <td> 
      Accept-Encoding请求报头域类似于Accept，但是它是用于指定可接受的内容编码。eg：Accept-Encoding:gzip.deflate.如果请求消息中没有设置这个域服务器假定客户端对各种内容编码都可以接受。
      </td>
    </tr>
    <tr>
      <td>
      Accept-Language
      </hd>
      <td> 
      Accept-Language请求报头域类似于Accept，但是它是用于指定一种自然语言。eg：Accept-Language:zh-cn.如果请求消息中没有设置这个报头域，服务器假定客户端对各种语言都可以接受。
      </td>
    </tr>
    <tr>
      <td>
      Authorization
      </hd>
      <td> 
      请求报头域主要用于证明客户端有权查看某个资源。当浏览器访问一个页面时，如果收到服务器的响应代码为401（未授权），可以发送一个包含Authorization请求报头域的请求，要求服务器对其进行验证。
      Host（发送请求时，该报头域是必需的）,Host请求报头域主要用于指定被请求资源的Internet主机和端口号，它通常从HTTP URL中提取出来的
      </td>
    </tr>
    <tr>
      <td>
    User-Agent
      </hd>
      <td> 
      User-Agent请求报头域允许客户端将它的操作系统、浏览器和其它属性告诉服务器。不过，这个报头域不是必需的，如果我们自己编写一个浏览器，不使用User-Agent请求报头域，那么服务器端就无法得知我们的信息了。
      </td>
    </tr>
</tbody>
</table>

####响应报头
响应报头允许服务器传递不能放在状态行中的附加响应信息，以及关于服务器的信息和对Request-URI所标识的资源进行下一步访问的信息。
<table style="width:580px">
  <tbody>
    <tr>
      <th style="width:120px">参数:</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>
      Location
      </hd>
      <td>
      Location响应报头域用于重定向接受者到一个新的位置。Location响应报头域常用在更换域名的时候。
      </td>
    </tr>
    <tr>
      <td>
      Server
      </hd>
      <td> 
      Server响应报头域包含了服务器用来处理请求的软件信息。与User-Agent请求报头域是相对应的。eg:Server：Apache-Coyote/1.1
      </td>
    </tr>
    <tr>
      <td>
      WWW-Authenticate
      </hd>
      <td> 
        WWW-Authenticate响应报头域必须被包含在401（未授权的）响应消息中，客户端收到401响应消息时候，并发送Authorization报头域请求服务器对其进行验证时，服务端响应报头就包含该报头域。
        eg：WWW-Authenticate:Basic realm="Basic Auth Test!"  //可以看出服务器对请求资源采用的是基本验证机制。
      </td>
    </tr>
</tbody>
</table>

####实体报头
请求和响应消息都可以传送一个实体。一个实体由实体报头域和实体正文组成，但并不是说实体报头域和实体正文要在一起发送，可以只发送实体报头域。实体报头定义了关于实体正文（eg：有无实体正文）和请求所标识的资源的元信息。
<table style="width:580px">
  <tbody>
    <tr>
      <th style="width:120px">参数:</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>
      Content-Encoding
      </hd>
      <td>
      实体报头域被用作媒体类型的修饰符，它的值指示了已经被应用到实体正文的附加内容的编码，因而要获得Content-Type报头域中所引用的媒体类型，必须采用相应的解码机制。Content-Encoding这样用于记录文档的压缩方法，eg：Content-Encoding：gzip
      </td>
    </tr>
    <tr>
      <td>
      Content-Language
      </hd>
      <td> 
      实体报头域描述了资源所用的自然语言。没有设置该域则认为实体内容将提供给所有的语言阅读者。eg：Content-Language:en
      </td>
    </tr>
    <tr>
      <td>
        Content-Length
      </hd>
      <td> 
      实体报头域用于指明实体正文的长度，以字节方式存储的十进制数字来表示。
      </td>
    </tr>
    <tr>
      <td>
        Content-Length
      </hd>
      <td> 
      实体报头域用于指明实体正文的长度，以字节方式存储的十进制数字来表示。
      </td>
    </tr>
 <tr>
      <td>
      Content-Type
      </hd>
      <td> 
      实体报头域用语指明发送给接收者的实体正文的媒体类型。eg：
      Content-Type:text/html;charset=ISO-8859-1
      </td>
    </tr>
 <tr>
      <td>
      Last-Modified
      </hd>
      <td> 
      实体报头域用于指示资源的最后修改日期和时间。
      </td>
    </tr>
 <tr>
      <td>
      Expires
      </hd>
      <td> 
      实体报头域给出响应过期的日期和时间。
      </td>
    </tr>
</tbody>
</table>

###HTTPResponse代码实现
<pre id="java">
package com.cpy.nio.broker.http;

import static com.cpy.nio.broker.utils.Utils.*;
import java.io.*;
import java.nio.ByteBuffer;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;
import java.util.zip.GZIPInputStream;

public class HttpResponse {

  public static final byte[] ST_OK = "200 OK\r\n".getBytes();
  private byte[] status;
  private ArrayList<String> keys = new ArrayList<String>();
  private ArrayList<String> values = new ArrayList<String>();
  public static final SimpleDateFormat gmtdf;
  public ByteBuffer buffer;
  private int contentOffset;
  private int contentLength;
  private int iread;
  public int versionRange;
  public int statusRange;
  public int reasonRange;

  static {
    gmtdf = new SimpleDateFormat("EEE, dd MMM yyyy hh:mm:ss");
    gmtdf.setTimeZone(TimeZone.getTimeZone("GMT:00"));
  }

  public HttpResponse() {
    this(ST_OK);
  }

  public HttpResponse(byte[] statusb) {
    this.status = statusb;
    this.buffer = ByteBuffer.allocate(64 * 102400);
  }

  public void setStatus(String statusMsg) {
    if (!statusMsg.endsWith("\r\n")) {
      statusMsg = statusMsg + "\r\n";
    }
    this.status = statusMsg.getBytes();
  }

  public HttpResponse(String statusMsg) {
    this();
    this.setStatus(statusMsg);
  }

  public HttpResponse addField(String key, String value) {
    this.keys.add(key);
    this.values.add(value);
    return this;
  }

  public HttpResponse addField(String key, int valRange) {
    this.keys.add(key);
    this.values.add(this.extractRange(valRange));
    return this;
  }

  public void readFrom(EndPoint endpoint) throws Exception {
    this.iread = 0;
    this.readHeader(endpoint);
    this.readBody(endpoint);
  }

  private void readHeader(EndPoint endpoint) throws Exception {

    int headerLength = 0;
    int n;
    do {
      n = this.readLine(endpoint); // includes 2 bytes for CRLF
      headerLength += n;
    } while (n > 2); // until blank line (CRLF)
    // dumpBuffer(buffer);
    HttpResponseParser.initHeader(this, headerLength);
    this.contentOffset = headerLength; // doesn't mean there's necessarily
    // any content.
    String cl = this.getHeader("Content-Length");
    if (cl.length() > 0) {
      try {
        this.contentLength = Integer.parseInt(cl);
      } catch (NumberFormatException nfe) {
        throw new IOException("Malformed Content-Length hdr");
      }
    } else if (this.getHeader("Transfer-Encoding").indexOf("chunked") >= 0
            || this.getHeader("TE").indexOf("chunked") >= 0) {
      this.contentLength = -1;
    } else {
      this.contentLength = 0;
    }
  }

  private int readLine(EndPoint endpoint) throws Exception {
    int ireadSave = this.iread;
    int i = ireadSave;
    while (true) {
      int end = this.buffer.position();
      byte[] bufa = this.buffer.array();
      for (; i < end; i++) {
        if (bufa[i] == CR) {
          ++i;
          if (i >= end) {
            this.buffer = endpoint.fill(this.buffer, 1);
            bufa = this.buffer.array(); // fill could have changed
            // the buffer.
            end = this.buffer.position();
          }
          if (bufa[i] != LF) {
            throw new IOException("Expected LF at " + i + " but was " + bufa[i]);
            // ++i;
            // continue;
          }
          ++i;
          int lineLength = i - ireadSave;
          this.iread = i;
          return lineLength;
        }
      }
      this.buffer = endpoint.fill(this.buffer, 1); // no CRLF found. fill
      // a bit more and start
      // over.
    }
  }

  private void readBody(EndPoint endpoint) throws Exception {
    this.iread = this.contentOffset;
    if (this.contentLength > 0) {
      this.fill(endpoint, this.contentOffset, this.contentLength);
      this.iread = this.contentOffset + this.contentLength;
    } else if (this.contentLength == -1) {
      this.readAllChunks(endpoint);
    }
    this.readTrailers(endpoint);
  }

  private void readTrailers(EndPoint endpoint) {
  }

  private void fill(EndPoint endpoint, int offset, int size) throws Exception {
    int total = offset + size;
    int currentPos = this.buffer.position();
    if (total > this.buffer.position()) {
      this.buffer = endpoint.fill(this.buffer, (total - currentPos));
    }
  }

  private void readAllChunks(EndPoint endpoint) throws Exception {
    IntList chunkRanges = new IntList(); // alternate numbers in this list
    // refer to the start and end
    // offsets of chunks.
    try {
      do {
        int n = this.readLine(endpoint); // read chunk size text into
        // buffer
        int beg = this.iread;
        int size = parseChunkSize(this.buffer, this.iread - n, this.iread); // Parse
        // size
        // in
        // hex,
        // ignore
        // extension

        if (size == 0) {
          break;
        }
        // If the chunk has not already been read in, do so
        this.fill(endpoint, this.iread, size + 2 /* chunksize + CRLF */);
        // record chunk start and end
        chunkRanges.add(beg);
        chunkRanges.add(beg + size); // without the CRLF
        this.iread += size + 2; // for the next round.
      } while (true);
    } catch (Throwable e) {
      e.printStackTrace();
    }

    // / consolidate all chunkRanges
    if (chunkRanges.numElements == 0) {
      this.contentLength = 0;
      return;
    }
    this.contentOffset = chunkRanges.get(0); // first chunk's beginning
    int endOfLastChunk = chunkRanges.get(1); // first chunk's end

    byte[] bufa = this.buffer.array();
    for (int i = 2; i < chunkRanges.numElements; i += 2) {
      int beg = chunkRanges.get(i);
      int chunkSize = chunkRanges.get(i + 1) - beg;
      System.arraycopy(bufa, beg, bufa, endOfLastChunk, chunkSize);
      endOfLastChunk += chunkSize;
    }

    this.contentLength = endOfLastChunk - this.contentOffset;
    // At this point, the contentOffset and contentLen give the entire
    // content
  }

  /**
   * Get the value for a given key
   *
   * @param key
   * @return null if the key is not present in the header.
   */
  public String getHeader(String key) {
    for (int i = 0; i < this.keys.size(); i++) {
      if (key.equalsIgnoreCase(this.keys.get(i))) {
        return this.values.get(i);
      }
    }
    return ""; // no point returning null
  }

  public void setContentLength(long length) {
    this.addField("Content-Length", Long.toString(length));
  }

  public void setContentType(String contentType) {
    this.addField("Content-Type", contentType);
  }

  public String status() {
    return this.extractRange(this.statusRange);
  }

  public String reason() {
    return this.extractRange(this.reasonRange);
  }

  private String extractRange(int range) {
    int beg = range >> 16;
    int end = range & 0xFFFF;
    return this.extractRange(beg, end);
  }

  public String extractRange(int beg, int end) {
    try {
      return new String(this.buffer.array(), beg, (end - beg), "UTF-8");
    } catch (Exception e) {
      e.printStackTrace();
    }
    return null;
  }
  private static final Pattern charsetRegex = Pattern.compile("charset=([0-9A-Za-z-]+)");

  public String charset() {
    String contentType = this.getHeader("Content-Type");
    String charset = null;
    Matcher matcher = this.charsetRegex.matcher(contentType);
    if (matcher.find()) {
      charset = matcher.group(1);
    } else {
      charset = "utf-8";
    }
    return charset;
  }

  /**
   * Get the response content
   *
   * @return
   */
  public String content() {
    if (this.isGZipContent()) {
      return this.uncompress(this.buffer.array(), this.contentOffset, this.contentLength);
    } else {
      try {
        return new String(this.buffer.array(), this.contentOffset, this.contentLength, this.charset());
      } catch (UnsupportedEncodingException e) {
        throw new RuntimeException(e);
      }
    }

  }

  /**
   * Check if contents are gzip compressed.
   *
   * @return
   */
  public boolean isGZipContent() {
    final String encoding = this.getHeader("Content-Encoding");
    if (null != encoding) {
      if (encoding.toLowerCase().indexOf("gzip") > -1) {
        return true;
      }
    }
    return false;
  }

  /**
   * Uncompress the content
   *
   * @param buf
   * @param offset
   * @param length
   * @return
   */
  private String uncompress(byte[] buf, int offset, int length) {

    InputStream is = null;
    GZIPInputStream gzin = null;
    InputStreamReader isr = null;
    BufferedReader br = null;
    StringBuilder sb = new StringBuilder();
    try {
      is = new ByteArrayInputStream(buf, offset, length);
      gzin = new GZIPInputStream(is);
      isr = new InputStreamReader(gzin, this.charset());
      br = new BufferedReader(isr);
      char[] buffer = new char[4096];
      int readlen = -1;
      while ((readlen = br.read(buffer, 0, 4096)) != -1) {
        sb.append(buffer, 0, readlen);
      }
    } catch (Exception e) {
      e.printStackTrace();
    } finally {
      try {
        br.close();
      } catch (Exception e1) {
        // ignore
      }
      try {
        isr.close();
      } catch (Exception e1) {
        // ignore
      }
      try {
        gzin.close();
      } catch (Exception e1) {
        // ignore
      }
      try {
        is.close();
      } catch (Exception e1) {
        // ignore
      }
    }
    return sb.toString();
  }
}
</pre>

###HTTPResponse代码实现-EndPoint
<pre id="java">
package com.cpy.nio.broker.http;

import java.nio.ByteBuffer;
import java.nio.channels.SocketChannel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

public class EndPoint {
  static final int YIELD_COUNT = 4;
  private Logger logger = LoggerFactory.getLogger(EndPoint.class);
  
  private SocketChannel socketChannel;

  public EndPoint(SocketChannel socketChannel) {
    this.socketChannel = socketChannel;
  }

  public ByteBuffer fill(ByteBuffer buf, int atLeast) throws Exception {
    if (buf.remaining() < atLeast) {
      ByteBuffer newByteBuffer = ByteBuffer.allocate(Math.max(buf.capacity() * 3 / 2, buf.position() + atLeast));
      buf.flip();
      newByteBuffer.put(buf);
      buf = newByteBuffer;
    }
    SocketChannel ch = this.socketChannel;
    if (!ch.isOpen()) {
      //throw new EOFException();
      logger.warn("EOFException SocketChannel is close.");
    }
    int yieldCount = 0;
    do {
      int n = ch.read(buf);
      if (n == 0) {
        //break;
        //TODO:在程序压力大的情况下有可能socket的接受数据无法正常响应过来,结果导致n==0,原来使用break,但是会导致数据丢失,就会产生\u0000,
        //解决方案：使当前处理的线程从执行状态转换成可执行状态,处理3次,如果3次都为0,则表示读取完成
        if (++yieldCount < YIELD_COUNT) {
          Thread.currentThread().yield();
        }
      }
      if (n == -1 && this != null) {
        this.close();
        break;
      }
      atLeast -= n;

    } while (atLeast > 0);

    return buf;
  }

  public void close() {
    try {

      this.socketChannel.close();
    } catch (Exception e) {
      e.printStackTrace();
    }
  }
}
</pre>
