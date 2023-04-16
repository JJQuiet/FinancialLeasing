export default [
  // {path: '/jlogin1',component:'./login',name:'jlogin1',icon:'smile'},
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
  {
    path: '/welcome',
    name: 'welcome',
    icon: 'smile',
    component: './Welcome',
    // access: 'ture',
  },
  {
    path: '/admin',
    name: 'admin',
    icon: 'crown',
    // access: 'ture',
    // access: 'isAdmin',
    component: './Admin',
    routes: [
      {
        path: '/admin/sub-page',
        name: 'sub-page',
        icon: 'smile',
        // access: 'ture',
        component: './Welcome',
      },
      {
        component: './404',
      },
    ],
  },
  {
    path: '/organization',
    name: '客户管理',
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
        access: 'isBusiness_admin',
        component: './organization/tenantry',
      },
      {
        name: '承租客户Dva',
        icon: 'smile',
        path: '/organization/tenantryDva',
        access: 'isBusiness_admin',
        component: './organization/tenantryDva',
      },
      {
        name: 'aspirantzhang_users',
        icon: 'smile',
        path: '/organization/aspirantzhang_users',
        access: 'isBusiness_admin',
        component: './organization/aspirantzhang_users',
      },
      {
        name: '承租客户02_Dva',
        icon: 'smile',
        path: '/organization/tenantry02_dva',
        access: 'isBusiness_admin',
        component: './organization/tenantry02_dva',
      },
      {
        name: 'tenantry03_dva_basicTable',
        icon: 'smile',
        path: '/organization/tenantry03_dva_basicTable',
        access: 'isBusiness_admin',
        component: './organization/tenantry03_dva_basicTable',
      },
      // {
      //   name: 'advanced',
      //   icon: 'smile',
      //   path: '/organization/advanced',
      //   component: './organization/advanced',
      // },
    ],
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    icon: 'dashboard',
    access: 'isBusiness_admin',
    routes: [
      {
        path: '/dashboard',
        redirect: '/dashboard/seller02',
      },
      { name: 'jlogin', path: '/dashboard/jlogin', component: './login' },
      {
        name: 'analysis',
        icon: 'smile',
        path: '/dashboard/analysis',
        component: './dashboard/analysis',
        access: 'isBusiness_admin',
      },
      {
        name: 'seller02',
        icon: 'smile',
        path: '/dashboard/seller02',
        component: './organization/seller02',
        access: 'isBusiness_admin',
      },
      {
        name: 'seller03',
        icon: 'smile',
        path: '/dashboard/seller03',
        component: './organization/seller03',
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
  {
    path: '/list',
    icon: 'table',
    name: 'list',
    access: 'true',
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
        access: 'true',
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
  {
    name: 'account',
    icon: 'user',
    path: '/account',
    access: 'canAccount',
    routes: [
      {
        path: '/account',
        redirect: '/account/center',
      },
      {
        name: 'center',
        icon: 'smile',
        path: '/account/center',
        component: './account/center',
        access: 'true',
      },
      {
        name: 'settings',
        icon: 'smile',
        path: '/account/settings',
        component: './account/settings',
        access: 'true',
      },
    ],
  },
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
  {
    path: '/',
    access: 'true',
    redirect: '/account/center',
  },
  {
    component: '404',
  },
];
