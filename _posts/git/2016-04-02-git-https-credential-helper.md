---
layout: post
title: Git Https 安全地记住凭证 
categories:
- github
- code
- archives
tags:
- git
- github
- tools
UUID: 20160402
images: ["/assets/images/github/git-logo_bv0ydu.jpg"]
---

#### 使用git push提交时，每次都要输入密码，次数多了，感觉挺麻烦. 如果git以ssh协议通讯，免密码可以用ssh公钥设置免登录。如果git时以https方式访问呢，该怎么办？下面方式可以解决这个问题.
```shell
git config --global credential.helper store/cache
```
#### 备注:
> * “store” 模式可以接受一个 --file <path> 参数，可以自定义存放密码的文件路径（默认是~/.git-credentials）
> * “cache” 模式有 --timeout <seconds> 参数，可以设置后台进程的存活时间（默认是 “900”，也就是 15 分钟）

#### .git-credentials文件存储用户名密码信息
```shell
https://{username}:{passwd}@github.com
```

#### .gitconfig文件则会添加如下内容
{% highlight java %}
[credential]
        helper = store
{% endhighlight %}

#### git-工具-凭证存储实现原理
[git-scm 教程] (https://git-scm.com/book/zh/v2/Git-工具-凭证存储)