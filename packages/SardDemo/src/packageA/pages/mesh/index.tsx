import Demo from '@/components/demo'
import Page from '@/components/page'
import Basic from './demo/Basic'
import Border from './demo/Border'
import Columns from './demo/Columns'
import Square from './demo/Square'
import Gap from './demo/Gap'
import Horizontal from './demo/Horizontal'
import Reverse from './demo/Reverse'
import Clickable from './demo/Clickable'
import Custom from './demo/Custom'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="隐藏边框">
        <Border />
      </Demo>

      <Demo title="自定义列数">
        <Columns />
      </Demo>

      <Demo title="正方形格子">
        <Square />
      </Demo>

      <Demo title="格子间距">
        <Gap />
      </Demo>

      <Demo title="内容横排">
        <Horizontal />
      </Demo>

      <Demo title="内容翻转">
        <Reverse />
      </Demo>

      <Demo title="可点击的">
        <Clickable />
      </Demo>

      <Demo title="自定义内容">
        <Custom />
      </Demo>
    </Page>
  )
}
