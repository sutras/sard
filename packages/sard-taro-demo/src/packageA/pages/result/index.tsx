import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Extra from './demo/Extra'
import Icon from './demo/Icon'

export default () => {
  return (
    <Page className="page-result">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="额外内容">
        <Extra />
      </Demo>

      <Demo title="自定义图标">
        <Icon />
      </Demo>
    </Page>
  )
}
