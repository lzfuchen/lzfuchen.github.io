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
    