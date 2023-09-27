import Demo from '@/components/demo'
import Page from '@/components/page'

import ObjectOption from './demo/ObjectOption'
import Multiple from './demo/Multiple'
import ObjectMultiple from './demo/ObjectMultiple'
import Cascaded from './demo/Cascaded'
import Basic from './demo/Basic'
import Alone from './demo/Alone'
import Appointment from './demo/Appointment'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="对象类型" full>
        <ObjectOption />
      </Demo>

      <Demo title="多列" full>
        <Multiple />
      </Demo>

      <Demo title="对象类型多列" full>
        <ObjectMultiple />
      </Demo>

      <Demo title="级联选择" full>
        <Cascaded />
      </Demo>

      <Demo title="预约时间" full>
        <Appointment />
      </Demo>

      <Demo title="单独使用" full>
        <Alone />
      </Demo>
    </Page>
  )
}
