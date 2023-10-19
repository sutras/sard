import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Item from './demo/Item'
import Flow from './demo/Flow'
import Content from './demo/Content'

export default () => {
  return (
    <Page style={{ paddingBottom: 300 }}>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="导航项" full>
        <Item />
      </Demo>

      <Demo title="流动导航" full>
        <Flow />
      </Demo>

      <Demo title="自定义内容" full>
        <Content />
      </Demo>
    </Page>
  )
}
