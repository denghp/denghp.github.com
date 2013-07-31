--- 
layout: post
title: Finagle：一个协议不可知的 RPC 系统
tags: 
- java
- RPC
- Finagle
- 研发实践
categories:
- code
- java
UUID: 20130131102700
date: 2013-01-31 10:27:00
description: Finagle是一个协议不可知的，异步的，用于 JVM 的 RPC 系统，它使得在 Java、Scala 或任何基于 JVM 的语言重构建鲁棒的客户端和服务器非常容易。
---

　　Finagle是一个协议不可知的，异步的，用于 JVM 的 RPC 系统，它使得在 Java、Scala 或任何基于 JVM 的语言重构建鲁棒的客户端和服务器非常容易。

　　在<a href="http://twitter.com/" alt="Twitter" target="_bank">Twitter.com</a> 上面即使是渲染最简单的网页也需要十多个说着不同协议的网络服务的合作。比如，为了渲染首页，应用程序需要向社交网络图（Social Graph）服务、Memcached、数据库、以及许多其它网络服务发出请求。他们每个都使用不同的协议：Thrift、Memcached、MySQL等等。此外，这些服务之间还相互交谈——他们既是服务器又是客户端。比如，社交网络图服务就提供了一个 Thrift 接口，但是它也从一个 MySQL 集群里面获取信息。

　　在这样一个系统里面，服务中断最常见的原因就是这些部件之间在发生故障的时候糟糕的交互；常见的故障包括崩溃的主机和极高的时延差异。这些故障可以　　通过让工作队列任务堆积、TCP 连接搅动（churn）、耗光内存和文件描述符等方式在系统里面叠加起来。在最糟的情况下，用户就会看到<strong>失败鲸</strong>。

###构造一个稳定的分布式系统的挑战
　　复杂的网络服务器和客户端有很多活动部件：故障检测器、负载平衡器、失效备援策略（failover strategy）等等。这些部件之间需要达到一种精致的平衡，以便对大型产品系统里面的故障有足够的弹性。

　　故障检测器、负载平衡器等部件的不同协议的很多不同实现使得这个任务变得尤其困难。比如，Thrift 的背压（back pressure）策略就和 HTTP 的不同。在事故的时候确保在这种异构系统上的覆盖率非常具有挑战性。

###我们的方法
　　我们设计了一个能够用于我们<strong>所有协议</strong>的基本网络服务器和客户端组件的<strong>单一实现</strong>。Finagle 是一个协议不可知的、异步的、用于 Java 虚拟机的远程过程调用（RPC）系统，它可能让在 Java、Scala或任何基于 JVM 的语言上构建鲁棒的客户端和服务器变得很容易。Finagle 支持广泛的基于请求/答复的 RPC 协议和很多类型的流协议。

####Finagle的功能实现
<ol>
<li>连接池（connection pool）：带有限流（throttling）支持以防止 TCP 连接搅动（churn）；</li>
<li>故障检测器（failure detector），用于识别太慢或者崩溃了的主机；</li>
<li>失效备援策略（failover strategies），用于把流量从不健康的主机上引开；</li>
<li>平衡负载器（load-balancer），包括“最少连接”和其它策略；</li>
<li>背压（back-pressure）技术，用于保护服务器免受客户端滥用或者叠罗汉（或DoS攻击）。</li>
</ol>

####Finagle 让构造和部署下列服务变得容易
<ol>
<li>发布标准统计信息、日志和异常报告；</li>
<li>支持跨协议的分布式追踪（以 Dapper 形式）；</li>
<li>选择性地使用 ZooKeeper 用于集群管理；</li>
<li>支持常见切分（sharding）策略。</li>
</ol>

