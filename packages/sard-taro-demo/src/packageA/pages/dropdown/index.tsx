import Demo from '@/components/demo'
import Page from '@/components/page'

import './index.scss'

import Basic from './demo/Basic'
import Placeholder from './demo/Placeholder'
import Label from './demo/Label'
import Direction from './demo/Direction'
import Disabled from './demo/Disabled'
import Arrow from './demo/Arrow'
import Content from './demo/Content'

export default () => {
  return (
    <Page className="page-dropdown">
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="占位符" full>
        <Placeholder />
      </Demo>

      <Demo title="添加 label" full>
        <Label />
      </Demo>

      <Demo title="向上展开" full>
        <Direction />
      </Demo>

      <Demo title="禁用" full>
        <Disabled />
      </Demo>

      <Demo title="自定义箭头" full>
        <Arrow />
      </Demo>

      <Demo title="自定义内容" full>
        <Content />
      </Demo>
    </Page>
  )
}
