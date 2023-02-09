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
} from 'react'
import classNames from 'classnames'
import { CommonComponentProps } from '../../utils/types'
import { useMapSet, useScroll, useSetTimeout, useEvent } from '../../use'
import { Swiper, SwiperItem, SwiperProps, SwiperRef } from '../swiper'

import { TabPane, TabPaneProps } from './Pane'
import { TabLabel } from './Label'
import { matchScrollVisible } from '../../utils'
import { pageScrollTop } from '../../utils/dom'

export * from './Pane'

export interface TabsRef {
  scrollTo(innerKey: number | string, animated?: boolean): void
}

export interface TabsProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactElement | ReactElement[]
  defaultActiveKey?: number | string
  activeKey?: number | string
  onChange?: (key: number | string) => void
  onLabelClick?: (key: number | string) => void
  scrollCount?: number
  type?: 'line' | 'card' | 'pill' | 'border'
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
    scrollCount = 5,
    type = 'line',
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

  const [innerActiveKey, setInnerActiveKey] = useState<number | string>(() => {
    let firstPane = children
    if (Array.isArray(firstPane)) {
      firstPane = firstPane[0]
    }
    return activeKey ?? defaultActiveKey ?? firstPane?.key ?? 0
  })

  const wrapperRef = useRef<HTMLDivElement>()

  const swiperRef = useRef<SwiperRef>(null)

  const labelSet = useMapSet<number | string, HTMLElement>([])

  const activeIndex = useMemo(() => {
    const index = labelSet.getIndexByName(innerActiveKey)
    return index === -1 ? 0 : index
  }, [innerActiveKey])

  // 受控
  useEffect(() => {
    if (!scrollspy && activeKey != null) {
      setInnerActiveKey(activeKey)
    }
  }, [activeKey])

  useEffect(() => {
    const label = labelSet.get(innerActiveKey)
    if (wrapperRef.current && label) {
      swiperRef.current?.swipeTo(labelSet.getIndexByName(innerActiveKey))

      wrapperRef.current.scrollTo({
        left:
          label.offsetLeft -
          (wrapperRef.current.offsetWidth - label.offsetWidth) / 2,
        behavior: 'smooth',
      })
    }
  }, [innerActiveKey])

  const handleSwiperChange = useEvent((index: number) => {
    const key = labelSet.getKeyByIndex(index)
    setInnerActiveKey(key)
    onChange?.(key)
  })

  const paneSet = useMapSet<any, HTMLElement>([])
  const scrollLock = useRef(false)

  const { reset } = useSetTimeout(() => {
    scrollLock.current = false
  }, 500)

  const scrollTo = (key: number | string, animated = true) => {
    if (!scrollspy) {
      return
    }

    const el = paneSet.get(key)

    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset

      reset()
      scrollLock.current = true
      pageScrollTop(top, animated)
    }
  }

  const switchTo = (key: number | string, animated?: boolean) => {
    if (key !== innerActiveKey) {
      // 非受控
      if (scrollspy || activeKey == null) {
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
      if (!scrollspy || scrollLock.current) {
        return
      }
      const srcData = paneSet.getData()
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
  }))

  const tabsClass = classNames(
    's-tab',
    's-tab-' + type,
    {
      's-tab-auto': Children.count(children) > scrollCount,
      's-tab-sticky': sticky,
      's-tab-is-swiper': animated || swipeable,
      's-tab-scrollspy': scrollspy,
      's-tab-vertical': vertical,
    },
    className,
  )

  const renderLine = () => {
    if (Children.count(children) > scrollCount || type !== 'line') {
      return null
    }
    return null
  }

  const renderPane = (Comp: SwiperItem | ExoticComponent) => {
    return Children.map(children, (element, index) => {
      const key = element.key ?? index

      return (
        <Comp>
          {cloneElement(element, {
            key,
            innerKey: key,
            activeKey: innerActiveKey,
            ref: (el: any) => paneSet.set(key, el),
          })}
        </Comp>
      )
    })
  }

  return (
    <div {...(restProps as any)} className={tabsClass}>
      <div
        className={classNames('s-tab-header', headerClass)}
        style={headerStyle}
      >
        {prepend && <div className="s-tab-prepend">{prepend}</div>}
        <div
          className={classNames('s-tab-label-wrapper', wrapperClass)}
          style={wrapperStyle}
          ref={wrapperRef}
        >
          {Children.map(
            children as ReactElement<TabPaneProps>,
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
                  ref={(el) => labelSet.set(innerKey, el)}
                  showLine={type === 'card' || type === 'line'}
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
        </div>
        {append && <div className="s-tab-append">{append}</div>}
        {renderLine()}
      </div>
      <div className={classNames('s-tab-body', bodyClass)} style={bodyStyle}>
        {animated || swipeable ? (
          <Swiper
            {...Object.assign({ duration: 300 }, swiperProps)}
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
