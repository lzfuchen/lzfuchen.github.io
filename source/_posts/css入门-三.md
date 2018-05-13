---
title: css入门(三)
date: 2018-05-07 20:42:54
tags: 前端
categories: 前端
---
## 标准流normal flow(文档流)
 元素自上而下，自左而右，块元素独占一行，行内元素在一行显示，碰到父元素的边框换行。

## 浮动
float: left | right
> 元素浮动之后不占据原来的位置(脱标)
> 浮动的盒子在一行显示
> 行内元素浮动之后转换为行内块元素(不推荐使用，转行内块元素最好使用display:inline-block;)
> 浮动找浮动，不浮动找不浮动
> 浮动只影响后面的元素
> 浮动元素顶部为基准对齐

### 浮动的作用
> 文本饶图
> 制作导航
> 网页布局

## 清除浮动
当父盒子没有定义高度，嵌套的盒子浮动之后，下边的元素发生位置错误

> 清除浮动不是不用浮动，清除浮动产生的不利影响

清除浮动的方法：

clear : left | right | both（工作中用的最多）

> 额外标签法
在最后一个浮动元素后添加标签(一般用不上)

> 给浮动盒子的父级元素使用 overflow:hidden; bfc

> 伪元素清除 给浮动元素的父级使用（工作中使用这种方式）
```
.clearfix:after{
  content: ".";
  display: block;
  height: 0;
  line-height: 0;
  visibility: hidden;
  clear: both;
}
//兼容IE浏览器
.clearfix{
  zoom:1;
}
```

## css初始化
为了考虑到浏览器的兼容问题，其实不同浏览器对有些标签的默认值是不同的，如果没有对css初始化往往会出现浏览器之间的页面差异
```
腾讯：
body,ol,ul,h1,h2,h3,h4,h5,h6,p,th,td,dl,dd,form,fieldset,legend,input,textarea,select{margin:0;padding:0}
body{font:12px"宋体","Arial Narrow",HELVETICA;background:#fff;-webkit-text-size-adjust:100%;}
a{color:#2d374b;text-decoration:none}
a:hover{color:#cd0200;text-decoration:underline}
em{font-style:normal}
li{list-style:none}
img{border:0;vertical-align:middle}
table{border-collapse:collapse;border-spacing:0}
p{word-wrap:break-word}
新浪：
body,ul,ol,li,p,h1,h2,h3,h4,h5,h6,form,fieldset,table,td,img,div{margin:0;padding:0;border:0;}
body{background:#fff;color:#333;font-size:12px; margin-top:5px;font-family:"SimSun","宋体","Arial Narrow";}
ul,ol{list-style-type:none;}
select,input,img,select{vertical-align:middle;}
a{text-decoration:none;}
a:link{color:#009;}
a:visited{color:#800080;}
a:hover,a:active,a:focus{color:#c00;text-decoration:underline;}
淘宝：
body, h1, h2, h3, h4, h5, h6, hr, p, blockquote, dl, dt, dd, ul, ol, li, pre, form, fieldset, legend, button, input, textarea, th, td { margin:0; padding:0; }
body, button, input, select, textarea { font:12px/1.5tahoma, arial, \5b8b\4f53; }
h1, h2, h3, h4, h5, h6{ font-size:100%; }
address, cite, dfn, em, var { font-style:normal; }
code, kbd, pre, samp { font-family:couriernew, courier, monospace; }
small{ font-size:12px; }
ul, ol { list-style:none; }
a { text-decoration:none; }
a:hover { text-decoration:underline; }
sup { vertical-align:text-top; }
sub{ vertical-align:text-bottom; }
legend { color:#000; }
fieldset, img { border:0; }
button, input, select, textarea { font-size:100%; }
table { border-collapse:collapse; border-spacing:0; }
```
## overflow（溢出的处理方式）
| 属性             | 标签                                                 |
| ---------------- | ---------------------------------------------------- |
| overflow:visible | 默认值。内容不会被修剪，会呈现在元素框之外           |
| overflow:hidden  | 内容会被修剪，并且其余内容是不可见的                 |
| overflow:scroll  | 内容会被修剪，但是浏览器会显示滚动条以便查看其余内容 |
| overflow:auto    | 如果内容被修剪，则浏览器会显示滚动条以便查看其余内容 |

## 定位(position)
定位方向 : left | right | top | bottom
### static 静态定位。默认值，就是文档流

### absolute 绝对定位
特点：
1. 元素使用绝对定位之后不占据原来的位置（脱标）
2. 元素使用绝对定位，位置是从浏览器出发。
3. 嵌套的盒子，父盒子没有使用定位，子盒子绝对定位，子盒子位置从浏览器出发。
4. 嵌套的盒子，父盒子使用定位，子盒子绝对定位，子盒子位置从父元素位置出发
5. 给行内元素使用绝对定位之后，转换为行内块（不推荐使用，推荐使用display:inline-block）

### relative 相对定位
特点：
1. 使用相对定位，位置从自身出发。
2. 还占据原来的位置。
3. 子绝父相（父元素相对定位，子元素相对定位）(重点重点重点)
4. 行内元素使用相对定位不能转行内块

### fixed 固定定位
特点:
1. 固定定位之后，不占据原来的位置
2. 元素使用固定定位之后，位置从浏览器出发
3. 行内元素使用固定位后，会转化为行内块(不推荐使用，推荐使用display:inline-block)

## 定位的盒子居中显示
margin: 0 auto; 只能让标准流的盒子居中对齐
定位的盒子居中：先左右走父元素盒子的一半50%,在向左走子盒子的一半(margin-left:负值)
```
left:50%;
margin-left:往回走自身宽度的一般
```
## 图片和文字垂直居中对齐
vertical-align 对inline-block最敏感。默认值：baseline基线对齐

## Css可见性
overflow:hidden;溢出隐藏
visibility:hidden;隐藏元素 隐藏之后还占据原来的位置
display:none;隐藏元素 隐藏之后不占据原来的位置
display：block; 元素可见

display:none 和 display:block 常配合js使用

### css值内容移除(网页优化)
1. 使用text-indent:
```
a{
  display: inline-block;
  text-indent: -5000em;
}
```
## 属性选择器
```javascript
<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<style type="text/css">
		input[type=text][class=user]{
			width: 100px;
			height: 50px;
			background: red
		}
	</style>
</head>
<body>
	<input type="text" class="user">
	<input type="text" class="pwd">
</body>
</html>

```
## 盒子里元素垂直居中
```
position: relative;
top:50%;
transform: translateY(-50%);
```
