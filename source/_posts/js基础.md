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
## 事件
onclick 点击事件
onmouseover 鼠标移到某元素之上
onmouseout 鼠标从某元素移开
onfocus	元素获取焦点时触发
onblur	元素失去焦点时触发

如果想要获取标签和内容，使用innerHtml，如果想要设置标签使用innerHtml。
如果想要设置文本，用innerText或者innerHtml或者textContent

获取自定义属性 getAttribute(name)  设置自定义属性 setAttribute(name,value)
移除自定义属性也可以移除元素自带的属性 removeAttribute(name)

## 节点
页面上的标签，属性，文本都可以称为节点
nodeType:节点的类型 1表示标签，2表示属性，3表示文本
nodeName：节点的名字，标签节点---大写的标签名字，属性节点---小写的属性名 文本节点---#text
nodeValue: 节点的值 标签节点---null, 属性节点---属性值,文本节点---文本内容
```
//获取当前节点的父级节点
对象.parentNode
//获取当前节点的父级元素
对象.parentElement
//获取当前节点的子级节点
对象.childNodes
//获取当前节点的子元素
对象.children
//获取当期节点的第一个子级节点
对象.firstChild
//获取当前节点的第一个子级元素
对象.firstElementChild
//获取当前节点的最后一个子级节点
对象.lastChild
//获取当前节点的最后一个子级元素
对象.lastElementChild
//获取当前节点的前一个兄弟节点
对象.previousSibling
//获取当前节点的前一个兄弟元素
对象.previousElementSibling
//获取当前节点的后一个兄弟节点
对象.nextSibling
//获取当前节点的后一个兄弟元素
对象.nextElementSibling
```
## 元素的创建
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
## 为元素绑定事件
```
//参数1：事件的类型-----事件的名字，没有on
//参数2：事件处理函数
//参数3：boolean ，目前就写false
//同一个元素可以绑定多个相同的事件
addEventListener(); //谷歌火狐支持，IE8不支持

//参数1：事件类型----事件的名字，有on
//参数2：事件处理函数
attachEvent(); //谷歌火狐不支持，IE8支持
```
> 判断浏览是否支持这个方法，直接:对象.方法名（不带括号）

## 解绑事件
用什么方式绑定事件，就应该用对应的方式解绑事件
1. 对象.on事件名字 = 事件处理函数 ---> 绑定事件
   对象.on事件名字 = null; ---> 解绑事件
2. 对象.addEventListener 绑定事件
   对象.removeEventListener("事件名字","命名函数",false); 解绑事件
3. 对象.attachEvent 绑定事件
   对象.detachEvent("有on事件名","命名函数");解绑事件

## 事件冒泡
多个元素嵌套，有层次关系，这些元素都注册了相同的事件，如果里面元素的事件触发了，外面元素的事件也自动触发。
阻止事件冒泡
```
window.event.cancelBubble = true // IE特有的，谷歌支持，火狐不支持
obj.onclick = function (e)}{
  e.stopPropagation()//谷歌火狐支持，ie8不支持
}
```
事件有个三个阶段 e.eventPhase
1. 事件捕获阶段：从外向内
2. 事件目标阶段：最开始选择的元素
3. 事件冒泡阶段: 从里向外

addEventListener("没有on的事件名字","函数","控制事件阶段")

## BOM Browser Object Model 浏览器对象模型

window是浏览器的顶级对象，当调用window下的属性和方法时，可以省略window。
注意：window下一个特殊的属性：window.name

//页面加载完毕，这个事件就会触发
window.onload
//页面关闭后触发 - IE8支持,谷歌不支持
window.onunload
//页面关闭之前 - IE8支持,谷歌不支持
window.onbeforeunload

## location
```
location.hash // #号及后面的内容
location.hoat // 主机名及端口号
location.hostname // 主机名
location.pathname // 文件的路径---相对路径
location.port // 对口号
location.protocol // 协议
location.search // ?号及后面的内容
//设置页面的地址(有历史记录)
location.href = 地址名
location.assign(地址名);
//重新加载刷新
location.reload();
//替换页面的地址(没有历史)
location.replace();
```
## history
```
//后退
history.back();
//前进
history.forward();
//正数前进，负数后退
history.go();
```
## navigator
navigator.userAgent //可以判断用户浏览器类型
navigator.platform //可以判断浏览器所在的系统平台类型

## 定时器/计时器
setInterval();
setTimeout();

## offset

对象.offsetHeight 获取元素的高度
对象.offsetWidth 获取元素的宽度
对象.offsetLeft 获取元素距离左边的距离
没有脱离文档流: offsetLeft = 父级元素的margin+父级元素的padding+父级元素的border + 自己的margin
脱离文档流: offsetLeft = 自己的left和自己的margin
对象.offsetTop 获取元素距离上边的距离
//获取body
document.body 获取的是元素
//获取title
document.title 获取的是值
//获取html
document.documentElement

## scroll
scrollWidth:元素中内容的实际的宽(没有边框)如果没有内容就是元素的宽
scrollHeight:元素中内容的实际的高(没有边框)如果没有内容就是元素的高
scrollTop:向上滚出去的距离
scrollLeft:向左滚曲出去的距离
滚动事件：onscroll
```
获取浏览器的滚动距离
window.onscroll
var scrollTop = window.pageYOffset || document.documentElement.scrollTop
|| document.body.scrollTop ||　0;

var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft
|| document.body.scrollLeft ||　0;
```
## client
clientWidth:元素内部的宽度（包含内边距），不包括左右边框和垂直滚动条
clientHeight:元素内部的高度（包含内边距），不包括上下边框和水平滚动条
clientLeft: 左边边框的宽度
clientTop:上边边框的高度
