import Demo from '@/components/demo'
import Page from '@/components/page'
import { Stepper } from 'sard-taro'

import './index.scss'
import { useState } from 'react'

export default () => {
  const [count, setCount] = useState<number | string>()

  return (
    <Page className="page-stepper">
      <Demo title="基础使用">
        <Stepper placeholder="数量" />
      </Demo>

      <Demo title="受控">
        <Stepper placeholder="数量" value={count} onChange={setCount} />
      </Demo>

      <Demo title="最大最小值">
        <Stepper placeholder="数量" min={0} max={5} />
      </Demo>

      <Demo title="步长">
        <Stepper placeholder="数量" step={5} />
      </Demo>

      <Demo title="精度">
        <Stepper placeholder="数量" precision={2} />
      </Demo>

      <Demo title="禁用">
        <Stepper placeholder="数量" defaultValue={5} disabled />
      </Demo>

      <Demo title="只读">
        <Stepper placeholder="数量" defaultValue={5} readOnly />
      </Demo>
    </Page>
  )
}
