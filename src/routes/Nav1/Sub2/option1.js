import React from 'react'
import { Link, withRouter } from 'dva/router'
import { Layout, Breadcrumb } from 'antd'

const { Content } = Layout

const breadcrumbNameMap = {
  '/nav1': 'nav1',
  '/nav1/subNav2': 'subNav2',
  '/nav1/subNav2/option1': 'option1',
}

const Option1 = withRouter(props => {

  const { location } = props
  const pathSnippets = location.pathname.split('/').filter(i => i)
  const extraBreadcrumbItems = pathSnippets.map((_, index) => {
    const url = `/${pathSnippets.slice(0, index + 1).join('/')}`

    return (
      <Breadcrumb.Item key={url}>
        <Link to={url}>
          {breadcrumbNameMap[url]}
        </Link>
      </Breadcrumb.Item>
    )
  })

  const breadcrumbItems = [
    <Breadcrumb.Item key="home">
      <Link to="/">Home</Link>
    </Breadcrumb.Item>,
  ].concat(extraBreadcrumbItems)

  return (
    <Layout style={{ padding: '0 24px 24px' }}>
      <Breadcrumb style={{ margin: '12px 0' }}>
        {breadcrumbItems}
      </Breadcrumb>
      <Content
        style={{ background: '#fff', padding: 24, margin: 0, minHeight: 280 }}
      >
        sub2
      </Content>
    </Layout>
  )
})

export default Option1
