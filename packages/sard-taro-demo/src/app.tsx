import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import {
  ActionSheet,
  ConfigProvider,
  Dialog,
  Icon,
  Notify,
  Toast,
} from 'sard-taro'
// import enUS from 'sard-taro/dist/locale/lang/en-US'
import zhCN from 'sard-taro/dist/locale/lang/zh-CN'
import './ganged'
import './app.scss'

const currentLang = zhCN

// Taro.options.debug = true

if (process.env.TARO_ENV === 'rn') {
  Icon.loadFont({
    'demo-icons': {
      glyphs: Icon.parseGlyphs(require('./assets/fonts/iconfont.json')),
      font: require('./assets/fonts/iconfont.ttf'),
    },
  })
}

function App({ children }: PropsWithChildren) {
  useLaunch(() => {
    console.log('App launched.')
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
      {process.env.TARO_ENV === 'rn' && (
        <>
          <Toast.Agent />
          <Notify.Agent />
          <Dialog.Agent />
          <ActionSheet.Agent />
        </>
      )}
    </ConfigProvider>
  )
}

export default App
