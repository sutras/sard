import {
  Children,
  cloneElement,
  CSSProperties,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
  FC,
  useMemo,
} from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'
import {
  useSelectorId,
  useBem,
  useControllableValue,
  useSetTimeout,
  useEvent,
} from '../use'
import {
  getRectByElement,
  getScrollIntoViewValue,
  isAndroid,
  isNumber,
  isRN,
} from '../utils'
import { AnyFunction, BaseProps } from '../base'
import { TabsTab, TabsTabProps } from './Tab'
import { Animated } from '../animated'
import { ScrollView, ScrollViewRef } from '../scroll-view'
import CustomWrapper from '../custom-wrapper'

export interface TabsProps extends Omit<BaseProps, 'children'> {
  children?: ReactElement | ReactElement[]
  defaultActiveKey?: number | string
  activeKey?: number | string
  onChange?: (key: number | string) => void
  scrollable?: boolean
  activeStyle?: CSSProperties
  activeClass?: string
  inactiveStyle?: CSSProperties
  inactiveClass?: string
  showLine?: boolean
  line?: ReactNode
  lineStyle?: CSSProperties
  lineClass?: string
}

export interface TabsFC extends FC<TabsProps> {
  Tab: typeof TabsTab
}

const duration = 300

export const Tabs: TabsFC = (props) => {
  const {
    className,
    style,
    children,

    defaultActiveKey,
    activeKey,
    onChange,
    scrollable,
    activeStyle,
    activeClass,
    inactiveStyle,
    inactiveClass,
    showLine = true,
    line,
    lineStyle,
    lineClass,
    ...restProps
  } = props

  const [bem] = useBem('tabs')

  const [innerActiveKey, setInnerActiveKey] = useControllableValue({
    value: activeKey,
    defaultValue: defaultActiveKey,
    trigger: onChange,
    postValue(value) {
      return isNumber(value) ? String(value) : value
    },
  })

  const [setLineStyleLater] = useSetTimeout(() => {
    setTabStyle(innerActiveKey, true)
  }, 150)

  const firstTimer = useRef<any>()
  useEffect(() => {
    if (showLine || scrollable) {
      if (isAndroid && firstTimer.current === undefined) {
        firstTimer.current = setTimeout(() => {
          firstTimer.current = null
          setTabStyle(innerActiveKey)
        }, 400)
      } else {
        setTabStyle(innerActiveKey)
      }
    }
  }, [innerActiveKey])

  useEffect(() => {
    if (showLine) {
      setLineStyleLater()
    }
  }, [children])

  const contextId = useSelectorId()
  const scrollRef = useRef<ScrollViewRef>(null)
  const wrapperRef = useRef<any>(null)

  const tabKeyRefMap = useRef<Record<string, any>>({})

  const notSetLineStyleYet = useRef(true)

  const stopScroll = useRef<AnyFunction>()
  const scrollLeftRef = useRef(0)
  const handleScroll = useEvent((event) => {
    scrollLeftRef.current = event.x
  })

  const [translateLater, cancelTranslate, isWaitingToTranslate] = useSetTimeout(
    (left: number) => {
      stopScroll.current = undefined
      scrollRef.current?.setScrollEnabled(true)
      scrollLeftRef.current = left
      clearWrapperStyle()
    },
    duration,
  )

  const [wrapperStyle, setWrapperStyle] = useState({
    offset: 0,
    duration: 0,
    paddingRight: 0,
  })
  const [lineLeft, setLineLeft] = useState<number>()

  const clearWrapperStyle = () => {
    setWrapperStyle({
      offset: 0,
      duration: 0,
      paddingRight: 0,
    })
  }

  async function getUrgentScrollLeft() {
    const wrapperRect = await getRectByElement(wrapperRef.current, contextId)
    const scrollRect = await getRectByElement(
      scrollRef.current?.getElement(),
      contextId,
    )
    return scrollRect.left - wrapperRect.left
  }

  const setTabStyle = async (key: string | number, onlyLine?: boolean) => {
    const tabElement = tabKeyRefMap.current[key]
    if (!tabElement) {
      return
    }

    await stopScroll.current?.()

    let scrollRect = await getRectByElement(
      scrollRef.current?.getElement(),
      contextId,
    )

    // 有些设备可能出现首次获取不到的情况
    if (!scrollRect || scrollRect.width === 0) {
      scrollRect = await getRectByElement(
        scrollRef.current?.getElement(),
        contextId,
      )
    }

    // 组件或其父组件被隐藏导致位置尺寸值为0
    if (!scrollRect || scrollRect.width === 0) {
      return
    }

    let wrapperRect
    if (scrollable) {
      wrapperRect = await getRectByElement(wrapperRef.current, contextId)
    } else {
      // 优化
      wrapperRect = scrollRect
    }

    const tabRect = await getRectByElement(tabElement, contextId)

    // 确保要处理的值存在
    if (!wrapperRect || !tabRect) {
      return
    }

    // line
    if (showLine) {
      const lineLeft = tabRect.left - wrapperRect.left + tabRect.width / 2
      setLineLeft(lineLeft)
      if (onlyLine) {
        return
      }
    }

    // scroll
    {
      let wrapperLeft = wrapperRect.left

      if (isRN) {
        wrapperLeft -= wrapperCurrentValue.current
      }

      const originalScrollLeft = scrollRect.left - wrapperLeft

      const scrollLeft = getScrollIntoViewValue(
        scrollRect.width,
        originalScrollLeft,
        tabRect.width,
        tabRect.left - wrapperLeft,
        {
          placement: 'center',
          limited: true,
          pageHeight: wrapperRect.width,
        },
      )

      const offset = originalScrollLeft - scrollLeft
      if (Math.abs(offset) < 1) {
        return
      }

      scrollRef.current?.setScrollEnabled(false)

      setWrapperStyle({
        offset,
        duration,
        paddingRight: 1000,
      })

      if (!isRN) {
        translateLater(scrollLeft)

        stopScroll.current = async () => {
          if (isWaitingToTranslate()) {
            cancelTranslate()
            const urgentScrollLeft = await getUrgentScrollLeft()
            scrollLeftRef.current = urgentScrollLeft
            clearWrapperStyle()
          }
        }
      }

      if (isRN) {
        stopScroll.current = async () => {
          wrapperAnim.stopAnimation()
        }

        wrapperAnim.setValue(wrapperCurrentValue.current)
        animateWrapperTranslateX(
          offset + wrapperCurrentValue.current,
          ({ finished }) => {
            if (finished) {
              stopScroll.current = undefined
              wrapperAnim.setValue(0)
              scrollRef.current?.scrollLeft(scrollLeft)
            } else {
              scrollRef.current?.scrollLeft(
                scrollLeft + offset - wrapperCurrentValue.current,
              )
              wrapperAnim.setValue(0)
            }

            scrollRef.current?.setScrollEnabled(true)
            clearWrapperStyle()
          },
        )
      }
    }
  }

  const handleTabSelect = (key: number | string) => {
    setInnerActiveKey(key)
  }

  // Animated >>>
  const lineAnim = useMemo(() => new Animated.Value(0), [])

  const animateLineTranslateX = (to: number) => {
    Animated.timing(lineAnim, {
      toValue: to,
      duration: notSetLineStyleYet.current ? 0 : duration,
      useNativeDriver: true,
    }).start()
  }

  useEffect(() => {
    if (lineLeft !== undefined) {
      animateLineTranslateX(lineLeft)
      notSetLineStyleYet.current = false
    }
  }, [lineLeft])

  const wrapperAnim = useMemo(() => new Animated.Value(0), [])
  const animateWrapperTranslateX = (
    to: number,
    callback: (result: { finished: boolean }) => void,
  ) => {
    Animated.timing(wrapperAnim, {
      toValue: to,
      duration,
      useNativeDriver: true,
    }).start(callback)
  }

  const wrapperCurrentValue = useRef(0)

  useEffect(() => {
    wrapperAnim.addListener(({ value }: { value: number }) => {
      wrapperCurrentValue.current = value
    })

    return () => {
      wrapperAnim.stopAnimation()
      wrapperAnim.removeAllListeners()
      lineAnim.stopAnimation()
    }
  }, [])
  // <<< Animated

  return (
    <CustomWrapper id={contextId}>
      <View
        {...restProps}
        className={classNames(bem.b(), className)}
        style={style}
      >
        <ScrollView
          contextId={contextId}
          ref={scrollRef}
          scrollX={!!scrollable}
          className={classNames(bem.e('scroll'))}
          showScrollbar={false}
          scrollLeft={scrollLeftRef.current}
          onScroll={handleScroll}
        >
          <View className={bem.e('container')}>
            <Animated.View
              className={classNames(bem.e('wrapper'))}
              style={{
                // 确保有足够的空间可以滚动
                paddingRight: wrapperStyle.paddingRight,
                ...(isRN
                  ? ({
                      transform: [
                        {
                          translateX: wrapperAnim,
                        },
                      ],
                    } as any)
                  : {
                      transform: `translate3d(${wrapperStyle.offset}px,0,0)`,
                      transition: `transform ${wrapperStyle.duration}ms ease-out 0s`,
                    }),
              }}
              ref={wrapperRef}
            >
              {Children.map(
                children,
                (element: ReactElement<TabsTabProps, any>, index: number) => {
                  const key = element.key ?? String(index)
                  const active = key === innerActiveKey

                  return cloneElement(element, {
                    _key: key,
                    _active: active,
                    _scrollable: scrollable,
                    _onSelect: handleTabSelect,
                    className: classNames(
                      element.props.className,
                      active ? activeClass : inactiveClass,
                    ),
                    style: {
                      ...element.props.style,
                      ...(active ? activeStyle : inactiveStyle),
                    },
                    ref: (element) => {
                      tabKeyRefMap.current[key] = element
                    },
                  })
                },
              )}
              {showLine && (
                <Animated.View
                  className={classNames(bem.e('line'), lineClass)}
                  style={
                    {
                      ...lineStyle,
                      opacity: lineLeft === undefined ? 0 : 1,
                      ...(isRN
                        ? {
                            transform: [
                              { translateX: lineAnim },
                              { translateX: -20 },
                            ],
                          }
                        : {
                            transition: `transform ${
                              notSetLineStyleYet.current ? 0 : duration
                            }ms`,
                            transform: `translate3d(${
                              lineLeft || 0
                            }px,0,0) translateX(-20px)`,
                          }),
                    } as any
                  }
                >
                  {line}
                </Animated.View>
              )}
            </Animated.View>
          </View>
        </ScrollView>
      </View>
    </CustomWrapper>
  )
}

Tabs.Tab = TabsTab

export default Tabs
