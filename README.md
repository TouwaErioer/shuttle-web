# shuttle前端

## 依赖

| Syntax | Description | Version|
|  :----: |  :----: | :----: |
| JavaScript Frame | Vue.js | 2.6.11|
| UI | Element UI | 2.15.0 |
| Router | Vue Router | 3.5.1 |
| Global Data | Vuex | 3.6.2 |
| Request | axios | 0.21.1 |
| Loading | mescroll.js | 1.4.2 |
| FormatTime | moment.js | 2.29.1 |

## 效果

[![explore.th.png](https://img.loli.bj/images/2021/02/23/explore.th.png)](https://img.loli.bj/image/V5qP)
[![center.th.png](https://img.loli.bj/images/2021/02/23/center.th.png)](https://img.loli.bj/image/VopW)
[![store.th.png](https://img.loli.bj/images/2021/02/23/store.th.png)](https://img.loli.bj/image/VFJA)
[![cart.th.png](https://img.loli.bj/images/2021/02/23/cart.th.png)](https://img.loli.bj/image/V4zU)
[![order.th.png](https://img.loli.bj/images/2021/02/23/order.th.png)](https://img.loli.bj/image/VjdD)
[![detail.th.png](https://img.loli.bj/images/2021/02/23/detail.th.png)](https://img.loli.bj/image/VSOk)


## 必要文件
请在根目录下创建 `.env.local` 配置环境变量
```sh
# 反向代理目标ip
target=

# websocket 
VUE_APP_WS=

# 后台管理系统
VUE_APP_ADMIN=
```

### nginx配置

```nginx
server {
  listen #[port];
  server_name #[server_name];
  root #[项目打包文件夹路径];
  index index.html;
	
  # 单页面路由配置
  location / {
    try_files $uri $uri/ @router;
  }

  # 反向代理到后端api 
  location /api/{
    proxy_pass #[api];
  }

  location @router {
     rewrite ^.*$ /index.html last;
  }
}
```

## Project setup

```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).
