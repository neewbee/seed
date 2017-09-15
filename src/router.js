import React from 'react'
import { BrowserRouter, Switch, Route } from 'dva/router'
import App from './routes'

function RouterConfig ({ history, app }) {
  return (
    <BrowserRouter>
      <App app={app} />
    </BrowserRouter>
  )
}

export default RouterConfig
