import { FC, ReactNode, useEffect, useMemo, useRef, useState } from 'react'
import classNames from 'classnames'
import { ITouchEvent, Text, View } from '@tarojs/components'
import { BaseProps } from '../base'
import Icon, { IconProps } from '../icon'
import { filterNullish, getRectByElement, isRN } from '../utils'
import { useBem, useControllableValue, useEvent, useResize } from '../use'
import { Animated, Easing } from '../animated'

export interface NoticeBarProps extends BaseProps {
  color?: string
  background?: string
  hideLeftIcon?: boolean
  leftIcon?: ReactNode
  leftIconProps?: IconProps
  rightIcon?: ReactNode
  rightIconProps?: IconProps
  delay?: number
  speed?: number
  scrollable?: 'auto' | 'never' | 'always'
  wrap?: boolean
  closable?: boolean
  onClose?: (event: ITouchEvent) => void
  linkable?: boolean
  onClick?: (event: ITouchEvent) => void
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  vertical?: boolean
  threshold?: number
}

export const NoticeBar: FC<NoticeBarProps> = (props) => {
  const {
    className,
    style,
    children,
    color,
    background,
    hideLeftIcon,
    leftIcon,
    leftIconProps,
    rightIcon,
    rightIconProps,
    delay = 1000,
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
    vertical,
    ...restProps
  } = props

  const [bem] = useBem('notice-bar')

  const contentRef = useRef()
  const wrapperRef = useRef()
  const [shouldScroll, setShouldScroll] = useState(false)
  const [wrapperData, setWrapperData] = useState({
    first: 0,
    later: 0,
    contentWidth: 0,
    wrapperWidth: 0,
  })

  const updateWrapperData = useEvent(
    async (getWidth: () => Promise<{ contentWidth: number; wrapperWidth }>) => {
      if (scrollable === 'never') {
        return setShouldScroll(false)
      }

      const { contentWidth, wrapperWidth } = await getWidth()

      const shouldScroll =
        scrollable === 'always' || wrapperWidth > contentWidth

      if (shouldScroll) {
        setWrapperData({
          first: (wrapperWidth / speed) * 1000,
          later: ((wrapperWidth + contentWidth) / speed) * 1000,
          contentWidth,
          wrapperWidth,
        })
      }

      setShouldScroll(shouldScroll)
    },
  )

  const getWidth = async () => {
    const contentRect = await getRectByElement(contentRef.current)
    const wrapperRect = await getRectByElement(wrapperRef.current)

    const contentWidth = contentRect.width
    const wrapperWidth = wrapperRect.width

    return {
      contentWidth,
      wrapperWidth,
    }
  }

  useEffect(() => {
    !isRN && updateWrapperData(getWidth)
  }, [scrollable, children])

  useResize(
    () => {
      !isRN && updateWrapperData(getWidth)
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
      setInnerVisible(false)
      onClose?.(event)
    }
  }

  // Animated >>>
  const [contentWidth, setContentWidth] = useState(0)
  const [wrapperWidth, setWrapperWidth] = useState(0)

  useEffect(() => {
    updateWrapperData(async () => ({
      contentWidth,
      wrapperWidth,
    }))
  }, [contentWidth, wrapperWidth])

  const animValue = useMemo(() => new Animated.Value(0), [])

  useEffect(() => {
    animValue.stopAnimation()

    let anim
    if (shouldScroll) {
      animValue.setValue(0)
      anim = Animated.timing(animValue, {
        delay,
        toValue: -wrapperData.wrapperWidth,
        duration: wrapperData.first,
        easing: Easing.linear,
        useNativeDriver: true,
      }).start(function laterAnimate({ finished }) {
        if (finished) {
          animValue.setValue(wrapperData.contentWidth)
          anim = Animated.timing(animValue, {
            toValue: -wrapperData.wrapperWidth,
            duration: wrapperData.later,
            easing: Easing.linear,
            useNativeDriver: true,
          }).start(laterAnimate)
        }
      })
    }

    return () => {
      anim?.stop()
    }
  }, [shouldScroll, wrapperData])
  // <<< Animated

  return (
    <View
      {...restProps}
      className={classNames(
        bem.b(),
        bem.m('wrap', wrap),
        bem.m('linkable', linkable),
        className,
      )}
      style={{
        ...style,
        ...filterNullish({
          color,
          background,
        }),
        display: innerVisible ? 'flex' : 'none',
      }}
    >
      {!hideLeftIcon && (
        <Text className={bem.e('left-icon')}>
          {leftIcon ?? <Icon name="volume-up" size={20} {...leftIconProps} />}
        </Text>
      )}
      <View
        className={bem.e('content')}
        ref={contentRef}
        {...{
          onLayout: (event) => {
            setContentWidth(event.nativeEvent.layout.width)
          },
        }}
      >
        <View
          className={classNames(
            bem.e('container'),
            bem.em('container', 'wrap', wrap || vertical),
          )}
        >
          <Animated.View
            ref={wrapperRef}
            className={classNames(
              bem.e('wrapper'),
              bem.em('wrapper', 'infinite', !firstLap),
              bem.em('wrapper', 'scrollable', shouldScroll),
            )}
            style={{
              ...(isRN
                ? ({
                    transform: [{ translateX: animValue }],
                  } as any)
                : {
                    transform: `translateX(${
                      firstLap ? 0 : wrapperData.contentWidth
                    }px)`,
                    animationDelay: `${firstLap ? delay : 0}ms`,
                    animationDuration: `${
                      firstLap ? wrapperData.first : wrapperData.later
                    }ms`,
                  }),
            }}
            onAnimationEnd={handleAnimationEnd}
            {...{
              onLayout: (event) => {
                setWrapperWidth(event.nativeEvent.layout.width)
              },
            }}
          >
            {vertical ? (
              children
            ) : (
              <Text className={classNames(bem.e('text'))}>{children}</Text>
            )}
          </Animated.View>
        </View>
      </View>
      {(closable || linkable) && (
        <Text className={bem.e('right-icon')} onClick={handleRightIconClick}>
          {rightIcon ?? (
            <Icon
              name={closable ? 'close' : linkable ? 'right' : ''}
              size={16}
              {...rightIconProps}
            />
          )}
        </Text>
      )}
    </View>
  )
}

export default NoticeBar