###Twitter 里的 Finagle
今天，Finagle 已经部署到了 Twitter 多个前端和后端的运行产品中，包括我们的 URL 爬虫（crawler）和 HTTP 代理。我们计划更广泛地部署 Finagle。
<a href="{{site.static_url}}/media/pub/java/Finagle-Diagram.png" alt="finagle" target="_bank" rel="prettyPhoto[{{page.UUID}}]">
<img src="{{site.static_url}}/media/pub/java/Finagle-Diagram.png" alt="finagle" class="img-center" />
</a>

上图展示了一个全面使用 Finagle 的未来体系结构。比如，User Service 是一个使用 Finalge Memcached 客户端的 Finagle 服务器，并和 Finagle Kestrel Service 交谈。

###Finagle的Java设计模式
　　实现RPC服务器和客户端的Java和Scala实现的是类似的。在必要的风格，你可以写你的Java服务，这是传统的Java编程风格，或者你可以写在函数式的风格，它使用的对象和功能的基础Scala的。 Java和Scala实现的大部分差异是相关的异常处理。

####Future 对象
在 Finagle 中，Future 对象是对于所有异步计算的统一抽象。一个 Future 表示了一个尚未完成的计算，其可能成功也可能失败。使用 Future 两个最基本的方法是：<br>
<ul>
<li>阻塞并等待计算结束返回</li>
<li>注册一个回调函数，在计算最终成功或失败时 Future 回调</li>
</ul>
如果任务需要在计算结束之后继续异步执行，你可以指定一个成功回调函数和一个失败回调函数。回调函数通过 onSuccess 和 onFailure 函数注册：
<pre id="java">
Future<String> future = executor.schedule(job);
future.addEventListener(
  new FutureEventListener<String>() {
      public void onSuccess(String value) {
            println(value);
      }
      public void onFailure(Throwable t) {
      }
)
</pre>
####组合 Future
下面的例子显示了功能性风格的地<code>map</code>方法:
<pre id="java">
Future<String> future = executor.schedule(job);
Future<Integer> result = future.map(new Function<String, Integer>() {
  public Integer apply(String value) { return Integer.valueOf(value);
}
</pre>

###在Java中建立一个server
　　如果你需要使用java创建一个服务器，你有几种选择:您可以创建一个同步或异步处理请求的服务器。您还必须选择一个适当的异常处理。在任何情况下，都需要返回Future或返回一个异常；下面介绍Java编写的服务器有关的一些技术：
<ol>
<li><a href="#Server%20Imports">Server Imports</a></li>
<li><a href="#Performing%20Synchronous%20Operations">Performing Synchronous Operations - 执行同步操作</a></li>
<li><a href="#Chaining%20Asynchronous%20Operations">Chaining Asynchronous Operations - 连锁异步操作</a></li>
<li><a href="#Invoking%20the%20Server">Invoking the Server - 调用服务器</a></li>
</ol>

<a name="Server%20Imports"></a>
####Server Imports
当你使用Java实现一个服务器，你得熟悉下面的包和类。 Netty的类是具体涉及到HTTP。您将使用的大部分的类中定义的的<code>com.twitter.finagle</code>和<code>com.twitter.util</code>软件包。
<pre id="java">
import java.net.InetSocketAddress;

import org.jboss.netty.buffer.ChannelBuffers;
import org.jboss.netty.handler.codec.http.DefaultHttpResponse;
import org.jboss.netty.handler.codec.http.HttpRequest;
import org.jboss.netty.handler.codec.http.HttpResponse;
import org.jboss.netty.handler.codec.http.HttpResponseStatus;
import org.jboss.netty.handler.codec.http.HttpVersion;

import com.twitter.finagle.Service;
import com.twitter.finagle.builder.ServerBuilder;
import com.twitter.finagle.http.Http;
import com.twitter.util.Future;
import com.twitter.util.FutureEventListener;
import com.twitter.util.FutureTransformer;
</pre>

<a name="Performing%20Synchronous%20Operations"></a>
####Performing Synchronous Operations
如果您的服务器可以响应同步，您可以使用下面的方法来实现您的服务：
<pre id="java">
public class HTTPServer extends Service<HttpRequest, HttpResponse> {
  public Future<HttpResponse> apply(HttpRequest request) {
    // If I can generate the response synchronously, then I just do this.
    try {
      HttpResponse response = processRequest(request);
      return Future.value(response);
    } catch (MyException e) {
      return Future.exception(e);
    }
  }
}
</pre>
在这个例子中，try catch块会捕获返响应的异常。

<a name="Chaining%20Asynchronous%20Operations"></a>
####Chaining Asynchronous Operations
在Java中，你可以将多个异步操作通过调用Future对象的transformedBy的方法。这样做是，通过供给FutureTransformer对象Future对象的transformedBy方法的。通常实现FutureTransformer的地图的方法来执行实际的转换，FutureTransformer的句柄当异常发生时，这就是所谓的方法。下面的示例演示了这种模式：<br>
注：如果您需要执行阻塞操作，<a href="#Implementing%20a%20Pool%20for%20Blocking%20Operations%20in%20Java" >Implementing a Pool for Blocking Operations in Java</a>
<pre id="java">
public class HTTPServer extends Service<HttpRequest, HttpResponse> {

  private Future<String> getContentAsync(HttpRequest request) {
    // asynchronously gets content, possibly by submitting
    // a function to a FuturePool
    ...
  }

  public Future<HttpResponse> apply(HttpRequest request) {

    Future<String> contentFuture = getContentAsync(request);
    return contentFuture.transformedBy(new FutureTransformer<String, HttpResponse>() {
      @Override
      public HttpResponse map(String content) {
        HttpResponse httpResponse =
          new DefaultHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.OK);
        httpResponse.setContent(ChannelBuffers.wrappedBuffer(content.getBytes()));
          return httpResponse;
      }

      @Override
      public HttpResponse handle(Throwable throwable) {
        HttpResponse httpResponse =
          new DefaultHttpResponse(HttpVersion.HTTP_1_1, HttpResponseStatus.SERVICE_UNAVAILABLE);
        httpResponse.setContent(ChannelBuffers.wrappedBuffer(throwable.toString().getBytes()));
        return httpResponse;
      }
    }
  });
}
</pre>
<a name="Invoking%20the%20Server"></a>
####Invoking the Server
下面的示例演示的实例化和调用的服务器。静态调用ServerBuilder的safeBuild方法的参数,如果缺少一个必需的参数，会导致运行时错误的ServerBuilder;
<pre id="java">
  public static void main(String[] args) {
    ServerBuilder.safeBuild(new HTTPServer(),
                            ServerBuilder.get()
                                         .codec(Http())
                                         .name("HTTPServer")
                                         .bindTo(new InetSocketAddress("localhost", 8080)));

  }
</pre>

###Java中建立一个client
当你创建一个Java的客户端，你有几种选择。您可以创建一个客户端，同步或异步处理的反应。您还必须选择一个适当的异常处理。本节介绍了在Java编写的客户端相关的一些技术：
<ol>
<li><a href="#Client%20Imports">Client Imports</a></li>
<li><a href="#Creating%20the%20Client">Creating the Client</a></li>
<li><a href="#Handling%20Synchronous%20Responses">Handling Synchronous Responses</a></li>
<li><a href="#Handling%20Synchronous%20Responses%20With%20Timeouts">Handling Synchronous Responses With Timeouts</a></li>
<li><a href="#Handling%20Synchronous%20Responses%20With%20Exception%20Handling">Handling Synchronous Responses With Exception Handling</a></li>
<li><a href="#Handling%20Asynchronous%20Responses">Handling Asynchronous Responses</a></li>
</ol>
<a name="Client%20Imports" ></a>
####Client Imports
当你写一个Java的客户端，你将成为熟悉下面的包和类。 Netty的类是具体涉及到HTTP。您将使用的大部分的类中定义的的<code>com.twitter.finagle</code>和<code>com.twitter.util</code>软件包。
<pre id="java">
import java.net.InetSocketAddress;
import java.util.concurrent.TimeUnit;

import org.jboss.netty.handler.codec.http.DefaultHttpRequest;
import org.jboss.netty.handler.codec.http.HttpMethod;
import org.jboss.netty.handler.codec.http.HttpRequest;
import org.jboss.netty.handler.codec.http.HttpResponse;
import org.jboss.netty.handler.codec.http.HttpVersion;

import com.twitter.finagle.Service;
import com.twitter.finagle.builder.ClientBuilder;
import com.twitter.finagle.http.Http;
import com.twitter.util.Duration;
import com.twitter.util.FutureEventListener;
import com.twitter.util.Throw;
import com.twitter.util.Try;
</pre>
<a name="Creating%20the%20Client" ></a>
####Creating the Client
下面的示例演示的实例化和调用的客户端。调用的ClientBuilder的safeBuild方法静态检查参数,如果缺少一个必需的参数，会导致运行时错误的ClientBuilder。
<pre id="java">
public class HTTPClient {
  public static void main(String[] args) {
    Service<HttpRequest, HttpResponse> httpClient =
      ClientBuilder.safeBuild(
        ClientBuilder.get()
                     .codec(Http())
                     .hosts(new InetSocketAddress(8080))
                     .hostConnectionLimit(1));
  }
}
</pre>
<strong>Note:</strong> Choosing a value of 1 for hostConnectionLimit eliminates contention for a host.
<a name="Handling%20Synchronous%20Responses" ></a>
####Handling Synchronous Responses
在最简单的情况下，你可以等待响应，有可能永远。通常情况下，你应该处理了有效的响应和异常：
<pre id="java">
 HttpRequest request = new DefaultHttpRequest(HttpVersion.HTTP_1_1, HttpMethod.GET, "/");

    try {
      HttpResponse response1 = httpClient.apply(request).apply();
    } catch (Exception e) {
        ...
    }
</pre>
<a name="Handling%20Synchronous%20Responses%20With%20Timeouts" />
####Handling Synchronous Responses With Timeouts
要避免等待永远的响应，你可以指定一个时间，会抛出一个异常，如果持续时间到期。下面的示例设置为1秒的持续时间：
<pre id="java">
 try {
      HttpResponse response2 = httpClient.apply(request).apply(
        new Duration(TimeUnit.SECONDS.toNanos(1)));
    } catch (Exception e) {
        ...
    }
</pre>
<a name="Handling%20Synchronous%20Responses%20With%20Exception%20Handling" ></a>
####Handling Synchronous Responses With Exception Handling
使用Try，并抛出<code>com.twitter.util</code>来实现异常处理同步响应。除了指定超时时间，可以抛出一个异常，其他异常也可以被抛出。
<pre id="java">
    Try<HttpResponse> responseTry = httpClient.apply(request).get(
      new Duration(TimeUnit.SECONDS.toNanos(1)));
    if (responseTry.isReturn()) {
      // Cool, I have a response! Get it and do something
      HttpResponse response3 = responseTry.get();
      ...
    } else {
        // Throw an exception
      Throwable throwable = ((Throw)responseTry).e();
      System.out.println("Exception thrown by client: " +  throwable);
    }
</pre>
<strong>注意：</strong>您必须调用请求的<code>get</code>方法的<code>apply</code>方法检索对象。
<a name="Handling%20Asynchronous%20Responses" ></a>
####Handling Asynchronous Responses
处理异步响应，您可以添加一个FutureEventListener听的响应。Finagle调用的onSuccess方法，响应到达时或调用onFailure处的例外：
<pre id="java">
 httpClient.apply(request).addEventListener(new FutureEventListener<HttpResponse>() {
      @Override
      public void onSuccess(HttpResponse response4) {
        // Cool, I have a response, do something with it!
        ...
      }

      @Override
      public void onFailure(Throwable throwable) {
        System.out.println("Exception thrown by client: " +  throwable);
      }
    });
  }
}
</pre>
<a name="Implementing%20a%20Pool%20for%20Blocking%20Operations%20in%20Java" ></a>
###在Java中实现线程池阻塞操作
To prevent blocking operations from executing on the main Finagle thread, you must wrap the blocking operation in a Scala closure and execute the closure on the Java thread that you create. Typically, your Java thread is part of a thread pool. The following sections show how to wrap your blocking operation, set up a thread pool, and execute the blocking operation on a thread in your pool:
<ul>
<li><a href="#Wrapping%20the%20Blocking%20Operation">Wrapping the Blocking Operation - 封装阻塞操作</a></li>
<li><a href="#Setting%20Up%20Your%20Thread%20Pool">Setting Up Your Thread Pool  - 设置您的线程池</a></li>
<li><a href="#Invoking%20the%20Blocking%20Operation">Invoking the Blocking Operation - 调用阻塞操作</a></li>
</ul>
<strong>Note:</strong> Jakob Homan provides an example implementation of a thread pool that executes Scala closures on <a href="https://github.com/jghoman/finagle-java-example" target="_bank" alt="finagle-java-example">GitHub</a>.

