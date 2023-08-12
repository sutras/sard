import Demo from '@/components/demo'
import Page from '@/components/page'

import './index.scss'

import Basic from './demo/Basic'
import Controllable from './demo/Controllable'
import Ellipsis from './demo/Ellipsis'
import Simple from './demo/Simple'
import Custom from './demo/Custom'

export default () => {
  return (
    <Page className="page-pagination">
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="受控的">
        <Controllable />
      </Demo>

      <Demo title="显示省略号">
        <Ellipsis />
      </Demo>

      <Demo title="简单分页">
        <Simple />
      </Demo>

      <Demo title="自定义">
        <Custom />
      </Demo>
    </Page>
  )
}
