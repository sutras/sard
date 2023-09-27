import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Underline from './demo/Underline'
import PlainText from './demo/PlainText'
import WithNumberKeyboard from './demo/WithNumberKeyboard'
import Gap from './demo/Gap'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="下划线类型">
        <Underline />
      </Demo>

      <Demo title="间距">
        <Gap />
      </Demo>

      <Demo title="明文显示">
        <PlainText />
      </Demo>

      <Demo title="使用自定义键盘" full>
        <WithNumberKeyboard />
      </Demo>
    </Page>
  )
}
