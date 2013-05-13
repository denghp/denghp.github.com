--- 
layout: post
title: Java解析JavaScript数据
tags: 
- javaScript
- java
- ScriptEngine
- Rhino
- 研发实践
categories:
- code
- java
UUID: 201301261427
date: 2013-01-26 08:27:22
---

 　　最近有一个小小的需求，就是在java中解析javascript脚本,JDK6就已经支持脚本语言了,针对JS有js引擎ScriptEngine。但是我在使用过程觉得用的不是很方便，比较别扭，经研究发现还有一个更强大的脚本引擎-mozilla提供的<a href="https://github.com/mozilla/rhino" alt="rhino" target="_bank">rhino</a>

###Java用ScriptEngine解析脚本
 　　javax.script，始于JDK1.6，不过现在只有sun实现的javascript的解析器，难道是因为主要用来解析js语法所以归类到JEE的范畴？不过基本足够了，一般的用途主要是能解析通用的表达式就好，比如X >= 1（X作为参数传入）这样的表达式，也能利用js的函数语法，创造一个就像java的函数一样存在于内存中随时可以被调用的函数，更可以将js中的对象直接转换成java对象。

####Script主要类及接口
ScriptEngineManager、ScriptEngine、CompiledScript和Bindings 4个类或接口
<ol>
<li>
ScriptEngineManager是一个工厂的集合，可以通过name或tag的方式获取某个脚本的工厂并生成一个此脚本的ScriptEngine，目前只有javascript的工厂。通过工厂函数得到了ScriptEngine之后，就可以用这个对象来解析脚本字符串了，直接调用Object obj = ScriptEngine.eval(String script)即可，返回的obj为表达式的值，比如true、false或int值。
</li>
<li>
CompiledScript可以将ScriptEngine解析一段脚本的结果存起来，方便多次调用。只要将ScriptEngine用Compilable接口强制转换后，调用compile(String script)就返回了一个CompiledScript对象，要用的时候每次调用一下CompiledScript.eval()即可，一般适合用于js函数的使用。
</li>
<li>
Bindings的概念算稍微复杂点，我的理解Bindings是用来存放数据的容器。它有3个层级，为Global级、Engine级和Local级，前2者通过ScriptEngine.getBindings()获得，是唯一的对象，而Local Binding由ScriptEngine.createBindings()获得，很好理解，每次都产生一个新的。Global对应到工厂，Engine对应到ScriptEngine，向这2者里面加入任何数据或者编译后的脚本执行对象，在每一份新生成的Local Binding里面都会存在。
</li>
</ol>

####ScriptEngine代码示例
先来看一段JS
<pre id="javascript">
var arrclass = new Array();
arrclass.push(new Class(20000,"计算机-软件开发"));
arrclass.push(new Class(30000,"计算机-网络/通讯"));
arrclass.push(new Class(10000,"计算机-硬件开发"));
arrclass.push(new Class(40000,"计算机-管理"));
arrclass.push(new Class(50000,"计算机-品质管理/技术支持"));
arrclass.push(new Class(320000,"电子/电器/半导体/仪器仪表"));
</pre>
java代码实现解析
<pre id="java">
public void parseJS() &#123;
  //1、通过Http请求获取js的String数据，格式如上
  String jsData = getJsData("url");
  //2、观察js结构，自定义Class,push到数组中,java中需要定义跟js中的Class的声明
  String clazz = "function Class(classId, className)&#123; this.classId=classId;this.className=className&#125;;";

  //3、初始化ScriptEngine
  ScriptEngine engine = new ScriptEngineManager().getEngineByName("javascript");
  //4、js中未定义返回对象,这里需要将Class数据转换成字符串的数组返回，个人觉得很别扭，不知道是理解错误还是确实如此？
  //如果不这样做则直接在js后加上arrclass，cScript.evel()则返回NativeObject对象的数组
  String fun = "var result = new Array() ;for(var i=0;i &lt;arrclass.length;i++)&#123;result.push(new Array(arrclass[i].classId,arrclass[i].className))&#125;; result;";
  Compilable compilable = (Compilable) engine;
  //4、使用NativeArray获取数据
  CompiledScript cScript;
  try &#123;
     cScript = compilable.compile(clazz + jsData + fun);
     NativeArray na = (NativeArray) cScript.eval();
     for (int i = 0; i < na.getLength(); i++) &#123;
         NativeArray nv = (NativeArray) na.get(i, null);
         System.out.println(nv.get(0, null).toString() + " " + nv.get(1, null).toString());
     &#125;
 &#125; catch (ScriptException ex) &#123;
     ex.printStackTrace();
 &#125;
&#125;
</pre>
java代码中执行js计算
<pre id="java">
public void js() &#123;  
    // 创建脚本引擎管理器  
    ScriptEngineManager sem = new ScriptEngineManager();  
    // 创建一个处理JavaScript的脚本引擎  
    ScriptEngine engine = sem.getEngineByExtension("js");  
    try &#123;  
        // 执行js公式  
        engine.eval("if(6>5)&#123;flag=true;&#125;else&#123;flag =false;&#125;");  
    &#125; catch (ScriptException ex) &#123;
        ex.printStackTrace();  
    &#125;  
    //看看我们预期的反馈结果 true  
    System.out.println(engine.get("flag"));  
&#125;  
</pre>

###Java解析JS另一大引擎-Rhino
<a href="https://github.com/mozilla/rhino" alt="rhino" target="_bank">Rhino</a>是完全用Java编写的JavaScript的开放源代码实现。它通常是嵌入到Java应用程序提供给最终用户的脚本。它被镶嵌在J2SE6作为默认的Java脚本引擎。

使用Rhino来解析，感觉一切都很清晰明朗.
<pre id="java">
public void parseJS() &#123;
  //1、通过Http请求获取js的String数据，格式如上
  String jsData = getJsData("url");
  //2、定义跟js中的Class的声明
  String clazz = "function Class(classId, className){ this.classId=classId;this.className=className};";
  //3、初始化Context
  Context cx = Context.enter();
  Scriptable scope = cx.initStandardObjects();
  Object result = cx.evaluateString(scope, clazz + jsData + ";arrclass", "arrclass", 1, null);
  System.out.println(NativeJSON.stringify(cx, scope, result, null, null));
  Context.exit();
&#125; 
</pre>

