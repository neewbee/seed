import React from 'react'
import { Layout, Breadcrumb, Content } from 'antd'

const Sub1 = () =>
  <Layout style={{ padding: '0 24px 24px' }}>
    <Breadcrumb style={{ margin: '12px 0' }}>
      <Breadcrumb.Item>Home</Breadcrumb.Item>
      <Breadcrumb.Item>List</Breadcrumb.Item>
      <Breadcrumb.Item>App</Breadcrumb.Item>
    </Breadcrumb>
    <Content
      style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}
    >
      Content
    </Content>
  </Layout>

export default Sub1
