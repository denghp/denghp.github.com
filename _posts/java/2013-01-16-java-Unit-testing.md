--- 
layout: post
title: 单元测试规范
tags: 
- 单元测试
- 测试规范
- 研发实践
- 测试
categories:
- code
- java
- archives
UUID: 201301161027
--- 

 　　本规范适合开发人员在产品开发时上进行单元测试时使用的参考手册，基于JTestCase+Junit基础上的架构，
可以给开发人员的研发工作上提供高效、可靠、正确、简单的达到产品高质量。

###适用对象
 　　本文档适用于在公司各产品、项目上构建应用的测试框架，适用于系统构建工程师、软件工程师、系统测试人员等相关使用者使用。要求这些人员能够具备使用Java开发应用的技能。
 
###版本说明
 　　本手册基于JTestCase4.0+Junit4.8版本而编写，随着公司产品本身的不断升级，本手册也会不断进行扩展、更新。届时请关注本节说明。
###参考文档
1、JDK开发文档<br>
2、JUINT 4.8 API 开发文档<br>
3、YOYO单元测试框架使用手册<br>
4、测试用例编码规范<br>

###规范的使用场景说明，即目的
1、规范是为了检查开发过程中尽可能早的发现问题，让程序员编写的代码有个纸面上的评估及确认.<br>
2、规范是为了便于维护后期开发代码，进行正确性检查的依据。<br>
3、	使用JTestCase+Junit测试框架<br>
4、	结合ANT脚本执行测试程序<br>


###规范的范围
1、规范适用于整个项目的开发过程，其中单元测试代码规范应该参考。<br>
2、规范适用于整个项目的阶段性功能代码结束后进行集成测试，性能，压力测试的说明。<br>
3、规范适用于整个项目完成后，进行安装测试的说明。<br>

###单元测试分类
####接口测试
1、针对被测接口的输入、输出参数<br>
2、被测接口的异常及异常信息是否合理<br>

####持久层类方法测试
1、结构化数据、非结构化数据的持久化测试<br>
2、结构化数据使用SQL语句测试，保证SQL语句参数的灵活性、对持久化的数据进行确认，事务的可靠性等<br>
3、非结构化数据保证非结构化数据的准确性，事务的可靠性，如：文件大小、内容是否丢失、以及一些结构化数据的准确性等<br>
4、数据确认流程：调用持久测试方法，对应调用查询测试方法进行数据确认<br>

####工具类方法、帮助类方法
1、被测工具方法、帮助类方法的作用及要达到的目的<br>
2、被测试方法的输入、输出参数的是否合理<br>

####业务过程类方法
1、业务过程类方法测试首先设计TestCase，考虑各种因素设计不同的TestCase<br>
2、被测方法的安全性，指的是要考虑多线程情况下如何设计测试用例及方法代码编写<br>
3、业务逻辑的被测方法的覆盖率<br>
4、被测试方法中的成员变量的安全性、<br>
5、被测试方法中的for、while等逻辑处理是否正常退出<br>

####外部系统类方法、属性文件读写类方法
1、外部系统类方法的被测方法输入、输出参数、异常的准确行性<br>
2、被测方法的安全性等<br>
3、属性文件读写类的被测试方法是否支持多个实例、参数的输入、输出<br>

####异常测试
1、轻量级错误测试<br>
2、系统是否异常终止？<br>
3、系统是否输出异常信息？<br>
4、抛出的异常被谁捕获处理？<br>
5、程序是否正常的退出而不是崩溃？<br>
6、测试信息内容<br>
错误码是否符合设计？<br>
错误信息是否准确的反应了错误原因？<br>
错误信息是否通俗易懂？<br>
错误信息是否能定位出错位置？<br>
错误信息中是否包含了不要的其他信息？<br>


###测试用例编写规范
####常规测试用例
1、对于功能的一个模块，每个数据类型输入项或选取典型的取值，生成用例<br>
2、参数的类型输入生成用例<br>
####初始化测试用例
1、针对功能模块，一些初始化的功能数据，确保所有的初始化数据正确。