<a name="Wrapping%20the%20Blocking%20Operation" ></a>
####Wrapping the Blocking Operation
The Util project contains a Function0 class that represents a Scala closure. You can override the apply method to wrap your blocking operation:
<pre id="java">
public static class BlockingOperation extends com.twitter.util.Function0<Integer> {
  public Integer apply() {
    // Implement your blocking operation here
    ...
  }
}
</pre>

<a name="Setting%20Up%20Your%20Thread%20Pool" ></a>
####Setting Up Your Thread Pool
下面的示例显示了一个<code>Thrift</code>的服务器将阻塞操作中定义的<code>Future0</code>对象的申请方法在Java线程池，它最终将执行并返回结果：
<pre id="java">
public static class HelloServer implements Hello.ServiceIface {
  ExecutorService pool = Executors.newFixedThreadPool(4);                     // Java thread pool
  ExecutorServiceFuturePool futurePool = new ExecutorServiceFuturePool(pool); // Java Future thread pool

  public Future<Integer> blockingOperation() {
      Function0<Integer> blockingWork = new BlockingOperation();
    return futurePool.apply(blockingWork);
  }

  public static void main(String[] args) {
    Hello.ServiceIface processor = new Hello.ServiceIface();

    ServerBuilder.safeBuild(
      new Hello.Service(processor, new TBinaryProtocol.Factory()),
      ServerBuilder.get()
                   .name("HelloService")
                   .codec(ThriftServerFramedCodec.get())
                   .bindTo(new InetSocketAddress(8080))
      );
    )
  )
)
}
}
</pre>
<a name="Invoking%20the%20Blocking%20Operation" ></a>
####Invoking the Blocking Operation
要调用阻塞操作，可以调用的方法来封装你的阻塞操作，并添加一个事件监听器，等待成功或失败：
<pre id="java">
      Service<ThriftClientRequest, byte[]> client = ClientBuilder.safeBuild(ClientBuilder.get()
        .hosts(new InetSocketAddress(8080))
        .codec(new ThriftClientFramedCodecFactory())
        .hostConnectionLimit(100)); // Must be more than 1 to enable parallel execution

      Hello.ServiceIface client =
        new Hello.ServiceToClient(client, new TBinaryProtocol.Factory());

      client.blockingOperation().addEventListener(new FutureEventListener<Integer>() {
        public void onSuccess(Integer i) {
          System.out.println(i);
        }

      public void onFailure(Throwable t) {
        System.out.println("Exception! ", t.toString());
      });     
</pre>

