import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Icon from './demo/Icon'
import Color from './demo/Color'
import Badge from './demo/Badge'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="自定义图标" full>
        <Icon />
      </Demo>

      <Demo title="自定义颜色" full>
        <Color />
      </Demo>

      <Demo title="徽标" full>
        <Badge />
      </Demo>
    </Page>
  )
}
