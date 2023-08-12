import Demo from '@/components/demo'
import Page from '@/components/page'

import './index.scss'

import Basic from './demo/Basic'
import Item from './demo/Item'
import Flow from './demo/Flow'
import Content from './demo/Content'
import Fixed from './demo/Fixed'

export default () => {
  return (
    <Page className="page-navbar">
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="导航项" full>
        <Item />
      </Demo>

      <Demo title="流动导航" full>
        <Flow />
      </Demo>

      <Demo title="自定义 content" full>
        <Content />
      </Demo>

      <Demo title="固定在顶部" full>
        <Fixed />
      </Demo>
    </Page>
  )
}
