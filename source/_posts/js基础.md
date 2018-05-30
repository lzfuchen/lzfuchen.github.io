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

如果想要获取标签和内容，使用innerHtml，如果想要设置标签使用innerHtml。
如果想要设置文本，用innerText或者innerHtml或者textContent

获取自定义属性 getAttribute(name)  设置自定义属性 setAttribute(name,value)
移除自定义属性也可以移除元素自带的属性 removeAttribute(name)

### 节点
页面上的标签，属性，文本都可以称为节点
nodeType:节点的类型 1表示标签，2表示属性，3表示文本
nodeName：节点的名字，标签节点---大写的标签名字，属性节点---小写的属性名 文本节点---#text
nodeValue: 节点的值 标签节点---null, 属性节点---属性值,文本节点---文本内容

### 元素的创建
元素创建的三种方式
1. document.write("标签的代码及内容")
```
缺陷：如果是在页面加载完毕后，此时通过这种方式创建元素，那么页面上存在的所有内容全部被干掉
```
2. 对象.innerHtml="标签及代码";
3. document.createElement("标签的名字")
```
//创建元素
var pobj = document.createElement("p")
//把创建后的子元素追加到父元素中
obj.appendChild(pobj)
```
