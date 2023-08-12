import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Size from './demo/Size'
import Color from './demo/Color'
import Picture from './demo/Picture'
import Inbuilt from './demo/Inbuilt'

// function matchIconName(str: string) {
//   return JSON.stringify(str.match(/(?<=\.sari-)[a-z\-]+/g))
// }

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="尺寸">
        <Size />
      </Demo>

      <Demo title="颜色">
        <Color />
      </Demo>

      <Demo title="图片类型图标">
        <Picture />
      </Demo>

      <Demo title="内置图标">
        <Inbuilt />
      </Demo>
    </Page>
  )
}
