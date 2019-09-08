
## hls-admin

## 安装依赖
```
npm install
```
### Run
```
npm start
## 静态资源文件打包
npm run build
```

### 目录结构

        ├── README.md
        ├── config  // node 项目配置文件目录
            ├── default.js  // 全局配置文件
            ├── development.js  // 开发环境配置文件
            ├── {APP_NAME}.json  // 环境变量配置文件
            └── production.js // 生产环境配置文件
        ├── gulpfile.js // 资源打包配置文件
        ├── node_modules
        ├── package.json
        ├── releash.sh
        ├── server.js // node 启动文件
        └── src

Node 目录结构

        src
        ├── app.config.js  // node 应用服务配置文件
        ├── backend-mock  // mock 数据层
        ├── controllers  // 路由层
        ├── middlewares // 中间件
        ├── routes.js // 路由根文件
        ├── services  // 服务层
        ├── static  // 静态资源文件
        ├── utils  // utils 目录
        └── views  // View 层

static 目录结构

        src/static
        ├── common  // 通用模块
        │   └── components
        └── pages // 业务入口
            └── Demo // 具体 page
                ├── css
                ├── images  // ejs 中引入图片，不走 webpack, js 中不 import 不会打包
                ├── img  // css，js 相关图片
                ├── index.js
                └── js

