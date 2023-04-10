- 
- umi3 antD pro v5 complete dva
- **求知编程学院**[视频学习地址](https://www.bilibili.com/video/BV1SA411H7sX/?spm_id_from=333.999.0.0&vd_source=891093c1caed79794c25fe5f4b8eeae9 "不完整，付费视频，等把把免费的看完再看，有功能实现需求，可以去查查有没有")

- [ ] [一枚猿视频](https://www.bilibili.com/video/BV14b411V7sf "里面讲了登录手机号登录，有空再看") ，第二优先看，有噪音,
- [ ] 一枚猿 [JWT 登录视频教学无源码](https://www.bilibili.com/video/BV1tT4y1j7ZV)
- [ ] 一枚猿 [微信公众号登录](https://www.bilibili.com/video/BV1ah411y7UQ)
- [ ] 优先看！[融职商城](https://www.bilibili.com/video/BV1i5411c7xp) github[源码 1](https://github1s.com/infinite7012/antd_pro_shop_admin "jsx") [源码 2](https://github1s.com/ddzyan/antd-pro-shop-admin "tsx") [源码 3](https://github1s.com/13982720426/antd_pro_shop_admin "jsx") [源码 4](https://github1s.com/XYJ-1/antd_pro_shop_admins "tsx") [项目 API 地址](https://www.showdoc.com.cn/1207745568269674/6090123591593835)
- [ ] 张立志的[另一个视频](https://www.bilibili.com/video/BV1g54y187LJ)基于 Ant Design Pro v5 和 Formily v1 的动态模型网站后台

# 版本

## Branch 最爱白菜呀-实现 proTable

### 1.3.2 熟悉应用 userList

- 对 subscriptions,reducers,effects,dispatch 更熟悉了
- loading 显示；delete、add 不成功时的 msg 及 modal 弹出设置
- userModal 里面的表单赋值，提交，如何接收父组件传值，以及表单的布局 layout
- typescript 跟着张立志学会了一点点
- proTable里面自带的reload可以写函数，重新dispatch: getList一下，更新数据，因为index宇model的namespace进行了connect

- [ ] loading 显示不正确，可以不设置，或是设置 false,[取反](src\pages\organization\tenantryDva\index.tsx)还没成功
- [ ] index 里的 dispatch delete 不成功
- [ ] ***非常重要！***登录界面无法验证已经登录，还是停留在登录界面不跳转，实际上已经可以输入其他网址进入系统了

- visible 弃用改成 open

- [ ] 按张立志的改可以正确呈现 loading，todo 具体原因有时间再研究
- [ ] 任务为导向，先做出东西来再优化

### 1.3.1 引入 Dva

- 通过 Dva, model 实现了在基础的 Table 上面对 tenantry 的增加，删除，修改 company_name(tenantry03_dva_basicTable)
- proTable 的数据展示直接 request 里的方法调用和删除行(\_dtenantry02va)
  ```javascript
  request(`http://localhost:8081/myServer/doSQL?paramvalues=`+encodeURIComponent(JSON.stringify({sqlprocedure:
  ```
- [视频](https://www.bilibili.com/video/BV1qz411z7s3/ "张立志")例子入门（tenantryDva)

- [ ] proTable 上面还没有修改增加
- [ ] typescript 声明没有补充
- [ ] request 传分页参数还没做

### 1.2.1 承租客户成功显示

- [ ] initialState 里的 curUser 第一次 console 有值,之后 undefined，不显示页面，之后再刷新有页面

### 1.2.0 用户中心

- user 的用户中心
- 掌握了在 navicat 中建外键关联的表，先数据生成所有列，再把是外键的列的数据从父表拷贝覆盖到新表，然后再添加外键

### 1.1.2 用户权限表（curUser)及菜单权限

- access: strict mode
- setInitialState curUser

### 1.1.1 proTable 删除行

- 登录后 setInitialState currentUser，首页的最起码改了

- [ ] 多角色权限管理

### 1.1.0 seller02 proTable request

- [ ] 如何获取当前登录用户信息

- seller02 在 proTable 里面修改 request，成功获得数据
- proTable 属性 pagination 里面定义 pageSize

### 1.0.4-文字介绍修改

- 更改了 headerTheme 为 light（从 ts 的数据类型鼠标跳转看到 layout 的源码上介绍有哪些参数及用法很详细）
- 完善了登录
- 更改了 footer,rightcontent 等文字介绍，更换了 favicon
- 添加了 protable 部分残缺代码.txt

### 1.0.3-登录信息与数据库验证

- 能够用数据库信息验证登录。因为有 access 变量在 fetchUserInfo 调用/api/currentUser 中用到，因此 reqdosql 在 mock 的 api 里面写，

### 1.0.2-菜单路由配置，成功在 layout 显示了菜单及对应的组件

- 最爱白菜呀[视频](https://www.bilibili.com/video/BV1mr4y1r7GV)

### 1.0.1-解决首页登录成功

- [X] user/login 总是报登录失败的错误

  1. 由 npm dev 启动改成 npm start 启动

- 上传无影响资源文件

## Master

### 1.0.1 老尚的 vite-project 的 login 和 reqdosql

- [ ] 无法打开 http://localhost:8000/jjqlogin
- [ ] [入门视频](https://www.bilibili.com/video/BV1Kb411Q7qe)，新建 login 页面，在另一个项目里实现了图片上传，OCR 识别，msg 封装，但是也没看完
- [ ] 老尚的[另一个视频](https://www.bilibili.com/video/BV1NT411o7U1)，有空看

# 字段说明

- organization 机构管理
- tenantry 承租人
- seller 出卖人

# Ant Design Pro

This project is initialized with [Ant Design Pro](https://pro.ant.design). Follow is the quick guide for how to use.

## Environment Prepare

Install `node_modules`:

```bash
npm install
```

or

```bash
yarn
```

## Provided Scripts

Ant Design Pro provides some useful script to help you quick start and build with web project, code style check and test.

Scripts provided in `package.json`. It's safe to modify or add additional script:

### Start project

```bash
npm start
```

### Build project

```bash
npm run build
```

### Check code style

```bash
npm run lint
```

You can also use script to auto fix some lint error:

```bash
npm run lint:fix
```

### Test code

```bash
npm test
```

## More

You can view full document on our [official website](https://pro.ant.design). And welcome any feedback in our [github](https://github.com/ant-design/ant-design-pro).
