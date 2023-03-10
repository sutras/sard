/*
### Tap
*/

import { useRef, useState } from 'react'
import { useStrike } from 'sard'
import './index.css'

export default function () {
  const [msg, setMsg] = useState<any>(null)

  const ref = useRef()

  useStrike(
    ref,
    (strike) => {
      strike.on('tap', (event: any) => {
        console.log(event.type)

        setMsg(
          <>
            <div>clientX: {event.x}</div>
            <div>clientY: {event.y}</div>
          </>,
        )
      })
    },
    {
      tap: true,
    },
  )

  return (
    <>
      <div ref={ref} className="demo-touch-box"></div>
      <div>{msg}</div>
    </>
  )
}
