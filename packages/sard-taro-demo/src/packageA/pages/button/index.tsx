import Page from '@/components/page'
import Demo from '@/components/demo'

import Type from './demo/Type'
import Theme from './demo/Theme'
import CustomTheme from './demo/CustomTheme'
import Round from './demo/Round'
import Disabled from './demo/Disabled'
import Block from './demo/Block'
import Size from './demo/Size'
import Loading from './demo/Loading'

export default () => {
  return (
    <Page className="page-button">
      <Demo title="按钮类型">
        <Type />
      </Demo>

      <Demo title="按钮主题色">
        <Theme />
      </Demo>

      <Demo title="自定义颜色">
        <CustomTheme />
      </Demo>

      <Demo title="圆形按钮">
        <Round />
      </Demo>

      <Demo title="禁用按钮">
        <Disabled />
      </Demo>

      <Demo title="块级按钮">
        <Block />
      </Demo>

      <Demo title="按钮尺寸">
        <Size />
      </Demo>

      <Demo title="加载中">
        <Loading />
      </Demo>
    </Page>
  )
}
