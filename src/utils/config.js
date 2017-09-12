const menu_type_1 = [
  {
    id: 1,
    name: 'Nav1',
    children: [
      {
        id: 11,
        name: 'subNav1',
        children: [
          {
            id: 111,
            name: 'option1',
          },
          {
            id: 112,
            name: 'option2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    name: 'Nav2',
    children: [
      {
        id: 21,
        name: 'subNav2',
        children: [
          {
            id: 211,
            name: 'option1',
          },
          {
            id: 212,
            name: 'option2',
          },
        ],
      },
    ],
  },
]
const APIV1 = 'http://10.9.35.41:3000/api/v1'
const APIV2 = '/api/v2'
const menu_type_2 = {
  flag: 1,
  menu: [
    {
      id: 1,
      pid:null,
      name: 'Nav1',
      route: '/nav1',
    },
    {
      id: 11,
      pid:1,
      name: 'SubNav1',
      route: '/nav1/subNav1',
    },
    {
      id: 12,
      pid:1,
      name: 'SubNav2',
      route: '/nav1/subNav2',
    },
    {
      id: 121,
      pid:12,
      name: 'option1',
      route: '/nav1/subNav2/option1',
    },
    {
      id: 2,
      pid:null,
      name: 'Nav2',
      route: '/nav2',
    },
    {
      id: 21,
      pid:2,
      name: 'SubNav2',
      route: '/nav2/SubNav2',
    },
    {
      id: 211,
      pid:21,
      name: 'option1',
      route: '/nav2/option1',
    },
    {
      id: 22,
      pid:2,
      name: 'SubNav2',
      route: '/nav2/subNav2',
    },
    {
      id: 221,
      pid:22,
      name: 'option1',
      route: '/nav2/option1',
    },
    {
      id: 3,
      pid:null,
      name: 'Nav3',
      route: '/nav3',
    },
    {
      id: 31,
      pid:3,
      name: 'sub3',
      route: '/sub3',
    },
  ],
}

module.exports = {
  menu_type_2,
  DEFAULT_PAGE_SIZE:10,
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },

}
