/*
### 惯性
*/

import { useCallback, useEffect, useRef } from 'react'
import { Movable, MovableAreaRef } from 'sard'

export default function () {
  const areaStyle = {
    width: '100%',
    height: '320px',
    backgroundColor: '#eee',
  }
  const viewStyle = {
    width: '100px',
    height: '100px',
    backgroundColor: 'rgba(255, 165, 0, .3)',
  }

  const areaRef = useRef<MovableAreaRef>()

  const handler = useCallback(() => {
    areaRef.current.updateAreaRect()
  }, [])

  useEffect(() => {
    window.addEventListener('resize', handler)

    return () => {
      window.removeEventListener('resize', handler)
    }
  }, [])

  return (
    <Movable.Area style={areaStyle} ref={areaRef}>
      <Movable.View style={viewStyle} inertia outOfBounds></Movable.View>
    </Movable.Area>
  )
}
