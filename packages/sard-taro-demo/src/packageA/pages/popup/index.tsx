import Demo from '@/components/demo'
import Page from '@/components/page'
import { useState } from 'react'
import { Cell, Popup, PopupProps } from 'sard-taro'

import './index.scss'

export default () => {
  const [visible, setVisible] = useState(false)
  const [effect, setEffect] = useState<PopupProps['effect']>('zoom')

  const show = (effect: PopupProps['effect']) => {
    setVisible(true)
    setEffect(effect)
  }

  const handleMaskClick = () => {
    setVisible(false)
  }

  return (
    <Page className="page-popup">
      <Demo title="基础使用" full>
        <Cell.Group card>
          <Cell isLink title="顶部划出" onClick={() => show('slide-top')} />
          <Cell isLink title="右边划出" onClick={() => show('slide-right')} />
          <Cell isLink title="底部划出" onClick={() => show('slide-bottom')} />
          <Cell isLink title="左边划出" onClick={() => show('slide-left')} />
          <Cell isLink title="缩放" onClick={() => show('zoom')} />
          <Cell isLink title="淡入淡出" onClick={() => show('fade')} />
        </Cell.Group>

        <Popup
          visible={visible}
          effect={effect}
          onMaskClick={handleMaskClick}
          style={{
            boxSizing: 'border-box',
            padding: '20px',
            background: 'var(--sar-emphasis-bg)',
          }}
        >
          Popup
        </Popup>
      </Demo>
    </Page>
  )
}
