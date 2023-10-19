import { FC, useMemo, useRef, useState } from 'react'
import { Animated, View } from 'react-native'
import { Transition } from '../transition/index'
import { useEvent } from '../use'
import { BaseProps } from '../base'

export interface CollapseProps extends BaseProps {
  visible?: boolean
  duration?: number
  onEnter?: () => void
  onEntering?: () => void
  onEntered?: () => void
  onExit?: () => void
  onExiting?: () => void
  onExited?: () => void
}

export const Collapse: FC<CollapseProps> = (props) => {
  const {
    style,
    children,
    visible,
    duration = 500,
    onEnter,
    onEntering,
    onEntered,
    onExit,
    onExiting,
    onExited,
  } = props

  const layoutHeight = useRef(0)
  const [collapsing, setCollapsing] = useState(false)
  const anim = useMemo(() => new Animated.Value(0), [])
  const firstOnLayout = useRef(false)

  const [contentStyle, setContentStyle] = useState<any>({
    position: visible ? 'relative' : 'absolute',
  })

  const collapseIn = () => {
    Animated.timing(anim, {
      toValue: layoutHeight.current,
      duration,
      useNativeDriver: false,
    }).start()
  }

  const collapseOut = () => {
    Animated.timing(anim, {
      toValue: 0,
      duration,
      useNativeDriver: false,
    }).start()
  }

  const handleEnter = useEvent(() => {
    setContentStyle({
      position: 'relative',
    })
    onEnter?.()
  })

  const handleEntering = useEvent(() => {
    collapseIn()
    setCollapsing(true)
    onEntering?.()
  })

  const handleEntered = useEvent(() => {
    setCollapsing(false)
    onEntered?.()
  })

  const handleExit = useEvent(() => {
    onExit?.()
  })

  const handleExiting = useEvent(() => {
    collapseOut()
    setCollapsing(true)
    onExiting?.()
  })

  const handleExited = useEvent(() => {
    setContentStyle({
      position: 'absolute',
    })
    setCollapsing(false)
    onExited?.()
  })

  return (
    <Transition
      timeout={duration}
      in={visible}
      onEnter={handleEnter}
      onEntering={handleEntering}
      onEntered={handleEntered}
      onExit={handleExit}
      onExiting={handleExiting}
      onExited={handleExited}
    >
      <Animated.View
        style={{
          ...(style as any),
          height: collapsing ? anim : visible ? undefined : 0,
          position: 'relative',
          overflow: collapsing || !visible ? 'hidden' : 'visible',
        }}
      >
        <View
          style={{
            width: '100%',
            ...contentStyle,
          }}
          onLayout={(event) => {
            const height = event.nativeEvent.layout.height
            if (!firstOnLayout.current) {
              anim.setValue(visible ? height : 0)
              firstOnLayout.current = true
            }
            layoutHeight.current = height
          }}
        >
          {children}
        </View>
      </Animated.View>
    </Transition>
  )
}

export default Collapse
