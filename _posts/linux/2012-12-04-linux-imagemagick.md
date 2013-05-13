---
layout: post
title: Linux图片处理工具imagemagick使用方法
short_title: imagemagick使用方法
tags: 
- linux
- shell
- imagemagick
- linux图片处理工具
categories:
- linux
UUID: 201212041732
date: 2012-12-04
---

图片在网站所占的比重越来越重。更好的优化图片可以提高网站速度。减少宽带流量。ImageMagick 是一个用来创建、编辑、合成图片的软件。它可以读取、转换、写入多种格式的图片。图片切割、颜色替换、各种效果的应用，图片的旋转、组合，文本，直线， 多边形，椭圆，曲线，附加到图片伸展旋转。ImageMagick是免费软件：全部源码开放，可以自由使用，复制，修改，发布。支持大多数的操作系统。

###语法
<pre id="bash">
Usage: convert [options ...] file [ [options ...] file ...] [options ...] file
</pre>

###示例
####对用户上传图片进行缩放
对于用户自己上传的图片不能简单的 用css限制大小，因为这样每次加载图片时候还是会加载整幅大图。占用多余的宽带，并且影响页面加载速度。应该根据实际显示需要进行缩放。比如我想要用户 相册里的图片大小不能超过500x300： 
<pre id="bash">
$ convert -resize "500x300>" input.jpg  output.jpg
</pre>
如果图片比500x300小就保持原样，以防小图片被放大失真。

####生成不同比例缩略图
一般相册等应用，都会提供缩略图和预览图，这些缩略图同样不能简单的用css来限制大小，要为每个图片生成不同比例的预览图。
####去除多余信息
Exif信息是数码相机在拍摄过程中采集的一系列信息，这些信息放置在我们熟知的jpg文件的头部，也就是说Exif信息是镶嵌在JPEG图像文件格式内 的一组拍摄参数，主要包括摄影时的光圈、快门、ISO、日期时间等各种与当时摄影条件相关的讯息，相机品牌型号，色彩编码，拍摄时录制的声音以及全球定位 系统（GPS）等信息。简单的说，它就好像是傻瓜相机的日期打印功能一样，只不过Exif信息所记录的资讯更为详尽和完备。不过，具有Exif信息的 JPEG图像文件要比普通的JPEG文件略大一点。还有就是像PS这种软件处理过的图片会有"program comments"。如果不是专业的摄影类网站，这些信息是没有用的，可以去掉：
<pre id="bash">
$ convert -strip input.jpg output.jpg
</pre>
####调节压缩比
大多时候，我们的网站并不需要那么清晰的图片，适量调节JPG图片的压缩比会减少图片大小，肉眼并不会分辨出质量被压缩后的图片。通常75%是最佳比例。
<pre id="bash">
$ convert -quality 75% input.jpg output.jpg
</pre>
上面几个步骤可以一次搞定：
<pre id="bash">
$ convert -resize "500x300" -strip -quality 75% input.jpg output.jpg
</pre>
上面说的都是针对JPG格式的处理方式，下面说一下BMP，GIF，PNG等格式的处理。对于BMP直接转成JPG就可以了。再按照上面的方式处理。

而GIF和PNG貌似有些特殊。GIF的一些特性（动画效果，透明等）是 JPG没有的，可以根据实际情况选择转或不转，如果转换成jpg，取第一帧只需要这样：
<pre id="bash">
$ convert -format jpg input.gif input.jpg
</pre>
PNG也可以通过减少PNG图片color数量的办法达到压缩的目的。但是这种办法压缩出来的图像可以明显看出来失真，而且呈锯齿状。

对于真实世界的PNG图片（通常指照片），一般先转换成JPG，再通过上面的办法来压缩。

####关于图片扩展名
发现大部分网站喜欢把用户上传的图片（头像，相册等）都统一转成特定格式（一般都是 jpg）。这样做的潜在弊端就是在用像ImageMagick这样的软件处理的时候会根据扩展名做隐式格式转换。
个人觉得在保存图片的时候不加扩展名处理起来更灵活一些。

####使用 @ 来制定图片的像素个数
<pre id="bash">
$ convert -resize "10000@" src.jpg dst.jpg
</pre>
此命令执行后，dst.jpg图片大小为（115×86），图片保持原有比例（115×86= 9080 < 10000)

####当原始文件大于指定的宽高时，才进行图片放大缩小，可使用>命令后缀
<pre id="bash">
$ convert -resize "100×50&gt;" src.jpg dst.jpg
</pre>
命令执行后，dst.jpg图片大小为（67×50），图片保持原有比
<pre id="bash">
$ convert -resize "100×50&gt;!" src.jpg dst.jpg
</pre>
命令执行后，dst.jpg图片大小为（100×50），图片不保持原有比例。

####当原始文件小于指定的宽高时，才进行图片放大转换，可使用<命令后缀.
<pre id="bash">
$ convert -resize "100×500&lt;" src.jpg dst.jpg 
#或者
$ convert -resize "100×100&lt;!" src.jpg dst.jpg
</pre>
命令执行后，dst.jpg和src.jpg大小相同，因为原始图片宽比100大
<pre id="bash">
$ convert -resize "600×600<" src.jpg dst.jpg
</pre>
命令执行后，dst.jpg图片大小为（600×450），图片保持原有比例。
<pre id="bash">
$ convert -resize "600×600&lt;!" src.jpg dst.jpg
</pre>
命令执行后，dst.jpg图片大小为（600×600），图片不保持原有比例。
####使用^命令后缀可以使用宽高中较小的那个值作为尺寸
<pre id="bash">
$ convert -resize "300×300^" src.jpg dst.jpg
</pre>
命令执行后，dst.jpg图片大小为（400×300），图片保持原有比例，(300:300 < 200:150，选择高作为最小尺寸）。
<pre id="bash">
$ convert -resize "300×200^" src.jpg dst.jpg
</pre>
命令执行后，dst.jpg图片大小为（300×225），图片保持原有比例，(300:200 > 200:150，选择宽作为最小尺寸）。
