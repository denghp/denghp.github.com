---
layout: post
title: HTTP状态码
tags: 
- HTTP
- 状态码
categories:
- code
UUID: 201211212348
date: 2012-11-21
---

HTTP状态码（HTTP Status Code）是用以表示網頁伺服器HTTP响应状态的3位数字代码。

##1xx消息
这一类型的状态码，代表请求已被接受，需要继续处理。这类响应是临时响应，只包含状态行和某些可选的响应头信息，并以空行结束。由于HTTP/1.0协议中没有定义任何1xx状态码，所以除非在某些试验条件下，服务器禁止向此类客户端发送1xx响应。 这些状态码代表的响应都是信息性的，标示客户应该采取的其他行动。
<table>
  <tbody>
    <tr>
      <th>状态代码:</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>100 Continue</hd>
      <td>
      服务器收到的请求不完整，但服务器没有拒绝请求，客户端应重新发送一个完整的请求。
      </td>
    </tr>
    <tr>
      <td>101 Switching Protocols</hd>
      <td> 
      服务器改用别的协议了 
      </td>
    </tr>
    <tr>
      <td>102 Processing</hd>
      <td> 
      代表处理将被继续执行。
      </td>
    </tr>
  </tbody>
</table>
##2xx成功
这一类型的状态码，代表请求已成功被服务器接收、理解、并接受。
<table>
  <tbody>
    <tr>
      <th>状态代码:</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>200 OK</hd>
      <td>
      请求已成功，请求所希望的响应头或数据体将随此响应返回。
      </td>
    </tr>
    <tr>
      <td>
      201 Created
      </hd>
      <td> 
      请求成功，并完成了新资源的创建
      </td>
    </tr>
    <tr>
      <td>
      202 Accepted 
      </hd>
      <td> 
      请求正在处理中，尚未结束
      </td>
    </tr>
    <tr>
      <td>
      203 Non-authoritative Information 
      </hd>
      <td> 
      服务器已成功处理了请求，但返回的实体头部元信息不是在原始服务器上有效的确定集合，而是来自本地或者第三方的拷贝。
      </td>
    </tr>
    <tr>
      <td>
      204 No Content
      </hd>
      <td> 
      服务器成功处理了请求，但不需要返回任何实体内容，并且希望返回更新了的元信息。
      </td>
    </tr>
    <tr>
      <td>
      205 Reset Content
      </hd>
      <td> 
      服务器成功处理了请求，且没有返回任何内容。但是与204响应不同，返回此状态码的响应要求请求者重置文档视图。
      </td>
    </tr>
  <tr>
      <td>
      206 Partial Content
      </hd>
      <td> 
      服务器已经成功处理了部分GET请求。
      </td>
    </tr>
  <tr>
      <td>
      207 Multi-Status
      </hd>
      <td> 
      代表之后的消息体将是一个XML消息，并且可能依照之前子请求数量的不同，包含一系列独立的响应代码。
      </td>
    </tr>
  </tbody>
</table>

##3xx重定向
这类状态码代表需要客户端采取进一步的操作才能完成请求。通常，这些状态码用来重定向，后续的请求地址（重定向目标）在本次响应的Location域中指明。
<table>
  <tbody>
    <tr>
      <th>状态代码:</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>
      300 Multiple Choices 
      </hd>
      <td>
      一个链接列表。用户可以选择并转向一个链接。最多五个地址
      </td>
    </tr>
    <tr>
      <td>
      301 Moved Permanently
      </hd>
      <td> 
      所请求页面已转移至新地址
      </td>
    </tr>
    <tr>
      <td>
      302 Found
      </hd>
      <td> 
      所请求页面临时转到了新的地址
      </td>
    </tr>
<tr>
      <td>
      303 See Other
      </hd>
      <td> 
      所请求页面还有其他地址
      </td>
    </tr>
<tr>
      <td>
      304 Not Modified
      </hd>
      <td> 
      如果客户端发送了一个带条件的GET请求且该请求已被允许，而文档的内容（自上次访问以来或者根据请求的条件）并没有改变，则服务器应当返回这个状态码。304响应禁止包含消息体，因此始终以消息头后的第一个空行结尾。
      </td>
    </tr>
<tr>
      <td>
      305 Use Proxy
      </hd>
      <td> 
      被请求的资源必须通过指定的代理才能被访问。
      </td>
    </tr>
<tr>
      <td>
      306 Switch Proxy
      </hd>
      <td> 
       在最新版的规范中，306状态码已经不再被使用
      </td>
      <tr>
      <td>
      307 Temporary Redirect
      </hd>
      </td>
      <td>
      所请求页面已临时转移至新地址
      </td>
      </tr>
    </tr>
</table>

