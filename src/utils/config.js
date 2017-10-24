const APIV1 = 'http://localhost:3000/api/v1'
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
      name: 'Layout2',
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
      name: 'Layout3',
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
  footerText: '2016 Created by liuwei',
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
