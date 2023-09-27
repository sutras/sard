import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import NoAgent from './demo/NoAgent'
import AsyncClose from './demo/AsyncClose'
import Round from './demo/Round'
import Headed from './demo/Headed'
import Content from './demo/Content'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="不使用代理" full>
        <NoAgent />
      </Demo>

      <Demo title="异步关闭" full>
        <AsyncClose />
      </Demo>

      <Demo title="圆角按钮" full>
        <Round />
      </Demo>

      <Demo title="有头部的" full>
        <Headed />
      </Demo>

      <Demo title="自定义内容" full>
        <Content />
      </Demo>
    </Page>
  )
}
