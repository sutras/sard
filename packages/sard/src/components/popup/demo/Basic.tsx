/*
### 基础使用
*/

import { useState } from 'react'
import { Popup, PopupProps, Button } from 'sard'

export default function () {
  const [visible, setVisible] = useState(false)
  const [placement, setPlacement] = useState<PopupProps['placement']>('center')

  const show = (placement: PopupProps['placement']) => {
    setVisible(true)
    setPlacement(placement)
  }

  const handleMaskClick = () => {
    setVisible(false)
  }

  return (
    <>
      <Button onClick={() => show('top')}>顶部</Button>{' '}
      <Button onClick={() => show('right')}>右边</Button>{' '}
      <Button onClick={() => show('bottom')}>底部</Button>{' '}
      <Button onClick={() => show('left')}>左边</Button>{' '}
      <Button onClick={() => show('center')}>居中</Button>{' '}
      <Button onClick={() => show('center-fade')}>居中淡入淡出</Button>
      <Popup
        visible={visible}
        placement={placement}
        onMaskClick={handleMaskClick}
      >
        <div
          style={{
            padding: '20px',
            background: 'var(--s-emphasis-bg)',
          }}
        >
          Popup
        </div>
      </Popup>
    </>
  )
}
