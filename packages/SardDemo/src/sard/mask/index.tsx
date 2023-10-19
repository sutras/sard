import { FC, useState } from 'react'
import { ITouchEvent, View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem, useEvent } from '../use'
import { CSSTransition } from '../transition/CSSTransition'
import { TransitionTimeout } from '../transition'
import { filterNullish } from '../utils'

export interface MaskProps extends BaseProps {
  visible?: boolean
  zIndex?: number
  timeout?: TransitionTimeout
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
    onClick,
    ...restProps
  } = props

  const [bem] = useBem('mask')

  const [realVisible, setRealVisible] = useState(visible)

  const handleEnter = useEvent(() => {
    setRealVisible(true)
  })

  const handleExited = useEvent(() => {
    setRealVisible(false)
  })

  return (
    <CSSTransition
      in={visible}
      appear
      timeout={timeout}
      effect="fade"
      onEnter={handleEnter}
      onExited={handleExited}
      {...restProps}
      className={classNames(
        bem.b(),
        bem.m('transparent', transparent),
        className,
      )}
      style={{
        ...style,
        ...filterNullish({
          zIndex,
        }),
        display: realVisible ? 'flex' : 'none',
      }}
      catchMove
    >
      <View onClick={onClick} style={{ width: '100%', height: '100%' }} />
    </CSSTransition>
  )
}

export default Mask
