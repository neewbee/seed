import React from 'react'
import { Link, Switch, Route } from 'dva/router'
import { Layout, Menu, Icon ,Dropdown, Avatar } from 'antd'
import PropTypes from 'prop-types'

import styles from './index.less'
import sub1 from './Sub1'
import option1 from './Sub2/option1'
import NoMatch from '../NoMatch'
import { menu_type_2, footerText } from '../../utils/config'
import { getRoutesByKeyValue, listToTree, getPidsAndIdByRoute, getNavMenu } from '../../utils/utilities'

const { Header, Sider, Footer } = Layout



const tree = listToTree(menu_type_2.menu).filter(_=>_.pid === 1)

// 没有权限的路由定向到404页面
const AuthRoute = ({ component: Component, path, ...rest }) => {
  const route = getRoutesByKeyValue('route', path, menu_type_2)
  if (!route) {
    return <Route {...rest} render={() => <NoMatch />} />
  } else {
    return <Route {...rest} render={props => <Component {...props} />} />
  }
}

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

const menus = getNavMenu(menu_type_2)

const getMenus = tree => {
  return tree.map(item => {
    if ( item.children.length !== 0) {
      return (
        <Menu.SubMenu
          key={item.id}
          title={
            <span>
              {item.icon && <Icon type={item.icon} />}
              {item.name}
            </span>
          }
        >
          {getMenus(item.children)}
        </Menu.SubMenu>
      )
    }
    return (
      <Menu.Item key={item.id}>
        <Link to={item.route}>
          {item.icon && <Icon type={item.icon} />}
          {item.name}
        </Link>
      </Menu.Item>
    )
  })
}

const Nav1 = ({ location }) => {
  const [firstURLSegment] = location.pathname
    .split('/')
    .filter(i => i)
    .map(route => `/${route}`)
  const prefix = firstURLSegment

  const { pids, id } = getPidsAndIdByRoute(location.pathname, menu_type_2)
  const { id:navId } = getPidsAndIdByRoute(firstURLSegment, menu_type_2)
  let openKeys=-1, selectedKeys
  // 去掉一位一级路由id
  pids.pop()

  // 没有父路由id 说明当前节点本身是一个菜单子选项 否则为一个子菜单
  if (pids.length !== 0 ) {
    openKeys = pids
  }
  selectedKeys =  [String(id)]


  const menu = (
    <Menu>
      <Menu.Item>
        <a target="_blank" rel="noopener noreferrer" onClick={() => {}}>注销</a>
      </Menu.Item>
    </Menu>
  )

  return (
    <Layout style={{ height: '100vh' }}>
      <Header className={styles.header}>
        <div className={styles.logo} />
        <div>
          <Menu
            theme="dark"
            mode="horizontal"
            style={{ lineHeight: '64px' }}
            selectedKeys={[String(navId)]}
          >
            {getNavItems(menus)}
          </Menu>
        </div>
        <Dropdown overlay={menu} placement="bottomCenter">
          <div className={styles.avatar}>
            <Avatar icon="user" />
            <span className={styles.name}>刘伟</span>
          </div>
        </Dropdown>
      </Header>
      <Layout>
        <Sider width={200} style={{ background: '#fff' }}>
          <Menu
            mode="inline"
            openkeys={openKeys}
            selectedKeys={selectedKeys}
            style={{ height: '100%', borderRight: 0 }}
          >
            {getMenus(tree)}
          </Menu>
        </Sider>
        <Switch>
          <AuthRoute path={`${prefix}/subNav1`} component={sub1} />
          <AuthRoute path={`${prefix}/subNav2/option1`} component={option1} />
        </Switch>
      </Layout>
      <Footer style={{ textAlign: 'center' }}>
        {footerText}
      </Footer>
    </Layout>

  )
}


Nav1.propTypes = {
  location: PropTypes.object,
}
AuthRoute.propTypes = {
  component:PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.element,
  ]),
  path:PropTypes.string,
}

export default Nav1
