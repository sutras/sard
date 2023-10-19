import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import SearchButton from './demo/SearchButton'
import CancelButton from './demo/CancelButton'
import Shape from './demo/Shape'
import Align from './demo/Align'
import Background from './demo/Background'
import DisabledReadOnly from './demo/DisabledReadOnly'
import Slot from './demo/Slot'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="搜索按钮" full>
        <SearchButton />
      </Demo>

      <Demo title="取消按钮" full>
        <CancelButton />
      </Demo>

      <Demo title="形状" full>
        <Shape />
      </Demo>

      <Demo title="对齐" full>
        <Align />
      </Demo>

      <Demo title="背景色" full>
        <Background />
      </Demo>

      <Demo title="只读和禁用" full>
        <DisabledReadOnly />
      </Demo>

      <Demo title="插槽" full>
        <Slot />
      </Demo>
    </Page>
  )
}
