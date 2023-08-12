import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Theme from './demo/Theme'
import Plain from './demo/Plain'
import Round from './demo/Round'
import Mark from './demo/Mark'
import Size from './demo/Size'
import Style from './demo/Style'
import Closable from './demo/Closable'

export default () => {
  return (
    <Page className="page-tag">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="主题色">
        <Theme />
      </Demo>

      <Demo title="镂空">
        <Plain />
      </Demo>

      <Demo title="圆角">
        <Round />
      </Demo>

      <Demo title="标记样式（半圆角）">
        <Mark />
      </Demo>

      <Demo title="尺寸">
        <Size />
      </Demo>

      <Demo title="自定义样式">
        <Style />
      </Demo>

      <Demo title="可关闭的">
        <Closable />
      </Demo>
    </Page>
  )
}
