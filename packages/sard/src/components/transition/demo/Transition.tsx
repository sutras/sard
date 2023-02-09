/*
### Transition
*/

import { Transition, Button } from 'sard'
import { useState } from 'react'

const duration = 300

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
}

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
}

export default function () {
  const [inProp, setInProp] = useState(true)

  const handleClick = () => {
    setInProp((inProp) => !inProp)
  }

  return (
    <>
      <Button onClick={handleClick}>Toggle</Button>

      <Transition in={inProp} timeout={duration}>
        {(state) => (
          <div
            data-status={state}
            style={{
              ...defaultStyle,
              ...transitionStyles[state],
            }}
          >
            这是一个淡入淡出的过渡
          </div>
        )}
      </Transition>
    </>
  )
}
