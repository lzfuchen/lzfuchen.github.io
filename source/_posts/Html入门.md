---
title: Html入门
date: 2018-04-27 14:24:20
tags: 入门
---

## 前言
入门这些东西以前都看过，学过，可是好久不用发现又都忘记啦！以后准备把学过的知识全部记录下来，方便以后回顾。
## Html(Htper text markup language)入门
基本结构
```
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
</head>
<body>

</body>
</html>
```
基本标签
```
<strong>文本加粗</strong>
<em>文本倾斜</em>
<del>删除线</del>
<ins>下划线</ins>
<sup>上标</sup>
<sub>下标</sub>
<img src="图片路径" alt="替换文字" title="提示文本" />
超链接实现锚点
<a href="#标签id"/>
空链
<a href="#" />
超链接优化写法在<head></head>中添加如下代码：
<base target="_blank">
列表
无序列表：ul li
有序列表：ol li
自定义列表 dl dt dd
<dl>
<dt></dt> 小标题
<dd></dd> 解释标题
</dl>
```
meta标签和link标签
```
seo 搜索引擎优化 关键字
<meta name="keywords" content="Java,Android,PHP,IOS,Html">
网页描述
<meta name="description" content="这是一个网页描述">
网页重定向
<meta http-equiv="refresh" content="5;https://www.google.cn">

link链接外部样式表
<link rel="stylesheet" type="text/css" href="">
link icon图标
<link rel="icon" href="图标路径">
```
