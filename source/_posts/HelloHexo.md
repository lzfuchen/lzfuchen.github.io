---
title: 搭建一个属于自己的博客
date: 2018-04-11 14:35:45
tags: Hexo
categories: hexo
---

## 前言
开始搭建一个属于自己博客
## 准备工作
1. 首先我们需要一个[github](https://github.com/)账号，然后新建一个repo。新建repo命名的时候一定要注意 一定要注意 一定要注意，形式只能是：`xxx.github.io`(xxx是你github的名称)。到了这一步我们就拥有一个域名为`https://xxx.github.io`的服务器啦，我们的博客将挂载到这个下面。

2. [Hexo](https://hexo.io/zh-cn/)是一个快速、简洁且高效的博客框架。我们要安装这个来搭建我们的博客。
Hexo安装是有前提的，需要先安装[nodejs](https://nodejs.org/en/)，nodejs安装完成后。命令输入：`npm install -g hexo-cli`就可以完成hexo的安装啦！

3. [git](https://git-scm.com/)这里用git来干嘛？拉取我们github新建的仓库啊。


## 开始建站
创建一个文件夹名字blog,命令工具进入刚创建的blog文件输入:
> hexo init

或者直接输入:
> hexo init <folder>

hexo 初始化完成后输入:
> npm install

新建完成后，指定文件夹的目录如下：
```
├── _config.yml  网站的配置信息，您可以在此配置大部分的参数。
├── package.json
├── scaffolds
├── source
|   ├── _drafts
|   └── _posts
└── themes
```
上面的步骤完成后我们可以输入:

> hexo s

成功启动hexo服务器后在浏览器输入：

> http://localhost:4000/

看到这个图片就说明我们已经建立了一个博客网站啦！

![](/img/hexo.jpg)

##关联github
编辑_config.yml配置文件，滚动到最下面看到的应该是这样子的

![](/img/hexo_config_raw.jpg)

修改类型为git

> type: git

增加项repo 值为https://github.com/xxx/xxx.github.io.git(xxx为github账户名)

> repo: https://github.com/lzfuchen/lzfuchen.github.io.git

增加项branch  值为master表明我们网站将挂着再master分支

> branch: master

增加项message 值随意，(默认为 Site updated: 'YYYY-MM-DD HH:mm:ss')

> message: Site updated

最终应该是这个样子的
![](/img/hexo_config_update.jpg)

hexo配置完成后，安装插件hexo-deployer-git
> npm install hexo-deployer-git --save

接着我们配置git
> git config --global user.email "you@example.com"
> git config --global user.name "Your Name"

> hexo g 生产网站静态资源
> hexo deploy 部署到网站到github
