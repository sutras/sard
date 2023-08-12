import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Thickness from './demo/Thickness'
import Color from './demo/Color'
import Striped from './demo/Striped'
import Slot from './demo/Slot'

export default () => {
  return (
    <Page className="page-progress-bar">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="粗细">
        <Thickness />
      </Demo>

      <Demo title="颜色">
        <Color />
      </Demo>

      <Demo title="条纹进度条">
        <Striped />
      </Demo>

      <Demo title="插槽">
        <Slot />
      </Demo>
    </Page>
  )
}