####边界的测试用例
1、针对每个参数项，生成一个边界用例<br>
2、字符串参数的长度<br>
3、布尔值数据的所有取值<br>
4、集合参数，或null<br>

####空值的测试用例
1、对于每个必填数据项,都生成一个用例(不提供空值的除外,比如无空值的下拉框、有缺省值的单选按钮组),则预期结果提示该数据项为空

####格式化错误的测试用例
1、对于每个参数项，都生成一个用例，预期结果提示该数据项格式错误日期格式、数值、字符串：Email、邮编、用户名格式等

####溢出的测试用例
1、对于参数项，都生成一个取值范围外的测试用例,预期结果提示该数据项超出范围

####唯一值的测试用例
1、根据某业务设计某字段是唯一，预期结果提示该数据已经存在

####权限的测试用例
1、对于功能模块，生成一个用例，生成有权限和没用权限的身份访问，预期结果提示权限不足等

####角色权限的测试用例
1、业务功能流程涉及一到多个角色,对于每个角色,都生成一个用例,预期结果为用户以这个角色登陆时,他仅能执行权限允许的操作


###测试工作指导
####开发阶段单元测试步骤
<strong>编写TestCase</strong>
1、	创建测试类，每个被测试类对应一个测试类，测试需继承AbstractTestCase基类，便于统一管理及初始化基本参数，也可以直接继承Junit框架的TestCase<br>
2、	测试类需要按照统一的命名方式如Testxxx.java,便于统一管理<br>
3、	添加无参构造函数，使用JTestCase初始化数据源，也可以直接在基类中初始化，但是要保证JTestCase的实例是唯一的，否则会覆盖其他的实例<br>
4、	测试用例编写遵循上述原则，编写合适的测试用例，数据源在xml中配置，示例
<pre id="java">
/** 
   *
   * 初始化JTestCase实例
   *
   */
  public TestDocument()
  {
    try {
      jtestcase = new JTestCase(data[0], data[1]);
    } catch (FileNotFoundException e) {
      e.printStackTrace();
    } catch (JTestCaseException e) {
      e.printStackTrace();
    }   
  }
  
 /** 
   *
   *测试抛出的异常是否属于正常
   *
   */
  public void testDeleteCheckException() throws JTestCaseException
  {
    log.info("methodName : " + methods[1]);
    getTestCases(methods[1], jtestcase);
    for (int i = 0; i < testcases.size(); i++) {
      // 获取testcase实例及每个testcase中的参数
      TestCaseInstance instance = (TestCaseInstance) testcases
        .elementAt(i);
      try {
        params = instance.getTestCaseParams();
        Long docId = (Long) params.get("doc_id");
        // 执行test方法
        int code = docService.deleteDoc(docId);
      } catch (IllegalArgumentException ex) {
        log.debug("IllegalArgumentException" + ex.getMessage());
        // 进行实际测试结果与测试数据中定义的预期结果进行断言
        assertResult = instance.assertTestVariable(expectedResult,
            ex.getMessage());
        assertTrue(instance.getFailureReason(), assertResult);
      }
    }
  }
</pre>

####准备测试数据
1、	测试数据源的统一格式以xml格式定义<br>
2、	数据源定义规则参考YOYO单元测试框架使用文档<br>
3、	测试数据源名称统一使用小写，都以testxxx.xml形式<br>

####ANT脚本编写规范
<strong>1、build-test脚本规范及格式</strong><br>
1、命名以build-test.xml为基准<br>
2、属性格式<br>
<pre id="xml">
* xx 属性，【必须】
* 1. name: xx, 如：test.dir
* 2. value: xx, 如：junit.xml
* 例子：
*       &lt;property name="test.reports.xml.dir" value="${test.reports.dir}/junit-xml" /&gt;
</pre>
3、target属性
<pre id="xml">
&lt;!-- 
  * target 元素 test-xxx
  * 1、name 属性 taget name
  * 2、depends 属性 引用其他target
  * junit 元素 
  * 1、printsummary 打印出测试用例的信息
  * 2、haltonfailure 停止测试过程中失败的用例
  * 3、showoutput 将测试过程中输出信息发送给ant日志记录系统
  * 4、batchtest 执行测试类                                                                                                                                  
  * 其他属性请参考http://ant.apache.org/manual/Tasks/junit.html
 --&gt;
