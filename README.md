# 综合工具箱

[tool_platform](https://github.com/yamonc/tool_platfom/)

> 综合工具箱（名字实在是不会起，意会吧，言传就不必了）：这个项目主要是为了解决日常生活中的一点点痛点：比如密码箱，何为密码箱呢？如今大多数网站都有注册和登录功能，要么呢，有各种需要备份或者记录的信息（QQ邮箱的凭证，开发者需要记录下，或者github的AK和SK等），这种记录在网上的一些工具有可能会遭到泄露，所以将本地密码存到密码箱里就很有必要了。

## 🍎技术架构

[electron](https://www.electronjs.org/zh/docs/latest/tutorial/quick-start)+vue2

框架用的是[electron-vue-template](https://gitee.com/Zh-Sky/electron-vue-template)，感谢大佬的开源。

纯前端项目，没有用到后端，**更不会保留任何数据到服务器上**。

## 🍉 解决的问题

目前综合工具箱里的功能只有《密码箱》的功能。

### 🍓密码箱

![image-20230617111859730](https://markdown-image-bed.oss-cn-beijing.aliyuncs.com/202306171118918.png)

![image-20230617111918042](https://markdown-image-bed.oss-cn-beijing.aliyuncs.com/202306171119106.png)

![image-20230617112248464](https://markdown-image-bed.oss-cn-beijing.aliyuncs.com/202306171122534.png)

#### 痛点

**网络上的密码无法管理。**

#### 如何使用

点击新增密码，按照提示输入后，可在当前的用户目录下找到password.json的文件，所有的密码都存在这个paasword.json中。

密码备份功能比价鸡肋，后期去掉。

## 🍠如何启动

### 前提

前提需要安装git、node.js、yarn/npm（npm好像在这里不好使）

### 二次开发

如果是二次开发的话：

**pull代码**

`git pull https://github.com/yamonc/tool_platfom.git `

**安装安装包**

`yarn `

**启动项目**

`yarn dev`

### 直接使用

两种方式，第一种[下载发版](https://gh.api.99988866.xyz/https://github.com/yamonc/tool_platfom/releases/download/V0.0.1/electron-vue-admin.Setup.0.0.1.exe)；

第二种，在二次开发的基础上，自己打包：

`yarn build:win64`

打完包之后，会发现build包下有exe可执行文件：

![image-20230617113946744](https://markdown-image-bed.oss-cn-beijing.aliyuncs.com/202306171139786.png)

## 🍐后期目标

性能优化（不得不说，electron太太太太慢了）

密码修改。

导入密码。

支持sqllite，方便修改密码、删除密码。

## 🍌CHANGELOG

V0.0.1 新增密码箱功能；

