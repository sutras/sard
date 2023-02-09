/*
### 自定义图标
*/

import { Steps, Button, Icon } from 'sard'
import { useState } from 'react'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  const [current, setCurrent] = useState(1)

  return (
    <>
      <Steps current={current}>
        <Steps.Step icon={<Icon size={20} name="bi-person-circle"></Icon>}>
          填写账号
        </Steps.Step>
        <Steps.Step
          icon={<Icon size={20} name="bi-person-bounding-box"></Icon>}
        >
          验证身份
        </Steps.Step>
        <Steps.Step icon={<Icon size={20} name="bi-key-fill"></Icon>}>
          设置密码
        </Steps.Step>
        <Steps.Step icon={<Icon size={20} name="bi-person-check-fill"></Icon>}>
          注册成功
        </Steps.Step>
      </Steps>
      <Button onClick={() => setCurrent(current === 0 ? 4 : current - 1)}>
        上一步
      </Button>{' '}
      <Button onClick={() => setCurrent(current === 4 ? 0 : current + 1)}>
        下一步
      </Button>
    </>
  )
}