##4xx请求错误
<table>
  <tbody>
    <tr>
      <th>状态代码:</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>
      400 Bad Request
      </hd>
      <td>
      由于包含语法错误，当前请求无法被服务器理解。
      </td>
    </tr>
    <tr>
      <td>
      401 Unauthorized
      </hd>
      <td> 
      所请求页面需要用户名和密码
      </td>
    </tr>
    <tr>
      <td>
      402 Payment Required
      </hd>
      <td> 
      该状态代码目前没有用
      </td>
    </tr>
    <tr>
      <td>
      403 Forbidden
      </hd>
      <td> 
      页面禁止访问
      </td>
    </tr>
     <tr>
      <td>
      404 Not Found
      </hd>
      <td> 
      服务器找不到所请求的页面
      </td>
    </tr>
    <tr>
      <td>
      405 Method Not Allowed
      </hd>
      <td> 
      不支持请求中指定的HTTP方法
      </td>
    </tr>
     <tr>
      <td>
      406 Not Acceptable
      </hd>
      <td> 
      服务器无法提供满足客户端要求的响应
      </td>
    </tr>
     <tr>
      <td>
      407 Proxy Authentication Required
      </hd>
      <td> 
      代理服务器要求进行身份验证
      </td>
    </tr>
     <tr>
      <td>
      408 Request Timeout
      </hd>
      <td> 
      请求所用时间超出服务器打算等待的时间
      </td>
    </tr>
     <tr>
      <td>
      409 Conflict
      </hd>
      <td> 
      请求因冲突没有完成
      </td>
    </tr>
     <tr>
      <td>
      410 Gone
      </hd>
      <td> 
      所请求页面已不复存在
      </td>
    </tr>
     <tr>
      <td>
      411 Length Required
      </hd>
      <td> 
      请求没有定义报头“Content-Length”。服务器无法接受没有Content-Length的请求
      </td>
    </tr>
      <tr>
      <td>
      412 Precondition Failed
      </hd>
      <td> 
      请求里指定的前提条件不满足
      </td>
    </tr>
      <tr>
      <td>
      413 Request Entity Too Large
      </hd>
      <td> 
      因请求实体太大，服务器无法接受请求
      </td>
    </tr>
    <tr>
      <td>
      414 Request-url Too Long
      </hd>
      <td> 
      因URL太长，服务器无法接受请求。当你用GET请求来代替POST请求发送过长的查询信息时会发生这种情况
      </td>
    </tr>
     <tr>
      <td>
      415 Unsupported Media Type
      </hd>
      <td> 
      请求所采用的媒体类型不被支持，服务器无法接受请求
      </td>
    </tr>
     <tr>
      <td>
      416 Requested Range Not Satisfiable
      </hd>
      <td> 
      如果请求中包含了Range请求头，并且Range中指定的任何数据范围都与当前资源的可用范围不重合，同时请求中又没有定义If-Range请求头，那么服务器就应当返回416状态码。
      </td>
    </tr>
     <tr>
      <td>
      417 Expectation Failed
      </hd>
      <td> 
      在请求头Expect中指定的预期内容无法被服务器满足，或者这个服务器是一个代理服务器，它有明显的证据证明在当前路由的下一个节点上，Expect的内容无法被满足。
      </td>
    </tr>
</table>
##5xx服务器错误
这类状态码代表了服务器在处理请求的过程中有错误或者异常状态发生，也有可能是服务器意识到以当前的软硬件资源无法完成对请求的处理
<table>
  <tbody>
    <tr>
      <th>状态代码:</th>
      <th>描述</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>
      500 Internal Server Error
      </hd>
      <td>
      请求不成功。服务器遇到异常情况
      </td>
    </tr>
    <tr>
      <td>
      501 Not Implemented
      </hd>
      <td> 
      请求不成功。服务器不支持所要求的特性
      </td>
    </tr>
    <tr>
      <td>
      502 Bad Gateway
      </hd>
      <td> 
      请求不成功。服务器从上行服务器接收到了无效的响应
      </td>
    </tr>
    <tr>
      <td>
      503 Service Unavailable
      </hd>
      <td> 
      请求不成功。服务器临时过载或停机
      </td>
    </tr>
     <tr>
      <td>
      504 Gateway Timeout
      </hd>
      <td> 
      网关超时
      </td>
    </tr>
    <tr>
      <td>
      505 HTTP Version Not Supported
      </hd>
      <td> 
      服务器不支持所要求的“HTTP协议”版本
      </td>
    </tr>
     <tr>
      <td>
      506 Variant Also Negotiates
      </hd>
      <td> 
      代表服务器存在内部配置错误：被请求的协商变元资源被配置为在透明内容协商中使用自己，因此在一个协商处理中不是一个合适的重点。
      </td>
    </tr>
     <tr>
      <td>
      507 Insufficient Storage
      </hd>
      <td> 
      服务器无法存储完成请求所必须的内容。这个状况被认为是临时的。wwwDAV（RFC 4918）
      </td>
    </tr>
     <tr>
      <td>
      509 Bandwidth Limit Exceeded
      </hd>
      <td> 
      服务器达到带宽限制。这不是一个官方的状态码，但是仍被广泛使用。
      </td>
    </tr>
     <tr>
      <td>
      510 Not Extended
      </hd>
      <td> 
      获取资源所需要的策略并没有没满足。
      </td>
    </tr>
</table>
