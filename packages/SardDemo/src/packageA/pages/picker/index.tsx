import Demo from '@/components/demo'
import Page from '@/components/page'

import ObjectOption from './demo/ObjectOption'
import Multiple from './demo/Multiple'
import ObjectMultiple from './demo/ObjectMultiple'
import Cascaded from './demo/Cascaded'
import Basic from './demo/Basic'
import Appointment from './demo/Appointment'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="对象类型">
        <ObjectOption />
      </Demo>

      <Demo title="多列">
        <Multiple />
      </Demo>

      <Demo title="对象类型多列">
        <ObjectMultiple />
      </Demo>

      <Demo title="级联选择">
        <Cascaded />
      </Demo>

      <Demo title="预约时间">
        <Appointment />
      </Demo>
    </Page>
  )
}
