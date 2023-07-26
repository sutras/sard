import { useState } from 'react'
import Demo from '@/components/demo'
import Page from '@/components/page'
import { ProgressCircle, Stepper } from 'sard-taro'

import './index.scss'

export default () => {
  const [percent, setPercent] = useState(50)

  return (
    <Page className="page-progress-circle">
      <Demo title="基础使用">
        <Stepper
          value={percent}
          max={100}
          min={0}
          onChange={(value) => setPercent(Number(value))}
          style={{ marginBottom: 10 }}
        ></Stepper>

        <ProgressCircle percent={percent}>{percent}%</ProgressCircle>
      </Demo>

      <Demo title="粗细">
        <ProgressCircle percent={50} thickness={10}>
          50%
        </ProgressCircle>
      </Demo>

      <Demo title="颜色">
        <ProgressCircle percent={50} trackColor="fuchsia" color="orange">
          50%
        </ProgressCircle>
      </Demo>

      <Demo title="尺寸">
        <ProgressCircle percent={50} size="150px">
          50%
        </ProgressCircle>
      </Demo>
    </Page>
  )
}
