---
layout: vuex
title: vuex-源码分析
date: 2019-07-22 18:41:30
tags: [vue,vuex,前端]
---

## 安装
```javascript
//vuex version 3.1.1
import Vue from 'vue'
import Vuex from 'vuex'

//这里会调用src/index.js的install方法
Vue.use(Vuex);

//src/index.js
let Vue
function install (_Vue) {
  //防止vuex多次初始化
  if (Vue && _Vue === Vue) {
    if (process.env.NODE_ENV !== 'production') {
      console.error(
        '[vuex] already installed. Vue.use(Vuex) should be called only once.'
      )
    }
    return
  }
  Vue = _Vue
  applyMixin(Vue)
}
//applyMixin  
const applyMixin = function (Vue) {
  const version = Number(Vue.version.split('.')[0])
  //判断vue的版本，如果大于2版本，使用全局混入方式，在vux组件初始化生命周期'beforeCreate'中执行vuexInit方法
  //混入同名函数默认规则：同名钩子函数将合并为一个数组，因此都将被调用。另外，混入对象的钩子将在组件自身钩子之前调用。
  if (version >= 2) {
    Vue.mixin({ beforeCreate: vuexInit })
  } else {
    // override init and inject vuex init procedure
    // for 1.x backwards compatibility.
    const _init = Vue.prototype._init
    Vue.prototype._init = function (options = {}) {
      options.init = options.init
        ? [vuexInit].concat(options.init)
        : vuexInit
      _init.call(this, options)
    }
  }

  /**
   * Vuex init hook, injected into each instances init hooks list.
   * this.$options vue组件初始化选项，判断当选vue组件options是否存在store对象，存在直接给this.$store赋值，不存在
   * 从父实例获取。
   * 一般在app.js或者main.js我们初始化vue的时候，使用vuex会传入我们创建的store实例如下：
        new Vue({
        el: '#app',
        store,
        render: h => h(App)
        })
   * 这样最顶层的vue实例选项中就有了store对象。而vuex在beforeCreate生命周期里全局混入了vuexInit方法，这样就做到了为vue组件自动
   *注入了store实例，在vue组件中通过this.$store使用vuex
   */
  
  function vuexInit () {
    const options = this.$options
    // store injection
    if (options.store) {
      this.$store = typeof options.store === 'function'
        ? options.store()
        : options.store
    } else if (options.parent && options.parent.$store) {
      this.$store = options.parent.$store
    }
  }
}
```

## store初始化

```javascript
//创建一个store实例
conse store = new Vuex.Store({
  state:{},
  getters:{},
  mutations:{},
  action:{},
  modules: {},
  strict: Boolean,
  plugins: []
})
//src/index.js  javascript中一般使用_下划线表示私有变量
class Store{
  //构造方法
  constructor (options = {}) {
    if (!Vue && typeof window !== 'undefined' && window.Vue) {
      install(window.Vue)
    }
    const { plugins = [],strict = false} = options
    // store internal state
    this._committing = false
    this._actions = Object.create(null)
    this._actionSubscribers = []
    this._mutations = Object.create(null)
    this._wrappedGetters = Object.create(null)
    this._modules = new ModuleCollection(options)
    this._modulesNamespaceMap = Object.create(null)
    this._subscribers = []
    this._watcherVM = new Vue()

    //将实例对象的dispatch和commit方法重定向到原型上的dispatch和commit方法，中间多传了一个store对象
    const store = this
    const { dispatch, commit } = this
    this.dispatch = function boundDispatch (type, payload) {
      return dispatch.call(store, type, payload)
    }
    this.commit = function boundCommit (type, payload, options) {
      return commit.call(store, type, payload, options)
    }

    this.strict = strict
    const state = this._modules.root.state
    // init root module.
    // this also recursively registers all sub-modules
    // and collects all module getters inside this._wrappedGetters
    installModule(this, state, [], this._modules.root)
  }
}
//src/module/module-collection.js 和 module.js 一个模块集合一个模块对象。 模块初始化流程
class ModuleCollection {
    constructor (rawRootModule) {
        // register root module (Vuex.Store options)
        this.register([], rawRootModule, false)
    }
    register (path, rawModule, runtime = true) {
        const newModule = new Module(rawModule, runtime)
        if (path.length === 0) {
            this.root = newModule
        } else {
            const parent = this.get(path.slice(0, -1))
            parent.addChild(path[path.length - 1], newModule)
        }
        // register nested modules
        //forEachValue = (obj, fn) => {Object.keys(obj).forEach(key => fn(obj[key], key))}
        if (rawModule.modules) {
            forEachValue(rawModule.modules, (rawChildModule, key) => {
                this.register(path.concat(key), rawChildModule, runtime)
            })
        }
    }
    get (path) {
    return path.reduce((module, key) => {
      return module.getChild(key)
    }, this.root)
  }
}
class Module {
  constructor (rawModule, runtime) {
    this.runtime = runtime
    // Store some children item
    this._children = Object.create(null)
    // Store the origin module object which passed by programmer
    this._rawModule = rawModule
    const rawState = rawModule.state

    // Store the origin module's state
    this.state = (typeof rawState === 'function' ? rawState() : rawState) || {}
  }
    addChild (key, module) {
    this._children[key] = module
  }
    getChild (key) {
    return this._children[key]
  }
}
//在new ModuleCollection对象的时候，我们传入了根store实例，在构造方法中调用register方法
//register方法会递归注册子modules
/*

const rootStore = {
    modules:{
      home:{
          modules:{
              tab1:{},
          }
      }
    }
} 
最终解析结果：
    ModuleCollection:{
        root : Module:{
                    _children:Module:{
                        'home':Module:{
                            _children:{
                                'tab1':Module
                            }
                        }
                    }
                }
              

    }

解析register流程
第一次：([],rootStore,false) => {
     const newModule = new Module(rootStore, false)
    this.root = newModule
    //递归注册子模块 
    forEachValue(rootStore, (rootStore['home'], 'home') => {
        this.register(['home'], rootStore['home'], false)
    })
}


第二次：(['home'],rootStore['home'],false) => {
    const newModule = new Module(rootStore['home'], false)
    //获取子模块的父对象
    const parent = this.get([]) <==> parent = this.root 
    parent.addChild(home, newModule)
    //再次递归子模块
    forEachValue(rootStore['home'], (rootStore['home']['tab1'], 'tab1') => {
        this.register(['home','tab1'], rootStore['home']['tab1'], false)
    })
}

第三次 (['home','tab1'],rootStore['home']['tab1'],false) => {
    const newModule = new Module(rootStore['home']['tab1'], false)
    const parent = this.get([home]) <==> parent = this.rootStore['home'] 
     parent.addChild('tab1', newModule)
}
*/




```