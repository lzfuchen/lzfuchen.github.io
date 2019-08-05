---
title: webpack技巧
date: 2019-08-05 13:29:45
tags: webpack
categories: webpack
---

## webpack之require.context()

```javascript
//案例：使用 require.context() 方法来创建自己的（模块）上下文，从而实现自动动态require组件。
//这个方法需要3个参数：要搜索的文件夹目录，是否还应该搜索它的子目录，以及一个匹配文件的正则表达式。

import Vue from 'vue'

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1)

}
const requireComponent = require.context('.', false, /\.vue$/)

requireComponent.keys().forEach(fileName => {
  const componentConfig = requireComponent(fileName)
    //因为得到的filename格式是: './baseButton.vue', 所以这里我们去掉头和尾，只保留真正的文件名
  const componentName = capitalizeFirstLetter(fileName.replace(/^\.\//, '').replace(/\.\w+$/, ''))
  Vue.component(componentName, componentConfig.default || componentConfig)
})

```