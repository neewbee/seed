import React from 'react'
import { connect } from 'dva'
import { Route, Link, Redirect, withRouter, Switch } from 'dva/router'
import dynamic from 'dva/dynamic'
import { Layout, Menu } from 'antd'

import '../themes/index.less'
import './index.less'

import NoMatch from './NoMatch'
import config from '../utils/config'
import { getNavMenu, getRoutesByKeyValue } from '../utils/utilities'

import Nav1 from '../routes/Nav1'
import Nav2 from '../routes/Nav2'
import Nav3 from '../routes/Nav3'

const { Header, Footer } = Layout
const { menu_type_2 } = config
const menus = getNavMenu(menu_type_2)

// 获取一级路由
const getNavItems = menus => {
  return menus.map(({ name, route, id }) => {
    return (
      <Menu.Item key={id}>
        <Link to={route}>{name}</Link>
      </Menu.Item>
    )
  })
}

// 没有权限的路由定向到404页面
const AuthRoute = ({ component: Component, path, ...rest }) => {
  const route = getRoutesByKeyValue('route', path, menu_type_2)
  if (!route) {
    return <Route {...rest} render={props => <NoMatch />} />
  } else {
    return <Route {...rest} render={props => <Component {...props} />} />
  }
}

const App = withRouter(({ location, app }) => {
  // 动态加载组件
  // const Nav1 = dynamic({
  //   app,
  //   component: () => import('./Nav1'),
  // })
  //
  // const Nav2 = dynamic({
  //   app,
  //   component: () => import('./Nav2'),
  // })
  //
  // const Nav3 = dynamic({
  //   app,
  //   component: () => import('./Nav3'),
  // })

  let id = -1
  const [firstURLSegment] = location.pathname
    .split('/')
    .filter(i => i)
    .map(route => `/${route}`)
  const route = getRoutesByKeyValue('route', firstURLSegment, menu_type_2)

  if (route.length !== 0) {
    id = route[0].id
  }
  return (
    <Layout style={{ height: '100vh' }}>
      <Header className="header">
        <div className="logo" />
        <Menu
          theme="dark"
          mode="horizontal"
          style={{ lineHeight: '64px' }}
          selectedKeys={[String(id)]}
        >
          {getNavItems(menus)}
        </Menu>
      </Header>
      <Route
        exact
        path="/"
        render={props => {
          return (
            <Redirect
              to={{
                pathname: '/nav1',
                state: { from: props.location },
              }}
            />
          )
        }}
      />
      <Switch>
        <AuthRoute path="/nav1" component={Nav1} />
        <AuthRoute path="/nav2" component={Nav2} />
        <AuthRoute path="/nav3" component={Nav3} />
        <Route component={NoMatch} />
      </Switch>
      <Footer style={{ textAlign: 'center' }}>
        ZTO ©2016 Created by liuwei
      </Footer>
    </Layout>
  )
})

export default App
