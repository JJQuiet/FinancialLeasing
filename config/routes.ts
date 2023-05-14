export default [
  //user  login  register 这个必须要放到前面！！ 否则登录网址没有任何内容！
  {
    path: '/user',
    layout: false,
    access: 'true',
    routes: [
      {
        path: '/user/login',
        layout: false,
        name: 'login',
        component: './user/Login',
        access: 'true',
      },
      {
        path: '/user',
        redirect: '/user/login',
        access: 'true',
      },
      {
        name: 'register-result',
        icon: 'smile',
        path: '/user/register-result',
        component: './user/register-result',
      },
      {
        name: 'register',
        icon: 'smile',
        path: '/user/register',
        component: './user/register',
      },
      {
        component: '404',
      },
    ],
  },
  //account  放到最后面不显示，只能放到前面来
  {
    // name: 'account',
    // icon: 'user',
    path: '/account',
    // access: 'true',
    access: 'is_user',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        // name: 'center',
        // icon: 'smile',
        path: '/account/center',
        component: './account/center',
        // access: 'true',
        access: 'is_user',
      },
      {
        // name: 'settings',
        // icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
        // access: 'true',
        access: 'is_user',
      },
    ],
  },
  //  资产管理部 asset_manager
  {
    path: '/asset',
    name: '租后资产',
    // access: 'is_asset_manager',
    icon: 'bank',
    routes: [
      {
        path: '/asset',
        redirect: '/asset/lease_item',
      },
      {
        path: '/asset/lease_item',
        name: '租赁物',
        access: 'is_asset_manager',
        icon: 'car',
      },
      {
        path: '/asset/mortgage',
        name: '租赁物抵押品',
        access: 'is_asset_manager',
        icon: 'pound',
      },
    ],
  },
  // 资产管理部
  //财务部  财务管理员 financial_manager

  //承租客户 业务部 业务管理员 business_admin
  {
    name: '承租客户',
    icon: 'smile',
    path: '/business-unit/tenantry',
    access: 'is_business_admin',
    component: './organization/tenantry',
  },
  // 客户开发 业务部 业务管理员 business_admin
  {
    name: '客户开发',
    icon: 'barChart',
    path: 'customer-develop',
    access: 'is_business_admin',
  },
  // 项目审批 风控部门 project_audit_admin
  {
    path: '/project_approve',
    name: '项目审批',
    icon: 'clockCircle',
    access: 'is_project_audit_admin',
    component: './project/project-approve',
  },
  // 尽职调查 风控部门 project_audit_admin
  {
    path: '/due-diligence',
    name: '尽职调查',
    icon: 'fileSearch',
    component: './project/due-diligence',
    access: 'is_project_audit_admin',
  },
  {
    path: '/due-diligence/detail/:id',
    component: './project/due-diligence/detail',
    access: 'is_project_audit_admin',
  },
  {
    path: '/due-diligence/edit/:id',
    component: './project/due-diligence/edit',
    access: 'is_project_audit_admin',
  },
  // project_audit_admin 尽职调查 2 取名 风险评估
  {
    path: '/due-diligence-card',
    name: '风险评估',
    icon: 'lineChart',
    component: './project/due-diligence-card',
    access: 'is_project_audit_admin',
  },
  // project_audio_admin 设备管理 树形设备网格
  {
    path: '/equipment',
    name: '租赁设备',
    icon: 'cluster',
    component: './general/equipment',
    access: 'is_project_audit_admin',
  },
  // 合同签订 风控部门 project_audit_admin
  {
    path: 'contract-signing',
    name: '合同签订',
    icon: 'highlight',
  },
  // 已通过的项目 project_audit_admin
  {
    path: '/project_approved',
    name: '已审批通过的项目',
    icon: 'check',
    access: 'is_project_audit_admin',
    component: './project/project-approved',
  },
  // 客户端 融资租赁项目的最新信息、政策更新以及培训信息
  {
    path: '/news_feed',
    name: '前沿信息',
    icon: 'smile',
    component: './lessee/news_feed',
    access: 'is_newcomer',
  },
  //客户端 详情
  {
    path: '/news_feed/training-detail/:id', // Use :id as a parameter
    component: './lessee/news_feed/TrainingDetail',
    access: 'is_newcomer',
  },
  // 客户端 报价信息
  {
    path: 'quotation',
    name: '报价信息',
    icon: 'profile',
    component: './lessee/quotation',
    access: 'is_newcomer',
  },
  // 客户端 融资申请
  {
    path: 'financing_application',
    name: '融资申请',
    icon: 'profile',
    component: './lessee/financing_application',
    access: 'is_newcomer',
  },
  // 客户端 融资申请 2
  {
    path: 'financing_application2',
    name: '融资申请2',
    icon: 'profile',
    component: './lessee/financing_application/index2',
    access: 'is_newcomer',
  },
  // 客户端 进度查询
  {
    path: 'progress-of-application',
    name: '进度查询',
    icon: 'profile',
    component: './lessee/progress_of_application',
    access: 'is_newcomer',
  },
  // 超级管理员 部门员工
  {
    path: '/role',
    name: '部门员工',
    icon: 'profile',
    access: 'is_super_admin',
    routes: [
      {
        path: '/role',
        redirect: '/role/business_admin',
      },
      {
        path: '/role/business_admin',
        name: '业务管理员',
        icon: 'smile',
        access: 'is_super_admin',
        component: './role/business_admin',
      },
      {
        path: '/role/financial_manager',
        name: '财务管理员',
        icon: 'smile',
        access: 'is_super_admin',
        component: './role/financial_manager',
      },
      {
        path: '/role/financial_audit_admin',
        name: '财务审核员',
        icon: 'smile',
        access: 'is_super_admin',
        component: './role/financial_audit_admin',
      },
      {
        path: '/role/project_audit_admin',
        name: '风控管理员',
        icon: 'smile',
        access: 'is_super_admin',
        component: './role/project_audit_admin',
      },
    ],
  },
  // 超级管理员 供应商
  {
    // path: '/tenantry',
    path: '/supplier',
    name: '供应商',
    icon: 'smile',
    access: 'is_super_admin',
    component: './organization/supplier',
  },
  //租赁
  {
    path: '/lease',
    name: '租赁',
    icon: 'profile',
    access: 'is_business_admin',
    routes: [
      {
        path: '/lease/lease_item',
        name: '租赁物',
        icon: 'profile',
        access: 'super_admin_business_admin',
        component: './lease/lease_item',
      },
      {
        path: '/lease/mortgage_items',
        name: '租赁物抵押品信息',
        icon: 'profile',
        access: 'super_admin_business_admin',
        component: './lease/mortgage_items',
      },
    ],
  },
  //自带admin
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  //客户信息 organization
  {
    // path: '/organization',
    name: '客户信息',
    icon: 'profile',
    access: 'true',
    routes: [
      {
        path: '/organization',
        redirect: '/organization/tenantryDva',
      },
      {
        name: '承租客户',
        icon: 'smile',
        path: '/organization/tenantry',
        access: 'is_super_admin',
        component: './organization/tenantry',
      },
      {
        name: '承租客户Dva',
        icon: 'smile',
        path: '/organization/tenantryDva',
        component: './organization/tenantryDva',
      },
      {
        name: 'aspirantzhang_users',
        icon: 'smile',
        path: '/organization/aspirantzhang_users',
        component: './organization/aspirantzhang_users',
      },
      {
        name: 'tenantry03_dva_basicTable',
        icon: 'smile',
        path: '/organization/tenantry03_dva_basicTable',
        component: './organization/tenantry03_dva_basicTable',
      },
    ],
  },
  //welcome
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
  },
  //dashboard
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    access: 'true',
    routes: [
      {
        path: '/dashboard',
        // redirect: '/dashboard/seller02',
      },
      {
        name: 'analysis',
        icon: 'smile',
        path: '/dashboard/analysis',
        component: './dashboard/analysis',
      },
      {
        name: 'monitor',
        icon: 'smile',
        path: '/dashboard/monitor',
        component: './dashboard/monitor',
      },
      {
        name: 'workplace',
        icon: 'smile',
        path: '/dashboard/workplace',
        component: './dashboard/workplace',
      },
    ],
  },
  //form
  {
    path: '/form',
    icon: 'form',
    name: 'form',
    routes: [
      {
        path: '/form',
        redirect: '/form/basic-form',
      },
      {
        name: 'basic-form',
        icon: 'smile',
        path: '/form/basic-form',
        component: './form/basic-form',
      },
      {
        name: 'step-form',
        icon: 'smile',
        path: '/form/step-form',
        component: './form/step-form',
      },
      {
        name: 'advanced-form',
        icon: 'smile',
        path: '/form/advanced-form',
        component: './form/advanced-form',
      },
    ],
  },
  //list
  {
    path: '/list',
    icon: 'table',
    name: 'list',
    routes: [
      {
        path: '/list/search',
        name: 'search-list',
        component: './list/search',
        routes: [
          {
            path: '/list/search',
            redirect: '/list/search/articles',
          },
          {
            name: 'articles',
            icon: 'smile',
            path: '/list/search/articles',
            component: './list/search/articles',
            access: 'true',
          },
          {
            name: 'projects',
            icon: 'smile',
            path: '/list/search/projects',
            component: './list/search/projects',
          },
          {
            name: 'applications',
            icon: 'smile',
            path: '/list/search/applications',
            component: './list/search/applications',
          },
        ],
      },
      {
        path: '/list',
        redirect: '/list/table-list',
      },
      {
        name: 'table-list',
        icon: 'smile',
        path: '/list/table-list',
        component: './list/table-list',
      },
      {
        name: 'basic-list',
        icon: 'smile',
        path: '/list/basic-list',
        component: './list/basic-list',
      },
      {
        name: 'card-list',
        icon: 'smile',
        path: '/list/card-list',
        component: './list/card-list',
      },
    ],
  },
  //profile
  {
    path: '/profile',
    name: 'profile',
    icon: 'profile',
    routes: [
      {
        path: '/profile',
        redirect: '/profile/basic',
      },
      {
        name: 'basic',
        icon: 'smile',
        path: '/profile/basic',
        component: './profile/basic',
      },
      {
        name: 'advanced',
        icon: 'smile',
        path: '/profile/advanced',
        component: './profile/advanced',
      },
    ],
  },
  //result
  {
    name: 'result',
    icon: 'CheckCircleOutlined',
    path: '/result',
    routes: [
      {
        path: '/result',
        redirect: '/result/success',
      },
      {
        name: 'success',
        icon: 'smile',
        path: '/result/success',
        component: './result/success',
      },
      {
        name: 'fail',
        icon: 'smile',
        path: '/result/fail',
        component: './result/fail',
      },
    ],
  },
  //exception
  {
    name: 'exception',
    icon: 'warning',
    path: '/exception',
    routes: [
      {
        path: '/exception',
        redirect: '/exception/403',
      },
      {
        name: '403',
        icon: 'smile',
        path: '/exception/403',
        component: './exception/403',
      },
      {
        name: '404',
        icon: 'smile',
        path: '/exception/404',
        component: './exception/404',
      },
      {
        name: '500',
        icon: 'smile',
        path: '/exception/500',
        component: './exception/500',
      },
    ],
  },
  //editor
  {
    name: 'editor',
    icon: 'highlight',
    path: '/editor',
    routes: [
      {
        path: '/editor',
        redirect: '/editor/flow',
      },
      {
        name: 'flow',
        icon: 'smile',
        path: '/editor/flow',
        component: './editor/flow',
      },
      {
        name: 'mind',
        icon: 'smile',
        path: '/editor/mind',
        component: './editor/mind',
      },
      {
        name: 'koni',
        icon: 'smile',
        path: '/editor/koni',
        component: './editor/koni',
      },
    ],
  },
  //  '/'
  {
    path: '/',
    access: 'true',
    redirect: '/account/center',
  },
  {
    component: '404',
  },
];
