/*
### Pan
*/

import { useState, useRef } from 'react'
import { useStrike } from 'sard'
import './index.css'

export default function () {
  const [msg, setMsg] = useState<any>(null)
  const [dirMsg, setDirMsg] = useState<any>(null)

  const ref = useRef()

  useStrike(
    ref,
    (strike) => {
      ;['panstart', 'panmove', 'panend'].forEach((type) => {
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
      ;['panup', 'panright', 'pandown', 'panleft'].forEach((type) => {
        strike.on(type, (event: any) => {
          setDirMsg(
            <>
              <div>type: {event.type}</div>
            </>,
          )
        })
      })
    },
    {
      pan: true,
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
        {dirMsg}
        {msg}
      </div>
    </>
  )
}
