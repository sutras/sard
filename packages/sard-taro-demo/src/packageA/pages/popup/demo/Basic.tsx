import { useState } from 'react'
import { Cell, Popup, PopupProps } from 'sard-taro'

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
    <>
      <Cell.Group card>
        <Cell linkable title="顶部划出" onClick={() => show('slide-top')} />
        <Cell linkable title="右边划出" onClick={() => show('slide-right')} />
        <Cell linkable title="底部划出" onClick={() => show('slide-bottom')} />
        <Cell linkable title="左边划出" onClick={() => show('slide-left')} />
        <Cell linkable title="缩放" onClick={() => show('zoom')} />
        <Cell linkable title="淡入淡出" onClick={() => show('fade')} />
      </Cell.Group>

      <Popup
        visible={visible}
        effect={effect}
        onMaskClick={handleMaskClick}
        style={{ boxSizing: 'border-box', padding: 20, background: '#fff' }}
      >
        Popup
      </Popup>
    </>
  )
}
