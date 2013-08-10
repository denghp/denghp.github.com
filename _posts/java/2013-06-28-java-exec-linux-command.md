--- 
layout: post
title: Java使用Runtime执行Linux命令用管理连接问题
short_title: Runtime执行Linux命令用管道连接
tags: 
- Java
- Runtime
- Linux
- 研发实践
categories:
- code
- java
- archives
UUID: 20130628001027
date: 2013-06-28 00:10:27
---

　　Java具有使用Runtime.exec对本地程序调用进行重定向的能力，但是用重定向或者管道进行命令调用将会出错。

###异常代码
当命令中含有管道（即命令符 | ）的时候，就会出问题,无法获取相应的信息:
<pre id="java">
public static void getProcess() {
        String cmd = "ps aux|grep java";
        Process pro;
        BufferedReader br = null;
        try {
            pro = Runtime.getRuntime().exec(cmd);
            br = new BufferedReader(new InputStreamReader(pro.getInputStream()));
            for (String buf = br.readLine(); buf != null; buf = br.readLine()) {
                System.out.println(buf);
            }
        } catch (Exception ex) {
            logger.error("getProcess exception : " + ex.getMessage());
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException ex) {
                    logger.warn("bf close error" + ex.getMessage());
                }
            }
        }
    }
</pre>

###解决方案
解决方式很简单，用sh -c ，再加上原先的命令串即可解决问题：
<pre id="java">
public static void getProcess() {
        String cmd = "ps aux|grep java";
        String[] commands = new String[]{"sh", "-c", cmd};
        Process pro;
        BufferedReader br = null;
        try {
            pro = Runtime.getRuntime().exec(commands);
            br = new BufferedReader(new InputStreamReader(pro.getInputStream()));
            for (String buf = br.readLine(); buf != null; buf = br.readLine()) {
                System.out.println(buf);
            }
        } catch (Exception ex) {
            logger.error("getProcess exception : " + ex.getMessage());
        } finally {
            if (br != null) {
                try {
                    br.close();
                } catch (IOException ex) {
                    logger.warn("bf close error" + ex.getMessage());
                }
            }
        }
    }
</pre>
