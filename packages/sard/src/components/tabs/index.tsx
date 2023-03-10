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
  useCallback,
} from 'react'
import classNames from 'classnames'
import {
  useIndexableMap,
  useScroll,
  useSetTimeout,
  useEvent,
  useResize,
} from '../../use'
import { Swiper, SwiperItem, SwiperProps, SwiperRef } from '../swiper'

import { TabPane, TabPaneProps } from './Pane'
import { TabLabel } from './Label'
import { matchScrollVisible } from '../../utils'
import { pageScrollTop } from '../../utils/dom'

export * from './Pane'

export interface TabsRef {
  scrollTo: (innerKey: number | string, animated?: boolean) => void
  setInkbarStyle: () => void
}

export interface TabsProps {
  className?: string
  style?: CSSProperties
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
  labelStyle?: CSSProperties
  labelClass?: string
  activeLabelStyle?: CSSProperties
  line?: ReactNode
  lineWidth?: string
  lineStyle?: CSSProperties
  sticky?: boolean
  prepend?: ReactNode
  append?: ReactNode
  animated?: boolean
  swipeable?: boolean
  swiperProps?: SwiperProps
  scrollspy?: boolean
  offset?: number
  vertical?: boolean
}

export interface TabsFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<TabsProps> & RefAttributes<TabsRef>
  > {
  Pane: typeof TabPane
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
    labelStyle,
    labelClass,
    activeLabelStyle,
    line,
    lineWidth,
    lineStyle,
    sticky,
    prepend,
    append,
    animated = false,
    swipeable = false,
    swiperProps,
    scrollspy,
    offset = 0,
    vertical = false,
    ...restProps
  } = props

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

  const activeLabel = useRef<HTMLElement>()

  const wrapperRef = useRef<HTMLDivElement>()
  const inkbarWrapperRef = useRef<HTMLElement>()
  const inkbarRef = useRef<HTMLElement>()
  const inkbarCbRef = useCallback((node) => {
    inkbarRef.current = node
    inkbarResizeObserver(node)
  }, [])

  const resizeObserver = useRef<ResizeObserver>()

  // 解决祖先不显示时无法获取墨水条宽高的问题
  const inkbarResizeObserver = (node: HTMLElement | null) => {
    resizeObserver.current?.disconnect()
    if (node) {
      resizeObserver.current = new ResizeObserver((entries) => {
        for (const entry of entries) {
          if (entry.contentRect.width > 0 && entry.contentRect.height > 0) {
            setInkbarStyle()
          }
        }
      })

      resizeObserver.current.observe(node)
    }
  }

  const swiperRef = useRef<SwiperRef>(null)

  const labelMap = useIndexableMap<number | string, HTMLElement>([])

  const activeIndex = useMemo(() => {
    const index = labelMap.getIndexByKey(innerActiveKey)
    return index === -1 ? 0 : index
  }, [innerActiveKey])

  // 受控
  useEffect(() => {
    if (!scrollspy && activeKey !== undefined) {
      setInnerActiveKey(activeKey)
    }
  }, [activeKey])

  useEffect(() => {
    const label = labelMap.get(innerActiveKey)

    if (wrapperRef.current && label) {
      swiperRef.current?.swipeTo(labelMap.getIndexByKey(innerActiveKey))

      wrapperRef.current.scrollTo({
        left:
          label.offsetLeft -
          (wrapperRef.current.offsetWidth - label.offsetWidth) / 2,
        behavior: 'smooth',
      })
    }
  }, [innerActiveKey])

  const handleSwiperChange = useEvent((index: number) => {
    const key = labelMap.getKeyByIndex(index)
    setInnerActiveKey(key)
    onChange?.(key)
  })

  const setInkbarStyle = () => {
    const wrapper = wrapperRef.current
    const currentLabel = activeLabel.current
    const inkbar = inkbarRef.current
    const inkbarWrapper = inkbarWrapperRef.current

    if (wrapper && currentLabel && wrapper.offsetWidth > 0) {
      const wWidth = wrapper[vertical ? 'offsetHeight' : 'offsetWidth']
      const cWidth = currentLabel[vertical ? 'offsetHeight' : 'offsetWidth']
      const oLeft = currentLabel[vertical ? 'offsetTop' : 'offsetLeft']
      const sLeft = oLeft - (wWidth / 2 - cWidth / 2)

      wrapper.scrollTo({
        [vertical ? 'top' : 'left']: sLeft,
        behavior: 'smooth',
      })

      if (inkbarWrapper) {
        inkbarWrapper.style[vertical ? 'top' : 'left'] =
          oLeft + cWidth / 2 + 'px'
      }
      if (inkbar) {
        inkbar.style[vertical ? 'height' : 'width'] =
          inkbarWidth === 'auto' ? cWidth + 'px' : inkbarWidth
      }
    }
  }

  useEffect(() => {
    if (wrapperRef.current) {
      activeLabel.current = labelMap.get(innerActiveKey)
    }

    setInkbarStyle()
  }, [innerActiveKey])

  useResize(
    () => {
      setInkbarStyle()
    },
    150,
    {
      leading: false,
    },
  )

  useEffect(() => {
    if (
      type === 'inkbar' &&
      initialActiveKey !== innerActiveKey &&
      inkbarWrapperRef.current
    ) {
      inkbarWrapperRef.current.style.transitionDuration = '0.3s'
    }
  }, [innerActiveKey])

  const paneMap = useIndexableMap<any, HTMLElement>([])
  const lockScroll = useRef(false)

  const { reset } = useSetTimeout(() => {
    lockScroll.current = false
  }, 500)

  const scrollTo = (key: number | string, animated = true) => {
    if (!scrollspy) {
      return
    }

    const el = paneMap.get(key)

    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset

      reset()
      lockScroll.current = true
      pageScrollTop(top, animated)
    }
  }

  const switchTo = (key: number | string, animated?: boolean) => {
    if (key !== innerActiveKey) {
      // 非受控
      if (scrollspy || activeKey === undefined) {
        setInnerActiveKey(key)
      }
      onChange?.(key)
    }
    scrollTo(key, animated)
  }

  const handleLabelClick = (key: number | string) => {
    onLabelClick?.(key)
    switchTo(key, true)
  }

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
        offset,
      )
    },
    150,
    {
      leading: false,
    },
  )

  useImperativeHandle(ref, () => ({
    scrollTo(key: number | string, animated?: boolean) {
      switchTo(key, animated)
    },
    setInkbarStyle,
  }))

  const tabsClass = classNames(
    's-tab',
    {
      's-tab-auto': Children.count(children) > scrollCount,
      's-tab-sticky': sticky,
      's-tab-is-swiper': animated || swipeable,
      's-tab-scrollspy': scrollspy,
      's-tab-vertical': vertical,
    },
    className,
  )

  const renderInkbar = () => {
    return (
      type === 'inkbar' && (
        <div
          ref={inkbarWrapperRef as any}
          className="s-tab-inkbar-wrapper"
          style={inkbarWrapperStyle}
        >
          {inkbar || (
            <div
              className="s-tab-inkbar"
              ref={inkbarCbRef}
              style={inkbarStyle}
            ></div>
          )}
        </div>
      )
    )
  }

  const renderPane = (Comp: SwiperItem | ExoticComponent) => {
    return Children.map(
      children,
      (element: ReactElement<TabPaneProps & { ref: any }>, index) => {
        const key = element.key ?? index

        return (
          <Comp>
            {cloneElement(element, {
              key,
              innerKey: key,
              activeKey: innerActiveKey,
              ref: (el: any) => paneMap.set(key, el),
            })}
          </Comp>
        )
      },
    )
  }

  return (
    <div {...(restProps as any)} className={tabsClass}>
      <div
        className={classNames('s-tab-header', headerClass)}
        style={headerStyle}
      >
        {prepend && <div className="s-tab-prepend">{prepend}</div>}
        <div
          className={classNames(
            's-tab-label-wrapper',
            's-tab-label-' + type,
            wrapperClass,
          )}
          style={wrapperStyle}
          ref={wrapperRef}
        >
          {Children.map(
            children,
            (pane: ReactElement<TabPaneProps>, index: number) => {
              const innerKey = pane.key ?? index

              return (
                <TabLabel
                  className={classNames(labelClass, pane.props.labelClass)}
                  style={{
                    ...labelStyle,
                    ...pane.props.labelStyle,
                  }}
                  activeStyle={activeLabelStyle}
                  disabled={pane.props.disabled}
                  key={innerKey}
                  innerKey={innerKey}
                  activeKey={innerActiveKey}
                  ref={(el) => labelMap.set(innerKey, el)}
                  showLine={type === 'card'}
                  line={line}
                  lineWidth={lineWidth}
                  lineStyle={lineStyle}
                  onClick={handleLabelClick}
                >
                  {pane.props.label}
                </TabLabel>
              )
            },
          )}
          {renderInkbar()}
        </div>
        {append && <div className="s-tab-append">{append}</div>}
      </div>
      <div className={classNames('s-tab-body', bodyClass)} style={bodyStyle}>
        {animated || swipeable ? (
          <Swiper
            duration={300}
            {...swiperProps}
            ref={swiperRef}
            defaultIndex={activeIndex}
            onChange={handleSwiperChange}
            touchable={swipeable}
          >
            {renderPane(SwiperItem)}
          </Swiper>
        ) : (
          renderPane(Fragment)
        )}
      </div>
    </div>
  )
}) as TabsFC

Tabs.Pane = TabPane

export default Tabs
