import React from 'react'
import { BrowserRouter} from 'dva/router'
import PropTypes from 'prop-types'
import App from './routes'

function RouterConfig ({ app }) {
  return (
    <BrowserRouter>
      <App app={app} />
    </BrowserRouter>
  )
}

RouterConfig.propTypes = {
  app: PropTypes.object,
}


export default RouterConfig
