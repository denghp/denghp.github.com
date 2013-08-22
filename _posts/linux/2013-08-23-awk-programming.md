---
layout: post
title: AWK 实战与分享
tags: 
- shell
- awk
- linux
- 研发实践
categories:
- code
- linux
- archives
images: ["/assets/images/linux/awk_logo.jpg"]
UUID: 201308230023
---

　　最近被同事一个问题给问住啦，就是linux下如何使用命令来实现类似与数据库中的group by的方式分类统计。平时也用了不少的linux命令，如<code>grep, find, sed, wc</code>等，但是想要达分类统计的效果，真的不知道如何下手，当然如果使用shell命令结合起来就另说啦。在网上找了一边，发现<code>awk</code>这个语言，完全能解决自己的需求,下面看看它的强大吧.

###awk简介
　　awk是一种编程语言，用于在linux/unix下对文本和数据进行处理。数据可以来自标准输入、一个或多个文件，或其它命令的输出。它支持用户自定义函数和动态正则表达式等先进功能，是linux/unix下的一个强大编程工具。它在命令行中使用，但更多是作为脚本来使用。awk的处理文本和数据的方式是这样的，它逐行扫描文件，从第一行到最后一行，寻找匹配的特定模式的行，并在这些行上进行你想要的操作。如果没有指定处理动作，则把匹配的行显示到标准输出(屏幕)，如果没有指定模式，则所有被操作所指定的行都被处理。awk分别代表其作者姓氏的第一个字母。因为它的作者是三个人，分别是Alfred Aho、Brian Kernighan、Peter Weinberger。gawk是awk的GNU版本，它提供了Bell实验室和GNU的一些扩展。

###awk命令格式和选项
####awk的语法
<pre id="bash">
awk [options] 'script' var=value file(s)
awk [options] -f scriptfile var=value file(s)
</pre>

####命令选项
<table class="table table-bordered table-striped">
  <colgroup>
  <col class="span1">
  <col class="span7">
  </colgroup>
  <thead>
  <tr>
    <th>
      命令选项
    </th>
    <th>
      描述
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
    -F fs or --field-separator fs
    </td>
    <td>
      指定输入文件折分隔符，fs是一个字符串或者是一个正则表达式，如-F ""
    </td>
  </tr>

  <tr>
    <td>
    -v var=value or --asign var=value
    </td>
    <td>
    为awk_script设置变量
    </td>
  </tr>
  <tr>
    <td>
    -f scripfile or --file scriptfile
    </td>
    <td>
    从脚本文件中读取awk命令。
    </td>
  </tr>
  </tbody>
  </table>


###awk的环境变量
  <table class="table table-bordered table-striped">
  <colgroup>
  <col class="span1">
  <col class="span7">
  </colgroup>
  <thead>
  <tr>
    <th>
    变量名称
    </th>
    <th>
      描述
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
    $0
    </td>
    <td>
    当前记录（这个变量中存放着整个行的内容）
    </td>
  </tr>
<tr>
    <td>
    $1 ~ $n
    </td>
    <td>
    当前记录的第n个字段，字段间由FS分隔
    </td>
  </tr>
<tr>
    <td>
    FS
    </td>
    <td>
    输入字段分隔符 默认是空格或Tab
    </td>
  </tr>
<tr>
    <td>
    NF
    </td>
    <td>
    当前记录中的字段个数，就是有多少列
    </td>
  </tr>
<tr>
    <td>
    NR
    </td>
    <td>
    已经读出的记录数，就是行号，从1开始，如果有多个文件话，这个值也是不断累加中。
    </td>
  </tr>
<tr>
    <td>
    FNR
    </td>
    <td>
    当前记录数，与NR不同的是，这个值会是各个文件自己的行号
    </td>
  </tr>
<tr>
    <td>
    RS
    </td>
    <td>
    输入的记录分隔符， 默认为换行符
    </td>
  </tr>
<tr>
    <td>
    OFS
    </td>
    <td>
    输出字段分隔符， 默认也是空格
    </td>
  </tr>
<tr>
    <td>
    ORS
    </td>
    <td>
    输出的记录分隔符，默认为换行符
    </td>
  </tr>
<tr>
    <td>
    FILENAME
    </td>
    <td>
    当前输入文件的名字
    </td>
  </tr>
<tr>
    <td>
    CONVFMT
    </td>
    <td>
    数字转换格式(默认值为%.6g)
    </td>
  </tr>
<tr>
    <td>
    ARGC
    </td>
    <td>
    命令行参数的数目。
    </td>
  </tr>

<tr>
    <td>
    ARGIND
    </td>
    <td>
    命令行中当前文件的位置(从0开始算)。
    </td>
  </tr>

