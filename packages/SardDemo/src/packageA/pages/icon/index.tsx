import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Size from './demo/Size'
import Color from './demo/Color'
import Picture from './demo/Picture'
import Inbuilt from './demo/Inbuilt'
import Custom from './demo/Custom'

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

      <Demo title="自定义图标">
        <Custom />
      </Demo>

      <Demo title="内置图标">
        <Inbuilt />
      </Demo>
    </Page>
  )
}
