---
title: 移动web
date: 2018-06-17 20:26:57
tags: 前端
categories: 前端
---

## 移动端适配
1.流式布局：就是百分比布局，非固定像素，内容向两侧填充，理解成流动的布局，就是流式布局
2.viewport：移动端特有。这是一个虚拟的区域，承载网页的，关系是：浏览器承载viewport，viewport承载网页
### 适配方案
适配要求：
1. 网页宽度必须和浏览器保持一致
2. 默认显示的缩放比例和PC端保持1:1
3. 不允许用户自行缩放网页
适配设置：
```
<meta name="viewport"
  content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0"> 设置视口的标签，在head里面并且应该紧接着编码设置
```
viewport的功能
1. width 可以设置宽度
2. height 可以设置高度
3. initial-scale 可以设置默认的缩放比例
4. user-scalable 可以设置是否允许用户自行缩放
5. maximum-scale 可以设置最大缩放比例
6. minimum-scale 可以设置最小缩放比例
