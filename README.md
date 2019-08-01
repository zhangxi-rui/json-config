# json-config

项目使用的是 `vue-cli3.0` +[zyb-pc-ui](http://ued.zuoyebang.cc/pcui/#/zh-CN) 版本开发， 项目配置： 

- `Babel` :将 ES6 编译成 ES5
- `TypeScript` :JS 超集， 主要是类型检查
- `Router` :路由， 使用 `hash` 模式
- `Vuex` :状态管理
- `CSS Pre-processors` :css 预编译， 采用 `Sass/Scss` 
- `Linter/Formatter` :代码检查工具， 采用 `ESLint+Standard config` , 代码检查方式： 保存时检查

  > `Babel` 与 `TypeScript` 一起用于自动检测的填充
  > 使用 `Class` 风格装饰器
  > 即原本是： `home = new Vue()` 创建 `vue` 实例
  > 使用装饰器后： `class home extends Vue{}` 

## 图标字体（iconfont)

已有图标字体都已经上传到阿里的[iconfont](https://www.iconfont.cn)网站。 

### 查看路径

> 图标管理->我的项目->我参与的项目 -> 一课PC图标

  
 `./public/index.html` 添加了如下链接

``` html
  <link rel="stylesheet" href="//at.alicdn.com/t/font_1028719_05mr62bwc3f6.css">
```

项目中直接使用class名称。 e.g

``` html
<i class="iconfont refresh2"></i>
```

 了解已经有的图标字体， 或者联系 `王秀娜` UI 同学， 需要提供 [iconfont](https://www.iconfont.cn)网站自己的昵称

## vscode 的 eslint 配置

在项目跟目录新建文件夹 `.vscode` 文件， 再在 `.vscode` 目录下新建 `settings.json` , 统一配置

### 项目初始化

> 1. 项目初始化  
> 切换 npm 私服（因为 zyb-pc-ui 在 `http://ued.zuoyebang.cc/npm/` 私有服务器上面  
> npm config set registry 'http://ued.zuoyebang.cc/npm/'  
> yarn install

### 本地开发

默认采用 `http://yapi.afpai.com/mock/221/` 地址的 mock 数据， 配置修改在 `./build/createProxy.js` ， 如果想采用某台测试机的 mock 数据， 运行 `yarn dev test191` 

```
yarn dev //
//或者
yarn dev test191 //mock数据链接到特定测试机
```

### 生产环境

```
yarn build
```

### Run your tests

```
yarn test --config[test112] //test112 服务器，可更改
```

### vue文件书写规范

按照如下顺序书写， 并添加注释： vuex start-->data start-->computed start-->hook start-->method start 

```javascript
export default class SiderBar extends Vue {
    //vuex start
    @Getter('sidebar') sidebar: any

    //data start
    defaultIcons: string = 'zyb-icon-nav-order'

    //computed start
    get isCollapse() {
        return !this.sidebar.opened
    }

    //hook start 
    created() {}
    mounted() {}

    //method start
    // 获取左侧菜单
    getMenuList() {}
}
```

### 文档目录结构

```bash
├─.env
├─.env.development //开发环境变量
├─.env.production  //生成环境变量
├─.env.test        //测试环境变量
├─README.md
├─tsconfig.json    //ts配置
├─vue.config.js    //webpack配置
├─src
|  ├─App.vue       
|  ├─main.ts          //入口
|  ├─permission.ts    //全局路由守卫
|  ├─shims-tsx.d.ts   //vue的声明文件
|  ├─shims-vue.d.ts   //vue的声明文件
|  ├─views            //视图层
|  |   ├─course-center
|  |   |       ├─yike-course
|  |   |       |      └yike-course.vue
|  |   ├─admin-manage
|  |   |      ├─user-manage
|  |   |      |      └user-manage.vue
|  |   |      ├─menu-manage
|  |   |      |      └menu-manage.vue
|  ├─utils            //工具类 
|  |   ├─author.ts    //token权限
|  |   └request.ts    //axios实例
|  ├─types            //ts声明文件
|  |   └vue-global.d.ts
|  ├─store            //vuex
|  |   ├─getters.ts
|  |   ├─index.ts
|  |   ├─modules
|  |   |    ├─app.ts  //vuex-app模块
|  |   |    └user.ts  //vuex-user模板
|  ├─router           //路由
|  |   ├─index.ts     
|  |   ├─modules
|  |   |    ├─admin.ts
|  |   |    ├─course-center.ts
|  |   |    └order-center.ts
|  ├─model            //实体
|  |   ├─Userinfo.ts
|  |   └VueWidthRoute.ts
|  ├─layout           //模板页
|  |   ├─index.vue
|  |   ├─components
|  |   |     ├─sidebar
|  |   |     |    └index.vue
|  |   |     ├─header
|  |   |     |   └index.vue
|  |   |     ├─breadcrumb
|  |   |     |     └index.vue
|  |   |     ├─app-main
|  |   |     |    └index.vue
|  ├─inject            //vue.prototype挂载
|  |   └index.ts
|  ├─config            //全局配置
|  |   └index.ts
|  ├─components        //公共组件
|  ├─assets            //静态资源
|  |   ├─logo.png
|  |   ├─styles
|  |   |   ├─font.scss
|  |   |   ├─index.scss
|  |   |   ├─mixin.scss
|  |   |   ├─transition.scss
|  |   |   └variables.scss
|  |   ├─images
|  |   |   ├─ic-add-circle-hover.png
|  |   |   └logo_sc_small.png
|  ├─api              //api接口
|  |  ├─admin-manage.ts
|  |  └user-info.ts
├─public
|   ├─favicon.ico
|   ├─index.html
|   ├─static
|   |   └README.md
├─mocker                //本地mock
|   ├─index.js
|   ├─modules
|   |    ├─userMock
|   |    |    ├─getauth.json
|   |    |    ├─getplatform.json
|   |    |    ├─getuserinfo.json
|   |    |    ├─index.js
|   |    |    └user.json
|   |    ├─adminManage
|   |    |      ├─index.js
|   |    |      ├─menuList.json
|   |    |      └saveData.json
├─data
|  ├─menulist.json
|  └userinfo.json
├─build
|   ├─buildUploader.js
|   ├─createProxy.js
|   ├─getConfig.js
|   └serverList.js
├─.vscode           //vscode配置
|    └settings.json
```

