--- 
layout: post
title: Linux图像文本转换器（OCR）
tags: 
- shell
- Ubuntu
- linux
- OCR
- 图像文本转换器
categories:
- code
- linux
UUID: 20130127103000
date: 2013-01-27 10:30:00
---

　　Tesseract 转换图像文本，在Ubuntu/Linux中是最好的方案。我试过几个OCR（光学字符识别）应用，但是Tesseract其精度高于任何其他应用程序。

　　Tesseract是一个简单的，易于使用的命令行实用程序。它是跨平台的应用程序，当然 - 这是一个自由和开放源码软件！您可以提供各种不同的输入格式，它可以转换成60 +语言。

###Installing Tesseract in Ubuntu/Linux
<pre id="bash">
sudo apt-get install tesseract-ocr
</pre>

此外，如果需要的话，你可以安装任何语言包。现在来看看Tesseract的使用吧：
<pre id="bash">
tesseract your_scanned_file.png output_content.txt
</pre>

结果将被保存到output_content.txt文件。如果你想OCR其他语言，然后将它作为额外的参数，指定-L。 （当然，你必须首先安装该语言包）<br>
例如，对于扫描图像包含印地文文本，
<pre id="bash">
tesseract your_scanned_paper.png output_content -l hin
</pre>
