import {
  Children,
  cloneElement,
  CSSProperties,
  forwardRef,
  ReactElement,
  ReactNode,
  useEffect,
  useRef,
  useState,
  useImperativeHandle,
  ForwardRefExoticComponent,
  Fragment,
  ExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useMemo,
  useContext,
} from 'react'
import classNames from 'classnames'
import Taro, { usePageScroll } from '@tarojs/taro'
import { ScrollView, View } from '@tarojs/components'
import {
  useIndexableMap,
  useScroll,
  useSetTimeout,
  useEvent,
  useResize,
  useSelectorId,
} from '../use'
import { Swiper, SwiperItem, SwiperProps } from '../swiper'

import { TabsPane, TabPaneProps } from './Pane'
import { TabsLabel, TabLabelRef } from './Label'
import { getRectById, matchScrollVisible } from '../utils'
import { BaseProps } from '../base'
import PopoutContext from '../popout/PopoutContext'

export * from './Pane'

export interface TabsRef {
  switchTo: (innerKey: number | string, animated?: boolean) => void
  setLabelStyle: () => void
}

export interface TabsProps extends Omit<BaseProps, 'children'> {
  children?: ReactElement | ReactElement[]
  defaultActiveKey?: number | string
  activeKey?: number | string
  onChange?: (key: number | string) => void
  onLabelClick?: (key: number | string) => void
  inkbarWrapperStyle?: CSSProperties
  inkbarWidth?: 'auto' | string
  inkbarStyle?: CSSProperties
  inkbar?: ReactNode
  scrollCount?: number
  type?: 'inkbar' | 'card' | 'pill' | 'border'
  headerClass?: string
  headerStyle?: CSSProperties
  bodyClass?: string
  bodyStyle?: CSSProperties
  wrapperClass?: string
  wrapperStyle?: CSSProperties
  contentClass?: string
  contentStyle?: CSSProperties
  labelStyle?: CSSProperties
  labelClass?: string
  activeLabelStyle?: CSSProperties
  activeLabelClass?: string
  inactiveLabelStyle?: CSSProperties
  inactiveLabelClass?: string
  line?: ReactNode
  lineWidth?: string
  lineStyle?: CSSProperties
  lineClass?: string
  scrollWithAnimation?: boolean
  sticky?: boolean
  prepend?: ReactNode
  append?: ReactNode
  swipeable?: boolean
  swiperProps?: SwiperProps
  scrollspy?: boolean
  duration?: number
  threshold?: number
  offset?: number
  vertical?: boolean
}

export interface TabsFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<TabsProps> & RefAttributes<TabsRef>
  > {
  Pane: typeof TabsPane
}

