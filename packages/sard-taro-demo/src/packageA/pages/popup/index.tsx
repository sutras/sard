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
          <Cell linkable title="顶部划出" onClick={() => show('slide-top')} />
          <Cell linkable title="右边划出" onClick={() => show('slide-right')} />
          <Cell
            linkable
            title="底部划出"
            onClick={() => show('slide-bottom')}
          />
          <Cell linkable title="左边划出" onClick={() => show('slide-left')} />
          <Cell linkable title="缩放" onClick={() => show('zoom')} />
          <Cell linkable title="淡入淡出" onClick={() => show('fade')} />
        </Cell.Group>

        <Popup
          visible={visible}
          effect={effect}
          onMaskClick={handleMaskClick}
          className="demo-popup"
        >
          Popup
        </Popup>
      </Demo>
    </Page>
  )
}
