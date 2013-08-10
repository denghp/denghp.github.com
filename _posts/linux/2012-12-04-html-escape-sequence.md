---
layout: post
title: HTML JavaScript 转义字符
tags: 
- HTML
- javaScript
categories:
- javaScript
- Web
- archives
UUID: 201212041832
date: 2012-12-04
---

HTML中&lt;，&gt;，&amp;等有特殊含义（&lt;，&gt;，用于链接签，&amp;用于转义），不能直接使用。这些符号是不显示在我们最终看到的网页里的，那如果我们希望在网页中显示这些符号，该怎么办呢？
<p>这就要说到HTML转义字符串（Escape Sequence）了。 </p>
<p>　　转义字符（Escape Sequence）也称字符实体(Character Entity)。在HTML中，定义转义字符串的原因有两个：第一个原因是像“&lt;”和“&gt;”这类符号已经用来表示HTML标签，因此就不能直接当作文本中的符号来使用。为了在HTML文档中使用这些符号，就需要定义它的转义字符串。当解释程序遇到这类字符串时就把它解释为真实的字符。在输入转义字符串时，要严&#26684;遵守字母大小写的规则。第二个原因是，有些字符在ASCII字符集中没有定义，因此需要使用转义字符串来表示。
</p>
###HTML特殊转义字符列表
<table width="580px">
<tbody>
<tr>
<th>显示</th>
<th>说明</th>
<th>实体名称</th>
<th>实体编号</th>
</tr>
<tr>
<td>&nbsp;</td>
<td>半方大的空白</td>
<td>&amp;ensp;</td>
<td>&amp;#8194;</td>
</tr>
<tr>
</tr>
<tr>
<td>&nbsp;</td>
<td>全方大的空白</td>
<td>&amp;emsp;</td>
<td>&amp;#8195;</td>
</tr>
<tr>
</tr>
<tr>
<td>&nbsp;</td>
<td>不断行的空白&#26684;</td>
<td>&amp;nbsp;</td>
<td>&amp;#160;</td>
</tr>
<tr>
<td>&lt;</td>
<td>小于</td>
<td>&amp;lt;</td>
<td>&amp;#60;</td>
</tr>
<tr>
<td>&gt;</td>
<td>大于</td>
<td>&amp;gt;</td>
<td>&amp;#62;</td>
</tr>
<tr>
<td>&amp;</td>
<td>&amp;符号</td>
<td>&amp;amp;</td>
<td>&amp;#38;</td>
</tr>
<tr>
<td>&quot;</td>
<td>双引号</td>
<td>&amp;quot;</td>
<td>&amp;#34;</td>
</tr>
<tr>
<td>©</td>
<td>版权</td>
<td>&amp;copy;</td>
<td>&amp;#169;</td>
</tr>
<tr>
<td>®</td>
<td>已注册商标</td>
<td>&amp;reg;</td>
<td>&amp;#174;</td>
</tr>
<tr>
<td>?</td>
<td>商标（美国）</td>
<td>?</td>
<td>&amp;#8482;</td>
</tr>
<tr>
</tr>
<tr>
<td>×</td>
<td>乘号</td>
<td>&amp;times;</td>
<td>&amp;#215;</td>
</tr>
<tr>
<td>÷</td>
<td>除号</td>
<td>&amp;divide;</td>
<td>&amp;#247;</td>
</tr>
</tbody>
</table>
###JavaScript转义符
<table width="580px">
<tbody>
<tr>
<th width="35%">转义序列</th>
<th width="65%">字符</th>
</tr>
<tr valign="top">
<td width="35%">\b</td>
<td width="65%">退&#26684;</td>
</tr>
<tr valign="top">
<td width="35%">\f</td>
<td width="65%">走纸换页</td>
</tr>
<tr valign="top">
<td width="35%">\n</td>
<td width="65%">换行</td>
</tr>
<tr valign="top">
<td width="35%">\r</td>
<td width="65%">回车</td>
</tr>
<tr valign="top">
<td width="35%">\t</td>
<td width="65%">横向跳&#26684; (Ctrl-I)</td>
</tr>
<tr valign="top">
<td width="35%">\'</td>
<td width="65%">单引号</td>
</tr>
<tr valign="top">
<td width="35%">\&quot;</td>
<td width="65%">双引号</td>
</tr>
<tr valign="top">
<td width="35%">\\</td>
<td width="65%">反斜杠</td>
</tr>
</tbody>
</table>
