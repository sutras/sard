import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { ConfigProvider } from 'sard-taro'
// import enUS from 'sard-taro/dist/locale/lang/en-US'
import zhCN from 'sard-taro/dist/locale/lang/zh-CN'
import './app.scss'

import { ganged } from './ganged'

// Taro.options.debug = true

const currentLang = zhCN

if (process.env.TARO_ENV === 'h5') {
  ganged()
}

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    // console.log('App launched.')
  })

  return (
    <ConfigProvider
      lang={currentLang}
      bem={
        {
          // namespace: 'custom',
          // modifierSeparator: '--',
        }
      }
    >
      {children}
    </ConfigProvider>
  )
}

export default App
