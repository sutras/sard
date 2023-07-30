import { FC, ReactNode, useEffect, useMemo, useState } from 'react'
import classNames from 'classnames'
import { ITouchEvent, View } from '@tarojs/components'
import { BaseProps } from '../base'
import Icon, { IconProps } from '../icon'
import { getRectById } from '../utils'
import {
  useBem,
  useControllableValue,
  useEvent,
  useResize,
  useSelectorId,
} from '../use'

export interface NoticeBarProps extends BaseProps {
  color?: string
  background?: string
  leftIcon?: ReactNode
  leftIconProps?: IconProps
  rightIcon?: ReactNode
  rightIconProps?: IconProps
  delay?: number
  speed?: number
  scrollable?: boolean | 'auto'
  wrap?: boolean
  closable?: boolean
  onClose?: (event: ITouchEvent) => void
  linkable?: boolean
  onClick?: (event: ITouchEvent) => void
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  threshold?: number
}

export const NoticeBar: FC<NoticeBarProps> = (props) => {
  const {
    style,
    className,
    children,
    color,
    background,
    leftIcon,
    leftIconProps,
    rightIcon,
    rightIconProps,
    delay = 1,
    speed = 50,
    scrollable = 'auto',
    wrap,
    closable,
    onClose,
    linkable,
    visible,
    defaultVisible,
    onVisible,
    threshold = 150,
    ...restProps
  } = props

  const [bem] = useBem('notice-bar')

  const contentId = useSelectorId()
  const wrapperId = useSelectorId()
  const [shouldScroll, setShouldScroll] = useState(false)
  const [wrapperData, setWrapperData] = useState({
    first: 0,
    later: 0,
    contentWidth: 0,
  })

  const updateWrapperData = useEvent(async () => {
    if (scrollable === false) {
      return setShouldScroll(false)
    }
    const contentRes = await getRectById(contentId, {
      size: true,
    })
    const wrapperRes = await getRectById(wrapperId, {
      size: true,
    })

    const contentWidth = contentRes.width
    const wrapperWidth = wrapperRes.width
    const shouldScroll = scrollable === true || wrapperWidth > contentWidth

    if (shouldScroll) {
      setWrapperData({
        first: wrapperWidth / speed,
        later: (wrapperWidth + contentWidth) / speed,
        contentWidth,
      })
    }

    setShouldScroll(shouldScroll)
  })

  useEffect(() => {
    updateWrapperData()
  }, [scrollable, children])

  useResize(
    () => {
      updateWrapperData()
    },
    threshold,
    {
      leading: false,
      trailing: true,
    },
  )

  const [firstLap, setFirstLap] = useState(true)
  const handleAnimationEnd = () => {
    if (firstLap) {
      setFirstLap(false)
    }
  }

  const [innerVisible, setInnerVisible] = useControllableValue({
    value: visible,
    defaultValue: defaultVisible,
    trigger: onVisible,
    initialValue: true,
  })

  const handleRightIconClick = (event) => {
    if (closable) {
      event.stopPropagation()
      setInnerVisible(false)
      onClose?.(event)
    }
  }

  const scrollType = useMemo(() => {
    return scrollable === true
      ? 'always'
      : scrollable === false
      ? 'never'
      : 'auto'
  }, [scrollable])

  const noticeBarClass = classNames(
    bem.b(),
    bem.m('linkable', linkable),
    bem.m(`scroll-${scrollType}`),
    bem.m('wrap', wrap),
    className,
  )

  const noticeBarStyle = {
    color,
    display: innerVisible ? 'flex' : 'none',
    background,
    ...style,
  }

  const wrapperClass = classNames(
    bem.e('wrapper'),
    bem.em('wrapper', 'wrap', wrap),
    bem.em('wrapper', 'infinite', !firstLap),
    bem.em('wrapper', 'scroll-never', scrollable === false),
    bem.em('wrapper', 'scrollable', shouldScroll),
  )

  const wrapperStyle = {
    transform: `translateX(${firstLap ? 0 : wrapperData.contentWidth}px)`,
    animationDelay: `${firstLap ? delay : 0}s`,
    animationDuration: `${firstLap ? wrapperData.first : wrapperData.later}s`,
  }

  return (
    <View {...restProps} className={noticeBarClass} style={noticeBarStyle}>
      <View className={bem.e('left-icon')}>
        {leftIcon ?? (
          <Icon name="volume-up" size={20} {...leftIconProps}></Icon>
        )}
      </View>
      <View className={bem.e('content')} id={contentId}>
        <View
          id={wrapperId}
          className={wrapperClass}
          style={wrapperStyle}
          onAnimationEnd={handleAnimationEnd}
        >
          {children}
        </View>
      </View>
      {(closable || linkable) && (
        <View className={bem.e('right-icon')} onClick={handleRightIconClick}>
          {rightIcon ?? (
            <Icon
              name={closable ? 'close' : linkable ? 'right' : ''}
              size={16}
              {...rightIconProps}
            ></Icon>
          )}
        </View>
      )}
    </View>
  )
}

export default NoticeBar
