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
  useBem,
} from '../use'

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
  animated?: boolean
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
    animated,
    scrollspy,
    duration = 300,
    threshold = 150,
    offset = 0,
    vertical = false,
    ...restProps
  } = props

  const [bem] = useBem('tabs')

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
      const wrapperRes = await getRectById(labelWrapperId)

      const contentRes = await getRectById(labelContentId)

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

      getRectById(id).then((res) => {
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

  // # public
  const switchTo = useEvent((key: number | string, animated?: boolean) => {
    if (key !== innerActiveKey) {
      // 非受控
      if (scrollspy || activeKey === undefined) {
        setInnerActiveKey(key)
      }
      onChange?.(key)
    }
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

  // 避免初次渲染滑动效果
  const [laterAnimated, setLaterAnimated] = useState(false)

  const [resetLaterAnimated] = useSetTimeout(() => {
    setLaterAnimated(true)
  }, 200)

  useEffect(() => {
    if (animated) {
      resetLaterAnimated()
    }
  }, [animated])

  const renderInkbar = () => {
    return (
      type === 'inkbar' && (
        <View
          className={classNames(
            bem.e('inkbar-wrapper'),
            bem.em('inkbar-wrapper', 'vertical', vertical),
          )}
          style={{
            opacity: 0,
            transitionDuration: !laterAnimated ? '0s' : '',
            ...inkbarWrapperStyle,
            ...inkbarWrapperInnerStyle,
          }}
        >
          {inkbar || (
            <>
              <View
                className={classNames(
                  bem.e('inkbar'),
                  bem.em('inkbar', 'vertical', vertical),
                )}
                style={{ ...inkbarStyle, ...inkbarInnerStyle }}
              ></View>
            </>
          )}
        </View>
      )
    )
  }

  const renderPane = () => {
    return Children.map(
      children,
      (element: ReactElement<TabPaneProps & { ref: unknown }>, index) => {
        const innerKey = element.key ?? index

        return cloneElement(element, {
          key: innerKey,
          innerKey,
          activeKey: innerActiveKey,
          className: classNames(
            bem.e('pane'),
            bem.em(
              'pane',
              'hide',
              !animated && !scrollspy && innerKey !== innerActiveKey,
            ),
          ),
          _onMounted: (id) => paneMap.set(innerKey, id),
        })
      },
    )
  }

  return (
    <View
      {...restProps}
      className={classNames(
        bem.b(),
        bem.m('auto', Children.count(children) > scrollCount),
        bem.m('sticky', sticky),
        bem.m('scrollspy', scrollspy),
        bem.m('vertical', vertical),
        className,
      )}
    >
      <View
        className={classNames(
          bem.e('header'),
          bem.em('header', 'vertical', vertical),
          bem.em('header', 'sticky', sticky),
          headerClass,
        )}
        style={headerStyle}
      >
        {prepend && <View className={bem.e('prepend')}>{prepend}</View>}
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
            bem.e('label-wrapper'),
            bem.em('label-wrapper', type),
            bem.em('label-wrapper', 'vertical', vertical),
            wrapperClass,
          )}
          style={wrapperStyle}
          id={labelWrapperId}
        >
          <View
            className={classNames(
              bem.e('label-content'),
              bem.em('label-content', 'vertical', vertical),
              contentClass,
            )}
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
                    type={type}
                    line={line}
                    lineWidth={lineWidth}
                    lineStyle={lineStyle}
                    lineClass={lineClass}
                    onClick={handleLabelClick}
                    later={index > 0}
                    ref={(el) => {
                      labelMap.set(innerKey, el)
                    }}
                    autoScroll={Children.count(children) > scrollCount}
                    vertical={vertical}
                  >
                    {pane.props.label}
                  </TabsLabel>
                )
              },
            )}
            {renderInkbar()}
          </View>
        </ScrollView>
        {append && <View className={bem.e('append')}>{append}</View>}
      </View>
      <View
        className={classNames(
          bem.e('body'),
          bem.em('body', 'vertical', vertical),
          bem.em('body', 'animated', animated),
          bodyClass,
        )}
        style={bodyStyle}
      >
        <View
          className={classNames(
            bem.e('wrapper'),
            bem.em('wrapper', 'animated', animated),
          )}
          style={{
            transform: animated
              ? `translateX(-${labelMap.getIndexByKey(innerActiveKey) * 100}%)`
              : '',
            transitionDuration: !laterAnimated ? '0s' : '',
          }}
        >
          {renderPane()}
        </View>
      </View>
    </View>
  )
}) as TabsFC

Tabs.Pane = TabsPane

export default Tabs
