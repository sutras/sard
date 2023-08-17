import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { ConfigProvider } from 'sard-taro'
// import enUS from 'sard-taro/src/locale/lang/en-US'
import zhCN from 'sard-taro/src/locale/lang/zh-CN'
import './app.scss'

import { ganged } from './ganged'

const currentLang = zhCN

if (process.env.TARO_ENV === 'h5') {
  ganged()
}

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    // console.log('App launched.')
  })

  return <ConfigProvider lang={currentLang}>{children}</ConfigProvider>
}

export default App
