import { FC, useState } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem, useEvent } from '../use'
import { CSSTransition } from '../transition/CSSTransition'

export interface MaskProps extends BaseProps {
  visible?: boolean
  zIndex?: number
  timeout?: number
  transparent?: boolean
  onClick?: (event: ITouchEvent) => void
}

export const Mask: FC<MaskProps> = (props) => {
  const {
    className,
    style,
    visible,
    zIndex,
    timeout,
    transparent,
    ...restProps
  } = props

  const [bem] = useBem('mask')

  const [realVisible, setRealVisible] = useState(visible)

  const [isHiding, setIsHiding] = useState(!visible)

  const handleEnter = useEvent(() => {
    setIsHiding(false)
    setRealVisible(true)
  })

  const handleExit = useEvent(() => {
    setIsHiding(true)
  })

  const handleExited = useEvent(() => {
    setIsHiding(false)
    setRealVisible(false)
  })

  return (
    <CSSTransition
      in={visible}
      timeout={timeout}
      effect="fade"
      onEnter={handleEnter}
      onExit={handleExit}
      onExited={handleExited}
    >
      <View
        {...restProps}
        className={classNames(
          bem.b(),
          bem.m('hiding', isHiding),
          bem.m('transparent', transparent),
          className,
        )}
        style={{
          zIndex,
          display: realVisible ? 'flex' : 'none',
          ...style,
        }}
        catchMove
      ></View>
    </CSSTransition>
  )
}

export default Mask
