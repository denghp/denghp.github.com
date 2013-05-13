--- 
layout: post
title: Mongodb 安装及常用命令
tags: 
- shell 
- Mongodb
categories:
- code
- Mongodb
UUID: 20130416001000
date: 2013-04-16 00:10:00
show_img: "/media/pub/web/mongodb-logo.png"
---

MongoDB是一个介于关系数据库和非关系数据库之间的产品，是非关系数据库当中功能最丰富，最像关系数据库的。他支持的数据结构非常松散，是类似json的bjson格式，因此可以存储比较复杂的数据类型。Mongo最大的特点是他支持的查询语言非常强大，其语法有点类似于面向对象的查询语言，几乎可以实现类似关系数据库单表查询的绝大部分功能，而且还支持对数据建立索引。

<strong>它的特点是高性能、易部署、易使用，存储数据非常方便。主要功能特性有：</strong>
<ol>
<li>面向集合存储，易存储对象类型的数据。</li>
<li>模式自由。</li>
<li>支持动态查询。</li>
<li>支持完全索引，包含内部对象。</li>
<li>支持查询。</li>
<li>支持复制和故障恢复。</li>
<li>使用高效的二进制数据存储，包括大型对象（如视频等）。</li>
<li>自动处理碎片，以支持云计算层次的扩展性</li>
<li>支持RUBY，PYTHON，JAVA，C++，PHP等多种语言。</li>
<li>文件存储格式为BSON（一种JSON的扩展）</li>
<li>可通过网络访问</li>
</ol>

###Mongodb安装
1、 下载mongoDB <a href="http://www.mongodb.org/downloads" target="_bank">http://www.mongodb.org/downloads</a><br>
2、 相关文档：<a href="http://www.mongodb.org/display/DOCS/Tutorial" target="_bank">http://www.mongodb.org/display/DOCS/Tutorial</a><br>
3、 解压安装<br>
<pre id="bash">
$ tar -zxvf mongodb-linux-x86_64-2.4.1.tar.gz
</pre>
4、启动mongodb<br>
<pre id="bash">
$ ./mongod --dbpath /home/denghp/mongodb/data --logpath /home/denghp/mongodb/logs/mongodb.log --logappend &
#--dbpath 数据库存储路径
#--logpath 日志文件存储路径
#--logappend 日志文件追加，默认是覆盖
# & 表示后台启动运行
</pre>
5、连接测试
<pre id="bash">
$ mongo
MongoDB shell version: 2.0.4
connecting to: test
> db.version();
2.4.1
</pre>

###MongoDB shell数据操作
shell命令操作语法和JavaScript很类似，其实控制台底层的查询语句都是用JavaScript脚本完成操作的。

####数据库
1、Help查看命令提示
<pre id="bash">
help
db.help();
db.yourColl.help();
db.youColl.find().help();
rs.help();
</pre>
2、切换/创建数据库
<pre id="bash">
>use yourDB;
当创建一个集合(table)的时候会自动创建当前数据库
</pre>

3、查询所有数据库
<pre id="bash">
show dbs;
</pre>

4、删除当前使用数据库
<pre id="bash">
db.dropDatabase();
</pre>

5、从指定主机上克隆数据库
<pre id="bash">
db.cloneDatabase(“127.0.0.1”);
#将指定机器上的数据库的数据克隆到当前数据库
</pre>

6、从指定的机器上复制指定数据库数据到某个数据库
<pre id="bash">
db.copyDatabase("mydb", "temp", "127.0.0.1");
#将本机的mydb的数据复制到temp数据库中
</pre>

7、修复当前数据库
<pre id="bash">
db.repairDatabase();
</pre>

8、查看当前使用的数据库
<pre id="bash">
db.getName();
db;
db和getName方法是一样的效果，都可以查询当前使用的数据库
</pre>

9、显示当前db状态
<pre id="bash">
db.stats();
</pre>
10、当前db版本
<pre id="bash">
db.version();
</pre>
11、查看当前db的链接机器地址
<pre id="bash">
db.getMongo();
</pre>

####Collection聚集集合
1、创建一个聚集集合（table）
<pre id="bash">
db.createCollection(“collName”, {size: 20, capped: 5, max: 100});
</pre>

2、得到指定名称的聚集集合（table）
<pre id="bash">
db.getCollection("account");
</pre>

3、得到当前db的所有聚集集合
<pre id="bash">
db.getCollectionNames();
</pre>

4、显示当前db所有聚集索引的状态
<pre id="bash">
db.printCollectionStats();
</pre>

####用户相关
1、添加一个用户
<pre id="bash">
db.addUser("name");
db.addUser("userName", "pwd123", true);
添加用户、设置密码、是否只读
</pre>

2、数据库认证、安全模式
<pre id="bash">
db.auth("userName", "123123");
</pre>

3、显示当前所有用户
<pre id="bash">
show users;
</pre>

4、删除用户
<pre id="bash">
db.removeUser("userName");
</pre>

