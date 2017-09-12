import React from 'react'
import { connect } from 'dva'
import { Link, Switch, Route, withRouter, routerRedux } from 'dva/router'
import { Layout, Menu, Breadcrumb, Icon, Row, Col, Button, Popconfirm } from 'antd'

import queryString from 'query-string'
import qs from 'qs'

import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const { Content } = Layout

const breadcrumbNameMap = {
  '/nav1': 'nav1',
  '/nav1/subNav1': 'subNav1',
}

const Sub1 = ({ location, dispatch, sub1, loading, ...rest }) => {

  const { list, pagination, currentItem, modalVisible, modalType, isMotion, selectedRowKeys } = sub1
  const { pageSize } = pagination
  const modalProps = {
    location,
    item: modalType === 'create' ? {} : currentItem,
    visible: modalVisible,
    maskClosable: false,
    // confirmLoading: loading.effects['user/update'],
    confirmLoading: false,
    title: `${modalType === 'create' ? 'Create User' : 'Update User'}`,
    wrapClassName: 'vertical-center-modal',
    onOk ({formData, search}) {
      dispatch({
        type: `sub1/${modalType}`,
        formData,
        search,
      })
    },
    onCancel () {
      dispatch({
        type: 'sub1/hideModal',
      })
    },
  }

  const listProps = {
    dataSource: list,
    // loading: loading.effects['user/query'],
    pagination,
    location,
    isMotion,
    onChange (page) {
      const { query, pathname } = location
      dispatch(routerRedux.push({
        pathname,
        search: qs.stringify({
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        }),
      }))
    },
    onDeleteItem (id) {
      dispatch({
        type: 'sub1/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'sub1/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
    rowSelection: {
      selectedRowKeys,
      onChange: (keys) => {
        dispatch({
          type: 'sub1/updateState',
          payload: {
            selectedRowKeys: keys,
          },
        })
      },
    },
  }

  const filterProps = {
    isMotion,
    filter: {
      ...location.query,
    },
    onFilterChange (value) {
      console.log("qs.stringify", qs.stringify({
        ...value,
        page: 1,
        pageSize,
      }))
      dispatch(routerRedux.push({
        pathname: location.pathname,
        search: qs.stringify({
          ...value,
          page: 1,
          pageSize,
        }),
      }))
    },
    onSearch (fieldsValue) {
      fieldsValue.keyword.length ? dispatch(routerRedux.push({
        pathname: '/nav1/subNav1',
        search: qs.stringify({
          field: fieldsValue.field,
          keyword: fieldsValue.keyword,
        }),
      })) : dispatch(routerRedux.push({
        pathname: '/nav1/subNav1',
      }))
    },
    onAdd () {
      dispatch({
        type: 'sub1/showModal',
        payload: {
          modalType: 'create',
        },
      })
    },
    switchIsMotion () {
      dispatch({ type: 'sub1/switchIsMotion' })
    },
  }

  const handleDeleteItems = () => {
    dispatch({
      type: 'user/multiDelete',
      payload: {
        ids: selectedRowKeys,
      },
    })
  }

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
    <Layout style={{ padding: '0 24px' }}>
      <Breadcrumb style={{ margin: '12px 0' }}>
        {breadcrumbItems}
      </Breadcrumb>
      <Content
        style={{ background: '#fff', padding: 24, margin: 0 }}
      >
        <Filter {...filterProps} />
        {
          selectedRowKeys.length > 0 &&
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm title={'Are you sure delete these items?'} placement="left" onConfirm={handleDeleteItems}>
                <Button type="primary" size="large" style={{ marginLeft: 8 }}>Remove</Button>
              </Popconfirm>
            </Col>
          </Row>
        }
        <List {...listProps} />
        {modalVisible && <Modal {...modalProps} />}
      </Content>
    </Layout>
  )
}

export default withRouter(connect(({ sub1, loading, ...rest }) => {
  return ({ sub1, loading })
})(Sub1))
