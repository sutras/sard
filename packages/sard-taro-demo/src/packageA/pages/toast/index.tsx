import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Icon from './demo/Icon'
import Placement from './demo/Placement'
import Mask from './demo/Mask'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="自定义图标" full>
        <Icon />
      </Demo>

      <Demo title="自定义位置" full>
        <Placement />
      </Demo>

      <Demo title="加载中的背景" full>
        <Mask />
      </Demo>
    </Page>
  )
}
