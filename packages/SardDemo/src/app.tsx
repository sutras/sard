import { PropsWithChildren } from 'react'
import { useLaunch } from '@tarojs/taro'
import { ActionSheet, ConfigProvider, Dialog, Icon, Notify, Toast } from 'sard'
import StatusBar from './components/status-bar'
import './ganged'
import './app.scss'

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
      lang="zh-CN"
      bem={
        {
          // namespace: 'custom',
          // modifierSeparator: '--',
        }
      }
    >
      <StatusBar
        backgroundColor="transparent"
        translucent
        barStyle="dark-content"
      />
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
