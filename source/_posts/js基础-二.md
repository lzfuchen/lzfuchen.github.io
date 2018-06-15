---
title: js基础-二
date: 2018-06-05 22:23:16
tags: 前端
categories: 前端
---

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
clientWidth:可视区域的宽（没有边框），边框内部的宽度
clientHeight:可视区域的高（没有边框），边框内部的高度
clientLeft: 左边边框的宽度
clientTop:上边边框的高度
