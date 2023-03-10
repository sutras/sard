/*
### Press
*/

import { useState, useRef } from 'react'
import { useStrike } from 'sard'
import './index.css'

export default function () {
  const [msg, setMsg] = useState<any>(null)

  const ref = useRef()

  useStrike(
    ref,
    (strike) => {
      ;['pressdown', 'pressmove', 'pressup'].forEach((type) => {
        strike.on(type, (event: any) => {
          console.log(event.type)

          setMsg(
            <>
              <div>type: {event.type}</div>
              <div>clientX: {event.x}</div>
              <div>clientY: {event.y}</div>
            </>,
          )
        })
      })
    },
    {
      press: true,
    },
  )

  return (
    <>
      <div
        ref={ref}
        className="demo-touch-box"
        style={{ touchAction: 'none' }}
      ></div>
      <div>{msg}</div>
    </>
  )
}
