- umi3 antD pro v5 complete
- **求知编程学院**[视频学习地址](https://www.bilibili.com/video/BV1SA411H7sX/?spm_id_from=333.999.0.0&vd_source=891093c1caed79794c25fe5f4b8eeae9)

# 版本

## Branch 最爱白菜呀-实现 proTable

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

### 1.0.1-解决首页登录成功

- [x] user/login 总是报登录失败的错误

  1. 由 npm dev 启动改成 npm start 启动

- 上传无影响资源文件

## Master

### 1.0.1 老尚的 vite-project 的 login 和 reqdosql

- [ ] 无法打开 http://localhost:8000/jjqlogin

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
