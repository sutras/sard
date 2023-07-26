import Demo from '@/components/demo'
import Page from '@/components/page'
import { NumberKeyboard, PasswordInput } from 'sard-taro'
import { useState } from 'react'

import './index.scss'

export default () => {
  const [value, setValue] = useState('')

  const [value2, setValue2] = useState('')
  const [visible, setVisible] = useState(false)

  return (
    <Page className="page-password-input">
      <Demo title="基础使用">
        <PasswordInput value={value} onChange={setValue} />
      </Demo>

      <Demo title="使用自定义键盘">
        <PasswordInput
          custom
          focused={visible}
          value={value2}
          onChange={setValue2}
          onClick={() => setVisible(true)}
        />

        <NumberKeyboard
          onInput={(key) => setValue2((value) => value + key)}
          onDelete={() => setValue2((value) => value.slice(0, -1))}
          visible={visible}
          onVisible={setVisible}
        />
      </Demo>

      <Demo title="下划线类型">
        <PasswordInput type="underline" />
      </Demo>

      <Demo title="间距">
        <PasswordInput gap={0} />
      </Demo>

      <Demo title="明文显示">
        <PasswordInput plainText />
      </Demo>
    </Page>
  )
}
