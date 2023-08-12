import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Icon from './demo/Icon'
import Color from './demo/Color'
import Fixed from './demo/Fixed'
import Badge from './demo/Badge'

export default () => {
  return (
    <Page className="page-tabbar">
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="自定义图标" full>
        <Icon />
      </Demo>

      <Demo title="自定义颜色" full>
        <Color />
      </Demo>

      <Demo title="固定定位" full>
        <Fixed />
      </Demo>

      <Demo title="徽标" full>
        <Badge />
      </Demo>
    </Page>
  )
}
