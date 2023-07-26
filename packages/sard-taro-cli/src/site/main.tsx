import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'

import 'bootstrap-icons/font/bootstrap-icons.css'
import 'prism-themes/themes/prism-one-dark.css'
import './index.scss'
import './custom.scss'

import ThemeProvider from './ThemeProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider>{() => <App />}</ThemeProvider>
  </React.StrictMode>,
)
