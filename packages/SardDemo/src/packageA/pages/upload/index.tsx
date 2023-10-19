import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Video from './demo/Video'
import MaxCount from './demo/MaxCount'
import Multiple from './demo/Multiple'
import BeforeRead from './demo/BeforeRead'
import Size from './demo/Size'
import Status from './demo/Status'
import DisabledReadOnly from './demo/DisabledReadOnly'
import CustomSelect from './demo/CustomSelect'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="上传视频">
        <Video />
      </Demo>

      <Demo title="限定上传数量">
        <MaxCount />
      </Demo>

      <Demo title="多选">
        <Multiple />
      </Demo>

      <Demo title="上传前置处理">
        <BeforeRead />
      </Demo>

      <Demo title="限定上传大小">
        <Size />
      </Demo>

      <Demo title="上传状态">
        <Status />
      </Demo>

      <Demo title="只读和禁用">
        <DisabledReadOnly />
      </Demo>

      <Demo title="自定义选区样式">
        <CustomSelect />
      </Demo>
    </Page>
  )
}
