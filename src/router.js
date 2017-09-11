import React from 'react'
import { BrowserRouter, Switch, Route } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from './routes'

// import layout1 from './routes/Layout1';
// import layout2 from './routes/Layout2';
// import layout3 from './routes/Layout3';

function RouterConfig ({ history, app }) {
  const IndexPage = dynamic({
    app,
    component: () => import('./routes/IndexPage'),
  })

  const layout1 = dynamic({
    app,
    component: () => import('./routes/Layout1'),
  })

  const layout2 = dynamic({
    app,
    component: () => import('./routes/Layout2'),
  })

  const layout3 = dynamic({
    app,
    component: () => import('./routes/Layout3'),
  })

  return (
    <BrowserRouter>
      <App app={app} />
    </BrowserRouter>
  )
}

export default RouterConfig