<tr>
    <td>
    OFMT
    </td>
    <td>
    数字的输出格式(默认值是%.6g)。
    </td>
  </tr>

    </tbody>
  </table>
###awk运算符
  <table class="table table-bordered table-striped">
  <colgroup>
  <col class="span1">
  <col class="span7">
  </colgroup>
  <thead>
  <tr>
    <th>
    运算符
    </th>
    <th>
      描述
    </th>
  </tr>
  </thead>
  <tbody>
  <tr>
    <td>
    = += -= *= /= %= ^= **=
    </td>
    <td>
    赋值
    </td>
  </tr>

  <tr>
    <td>
    ?:
    </td>
    <td>
    C条件表达式,java三元表达式
    </td>
  </tr>
  <tr>
    <td>
    || &&
    </td>
    <td>
    逻辑或,与
    </td>
  </tr>
  <tr>
    <td>
    ~ ~!
    </td>
    <td>
    匹配正则表达式和不匹配正则表达式
    </td>
  </tr>
  <tr>
    <td>
    < <= > >= != ==
    </td>
    <td>
    关系运算符
    </td>
  </tr>
  <tr>
    <td>
    + - * / &
    </td>
    <td>
    加，减 乘，除与求余
    </td>
  </tr>
  <tr>
    <td>
    ++ -- $ in
    </td>
    <td>
    增加或减少，作为前缀或后缀 $字段引用 in数组成员
    </td>
  </tr>
  </tbody>
  </table>

###awk记录和域
####记录
awk把每一个以换行符结束的行称为一个记录。

记录分隔符：默认的输入和输出的分隔符都是回车，保存在内建变量ORS和RS中。

$0变量：它指的是整条记录。如<code>$ awk '{print $0}' test </code>将输出test文件中的所有记录。

变量NR：一个计数器，每处理完一条记录，NR的值就增加1。如<code>$ awk '{print NR,$0}' test </code>将输出test文件中所有记录，并在记录前显示记录号。

####域,域分隔符
记录中每个单词称做“域”，默认情况下以空格或tab分隔。awk可跟踪域的个数，并在内建变量NF中保存该值。如<code>$ awk '{print $1,$3}' test </code>将打印test文件中第一和第三个以空格分开的列(域)。

内建变量FS保存输入域分隔符的值，默认是空格或tab。我们可以通过-F命令行选项修改FS的值。如<code>$ awk -F: '{print $1,$5}' test </code>将打印以冒号为分隔符的第一，第五列的内容。

可以同时使用多个域分隔符，这时应该把分隔符写成放到方括号中，如<code>$awk -F'[:\t]' '{print $1,$3}' test</code>，表示以空格、冒号和tab作为分隔符。

输出域的分隔符默认是一个空格，保存在OFS中。如<code>$ awk -F: '{print $1,$5}' test</code>，$1和$5间的逗号就是OFS的值。

###gawk专用正则表达式元字符
<ul>
<li><code>\Y</code> 匹配一个单词开头或者末尾的空字符串。</li>
<li><code>\B</code> 匹配单词内的空字符串。</li>
<li><code>\<</code> 匹配一个单词的开头的空字符串，锚定开始。</li>
<li><code>\></code> 匹配一个单词的末尾的空字符串，锚定末尾。</li>
<li><code>\w</code> 匹配一个字母数字组成的单词。</li>
<li><code>\W</code> 匹配一个非字母数字组成的单词。</li>
<li><code>\‘</code> 匹配字符串开头的一个空字符串。</li>
<li><code>\'</code> 匹配字符串末尾的一个空字符串'。</li>
</ul>

###awk脚本编程
####模块BEGIN,END
END的意思是“处理完所有的行的标识”，即然说到了END就有必要介绍一下BEGIN，这两个关键字意味着执行前和执行后的意思，语法如下：
<ul>
<li>BEGIN{ 这里面放的是执行前的语句 }</li>
<li>END {这里面放的是处理完所有的行后要执行的语句 }</li>
<li>{这里面放的是处理每一行时要执行的语句}</li>
</ul>

####条件语句
awk中的条件语句是从C语言中借鉴过来的，可控制程序的流程。
#####if语句
格式:
<pre id="bash">
{if (expression){
    statement; statement; ...
  }
}
</pre>
示例:
<pre id="bash">
#如果第一个域小于第二个域则打印。
$ awk '{if ($1 <$2) print $2 "too high"}' test

#如果第一个域小于第二个域，则count加一，并打印ok。
$ awk '{if ($1 < $2) {count++; print "ok"}}' test
</pre>

