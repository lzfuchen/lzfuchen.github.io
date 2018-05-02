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
