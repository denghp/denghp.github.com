---
layout: post
title: TCP 3次握手连接协议和4次握手断开连接协议
short_title: TCP 3次握手连接协议和4次握手协议
tags: 
- TCP
- Socket
- 网络协议
- 3次握手
- TCP协议
categories:
- Socket
- code
UUID: 201212270023
---

  　　在TCP/IP协议中，TCP协议提供可靠的连接服务，采用三次握手建立一个连接，如图1所示。 (SYN包表示标志位syn=1,ACK包表示标志位ack=1,SYN+ACK包表示标志位syn=1,ack=1)

###TCP/IP 状态机
<img src="{{site.static_url}}/media/pub/linux/tcp-ip-status.jpg" width="480px" alt="tcp-ip-status" class="img-center"></img>


###三次握手
第一次握手：建立连接时，客户端A发送SYN包(SEQ_NUMBER=j)到服务器B，并进入SYN_SEND状态，等待服务器B确认。<br>
第二次握手：服务器B收到SYN包，必须确认客户A的SYN(ACK_NUMBER=j+1)，同时自己也发送一个SYN包(SEQ_NUMBER=k)，即SYN+ACK包，此时服务器B进入SYN_RECV状态。<br>
第三次握手：客户端A收到服务器B的SYN＋ACK包，向服务器B发送确认包ACK(ACK_NUMBER=k+1)，此包发送完毕，客户端A和服务器B进入ESTABLISHED状态，完成三次握手。<br>

<img src="{{site.static_url}}/media/pub/linux/0_1324910111Sc6p.gif" width="380px" alt="tcp三次握手" class="img-center"></img>

###四次握手
 　　由于TCP连接是全双工的，因此每个方向都必须单独进行关闭。这个原则是当一方完成它的数据发送任务后就能发送一个FIN来终止这个方向的连接。收到一个 FIN只意味着这一方向上没有数据流动，一个TCP连接在收到一个FIN后仍能发送数据。首先进行关闭的一方将执行主动关闭，而另一方执行被动关闭。
 
1、客户端A发送一个FIN，用来关闭客户A到服务器B的数据传送(报文段4)。<br>
2、服务器B收到这个FIN，它发回一个ACK，确认序号为收到的序号加1(报文段5)。和SYN一样，一个FIN将占用一个序号。<br>
3、服务器B关闭与客户端A的连接，发送一个FIN给客户端A(报文段6)。<br>
4、客户端A发回ACK报文确认，并将确认序号设置为收到序号加1(报文段7)。<br>

<img src="{{site.static_url}}/media/pub/linux/0_1324910173iGc3.gif" width="380px" alt="tcp四次握手" class="img-center"></img>

###为什么建立连接协议是三次握手，而关闭连接却是四次握手呢？
 　　因为服务端的LISTEN状态下的SOCKET当收到SYN报文的连接请求后，它可以把ACK和SYN(ACK起应答作用，而SYN起同步作用)放在一个报文里来发送。但关闭连接时，当收到对方的FIN报文通知时，它仅仅表示对方没有数据发送给你了；但未必你所有的数据都全部发送给对方了，所以你可能未必会马上会关闭SOCKET,也即你可能还需要发送一些数据给对方之后，再发送FIN报文给对方来表示你同意现在可以关闭连接了，所以它这里的ACK报文和FIN报文多数情况下都是分开发送的。

###为什么TIME_WAIT状态还需要等2MSL后才能返回到CLOSED状态？
  　　因为虽然双方都同意关闭连接了，而且握手的4个报文也都协调和发送完毕，按理可以直接回到CLOSED状态（就好比从SYN_SEND状态到ESTABLISH状态那样）；但是因为我们必须要假想网络是不可靠的，你无法保证你最后发送的ACK报文会一定被对方收到，因此对方处于LAST_ACK状态下的SOCKET可能会因为超时未收到ACK报文，而重发FIN报文，所以这个TIME_WAIT状态的作用就是用来重发可能丢失的ACK报文。

###为什么不能用两次握手进行连接？
  　　3次握手完成两个重要的功能，既要双方做好发送数据的准备工作(双方都知道彼此已准备好)，也要允许双方就初始序列号进行协商，这个序列号在握手过程中被发送和确认。

  　　现在把三次握手改成仅需要两次握手，死锁是可能发生的。作为例子，考虑计算机S和C之间的通信，假定C给S发送一个连接请求分组，S收到了这个分组，并发送了确认应答分组。按照两次握手的协定，S认为连接已经成功地建立了，可以开始发送数据分组。可是，C在S的应答分组在传输中被丢失的情况下，将不知道S是否已准备好，不知道S建立什么样的序列号，C甚至怀疑S是否收到自己的连接请求分组。在这种情况下，C认为连接还未建立成功，将忽略S发来的任何数据分组，只等待连接确认应答分组。而S在发出的分组超时后，重复发送同样的分组。这样就形成了死锁。

###小贴士
<ol>
<li>
默认情况下(不改变socket选项)，当你调用close( or closesocket，以下说close不再重复)时，如果发送缓冲中还有数据，TCP会继续把数据发送完。
</li>
<li>
发送了FIN只是表示这端不能继续发送数据(应用层不能再调用send发送)，但是还可以接收数据。
</li>
<li>
应用层如何知道对端关闭？通常，在最简单的阻塞模型中，当你调用recv时，如果返回0，则表示对端关闭。在这个时候通常的做法就是也调用close，那么TCP层就发送FIN，继续完成四次握手。如果你不调用close，那么对端就会处于FIN_WAIT_2状态，而本端则会处于CLOSE_WAIT状态。这个可以写代码试试。
</li>
<li>
在很多时候，TCP连接的断开都会由TCP层自动进行，例如你CTRL+C终止你的程序，TCP连接依然会正常关闭，你可以写代码试试。
</li>
</ol>

###TCP协议状态详解
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
      CLOSED
      </hd>
      <td style="width:500px">
      无连接是活动的或正在进行
      </td>
    </tr>
    <tr>
      <td>
      LISTEN
      </hd>
      <td> 
      服务器在等待进入呼叫
      </td>
    </tr>
    <tr>
      <td>
      SYN_RECV
      </hd>
      <td> 
      一个连接请求已经到达，等待确认
      </td>
    </tr>
    <tr>
      <td>
      SYN_SENT
      </hd>
      <td> 
      应用已经开始，打开一个连接
      </td>
    </tr>
    <tr>
      <td>
      ESTABLISHED
      </hd>
      <td> 
      正常数据传输状态
      </td>
    </tr>
    <tr>
      <td>
      FIN_WAIT1
      </hd>
      <td> 
      应用说它已经完成
      </td>
    </tr>
    <tr>
      <td>
      FIN_WAIT2
      </hd>
      <td> 
      另一边已同意释放
      </td>
    </tr>
    <tr>
      <td>
      ITMED_WAIT
      </hd>
      <td> 
      等待所有分组死掉
      </td>
    </tr>
    <tr>
      <td>
      CLOSING
      </hd>
      <td> 
      两边同时尝试关闭
      </td>
    </tr>
    <tr>
      <td>
      TIME_WAIT
      </hd>
      <td> 
      另一边已初始化一个释放
      </td>
    </tr>
    <tr>
      <td>
      LAST_ACK
      </hd>
      <td> 
      等待所有分组死掉
      </td>
    </tr>

  </tbody>
</table>


原文地址：<a href="http://blog.csdn.net/lostyears/article/details/7104349">http://blog.csdn.net/lostyears/article/details/7104349</a><br>
声明：以上资料均来自互联网，本人经过了修整，再次感谢原创作者。

