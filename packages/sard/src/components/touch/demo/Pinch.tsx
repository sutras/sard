/*
### Pinch
*/

import { useState, useRef } from 'react'
import { useStrike } from 'sard'
import './index.css'

export default function () {
  const [msg, setMsg] = useState<any>(null)
  const [inOutMsg, setInOutMsg] = useState<any>(null)

  const ref = useRef()

  useStrike(
    ref,
    (strike) => {
      ;['pinchstart', 'pinchmove', 'pinchend'].forEach((type) => {
        strike.on(type, (event: any) => {
          console.log(event.type)

          setMsg(
            <>
              <div>type: {event.type}</div>
              <div>scale: {event.scale}</div>
            </>,
          )
        })
      })
      ;['pinchin', 'pinchout'].forEach((type) => {
        strike.on(type, (event: any) => {
          setInOutMsg(<div>type: {event.type}</div>)
        })
      })
    },
    {
      pinch: true,
    },
  )

  return (
    <>
      <div
        ref={ref}
        className="demo-touch-box"
        style={{ touchAction: 'none' }}
      ></div>
      <div>
        {inOutMsg}
        {msg}
      </div>
    </>
  )
}
