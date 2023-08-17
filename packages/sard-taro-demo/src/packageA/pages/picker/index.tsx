import Demo from '@/components/demo'
import Page from '@/components/page'
import { Toast } from 'sard-taro'

import General from './demo/General'
import ObjectOption from './demo/ObjectOption'
import Multiple from './demo/Multiple'
import ObjectMultiple from './demo/ObjectMultiple'
import Cascaded from './demo/Cascaded'
import WithPopout from './demo/WithPopout'

export default () => {
  return (
    <Page className="page-Picker">
      <Toast.Agent />

      <Demo title="普通选择器" full>
        <General />
      </Demo>

      <Demo title="配合弹出框" full>
        <WithPopout />
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
    </Page>
  )
}