export const Tabs: TabsFC = forwardRef((props, ref) => {
  const {
    className,
    children,
    defaultActiveKey,
    activeKey,
    onChange,
    onLabelClick,
    inkbarWrapperStyle,
    inkbarWidth = '40px',
    inkbarStyle,
    inkbar,
    scrollCount = 5,
    type = 'inkbar',
    headerClass,
    headerStyle,
    bodyClass,
    bodyStyle,
    wrapperClass,
    wrapperStyle,
    contentClass,
    contentStyle,
    labelStyle,
    labelClass,
    activeLabelStyle,
    activeLabelClass,
    inactiveLabelStyle,
    inactiveLabelClass,
    line,
    lineWidth,
    lineStyle,
    lineClass,
    scrollWithAnimation = true,
    sticky,
    prepend,
    append,
    swipeable = false,
    swiperProps,
    scrollspy,
    duration = 300,
    threshold = 150,
    offset = 0,
    vertical = false,
    ...restProps
  } = props

  const pageScrollTop = useRef(0)
  usePageScroll((res) => {
    pageScrollTop.current = res.scrollTop
  })

  const initialActiveKey = useMemo(() => {
    let firstPane = children
    if (Array.isArray(firstPane)) {
      firstPane = firstPane[0]
    }
    return activeKey ?? defaultActiveKey ?? firstPane?.key ?? 0
  }, [])

  const [innerActiveKey, setInnerActiveKey] = useState<number | string>(
    initialActiveKey,
  )

  // 受控
  useEffect(() => {
    if (!scrollspy && activeKey !== undefined) {
      setInnerActiveKey(activeKey)
    }
  }, [activeKey])

  // # label
  const labelMap = useIndexableMap<number | string, TabLabelRef>([])

  const [scrollLeft, setScrollLeft] = useState(0)
  const [scrollTop, setScrollTop] = useState(0)
  const labelWrapperId = useSelectorId()
  const labelContentId = useSelectorId()
  const [inkbarInnerStyle, setInkbarInnerStyle] = useState(null)
  const [inkbarWrapperInnerStyle, setInkbarWrapperInnerStyle] = useState(null)

  const setLabelStyle = () => {
    let wrapperWidth = 0
    let wrapperHeight = 0
    let contentTop = 0
    let contentLeft = 0
    let labelWidth = 0
    let labelHeight = 0
    let labelTop = 0
    let labelLeft = 0

    const labelEl = labelMap.get(innerActiveKey)

    async function getFieldsData() {
      const wrapperRes = await getRectById(labelWrapperId, {
        size: true,
      })

      const contentRes = await getRectById(labelContentId, {
        rect: true,
      })

      const labelRes = await labelEl.getFields()

      if (!wrapperRes || !contentRes || !labelRes) {
        throw Error
      }

      wrapperWidth = wrapperRes.width
      wrapperHeight = wrapperRes.height

      contentTop = contentRes.top
      contentLeft = contentRes.left

      labelWidth = labelRes.width
      labelHeight = labelRes.height
      labelTop = labelRes.top
      labelLeft = labelRes.left
    }

    function setStyle() {
      const wrapperSize = vertical ? wrapperHeight : wrapperWidth
      const labelSize = vertical ? labelHeight : labelWidth
      const labelOffset = vertical
        ? labelTop - contentTop
        : labelLeft - contentLeft
      const nextScroll = labelOffset - (wrapperSize / 2 - labelSize / 2)

      if (vertical) {
        setScrollTop(nextScroll)
      } else {
        setScrollLeft(nextScroll)
      }

      if (type === 'inkbar') {
        setInkbarWrapperInnerStyle({
          opacity: 1,
          [vertical ? 'top' : 'left']: labelOffset + labelSize / 2,
        })
        setInkbarInnerStyle({
          [vertical ? 'height' : 'width']:
            inkbarWidth === 'auto' ? labelSize : inkbarWidth,
        })
      }
    }

    if (labelEl && (type === 'inkbar' || type === 'pill' || type === 'card')) {
      getFieldsData()
        .then(() => {
          setStyle()
        })
        .catch(() => {
          void 0
        })
    }
  }

  // 处理activeKey不变，label改变的情况
  const [resetRefLabelStyle] = useSetTimeout(() => {
    const labelEl = labelMap.get(innerActiveKey)
    if (labelEl) {
      setLabelStyle()
    }
  }, 50)
  useEffect(() => {
    resetRefLabelStyle()
  }, [children])

  useResize(
    () => {
      setLabelStyle()
    },
    150,
    {
      leading: false,
    },
  )

  const [resetKeyLabelStyle] = useSetTimeout(() => {
    const labelEl = labelMap.get(innerActiveKey)
    if (labelEl) {
      setLabelStyle()
    }
  }, 50)
  useEffect(() => {
    resetKeyLabelStyle()
  }, [innerActiveKey])

  const inkbarWrapperRef = useRef<HTMLElement>()
  useEffect(() => {
    if (
      type === 'inkbar' &&
      initialActiveKey !== innerActiveKey &&
      inkbarWrapperRef.current
    ) {
      inkbarWrapperRef.current.style.transitionDuration = '0.3s'
    }
  }, [innerActiveKey])

  const popoutContext = useContext(PopoutContext)
  const visible = popoutContext?.visible

  const [resetPopoutVisible] = useSetTimeout(() => {
    setLabelStyle()
  }, 50)
  useEffect(() => {
    if (visible) {
      resetPopoutVisible()
    }
  }, [visible])

  // # pane
  const paneMap = useIndexableMap<number | string, string>([])
  const lockScroll = useRef(false)

  const [reset] = useSetTimeout(() => {
    lockScroll.current = false
  }, duration + 100) // 确保比滚动时间长

  const scrollTo = useEvent((key: number | string, animated = true) => {
    if (!scrollspy) {
      return
    }

    const id = paneMap.get(key)

    if (id) {
      reset()
      lockScroll.current = true

      getRectById(id, { rect: true }).then((res) => {
        Taro.pageScrollTo({
          scrollTop: pageScrollTop.current + res.top + offset,
          duration: animated ? duration : 0,
        })
      })
    }
  })

  useScroll(
    () => {
      if (!scrollspy || lockScroll.current) {
        return
      }
      const srcData = paneMap.data
      matchScrollVisible(
        srcData.map((item) => item[1]),
        (index) => {
          setInnerActiveKey(srcData[index][0])
        },
        -offset,
      )
    },
    threshold,
    {
      leading: false,
    },
  )

  // # swiper
  const [swiperCurrent, setSwiperCurrent] = useState(0)

  const [resetSwiperCurrent] = useSetTimeout(() => {
    setSwiperCurrent(labelMap.getIndexByKey(innerActiveKey))
  }, 50)
  useEffect(() => {
    // 确保 SwiperItem 渲染完毕
    resetSwiperCurrent()
  }, [innerActiveKey])

  const handleSwiperChange = useEvent((event) => {
    const index = event.detail.current
    const key = labelMap.getKeyByIndex(index)
    setInnerActiveKey(key)
    onChange?.(key)
  })

  const [swiperDuration, setSwiperDuration] = useState(0)

  const [resetSwiperDuration] = useSetTimeout(() => {
    setSwiperDuration(300)
  }, 150)
  useEffect(() => {
    // 初次不显示过渡效果
    resetSwiperDuration()
  }, [])

  // # public
  const switchTo = useEvent((key: number | string, animated?: boolean) => {
    if (key !== innerActiveKey) {
      // 非受控
      if (scrollspy || activeKey === undefined) {
        setInnerActiveKey(key)
      }
      onChange?.(key)
    }
    setSwiperCurrent(labelMap.getIndexByKey(key))
    scrollTo(key, animated)
  })

  const handleLabelClick = (key: number | string) => {
    onLabelClick?.(key)
    switchTo(key, true)
  }

  useImperativeHandle(ref, () => ({
    switchTo,
    setLabelStyle,
  }))

  const tabsClass = classNames(
    'sar-tabs',
    {
      'sar-tabs-auto': Children.count(children) > scrollCount,
      'sar-tabs-sticky': sticky,
      'sar-tabs-is-swiper': swipeable,
      'sar-tabs-scrollspy': scrollspy,
      'sar-tabs-vertical': vertical,
    },
    className,
  )

  const renderInkbar = () => {
    return (
      type === 'inkbar' && (
        <View
          ref={inkbarWrapperRef}
          className="sar-tabs-inkbar-wrapper"
          style={{
            opacity: 0,
            ...inkbarWrapperStyle,
            ...inkbarWrapperInnerStyle,
          }}
        >
          {inkbar || (
            <>
              <View
                className="sar-tabs-inkbar"
                style={{ ...inkbarStyle, ...inkbarInnerStyle }}
              ></View>
            </>
          )}
        </View>
      )
    )
  }

  const renderPane = (Comp: typeof SwiperItem | ExoticComponent) => {
    return Children.map(
      children,
      (element: ReactElement<TabPaneProps & { ref: unknown }>, index) => {
        const innerKey = element.key ?? index

        return (
          <Comp>
            {cloneElement(element, {
              key: innerKey,
              innerKey,
              activeKey: innerActiveKey,
              _onMounted: (id) => paneMap.set(innerKey, id),
            })}
          </Comp>
        )
      },
    )
  }

  return (
    <View {...restProps} className={tabsClass}>
      <View
        className={classNames('sar-tabs-header', headerClass)}
        style={headerStyle}
      >
        {prepend && <View className="sar-tabs-prepend">{prepend}</View>}
        <ScrollView
          scrollX={!vertical}
          scrollY={vertical}
          scrollWithAnimation={scrollWithAnimation}
          scrollIntoViewAlignment="center"
          enablePassive="true"
          enhanced
          showScrollbar={false}
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          className={classNames(
            'sar-tabs-label-wrapper',
            'sar-tabs-label-' + type,
            wrapperClass,
          )}
          style={wrapperStyle}
          id={labelWrapperId}
        >
          <View
            className={classNames('sar-tabs-label-content', contentClass)}
            style={contentStyle}
            id={labelContentId}
          >
            {Children.map(
              children,
              (pane: ReactElement<TabPaneProps>, index: number) => {
                const innerKey = pane.key ?? index

                return (
                  <TabsLabel
                    className={classNames(labelClass, pane.props.labelClass)}
                    style={{
                      ...labelStyle,
                      ...pane.props.labelStyle,
                    }}
                    activeStyle={activeLabelStyle}
                    activeClass={activeLabelClass}
                    inactiveStyle={inactiveLabelStyle}
                    inactiveClass={inactiveLabelClass}
                    disabled={pane.props.disabled}
                    key={innerKey}
                    innerKey={innerKey}
                    activeKey={innerActiveKey}
                    showLine={type === 'card'}
                    line={line}
                    lineWidth={lineWidth}
                    lineStyle={lineStyle}
                    lineClass={lineClass}
                    onClick={handleLabelClick}
                    ref={(el) => {
                      labelMap.set(innerKey, el)
                    }}
                  >
                    {pane.props.label}
                  </TabsLabel>
                )
              },
            )}
            {renderInkbar()}
          </View>
        </ScrollView>
        {append && <View className="sar-tabs-append">{append}</View>}
      </View>
      <View
        className={classNames('sar-tabs-body', bodyClass)}
        style={bodyStyle}
      >
        {swipeable ? (
          <Swiper
            duration={swiperDuration}
            {...swiperProps}
            current={swiperCurrent}
            className={classNames('sar-tabs-swiper', swiperProps?.className)}
            onChange={handleSwiperChange}
          >
            {renderPane(SwiperItem)}
          </Swiper>
        ) : (
          renderPane(Fragment)
        )}
      </View>
    </View>
  )
}) as TabsFC

Tabs.Pane = TabsPane

export default Tabs