</pre>
<strong>2、build-test脚本规范及格式</strong><br>
<pre id="xml">
 &lt;target name="test-api-document" depends="compile-test-api"&gt;
   &lt;junit printsummary="yes" haltonfailure="no"  showoutput="true"&gt;
     &lt;classpath refid="test.classpath" /&gt;
     &lt;formatter type="xml" /&gt;
      &lt;!— 执行测试的测试类 --&gt;
   &lt;test name="com.yoyosys.smartstorage.test.TestDocument" todir="${test.reports.xml.today}"/&gt;
   &lt;/junit&gt;
   &lt;junitreport todir="${test.reports.html.today}"&gt;
     &lt;fileset dir="${test.reports.xml.today}"&gt;
       &lt;include name="*.xml" /&gt;
     &lt;/fileset&gt;
     &lt;report format="frames" todir="${test.reports.html.today}" /&gt;
   &lt;/junitreport&gt;
 &lt;/target&gt;
</pre>
<strong>3、测试所有类的执行脚本示例如：</strong><br>
<pre id="xml">
 &lt;target name="test-api-all" depends="compile-test-api"&gt;
   &lt;junit printsummary="yes" haltonfailure="no"  showoutput="true"&gt;
     &lt;classpath refid="test.classpath" /&gt;
     &lt;formatter type="xml" /&gt;
     &lt;batchtest fork="yes" todir="${test.reports.xml.today}"&gt;
       &lt;fileset dir="${src.test.api}" includes="com/yoyosys/smartstorage/test/Test*.java"/&gt;
     &lt;/batchtest&gt;
   &lt;/junit&gt;
   &lt;!-- 生成日期命名的测试报告--&gt;
   &lt;junitreport todir="${test.reports.html.today}"&gt;
     &lt;fileset dir="${test.reports.xml.today}"&gt;
       &lt;include name="*.xml" /&gt;
     &lt;/fileset&gt;
     &lt;report format="frames" todir="${test.reports.html.today}" /&gt;
   &lt;/junitreport&gt;
 &lt;/target&gt;
</pre>

####使用ANT执行测试，生成测试报告
1、	ANT执行的方法 ant -f build-test.xml target <br>
2、	测试报告在第3点编写build脚本已经实现，也可以只在需要生成报告时添加<br>
3、	执行所有的测试类并生成报告如：ant -f build-test.xml test-api-all<br>

####使用Cobertura测试代码覆盖率
1、	引用cobertura-xxx.jar包 <br>
<pre id="xml">
&lt;property name="cobertura.dir" value="${env.YOYO_SVN_HOME}/app/java/cobertura/cobertura-1.9.4.1" /&gt; 
</pre>
2、设置classpath<br>
<pre id="xml">
&lt;path id="test.classpath" &gt; 
 &lt;fileset dir="${cobertura.dir}"&gt;
     &lt;include name="cobertura.jar" /&gt;
     &lt;include name="lib/**/*.jar" /&gt;
   &lt;/fileset>
&lt;/path>
</pre>
3、cobertura的全局属性文件 <br>
<pre id="xml">
&lt;taskdef classpathref="test.classpath" resource="tasks.properties"/&gt;
</pre>
4、编写测试覆盖率的脚本，请参考build-test.xml中的示例<br>
5、代码覆盖率执行方法 ant -f build-test.xml coverage<br>

###回归测试流程如下
1、测试流程步骤如上 <br>
2、参考规范列表，如测试流程手册，TestLink使用手册，Bugzilla使用手册。<br>
3、准备帐号，向Lead申请测试帐号<br>
4、根据测试用例设计规范准备TestCase<br>
5、根据测试记录填写<br>
6、提交测试，修改bug，进行反馈的机制。规定如何填写好测试反馈，以及解决方案<br>
7、总结测试报告<br>
