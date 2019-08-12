### 项目初始化

> 1.项目初始化  
> 切换 npm 私服（因为 zyb-pc-ui 在`http://ued.zuoyebang.cc/npm/`私有服务器上面  
> npm config set registry 'http://ued.zuoyebang.cc/npm/'  
> npm install
### 本地开发

- 默认采用 `http://yapi.afpai.com/`的数据， mock 地址配置修改在.env.devlopment中中修改VUE_APP_MOCKAPI = 'http://yapi.afpai.com/mock/274/', 运行`yarn dev`
- 如果想采用某台测试机数据，运行 `yarn dev --config [test225]` test225可修改
#### 注意
- 在本地测试时，对接的为test225开发机接口时，会自动由localhost:8080跳转到开发机上的页面http://teat225.suanshubang.com
- 解决方法：将src/utils/request.ts中请求携带的cookie改成http://test225.suanshubang.com的cookie。然后即可访问localhost:8080

```
//修改与跳转后的页面http://test225.suanshubang.com的cookie一致
let PHPSESSID = 'ST-1562828169rayFU6aFl8n2gvADVP9' 
let ZYBUUAP = 'UUAP_Un0CU5dhW-moeSzKKnh8fV0dvXm_xGWdxwoxgwfKbXUEitp7EWASP9Cl-EIv_MqG'
```


### 测试环境

```
yarn  test --config [test225] //test225 服务器，可更改

```
### 生产环境

```
yarn  build
```
