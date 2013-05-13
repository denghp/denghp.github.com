---
layout: post
title: 程序员的利器-Linux常用命令
tags: 
- linux
- shell
- 编程语言
categories:
- linux
- code
UUID: 201211190944
date: 2012-11-19
---

每个程序员，在职业生涯的某个时刻，总会发现自己需要知道一些Linux方面的知识。我并不是说你应该成为一个Linux专家，我的意思是，当面对Linux命令行任务时，你应该能很熟练的完成。事实上，学会了下面8个命令，我基本上能完成任何需要完成的任务。

*注意:*
下面的每个命令都有十分丰富的文档说明。这篇文章并不是来详尽的展示每个命令的各种功用的。我在这里要讲的是这几个最常用的命令的最常见用法。如果你对linux命令并不是很了解，你想找一些这方面的资料学习，那这篇文章将会给你一个基本的指导。

在这里我拿一个search.log日志文件来说明：
<pre style="font-size:10px; width:560px">
Nov 15, 2012 12:00:00 AM org.apache.solr.core.SolrCore execute
INFO: [deal] webapp=/solr-web-deal path=/analysis/field params={analysis.showmatch=false&analysis.query=泡芙&analysis.fieldname=title&analysis.fieldvalue=text} QTime=0 
Nov 15, 2012 12:00:01 AM org.apache.solr.core.SolrCore execute
INFO: [deal] webapp=/solr-web-deal path=/select params={fl=id,score,price&start=65&q=(city_id:2+OR+city_id:0)+AND+(title:(火锅)^7.0)}&rows=5&version=2} hits=2527 QTime=1 
Nov 15, 2012 12:00:01 AM org.apache.solr.core.SolrCore execute
INFO: [deal] webapp=/solr-web-deal path=/select params={fl=id,score,price&start=75&q=(city_id:1+OR+city_id:0)+AND+(title:(男装)^7.0)}&rows=15} hits=673 QTime=25
</pre>

### cat
*语法*
<pre id="bash">
cat [OPTION]... [FILE]...
</pre>
cat – 连接文件，并输出结果

cat 命令非常的简单，你从下面的例子可以看到。
<pre id="bash" style="font-size:10px; width:560px">
$ cat search.log
Nov 15, 2012 12:00:00 AM org.apache.solr.core.SolrCore execute
INFO: [deal] webapp=/solr-web-deal path=/analysis/field params={analysis.showmatch=false&analysis.query=泡芙&analysis.fieldname=title&analysis.fieldvalue=text} QTime=0 
Nov 15, 2012 12:00:01 AM org.apache.solr.core.SolrCore execute
INFO: [deal] webapp=/solr-web-deal path=/select params={fl=id,score,price&start=65&q=(city_id:2+OR+city_id:0)+AND+(title:(火锅)^7.0)}&rows=5&version=2} hits=2527 QTime=1 
Nov 15, 2012 12:00:01 AM org.apache.solr.core.SolrCore execute
INFO: [deal] webapp=/solr-web-deal path=/select params={fl=id,score,price&start=75&q=(city_id:1+OR+city_id:0)+AND+(title:(男装)^7.0)}&rows=15} hits=673 QTime=25
</pre>

就像它的说明描述的，你可以用它来连接多个文件。
<pre id="bash">
$ cat search.*
#或者
$ cat search.log search.log-20121123
</pre>

### sort
<pre>
sort – 文件里的文字按行排序
</pre>

此时sort命令显然是你最佳的选择。
<pre id="bash" style="font-size:10px; width:560px">
$ cat search.* | sort
INFO: [deal] webapp=/solr-web-deal path=/analysis/field params={analysis.showmatch=false&analysis.query=泡芙&analysis.fieldname=title&analysis.fieldvalue=text} QTime=0 
INFO: [deal] webapp=/solr-web-deal path=/select params={fl=id,score,price&start=65&q=(city_id:2+OR+city_id:0)+AND+(title:(火锅)^7.0)}&rows=5&version=2} hits=2527 QTime=1 
INFO: [deal] webapp=/solr-web-deal path=/select params={fl=id,score,price&start=75&q=(city_id:1+OR+city_id:0)+AND+(title:(男装)^7.0)}&rows=15} hits=673 QTime=25
Nov 15, 2012 12:00:00 AM org.apache.solr.core.SolrCore execute
Nov 15, 2012 12:00:01 AM org.apache.solr.core.SolrCore execute
Nov 15, 2012 12:00:01 AM org.apache.solr.core.SolrCore execute
</pre>

