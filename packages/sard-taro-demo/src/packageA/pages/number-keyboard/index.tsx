import Demo from '@/components/demo'
import Page from '@/components/page'
import { Cell, NumberKeyboard, Toast } from 'sard-taro'
import { useState } from 'react'

import './index.scss'

export default () => {
  const [visible, setVisible] = useState(true)

  const [visible2, setVisible2] = useState(false)

  const [visible3, setVisible3] = useState(false)

  const [visible5, setVisible5] = useState(false)

  const [visible6, setVisible6] = useState(false)
  const [value6, setValue6] = useState('')

  return (
    <Page className="page-number-keyboard">
      <Toast.Agent />

      <Demo title="基础使用" full>
        <Cell.Group card>
          <Cell linkable title="默认键盘" onClick={() => setVisible(true)} />
          <Cell linkable title="小数点键盘" onClick={() => setVisible2(true)} />
          <Cell linkable title="身份证键盘" onClick={() => setVisible3(true)} />
          <Cell
            linkable
            title="随机数字键盘"
            onClick={() => setVisible5(true)}
          />
          <Cell
            linkable
            title="双向绑定"
            value={value6}
            onClick={() => setVisible6(true)}
          />
        </Cell.Group>

        <NumberKeyboard
          onInput={Toast.show}
          onDelete={() => Toast.show('Delete')}
          visible={visible}
          onVisible={setVisible}
        />

        <NumberKeyboard
          extraKey="."
          onInput={Toast.show}
          onDelete={() => Toast.show('Delete')}
          visible={visible2}
          onVisible={setVisible2}
        />

        <NumberKeyboard
          extraKey="X"
          onInput={Toast.show}
          onDelete={() => Toast.show('Delete')}
          visible={visible3}
          onVisible={setVisible3}
        />

        <NumberKeyboard
          random
          onInput={Toast.show}
          onDelete={() => Toast.show('Delete')}
          visible={visible5}
          onVisible={setVisible5}
        />

        <NumberKeyboard
          onInput={(key) => setValue6((value) => value + key)}
          onDelete={() => setValue6((value) => value.slice(0, -1))}
          visible={visible6}
          onVisible={setVisible6}
        />
      </Demo>
    </Page>
  )
}