######if/else语句，用于双重判断
格式:
<pre id="c">
{if (expression){
  statement; statement; ...
  } 
else {
  statement; statement; ...
}
</pre>
示例：
<pre id="bash">
#如果$1大于100则打印$1 bad,否则打印ok。
$ awk '{if ($1 > 100) print $1 "bad" ; else print "ok"}' test

#如果$1大于100，则count加一，并打印$1，否则count减一，并打印$1。
$ awk '{if ($1 > 100){ count++; print $1} else {count--; print $2}' test
</pre>

###### if/else else if语句，用于多重判断
格式:
<pre id="c">
{if (expression){
  statement; statement; ...
                }
else if (expression){
  statement; statement; ...
}
else if (expression){
  statement; statement; ...
}
else {
  statement; statement; ...
}
}
</pre>

######循环
awk有三种循环:while循环；for循环；special for循环:
<pre id="bash">
#变量的初始值为1，若i小于可等于NF(记录中域的个数),则执行打印语句，且i增加1。直到i的值大于NF.
$ awk '{ i = 1; while ( i <= NF ) { print NF,$i; i++}}' test
$ awk '{for (i = 1; i &lt;NF; i++) print NF,$i}' test
</pre>

breadkcontinue语句。break用于在满足条件的情况下跳出循环；continue用于在满足条件的情况下忽略后面的语句，直接返回循环的顶端。如：
<pre id="bash">
{for ( x=3; x<=NF; x++) 
  if ($x<0){print "Bottomed out!"; break}}
{for ( x=3; x<=NF; x++)
  if ($x==0){print "Get next item"; continue}}
</pre>

next语句从输入文件中读取一行，然后从头开始执行awk脚本。如：
<pre id="bash">
{if ($1 ~/test/){next}
  else {print}
}
</pre>
exit语句用于结束awk程序，但不会略过END块。退出状态为0代表成功，非零值表示出错。

######下标与关联数组
用变量作为数组下标。如：<code>$ awk '{name[x++]=$2};END{for(i=0;i<NR;i++) print i,name[i]}' test</code>。数组name中的下标是一个自定义变量x，awk初始化x的值为0，在每次使用后增加1。第二个域的值被赋给name数组的各个元素。在END模块中，for循环被用于循环整个数组，从下标为0的元素开始，打印那些存储在数组中的值。因为下标是关健字，所以它不一定从0开始，可以从任何值开始。

or循环用于读取关联数组中的元素:
<pre id="bash">
{for (item in arrayname){
  print arrayname[item]
  }
}
# 打印有值的数组元素。打印的顺序是随机:
$ awk '/^tom/{name[NR]=$1}; END{for(i in name){print name[i]}}' test
</pre>

用字符串作为下标。如：<code>count["test"]</code>

用域值作为数组的下标。一种新的for循环方式，<code>for (index_value in array) statement</code>。如:<code>$ awk '{count[$1]++} END{for(name in count) print name,count[name]}' test</code>该语句将打印$1中字符串出现的次数。它首先以第一个域作数组count的下标，第一个域变化，索引就变化。

delete函数用于删除数组元素。如：<code>$ awk '{line[x++]=$1} END{for(x in line) delete(line[x])}' test </code>分配给数组line的是第一个域的值，所有记录处理完成后，special for循环将删除每一个元素。

####示例代码
######假设有这么一个文件（学生成绩表）：
<pre id="bash">
$ cat score.txt
Marry   2143 78 84 77
Jack    2321 66 78 45
Tom     2122 48 77 71
Mike    2537 87 97 95
Bob     2415 40 57 62
</pre>

我们的awk脚本如下（我没有写有命令行上是因为命令行上不易读，另外也在介绍另一种用法）：
<pre id="bash">
$ cat cal.awk
#!/bin/awk -f
#运行前
BEGIN {
  math = 0
    english = 0
    computer = 0

    printf "NAME    NO.   MATH  ENGLISH  COMPUTER   TOTAL\n"
    printf "---------------------------------------------\n"
}
#运行中
{
  math+=$3
    english+=$4
    computer+=$5
    printf "%-6s %-6s %4d %8d %8d %8d\n", $1, $2, $3,$4,$5, $3+$4+$5
}
#运行后
END {
  printf "---------------------------------------------\n"
    printf "  TOTAL:%10d %8d %8d \n", math, english, computer
    printf "AVERAGE:%10.2f %8.2f %8.2f\n", math/NR, english/NR, computer/NR
}
</pre>

执行结果:
<pre id="bash">
$ awk -f cal.awk score.txt
NAME    NO.   MATH  ENGLISH  COMPUTER   TOTAL
---------------------------------------------
Marry  2143     78       84       77      239
Jack   2321     66       78       45      189
Tom    2122     48       77       71      196
Mike   2537     87       97       95      279
Bob    2415     40       57       62      159
---------------------------------------------
  TOTAL:       319      393      350
  AVERAGE:     63.80    78.60    70.00
</pre>

####环境变量
即然说到了脚本，我们来看看怎么和环境变量交互：（使用-v参数和ENVIRON，使用ENVIRON的环境变量需要export）
<pre id="bash">
$ x=5

$ y=10
$ export y

$ echo $x $y
5 10

$ awk -v val=$x '{print $1, $2, $3, $4+val, $5+ENVIRON["y"]}' OFS="\t" score.txt
Marry   2143    78      89      87
Jack    2321    66      83      55
Tom     2122    48      82      81
Mike    2537    87      102     105
Bob     2415    40      62      72
</pre>

######分别统计字符出现的次数
<pre id="bash">
$ cat ab.txt
a b c d
b a d c
a d d b 
b d a c
</pre>
分别统计每个字符出现的次数:
<pre id="bash">
$ awk '{for (i = 1; i<=NF; i++) print $i}' ab.txt |sort -r | uniq -c
5 d
3 c
4 b
4 a
</pre>
统计某一列字符出现的次数:
<pre id="bash">
$ awk -F " " '{ w[$2]+=1} END{ for (i in w)  print i, w[i]}' ab.txt
a 1
b 1
d 2
</pre>

######统计group by
<pre id="bash">
$ cat demo.dat
06 01 06 30      2.700         81.000
06 01 06 45      3.900        175.500
06 01 07 00      2.400          0.000
06 01 07 15      0.160          2.400
06 01 08 45      5.520        248.400
06 01 09 00      6.600          0.000
06 01 09 30      3.300         99.000
06 01 09 45      2.300        103.500
06 01 10 15      7.880        118.200
06 01 10 30     10.820        324.600
06 01 11 30      3.180         95.400
06 01 11 45      1.800         81.000
06 01 12 00     30.970          0.000
</pre>
统计单列数据group by 单列聚合:
<pre id="bash">
$ awk '{a[$3]+=$5}END{for(i in a) printf "%s %10.3f\n",i,a[i]}' demo.dat
01     81.530
</pre>
统计单列group by多列聚合:
<pre id="bash">
$ awk '{a[$2]+=$5;b[$2]+=$6}END{for(i in a) printf "%s %10.3f %14.3f\n",i,a[i],b[i]}' demo.dat
01     81.530       1329.000
</pre>
统计多列group by单列聚合:
<pre id="bash">
$ awk '{a[$2" "$3]+=$5}END{for(i in a) printf "%s %10.3f\n",i,a[i]}' demo.dat
01 11      4.980
01 12     30.970
01 06      6.600
01 07      2.560
01 08      5.520
01 09     12.200
01 10     18.700
</pre>
统计多列group by多列聚合:
<pre id="bash">
awk '{a[$2" "$3]+=$5;b[$2" "$3]+=$6}END{for(i in a) printf "%s %14.3f %14.3f\n",i,a[i],b[i]}' demo.dat
01 11          4.980        176.400
01 12         30.970          0.000
01 06          6.600        256.500
01 07          2.560          2.400
01 08          5.520        248.400
01 09         12.200        202.500
01 10         18.700        442.800
</pre>

#####其他的几个例子
<pre id="bash">
#从file文件中找出长度大于80的行
awk 'length>80' file
 
#按连接数查看客户端IP
netstat -ntu | awk '{print $5}' | cut -d: -f1 | sort | uniq -c | sort -nr
  
#打印99乘法表
seq 9 | sed 'H;g' | awk -v RS='' '{for(i=1;i<=NF;i++)printf("%dx%d=%d%s", i, NR, i*NR, i==NR?"\n":"\t")}'
</pre>

###相关内容
关于其中的一些知识点可以参看<a href="http://www.gnu.org/software/gawk/manual/gawk.html" target="_bank">gawk的手册</a>：
<ul>
<li>内建变量，参看：<a href="http://www.gnu.org/software/gawk/manual/gawk.html#Built_002din-Variables" target="_bank">http://www.gnu.org/software/gawk/manual/gawk.html#Built_002din-Variables</a></li>
<li>流控方面，参看：<a href="http://www.gnu.org/software/gawk/manual/gawk.html#Statements" target="_bank">http://www.gnu.org/software/gawk/manual/gawk.html#Statements</a></li>
<li>内建函数，参看：<a href="http://www.gnu.org/software/gawk/manual/gawk.html#Built_002din" target="_bank">http://www.gnu.org/software/gawk/manual/gawk.html#Built_002din</a></li>
<li>正则表达式，参看：<a href="http://www.gnu.org/software/gawk/manual/gawk.html#Regexp" target="_bank">http://www.gnu.org/software/gawk/manual/gawk.html#Regexp</a></li>
</ul>
