import React from 'react'
import { Route, Redirect, Switch } from 'dva/router'
import PropTypes from 'prop-types'
import '../themes/index.less'
import './index.less'
import dynamic from 'dva/dynamic'

import NoMatch from './NoMatch'
import config from '../utils/config'
import { getRoutesByKeyValue } from '../utils/utilities'

import Nav1 from '../routes/Nav1'
// import Nav2 from '../routes/Nav2'
import Nav3 from '../routes/Nav3'


const { menu_type_2 } = config


// 没有权限的路由定向到404页面
const AuthRoute = ({ component: Component, path, ...rest }) => {
  const route = getRoutesByKeyValue('route', path, menu_type_2)
  if (!route) {
    return <Route {...rest} render={() => <NoMatch />} />
  } else {
    return <Route {...rest} render={props => <Component {...props} />} />
  }
}

const App = ({ app }) => {
  // 动态加载组件
  // const Nav1 = dynamic({
  //   app,
  //   component: () => import('./Nav1'),
  // })

  const Nav2 = dynamic({
    app,
    component: () => import('./Nav2'),
  })

  // const Nav3 = dynamic({
  //   app,
  //   component: () => import('./Nav3'),
  // })

  return (
    <Switch>
      <Route exact path="/"
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
      <AuthRoute path="/nav1" component={Nav1} />
      <AuthRoute path="/nav2" component={Nav2} />
      <AuthRoute path="/nav3" component={Nav3} />
      <Route component={NoMatch} />
    </Switch>
  )
}

AuthRoute.propTypes = {
  component:PropTypes.element,
  path:PropTypes.string,
}

App.propTypes = {
  app:PropTypes.object,
  location:PropTypes.string,
}


export default App
