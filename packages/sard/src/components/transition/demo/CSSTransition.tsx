/*
### CSSTransition
*/

import { CSSTransition, CSSTransitionProps, Button, Radio } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(true)
  const [type, setType] = useState<CSSTransitionProps['type']>('fade')

  const handleClick = () => {
    setVisible((visible) => !visible)
  }

  return (
    <>
      <Radio.Group value={type} onChange={setType} vertical>
        {[
          'fade',
          'slide-top',
          'slide-right',
          'slide-bottom',
          'slide-left',
          'zoom',
          'collapse',
        ].map((type) => {
          return (
            <Radio key={type} value={type}>
              {type}
            </Radio>
          )
        })}
      </Radio.Group>

      <br />
      <br />

      <Button onClick={handleClick}>Toggle Visible</Button>

      <br />
      <br />

      <CSSTransition in={visible} type={type} timeout={300}>
        <section
          style={{
            width: 100,
            height: 100,
            background: 'orange',
          }}
        ></section>
      </CSSTransition>
    </>
  )
}
