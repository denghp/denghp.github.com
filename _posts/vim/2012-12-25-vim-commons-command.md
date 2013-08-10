--- 
layout: post
title:  vim 常用的查找,替换,删除模式
tags: 
- vim
- 快捷键
categories:
- code
- archives
UUID: 201212252242
---
    
 　　接下来给大家介绍下vim常用的命令，都是在开发中常用的命令哦，使用例子来介绍经验之谈。


###简单替换表达式
<table>
  <tbody>
    <tr>
      <th style="width:350px;">常见CASE:</th>
      <th style="width:230px;">处理命令</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>去掉所有的行尾空格</hd>
      <td>
      :%s/\s\+$//
      </td>
    </tr>
    <tr>
      <td>
      去掉所有的空白行
      </hd>
      <td> 
      :%s/\(\s*\n\)\+/\r/
      </td>
    </tr>
    <tr>
      <td>
      去掉所有的"//"注释
      </hd>
      <td> 
      :%s!\s*//.*!!
      </td>
    </tr>
    <tr>
      <td>
      去掉所有的"/*...*/"注释
      </hd>
      <td> 
      :%s!\s*/ \*\_.\{-}\*/\s*! !g
      </td>
    </tr>
    <tr>
      <td>
      删除DOS方式的回车^M
      </hd>
      <td> 
      :%s/r//g
      </td>
    </tr>
    <tr>
      <td>
      删除行尾空白
      </hd>
      <td> 
       :%s= *$==
      </td>
    </tr>
    <tr>
      <td>
        删除重复行
      </hd>
      <td> 
      :%s/^(.*)n1/1$/
      </td>
    </tr>
    <tr>
      <td>
      删除不含字符串'dd'的行
      </hd>
      <td> 
      :g!/^dd/d
      </td>
    </tr>
    <tr>
      <td>
      删除所有空行
      </hd>
      <td> 
      :g/s* ^ $/d
      </td>
    </tr>

  </tbody>
</table>

###简单删除命令
<table>
  <tbody>
    <tr>
      <th style="width:350px;">常见CASE:</th>
      <th style="width:230px;">处理命令</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>
      删除光标处开始及其后的 n-1 个字符
      </hd>
      <td>
      ndw 或 ndW
      </td>
    </tr>
    <tr>
      <td>
      删至行首
      </hd>
      <td> 
      d0
      </td>
    </tr>
    <tr>
      <td>
      删至行尾
      </hd>
      <td> 
      d$
      </td>
    </tr>
    <tr>
      <td>
      删除当前行及其后 n-1 行
      </hd>
      <td> 
      ndd
      </td>
    </tr>
    <tr>
      <td>
      删除一个字符
      </hd>
      <td> 
      x 或 X
      </td>
    </tr>
    <tr>
      <td>
      恢复u的操作 
      </hd>
      <td> 
      ^R
      </td>
    </tr>
    <tr>
      <td>
      把下一行合并到当前行尾
      </hd>
      <td> 
      J
      </td>
    </tr>
    <tr>
      <td>
      删除到某一行的第一个字符位置
      </hd>
      <td> 
      d^
      </td>
    </tr>
    <tr>
      <td>
      删除到某个单词的结尾位置
      </hd>
      <td> 
      dw
      </td>
    </tr>
    <tr>
      <td>
      删除到第三个单词的结尾位置 
      </hd>
      <td> 
      d3w
      </td>
    </tr>
    <tr>
      <td>
      删除当前行
      </hd>
      <td> 
      dd
      </td>
    </tr>
    <tr>
      <td>
      删除到某个段落的开始位置
      </hd>
      <td> 
      d"{"
      </td>
    </tr>
    <tr>
      <td>
      删除到当前段落起始位置之前的第7个段落位置
      </hd>
      <td> 
      d7"{"
      </td>
    </tr>
    <tr>
      <td>
      删除到某一行的结尾
      </hd>
      <td> 
      D
      </td>
    </tr>
    <tr>
      <td>
      删除到某一行的结尾
      </hd>
      <td> 
      d$
      </td>
    </tr>
    <tr>
      <td>
      删除直到屏幕上最后一行的内容
      </hd>
      <td> 
      dL
      </td>
    </tr>
    <tr>
      <td>
      删除从当前行所开始的5行内容
      </hd>
      <td> 
      5dd
      </td>
    </tr>
  </tbody>
</table>
###简单替换表达式
<table>
  <tbody>
    <tr>
      <th style="width:350px;">常见CASE:</th>
      <th style="width:230px;">处理命令</th>
    </tr>
  </tbody>
  <tbody>
    <tr>
      <td>
      替换命令可以在全文中用一个单词替换另一个单词
      </hd>
      <td>
      :%s/four/4/g
      </td>
    </tr>
    <tr>
      <td>
      删除多余的空格
      </hd>
      <td> 
      :%s/\s\+$//
      </td>
    </tr>
    <tr>
      <td>
      匹配重复性模式,星号项 “*” 规定在它前面的项可以重复任意次
      </hd>
      <td> 
       /{word}*
      </td>
    </tr>
    <tr>
      <td>
    指定重复次数
      </hd>
      <td> 
      使用 “\{n,m}” 这样的形式。其中 “n” 和 “m” 都是数字,如：
       /ab\{3,5}
      </td>
    </tr>
    <tr>
      <td>
        多选一匹配,在一个查找模式中，”或” 运算符是 “\|” 
      </hd>
      <td> 
       /foo\|bar
      </td>
    </tr>
    <tr>
      <td>
      替换当前行第一个 vivian 为sky
      </hd>
      <td> 
      :s/vivian/sky/
      </td>
    </tr>
    <tr>
      <td>
      替换当前行所有 vivian 为 sky
      </hd>
      <td> 
      :s/vivian/sky/g
      </td>
    </tr>
    <tr>
      <td>
      替换第 n 行开始到最后一行中每一行的第一个 vivian 为 sky
      </hd>
      <td> 
      :n,$s/vivian/sky/ 
      </td>
    </tr>
    <tr>
      <td>
      替换第 n 行开始到最后一行中每一行所有 vivian 为 sky
      </hd>
      <td> 
      :n,$s/vivian/sky/g
      </td>
    </tr>
  </tbody>
</table>

