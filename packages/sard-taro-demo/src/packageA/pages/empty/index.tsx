import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Description from './demo/Description'
import Size from './demo/Size'
import Picture from './demo/Picture'
import Extra from './demo/Extra'

export default () => {
  return (
    <Page className="page-template">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="自定义描述信息">
        <Description />
      </Demo>

      <Demo title="自定义图标大小">
        <Size />
      </Demo>

      <Demo title="图片类型图标">
        <Picture />
      </Demo>

      <Demo title="额外内容">
        <Extra />
      </Demo>
    </Page>
  )
}
