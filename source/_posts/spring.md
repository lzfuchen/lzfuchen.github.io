---
title: spring
date: 2019-03-13 11:28:33
tags: java
categories: java
---

[spring Jar download](http://repo.spring.io/release/org/springframework/spring)

spring的核心是控制反转(ioc)和面向切面(AOP)

1.jar包依赖:

	1.1.核心jar包:beans,context,core,expression
	
	1.2.依赖jar包:日志包com.springsource.org.apache.commons.logging,com.springsource.org.apache.log4j

2.编写spring配置文件:applicationContext.xml

	2.1.核心配置 
	<bean id="唯一id值"
			 class="具体实现类" 
			 name=”和id标签作用相同，但id值不能出现特殊字符,name可以。开发一般不用”
			 scope=”singleton,prototype,request,session,globalsession“ 
			 init-method=”当bean被载入容器的时候调用指定方法“ 
			 destroy-method="当bean从容器删除的时候调用指定方法">
			 <!--属性依赖注入-->
			 <property name="需要注入的属性名称" value="注入的属性值"/>
			 <property name="需要注入的属性名称" ref="引用对象的id"/>
			 <!--构造函数依赖注入-->
			<constructor-arg name="属性名称" value="属性值"/>
			<constructor-arg name="属性名称" ref="引用对象的id"/>
			<constructor-arg index="构造参数索引从0开始" value="属性值"/>
			<constructor-arg index="构造参数索引从0开始" ref="引用对象的id"/>
			<!-- 集合注入List,Set,Map -->
			<property name="list">
				<list>
					<value>属性值</value>	
				</list>
			</property>
			<property name="map">
				<map>
					<entry key="" value=""/> 
				</map>
			</property>
			<!--属性文件赋值-->
			<property name="pro">
			   <props>
                <prop key="properties 属性名称">properties 属性值</prop>
            	</props>
			</property>
			

			
	</bean>
	
```java
	属性:scope
	属性值:
			singleto:单例,默认值
			prototype:多例，在spring框架整合struts2框架的时候，Action类也需要交给spring做管理，需要把Action类配置成多例
			request:应用在web项目中，每次http请求都会创建一个新的bean
			session:应用在web项目中，同一个http session 共享一个bean
			globalsessio:应用在web项目中，多服务器间的session
```

3.spring整合web
	
	3.1.引入spring-web jar包，配置初始化监听器，设置文件加载路径
	
	 <listener>
        <listener-class>org.springframework.web.context.ContextLoaderListener</listener-class>
    </listener>
	<!-- 默认只能加载WEB-INF目录下的配置文件，提供配置方式，加载src目录下 -->
    <context-param>
        <param-name>contextConfigLocation</param-name>
        <param-value>classpath:applicationContext.xml</param-value>
    </context-param>
    
   	3.2.获取ApplicationContext对象 
   	WebApplicationContext c = WebApplicationContextUtils.getWebApplicationContext(ServletContext);
    
4.spring框架IOC注解方式

	4.1.引入spring-aop-4.2.4.RELEASE.jar
	在applicationContext.xml配置文件中配置context约束，配置注解扫描
	<?xml version="1.0" encoding="UTF-8"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
	       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	       xmlns:context="http://www.springframework.org/schema/context"
	       xsi:schemaLocation="
	         http://www.springframework.org/schema/beans
	         http://www.springframework.org/schema/beans/spring-beans.xsd
	          http://www.springframework.org/schema/context
	         http://www.springframework.org/schema/context/spring-context.xsd">
		<!-- 开始注解扫描 -->
		<context:component-scan base-package="包名"/>
	</beans>
	注解:@Component 组件，作用在类上(value="相当于xmlbean配置的id") 
	spring提供@Component的三个衍生注解
	@Controller 作用在web层
	@Service 	作用在业务层
	@Repository 作用在持久层
	属性注入的注解（使用注解注入的方式，可以不用提示set方法）
	@value 用于注入普通类型
	注入的是对象类型
				@Autowired:默认按类型进行自动装配
				@Qualifier:强制使用名称注入
	@Resource 相当于@Autowired和@Qualifier一起使用
	Bean作用范围注解
	@Scope，作用在类上，值有singleton 单例默认值，prototype 多例
	@PostConstruct 相当于init-method
	@PreDestroy 相当于destroy-method
	
5.spring整合JUnit单元测试
	
	5.1.引入JUnit4jar包，引入spring-testjar包
	在类上面增加注解
	@RunWith(SpringJUnit4ClassRunner.class)
	@ContextConfiguration("classpath:applicationContext.xml")
	最后注解获取属性进行测试

6.spring核心AOP(面向切面编程)
	
	6.1.底层采用的是代理技术，代理的方式提供了两种
	1.基于JDK的动态代理：必须是面向接口的，只有实现了具体接口的类才能生成代理对象
	2.基于CGLIB动态代理：对于没有实现了接口的类，也可以产生代理，产生这个类的子类的方式
	
	6.2.AOP相关术语
	Joinpoint:连接点，是指那些被拦截到的点。
	Pointcut:切入点，是指我们要对那些Jointpoint进行拦截的定义
	Advice:通知/增强，是指拦截到Joinpoint之后所要做的事情就是通知。通知分为：前置通知，后置通知，异常通知，最终通知，环绕通知（切面要完成的功能）
	Introduction:引介，是一种特殊的通知在不修改类代码的前提下，Introduction可以在运行期为类动态地添加一些方法或Filed
	Target:目标对象，代理的目标对象
	Weaving:织入，是指把增强应用到目标对象来创建新的代理对象的过程
	Proxy:代理，一个类被AOP织入增强后，就产生一个结果代理类
	Aspect:切面，切入点和通知的结合
	
	6.3.引入jar包：
	spring-aop,
	spring-aspects,
	com.springsource.org.aopalliance,
	com.springsource.org.aspectj.weaver
	
	6.4.配置文件中配置约束
	<?xml version="1.0" encoding="UTF-8"?>
	<beans xmlns="http://www.springframework.org/schema/beans"
	       xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
	       xmlns:aop="http://www.springframework.org/schema/aop"
	       xsi:schemaLocation="
	         http://www.springframework.org/schema/beans
	         http://www.springframework.org/schema/beans/spring-beans.xsd
	         http://www.springframework.org/schema/aop
	         http://www.springframework.org/schema/aop/spring-aop.xsd">
	</beans>
	编写切面类Aspect，配置AOP
	 <aop:config proxy-target-class="true">
        <!--配置切面类:切入点+通知-->
        <aop:aspect ref="增加类引用">
            <aop:before method="log" pointcut="execution(切入点表达式)"/>
        </aop:aspect>
    </aop:config>
    切入点表达式：
    			1.execution()固定的必须写
    			2.public修饰符可以省略
    			3.返回值类型必须写(* 表示任意返回值)
    			4.包名也必须写可以用*代替，简写方式：*..*表示任意包结构
    			5.类名也必须写，可以用*号简写：*DaoImpl
    			6.方法也必须写，可以用*号简写
    			7.方法的参数:一个*表示一个参数，..表示任意的参数
    通知类型：
    			1.前置通知，在目标类方法执行之前执行。配置标签<aop:after/>
    			2.最终通知，在目标类的方法执行之后执行，如果程序出现了异常，最终通知也会执行<aop:after/>
    			3.后置通知，方法正常执行后的通知<aop:after-returning/>
    			4.异常抛出通知，在跑出异常后的通知<aop:after-throwing/>
    			5.环绕通知，方法的执行前后执行<aop:around/>注意目标的方法默认不执行，需要使用ProceedingJoinPoint对象来让目标对象的方法执行。
   
7.spring AOP 注解方式
	
	7.1.创建切面类，增加@Aspect注解，编写切面方法，增加通知注解，在配置文件中增加<aop:aspectj-autoproxy/>开启自动注解
	通知注解:
			@Before前置通知
			@AfterReturing后置通知
			@After最终通知
			@Around环绕通知
			@AfterThrowing异常抛出通知
    			
    			
	