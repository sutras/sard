/*
### 自定义样式
*/

import { CountDown, CurrentTime } from 'sard'

export default function () {
  return (
    <>
      <style>
        {`
          .time-wrap {
            display: flex;
            align-items: center;
          }
          .time {
            padding: 5px;
            background: orange;
            border-radius: 4px;
            color: #000;
          }
          .colon {
            margin: 0 5px;
          }
        `}
      </style>
      <CountDown time={1000 * 60 * 60 * 2} interval={93}>
        {(time: CurrentTime) => (
          <div className="time-wrap">
            <div className="time">{String(time.hours).padStart(2, '0')}</div>
            <div className="colon">:</div>
            <div className="time">{String(time.minutes).padStart(2, '0')}</div>
            <div className="colon">:</div>
            <div className="time">{String(time.seconds).padStart(2, '0')}</div>
          </div>
        )}
      </CountDown>
    </>
  )
}
