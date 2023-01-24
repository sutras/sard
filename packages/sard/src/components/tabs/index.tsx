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
  scrollTo(name: any, animated?: boolean): void
}

export interface TabsProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  defaultActiveKey?: any
  activeKey?: any
  onChange?: (name: any) => void
  onLabelClick?: (name: any) => void
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

  const [innerName, setInnerName] = useState(() => {
    const firstPane = Children.toArray(
      children,
    )[0] as ReactElement<TabPaneProps>
    return activeKey ?? defaultActiveKey ?? firstPane?.props.name ?? 0
  })

  const wrapperRef = useRef<HTMLElement>()

  const swiperRef = useRef<SwiperRef>(null)

  const labelSet = useMapSet<any, HTMLElement>([])

  // 受控
  useEffect(() => {
    if (!scrollspy && activeKey != null) {
      setInnerName(activeKey)
    }
  }, [activeKey])

  useEffect(() => {
    swiperRef.current?.swipeTo(innerName)

    const label = labelSet.get(innerName)
    if (wrapperRef.current && label) {
      wrapperRef.current.scrollTo({
        left:
          label.offsetLeft -
          (wrapperRef.current.offsetWidth - label.offsetWidth) / 2,
        behavior: 'smooth',
      })
    }
  }, [innerName])

  const handleSwiperChange = useEvent((name: any) => {
    setInnerName(name)
    onChange?.(name)
  })

  const paneSet = useMapSet<any, HTMLElement>([])
  const scrollLock = useRef(false)

  const { reset } = useSetTimeout(() => {
    scrollLock.current = false
  }, 500)

  const scrollTo = (name: any, animated = true) => {
    if (!scrollspy) {
      return
    }

    const el = paneSet.get(name)

    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset

      reset()
      scrollLock.current = true
      pageScrollTop(top, animated)
    }
  }

  const switchTo = (name: any, animated?: boolean) => {
    if (name !== innerName) {
      // 非受控
      if (scrollspy || activeKey == null) {
        setInnerName(name)
      }
      onChange?.(name)
    }
    scrollTo(name, animated)
  }

  const handleLabelClick = (name: any) => {
    onLabelClick?.(name)
    switchTo(name, true)
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
          setInnerName(srcData[index][0])
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
    scrollTo(name: any, animated?: boolean) {
      switchTo(name, animated)
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

  const renderPane = (Comp: SwiperItem | ExoticComponent) => {
    return Children.map(
      children as ReactElement<TabPaneProps>,
      (pane: ReactElement<TabPaneProps>, index: number) => {
        const name = pane.props.name ?? index

        return (
          <Comp>
            {cloneElement(pane, {
              key: name,
              name,
              activeKey: innerName,
              ref: (el: any) => paneSet.set(name, el),
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
          className={classNames('s-tab-label-wrapper', wrapperClass)}
          style={wrapperStyle}
          ref={wrapperRef as any}
        >
          {Children.map(
            children as ReactElement<TabPaneProps>,
            (pane: ReactElement<TabPaneProps>, index: any) => {
              const name = pane.props.name ?? index

              return (
                <TabLabel
                  key={name}
                  className={classNames(labelClass, pane.props.labelClass)}
                  style={{
                    ...labelStyle,
                    ...pane.props.labelStyle,
                  }}
                  activeStyle={activeLabelStyle}
                  disabled={pane.props.disabled}
                  name={name}
                  activeKey={innerName}
                  ref={(el: any) => labelSet.set(name, el)}
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
      </div>
      <div className={classNames('s-tab-body', bodyClass)} style={bodyStyle}>
        {animated || swipeable ? (
          <Swiper
            {...Object.assign({ duration: 300 }, swiperProps)}
            ref={swiperRef}
            defaultIndex={innerName}
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
