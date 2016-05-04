import React from 'react'
import { render } from 'react-dom'
import { createStore , applyMiddleware, } from 'redux'
import { Provider } from 'react-redux'
import App from './app.jsx'
import todoApp from './../reducer/sth.js'

import ss from './../middleware/settimeout.js'
import Logger from './../middleware/logger.js'

// 创建store
let createStoreWithMiddleware = applyMiddleware(ss,Logger)(createStore)
let store = createStoreWithMiddleware(todoApp);

let rootElement = document.getElementById('app')
render(
  <Provider store={store}>
    <App />
  </Provider>,
  rootElement
)
