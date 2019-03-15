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
    			
8.spring框架的JDBC模板技术

	8.1 spring提供了JDBC模板 JdbcTemplate类，简化持久层编程
	spring框架可以整合Hibernate框架，提供了模板类HibernateTemplate
	
	8.2 引入JDBC模板jar包:spring-jdbc,spring-tx
    <!--配置连接池 spring默认提供的连接池-->
    <bean id="datasource" class="org.springframework.jdbc.datasource.DriverManagerDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://192.168.2.224:3306/spring?serverTimezone=GMT"/>
        <property name="username" value="root"/>
        <property name="password" value="root"/>
    </bean>
    <!--配置jdbctemplate-->
    <bean id="jdbctemplate" class="org.springframework.jdbc.core.JdbcTemplate">
        <property name="dataSource" ref="datasource"/>
    </bean>
    配置dbcp或c3p0连接池：引入com.springsource.org.apache.commons.pool.jar 和引入dbcp.jar或c3p0jar包
    <!--配置DBCP连接池-->
    <bean id="datasource" class="org.apache.commons.dbcp.BasicDataSource">
        <property name="driverClassName" value="com.mysql.cj.jdbc.Driver"/>
        <property name="url" value="jdbc:mysql://192.168.2.224:3306/spring?serverTimezone=GMT"/>
        <property name="username" value="root" />
        <property name="password" value="root"/>
    </bean>
    <!--配置C3P0连接池-->
    <bean id="datasource" class="com.mchange.v2.c3p0.ComboPooledDataSource">
        <property name="driverClass" value="com.mysql.cj.jdbc.Driver"/>
        <property name="jdbcUrl" value="jdbc:mysql://192.168.2.224:3306/spring?serverTimezone=GMT"/>
        <property name="user" value="root" />
        <property name="password" value="root"/>
    </bean>
 
9.spring框架的事务管理相关类和API
	
	PlatFormTransactionMananger接口：平台事务管理器（真正管理事务的类），该接口有具体的实现类，根据不同的持久层框架，需要选择不同的实现类。
	TransactionDefinition接口:事务定义信息（事务的隔离级别 ，传播行为，超时，只读）
	TransactionStatus接口:事务的状态
	
	上述对象之间的关系：平台事务管理器真正管理事务对象。根据事务定义的信息TransactionDefinition进行事务管理，在管理事务中产生一些状态，将状态记录到TransactionStatus中。
	
	9.1.事务隔离级别的常量
		ISOLATION_DEFAULT 采用数据库的默认隔离级别
		ISOLATION_READ_UNCOMMITTED
		ISOLATION_READ_COMMITTED
		ISOLATION_REPEATABLE_READ
		ISOLATION_SERIALIZABLE
		
	事务的传播行为常量（解决的是业务层之间的方法调用）
		*PROPAGATION_REQUIRED --A中有事务，使用A中的事务，如果没有，B就会开启一个新的事务，将A包含进来（保证A，B在同一个事务中），默认值
		PROPAGATION_SUPPORTS --A中有事务，使用A中的事务，如果A中没有事务，那么B也不使用事务
		PROPAGATION_MANDATORY --A中有事务，使用A中的事务，如果A没有事务，抛出异常
		*PROPAGATION_REQUIRES_NEW --A中有事务，将A中的事务挂起，B创建一个新的事务（保证AB没有在一个事务中）
		PROPAGATION_NOT_SUPPORTED --A中有事务，将A中的事务挂起
		PROPAGATION_NEVER --A中有事务，抛出异常
		PROPAGATION_NESTED --嵌套事务，当A执行之后,就会在这个位置设置一个保存点，如果B没有问题，执行通过。如果B出现异常， 根据需求回滚（选择回滚到保存点或者最初始状态）
	
	9.2.spring事务分类:
		spring的编程式事务管理(不推荐),通过手动编写代码的方式完成事务的管理
        <!--配置事务管理器-->
        <bean id="transactionManager" 					class="org.springframework.jdbc.datasource.DataSourceTransactionManager">
            <property name="dataSource" ref="datasource"/>
        </bean>

        <!--配置事务管理模板-->
        <bean id="transactionTemplate" class="org.springframework.transaction.support.TransactionTemplate">
            <property name="transactionManager" ref="transactionManager"/>
        </bean>
        
        <!--在需要进行事务管理的类中，注入事务管理的模板-->
        <bean id="accountService" class="com.fuchen.coding.service.impl.AccountServiceImpl">
            <property name="accountDao" ref="accountDao"/>
            <property name="transactionTemplate" ref="transactionTemplate"/>
        </bean>
      
        
		spring的声明式事务管理(底层采用AOP技术)，通过一段配置的方式完成事务的管理（掌握注解的方式）
		<!--开启事务注解-->
		<tx:annotation-driven transaction-manager="transactionManager"/>
		在类上面添加@Transactional注解，表示当前这个类中的所有方法都有事务,也可以添加到方法上面，表示当前方法有事务
		