####其他
1、查询之前的错误信息
<pre id="bash">
db.getPrevError();
</pre>

2、清除错误记录
<pre id="bash">
db.resetError();
</pre>

###Collection聚集集合操作
####查看聚集集合基本信息
1、查看帮助
<pre id="bash">
db.yourColl.help();
</pre>

2、查询当前集合的数据条数
<pre id="bash">
db.yourColl.count();
</pre>
3、查看数据空间大小
<pre id="bash">
db.userInfo.dataSize();
</pre>

4、得到当前聚集集合所在的db
<pre id="bash">
db.userInfo.getDB();
</pre>

5、得到当前聚集的状态
<pre id="bash">
db.userInfo.stats();
</pre>

6、得到聚集集合总大小
<pre id="bash">
db.userInfo.totalSize();
</pre>

7、聚集集合储存空间大小
<pre id="bash">
db.userInfo.storageSize();
</pre>

8、Shard版本信息
<pre id="bash">
db.userInfo.getShardVersion()
</pre>

9、聚集集合重命名
<pre id="bash">
db.userInfo.renameCollection("users");
将userInfo重命名为users
</pre>

10、删除当前聚集集合
<pre id="bash">
db.userInfo.drop();
</pre>

####聚集集合查询
1、查询所有记录
<pre id="bash">
db.userInfo.find();
相当于：select * from userInfo;
默认每页显示20条记录，当显示不下的情况下，可以用it迭代命令查询下一页数据。注意：键入it命令不能带“；”
但是你可以设置每页显示数据的大小，用DBQuery.shellBatchSize = 50;这样每页就显示50条记录了。
</pre>

2、查询去掉后的当前聚集集合中的某列的重复数据
<pre id="bash">
db.userInfo.distinct("name");
会过滤掉name中的相同数据
相当于：select distict name from userInfo;
</pre>

3、查询age = 22的记录
<pre id="bash">
db.userInfo.find({"age": 22});
相当于： select * from userInfo where age = 22;
</pre>

4、查询age > 22的记录
<pre id="bash">
db.userInfo.find({age: {$gt: 22}});
相当于：select * from userInfo where age > 22;
</pre>

5、查询age < 22的记录
<pre id="bash">
db.userInfo.find({age: {$lt: 22}});
相当于：select * from userInfo where age < 22;
</pre>

6、查询age >= 25的记录
<pre id="bash">
db.userInfo.find({age: {$gte: 25}});
相当于：select * from userInfo where age >= 25;
</pre>

7、查询age <= 25的记录
<pre id="bash">
db.userInfo.find({age: {$lte: 25}});
</pre>

8、查询age >= 23 并且 age <= 26
<pre id="bash">
db.userInfo.find({age: {$gte: 23, $lte: 26}});
</pre>

9、查询name中包含 mongo的数据
<pre id="bash">
db.userInfo.find({name: /mongo/});
//相当于%%
select * from userInfo where name like ‘%mongo%’;
</pre>

10、查询name中以mongo开头的
<pre id="bash">
db.userInfo.find({name: /^mongo/});
select * from userInfo where name like ‘mongo%’;
</pre>

11、查询指定列name、age数据
<pre id="bash">
db.userInfo.find({}, {name: 1, age: 1});
相当于：select name, age from userInfo;
当然name也可以用true或false,当用ture的情况下河name:1效果一样，如果用false就是排除name，显示name以外的列信息。
</pre>

12、查询指定列name、age数据, age > 25
<pre id="bash">
db.userInfo.find({age: {$gt: 25}}, {name: 1, age: 1});
相当于：select name, age from userInfo where age > 25;
</pre>

13、按照年龄排序
<pre id="bash">
升序：db.userInfo.find().sort({age: 1});
降序：db.userInfo.find().sort({age: -1});
</pre>

14、查询name = zhangsan, age = 22的数据
<pre id="bash">
db.userInfo.find({name: 'zhangsan', age: 22});
相当于：select * from userInfo where name = ‘zhangsan’ and age = ‘22’;
</pre>

15、查询前5条数据
<pre id="bash">
db.userInfo.find().limit(5);
相当于：select top 5 * from userInfo;
</pre>

16、查询10条以后的数据
<pre id="bash">
db.userInfo.find().skip(10);
相当于：select * from userInfo where id not in (
    select top 10 * from userInfo
    );
</pre>
17、查询在5-10之间的数据
<pre id="bash">
db.userInfo.find().limit(10).skip(5);
可用于分页，limit是pageSize，skip是第几页*pageSize
</pre>
18、or与 查询
<pre id="bash">
db.userInfo.find({$or: [{age: 22}, {age: 25}]});
相当于：select * from userInfo where age = 22 or age = 25;
</pre>
19、查询第一条数据
<pre id="bash">
db.userInfo.findOne();
相当于：select top 1 * from userInfo;
db.userInfo.find().limit(1);
</pre>
20、查询某个结果集的记录条数
<pre id="bash">
db.userInfo.find({age: {$gte: 25}}).count();
相当于：select count&#40;*&#41; from userInfo where age >= 20;
</pre>

