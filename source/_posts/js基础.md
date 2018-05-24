---
title: js基础
date: 2018-05-16 22:42:27
tags: 前端
categories: 前端
---
```
undefined 变量未初始化
null 值为空
NaN not a number 不是一个数字 但是数字类型
== 比较运算符，判断内容是否相同，不判断数据类型
=== 不仅判断内容，还判断数据类型
!= 只判断内容是否不相同，不判断数据类型
!== 不全等于 不仅判断内容是否不相同，还判断数据类型是否不相同
```
## 预解析
预解析会把变量的声明和函数的声明提前

## DOM
 DOM 定义了访问和操作 HTML 文档的标准方法
 ```
 1. 通过id获取元素
 document.getElementById(elementId)
 2. 通过标签名获取元素
 document.getElementsByTagName(tagName)
 3. 通过name获取元素
 document.getElementsByName(elementName)
 4. 通过类名获取元素
 document.getElementsByClassName(className)
 5. 通过选这期获取元素
 document.querySelector(选择器);
 document.querySelectorAll(选择器)
 ```
### 事件
onclick 点击事件
onmouseover 鼠标移到某元素之上
onmouseout 鼠标从某元素移开
onfocus	元素获取焦点时触发
onblur	元素失去焦点时触发
