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
import { getRectById, matchScrollVisible, noop } from '../utils'
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
  scrollCount?: number
  type?: 'line' | 'pill' | 'border'
  headerClass?: string
  headerStyle?: CSSProperties
  bodyClass?: string
  bodyStyle?: CSSProperties
  labelStyle?: CSSProperties
  labelClass?: string
  activeLabelStyle?: CSSProperties
  activeLabelClass?: string
  inactiveLabelStyle?: CSSProperties
  inactiveLabelClass?: string
  line?: ReactNode
  lineStyle?: CSSProperties
  lineClass?: string
  scrollWithAnimation?: boolean
  prepend?: ReactNode
  append?: ReactNode
  animated?: boolean
  scrollspy?: boolean
  duration?: number
  threshold?: number
  offset?: number
  direction?: 'horizontal' | 'vertical'
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
    scrollCount = 5,
    type = 'line',
    headerClass,
    headerStyle,
    bodyClass,
    bodyStyle,
    labelStyle,
    labelClass,
    activeLabelStyle,
    activeLabelClass,
    inactiveLabelStyle,
    inactiveLabelClass,
    line,
    lineStyle,
    lineClass,
    scrollWithAnimation = true,
    prepend,
    append,
    animated,
    scrollspy,
    duration = 300,
    threshold = 150,
    offset = 0,
    direction = 'horizontal',
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

      const labelRes = await labelEl.getRect()

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
      const isVertical = direction === 'vertical'
      const wrapperSize = isVertical ? wrapperHeight : wrapperWidth
      const labelSize = isVertical ? labelHeight : labelWidth
      const labelOffset = isVertical
        ? labelTop - contentTop
        : labelLeft - contentLeft
      const nextScroll = labelOffset - (wrapperSize / 2 - labelSize / 2)

      if (isVertical) {
        setScrollTop(nextScroll)
      } else {
        setScrollLeft(nextScroll)
      }
    }

    if (labelEl) {
      getFieldsData()
        .then(() => {
          setStyle()
        })
        .catch(noop)
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
  const [laterAnimated, setLaterAnimated] = useState(!animated)

  const [resetLaterAnimated] = useSetTimeout(() => {
    setLaterAnimated(true)
  }, 200)

  useEffect(() => {
    if (animated) {
      resetLaterAnimated()
    }
  }, [animated])

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
          onMounted: (id) => paneMap.set(innerKey, id),
        })
      },
    )
  }

  const count = Children.count(children)

  return (
    <View
      {...restProps}
      className={classNames(
        bem.b(),
        bem.m('auto', count > scrollCount),
        bem.m('scrollspy', scrollspy),
        bem.m(direction),
        className,
      )}
    >
      <View
        className={classNames(
          bem.e('header'),
          bem.em('header', direction),
          headerClass,
        )}
        style={headerStyle}
      >
        {prepend && <View className={bem.e('prepend')}>{prepend}</View>}
        <ScrollView
          scrollX={!(direction === 'vertical')}
          scrollY={direction === 'vertical'}
          scrollWithAnimation={scrollWithAnimation}
          scrollIntoViewAlignment="center"
          enablePassive="true"
          enhanced
          showScrollbar={false}
          scrollLeft={scrollLeft}
          scrollTop={scrollTop}
          className={classNames(
            bem.e('container'),
            bem.em('container', direction),
          )}
          id={labelWrapperId}
        >
          <View
            className={classNames(
              bem.e('wrapper'),
              bem.em('wrapper', direction),
            )}
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
                    type={type}
                    line={line}
                    lineStyle={lineStyle}
                    lineClass={lineClass}
                    onClick={handleLabelClick}
                    index={index}
                    count={count}
                    ref={(el) => {
                      labelMap.set(innerKey, el)
                    }}
                    autoScroll={count > scrollCount}
                    direction={direction}
                  >
                    {pane.props.label}
                  </TabsLabel>
                )
              },
            )}
          </View>
        </ScrollView>
        {append && <View className={bem.e('append')}>{append}</View>}
      </View>
      <View
        className={classNames(
          bem.e('body'),
          bem.em('body', direction),
          bem.em('body', 'animated', animated),
          bodyClass,
        )}
        style={bodyStyle}
      >
        <View
          className={classNames(
            bem.e('body-wrapper'),
            bem.em('body-wrapper', 'animated', animated),
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
