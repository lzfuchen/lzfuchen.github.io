---
title: css入门
date: 2018-04-27 14:19:39
tags: 前端
categories: 前端
---

## CSS(层叠样式表 Cascading style sheets)选择器
```
基本构成
选择器{属性:值;}
text-indent:2em; 首行缩进
```
> 基础选择器
>> 标签选择器 标签{属性:值;}
>> 类选择器 .自定义类名{属性:值;}
```javascript
<style type="type/css">
  .box{
    font-size:30px
  }
</style>

<div class="box" ></div>
```
>> ID选择器 #自定义名称{属性:值;} id具有唯一性。同一个页面不能重复
```javascript
<style type="type/css">
  #box{
    font-size:30px
  }
</style>

<div id="box" ></div>
```
>> 通配符选择器 *{属性:值;}

> 复合选择器 两个或者两个以上的基础选择器通过不同的方式连接在一起
>> 交集选择器 标签+类/ID选择器{属性:值;}
```javascript
<style type="type/css">
  .box{
    font-size:30px
  }
  div.box{
    color:red;
  }
</style>

<div class="box" >呵呵</div>
<p class="box"></p>
```
>> 后代选择器 选择器+空格+选择器{属性:值;}
```javascript
特点：无限制隔代
标签、类选择器、Id选择器自由组合
<style type="type/css">
  div p span{
    font-size:50px;
  }
  .box span{
    font-size:50px;
    background-color:red;
  }

</style>

<div class="box">
  <p>
    <span>演示示例</span>
  </p>
</div>
<div></div>
```
>> 子代选择器 选择器>选择器{属性:值;}
```javascript
特点：选中直接下一代元素
<style type="type/css">
  div>span{
    color:red;
    font-size:40px;
  }
</style>

<div>
  <p>
    <span>演示示例</span>
  </p>
  <span>演示示例</span>
</div>
```
>> 并集选择器 选择器,选择器,选择器{属性:值;}
```javascript
<style type="type/css">
  div,p,span,h1{
    font-size:30px;
    color:red;
  }
</style>

<div>演示示例</div>
<p>演示示例</p>
<span>演示示例</span>
<h1>演示示例</h1>
```
## 书写位置
>内嵌式
```
<head>
  <style type="type/css"></style>
</head>
```
>外链式
```
<link rel="stylesheet" type="text/css" href="xxx.css">
```
>行内样式表
```
<h1 style="font-size:30px;color:red;" ></h1>
```
## 标签分类（显示方式）

### 块元素
典型代表：div p h1-h5 ul li

特点：
1. 独占一行
2. 可以设置宽高
3. 嵌套下，子块元素宽度(没有定义的情况下)和父块元素宽度一致

### 行内元素
典型代表：span a strong em del ins

特点：
1. 在一行上显示
2. 不能直接定义宽高

### 行内快元素（内联元素）
典型代表：image input

特点:
1. 在一行上显示
2. 可以直接设置宽高

### 块元素、行内元素

块元素转行内元素
> display: inline;

行内元素转块元素
> display: block;

块和行内元素转行内块元素
> display: inline-block;

## css三大特性
### 层叠性
当多个样式作用于同一个标签时，样式发生了冲突，总是执行后边的代码。
### 继承性
继承性发生的前提是包含(嵌套)关系

总结：文字的所有属性都可以继承

特殊情况：
1. h1-h6不能继承文字大小。
2. a标签不能继承颜色

### 优先级
```
默认样式<标签选择器<类选择器<ID选择器<行内样式<!important
```

特点：
1. 继承的权重为0
2. 权重会叠加

## 链接伪类
```
a:link{属性:值;} = a{属性:值;} 效果是一样的

a:link{属性:值;} 链接默认状态
a:visited{属性:值;} 链接访问之后的状态
a:hover{属性:值;} 鼠标放到链接上面显示的状态
a:active{属性:值;} 链接激活的状态
:focus{属性:值;} 获取焦点
```
### 文本修饰
text-decortation: none | underline | line-through

### 背景属性
```
background-color 背景颜色
background-image 背景图片
background-repeat no-repeat | repeat-x | repeat-y | repeat 背景平铺
background-position left | rigth | center | top | bottom 背景定位
放位值只写一个的时候，另外一个默认居中
background-position 20px 30px
写两个具体值的时候，第一个值代表水平方向，第二个代表垂直方向
background-attachment scroll | fixed 背景是否滚动
```
