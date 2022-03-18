# 后台管理系统

## 项目开始安装依赖

```
推荐使用 npm ci ，该指令会根据package-lock.json来安装确切的依赖版本
```

```
执行 npm run serve:dev 启动本地服务
```

### 打包

```
执行 npm run build ，文件会打包到dist目录下
```

### 项目检查和部分问题自动修复

```
执行 npm run lint
```

### 项目使用的 node 版本
> 由于项目中使用的 node-sass 版本是：v4.14.0，根据官方文档，我们使用的 node 版本需要时 v14 才行

### 需要注意
> keepAlive页面路由的name需要跟页面里的name保持一致，否则keepAlive失效
