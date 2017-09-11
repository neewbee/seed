import React from 'react'
import { Menu, Icon } from 'antd'
import { Link } from 'dva/router'

function Header ({ location }) {
  return (
    <Menu
      selectedKeys={[location.pathname]}
      mode="horizontal"
      theme="dark"
    >
      <Menu.Item key="/users">
        <Link to="/users"><Icon type="bars" />Users</Link>
      </Menu.Item>
      <Menu.Item key="/">
        <Link to="/"><Icon type="home" />Home</Link>
      </Menu.Item>
      <Menu.Item key="/404">
        <Link to="/page-you-dont-know"><Icon type="frown-circle" />404</Link>
      </Menu.Item>
      <Menu.Item key="/antd">
        <a href="https://github.com/dvajs/dva">dva</a>
      </Menu.Item>
      <Menu.Item key="/layout1">
        <Link to="/layout1"><Icon type="home" />layout1</Link>
      </Menu.Item>
      <Menu.Item key="/layout2">
        <Link to="/layout2"><Icon type="home" />layout2</Link>
      </Menu.Item>
      <Menu.Item key="/layout3">
        <Link to="/layout3"><Icon type="home" />layout3</Link>
      </Menu.Item>
    </Menu>
  )
}

export default Header
