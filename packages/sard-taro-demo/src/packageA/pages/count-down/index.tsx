import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Format from './demo/Format'
import Interval from './demo/Interval'
import Style from './demo/Style'
import Control from './demo/Control'
import Captcha from './demo/Captcha'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="自定义格式">
        <Format />
      </Demo>

      <Demo title="毫秒级别的渲染">
        <Interval />
      </Demo>

      <Demo title="自定义样式">
        <Style />
      </Demo>

      <Demo title="手动控制">
        <Control />
      </Demo>

      <Demo title="验证码倒计时">
        <Captcha />
      </Demo>
    </Page>
  )
}
