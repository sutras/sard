import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Linkable from './demo/Linkable'
import Icon from './demo/Icon'
import InsetIcon from './demo/InsetIcon'
import Slot from './demo/Slot'
import ListSlot from './demo/ListSlot'
import Card from './demo/Card'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="可链接的" full>
        <Linkable />
      </Demo>

      <Demo title="图标" full>
        <Icon />
      </Demo>

      <Demo title="内嵌的图标" full>
        <InsetIcon />
      </Demo>

      <Demo title="自定义内容" full>
        <Slot />
      </Demo>

      <Demo title="分组" full>
        <ListSlot />
      </Demo>

      <Demo title="卡片风格">
        <Card />
      </Demo>
    </Page>
  )
}