21、按照某列进行排序
<pre id="bash">
db.userInfo.find({sex: {$exists: true}}).count();
相当于：select count(sex) from userInfo;
</pre>
#### 索引
1、创建索引
<pre id="bash">
db.userInfo.ensureIndex({name: 1});
db.userInfo.ensureIndex({name: 1, ts: -1});
</pre>
2、查询当前聚集集合所有索引
<pre id="bash">
db.userInfo.getIndexes();
</pre>
3、查看总索引记录大小
<pre id="bash">
db.userInfo.totalIndexSize();
</pre>

4、读取当前集合的所有index信息
<pre id="bash">
db.users.reIndex();
</pre>

5、删除指定索引
<pre id="bash">
db.users.dropIndex("name_1");
</pre>

6、删除所有索引索引
<pre id="bash">
db.users.dropIndexes();
</pre>

####修改、添加、删除集合数据
1、添加
<pre id="bash">
db.users.save({name: ‘zhangsan’, age: 25, sex: true});
添加的数据的数据列，没有固定，根据添加的数据为准
</pre>

2、修改
<pre id="bash">
db.users.update({age: 25}, {$set: {name: 'changeName'}}, false, true);
相当于：update users set name = ‘changeName’ where age = 25;

db.users.update({name: 'Lisi'}, {$inc: {age: 50}}, false, true);
相当于：update users set age = age + 50 where name = ‘Lisi’;

db.users.update({name: 'Lisi'}, {$inc: {age: 50}, $set: {name: 'hoho'}}, false, true);
相当于：update users set age = age + 50, name = ‘hoho’ where name = ‘Lisi’;
</pre>

3、删除
<pre id="bash">
db.users.remove({age: 132});
</pre>
4、查询修改删除
<pre id="bash">
db.users.findAndModify({
query: {age: {$gte: 25}}, 
sort: {age: -1}, 
update: {$set: {name: 'a2'}, $inc: {age: 2}},
remove: true
});

db.runCommand({ findandmodify : "users", 
    query: {age: {$gte: 25}}, 
    sort: {age: -1}, 
    update: {$set: {name: 'a2'}, $inc: {age: 2}},
    remove: true
    });
</pre>
####语句块操作
1、简单Hello World
<pre id="bash">
print("Hello World!");
这种写法调用了print函数，和直接写入"Hello World!"的效果是一样的；
</pre>

2、将一个对象转换成json
<pre id="bash">
tojson(new Object());
tojson(new Object('a'));
</pre>

3、循环添加数据
<pre id="bash">
> for (var i = 0; i < 30; i++) {
  ... db.users.save({name: "u_" + i, age: 22 + i, sex: i % 2});
  ... };
这样就循环添加了30条数据，同样也可以省略括号的写法
> for (var i = 0; i < 30; i++) db.users.save({name: "u_" + i, age: 22 + i, sex: i % 2});
也是可以的，当你用db.users.find()查询的时候，显示多条数据而无法一页显示的情况下，可以用it查看下一页的信息；
</pre>

4、find 游标查询
<pre id="bash">
>var cursor = db.users.find();
> while (cursor.hasNext()) { 
  printjson(cursor.next()); 
}
这样就查询所有的users信息，同样可以这样写
var cursor = db.users.find();
while (cursor.hasNext()) { printjson(cursor.next); }
同样可以省略{}号
</pre>

5、forEach迭代循环
<pre id="bash">
db.users.find().forEach(printjson);
forEach中必须传递一个函数来处理每条迭代的数据信息
</pre>

6、将find游标当数组处理
<pre id="bash">
var cursor = db.users.find();
cursor[4];
取得下标索引为4的那条数据
既然可以当做数组处理，那么就可以获得它的长度：cursor.length();或者cursor.count();
那样我们也可以用循环显示数据
for (var i = 0, len = c.length(); i < len; i++) printjson(c[i]);
</pre>
7、将find游标转换成数组
<pre id="bash">
> var arr = db.users.find().toArray();
> printjson(arr[2]);
用toArray方法将其转换为数组
</pre>

8、定制我们自己的查询结果
<pre id="bash">
只显示age <= 28的并且只显示age这列数据
db.users.find({age: {$lte: 28}}, {age: 1}).forEach(printjson);
db.users.find({age: {$lte: 28}}, {age: true}).forEach(printjson);
排除age的列
db.users.find({age: {$lte: 28}}, {age: false}).forEach(printjson);
</pre>

9、forEach传递函数显示信息
<pre id="bash">
db.things.find({x:4}).forEach(function(x) {print(tojson(x));});
上面介绍过forEach需要传递一个函数，函数会接受一个参数，就是当前循环的对象，然后在函数体重处理传入的参数信息。
</pre>