就像上面例子显示的，文件里的数据已经经过排序。对于一些小文件，你可以读取整个文件来处理它们，然而，真正的log文件通常有大量的内容，你不能不考虑这个情况。此时你应该考虑过滤出某些内容，把cat、sort后的内容通过管道传递给过滤工具。

### grep
<pre>
grep, egrep, fgrep – 打印出匹配条件的文字行
</pre>

假设我们只对city_id:1的搜索日志感兴趣。使用grep，我们能限制只输出含有city_id:1字符的日志。
<pre id="bash" style="font-size:10px; width:560px">
$ cat order.* | sort | grep -r "city_id:1"
INFO: [deal] webapp=/solr-web-deal path=/select params={fl=id,score,price&start=75&q=(city_id:1+OR+city_id:0)+AND+(title:(男装)^7.0)}&rows=15} hits=673 QTime=25
</pre>
grep 可以直接使用正则表达式

### cut
<pre>
cut – 删除文件中字符行上的某些区域
</pre>
又要使用grep，我们用grep过滤出我们想要的行。有了我们想要的行信息，我们就可以把它们切成小段，删除不需要的部分数据。
<pre id="bash" style="font-size:10px; width:560px">
$ cat order.* | sort | grep -r "city_id:1"
INFO: [deal] webapp=/solr-web-deal path=/select params={fl=id,score,price&start=75&q=(city_id:1+OR+city_id:0)+AND+(title:(男装)^7.0)}&rows=15} hits=673 QTime=25
$ cat order.* | sort | grep -r "city_id:1" |cut -d"," -f6,8
hits=673 QTime=25
</pre>
现在，我们把数据缩减为我们计算想要的形式，把这些数据粘贴到Excel里立刻就能得到结果了。

cut是用来消减信息、简化任务的，但对于输出内容，我们通常会有更复杂的形式。假设我们还需要知道订单的ID，这样可以用来关联相关的其他信息。我们用cut可以获得ID信息，但我们希望把ID放到行的最后，用单引号包上。

### sed
<pre>
sed – 一个流编辑器。它是用来在输入流上执行基本的文本变换。
</pre>
下面的例子展示了如何用sed命令变换我们的文件行.
<pre id="bash">
find -name "*.java" | xargs sed -i "s/SOAPHandler/SOAPAction/g"
</pre>

### tail
<pre>
tail [  -f ] [  -c Number |  -n Number |  -m Number |  -b Number |  -k Number ] [ File ]
</pre>

命令从指定点开始将 File 参数指定的文件写到标准输出。如果没有指定文件，则会使用标准输入。 Number 变量指定将多少单元写入标准输出。 Number 变量的值可以是正的或负的整数。如果值的前面有 +（加号），从文件开头指定的单元数开始将文件写到标准输出。如果值的前面有 -（减号），则从文件末尾指定的单元数开始将文件写到标准输出。如果值前面没有 +（加号）或 -（减号），那么从文件末尾指定的单元号开始读取文件。

要显示 notes 文件的最后十行，输入：
<pre id="bash">
$ tail notes
</pre>

要指定从 notes 文件末尾开始读取的行数，输入：
<pre id="bash">
$ tail  -n 20 notes
</pre>

要从第 200 字节开始，每次显示一页 notes 文件，输入：
<pre id="bash">
$ tail  -c +200 notes | pg
</pre>
要跟踪文件的增长，输入：
<pre id="bash">
$ tail  -f accounts
</pre>

### uniq

<pre>
uniq – 删除重复的行
</pre>

### find
find – 在文件目录中搜索文件
*语法*
<pre>
find [-H] [-L] [-P] [-Olevel] [-D help|tree|search|stat|rates|opt|exec] [path...] [expression]
</pre>

*示例：*
查找当前目录及子目录下的文件名,并重命名
方案1:
使用find命令查找，然后使用sed替换
<pre id="bash">
find . -name "*.java" | sed -e 's/\.java/\.class/g'
</pre>
方案2：
使用find命令查找，然后使用rename重命名
<pre id="bash">
find . -name "*.class" | rename 's/\.class/\.java/g'
</pre>
方案3：
使用bash，使用for循环mv重命名
<pre id="bash">
#!/bin/bash 
dn=`dirname $0`
dn=`cd $dn;pwd`
#for fn in `find $dn -type f |grep 'java$'` 
for fn in `find $dn -name '*.java'` 
do
if [ -f $fn ]; then
newfn=${fn/%java/class}
echo $newfn
mv $fn $newfn
fi
down
</pre>

### less
<pre>
less – 在文件里向前或向后移动
</pre>
在 less 命令，使用“/”来执行向前搜索，使用“？”命令执行向后搜索。搜索条件是一个正则表达式。

