import {
  Children,
  CSSProperties,
  ReactElement,
  cloneElement,
  useRef,
  forwardRef,
  ForwardRefExoticComponent,
  useImperativeHandle,
  useEffect,
  PropsWithoutRef,
  RefAttributes,
  ReactNode,
  useMemo,
  useCallback,
} from 'react'
import classNames from 'classnames'
import { View } from '@tarojs/components'

import { IndexBarItem, IndexBarItemProps } from './Item'
import {
  useIndexableMap,
  useSetTimeout,
  useEvent,
  useBem,
  useThrottle,
  useSelectorId,
} from '../use'
import { matchScrollVisible, getRectByElement, NodeRect, isRN } from '../utils'
import { BaseProps } from '../base'
import IndexBarNav, { NavRef } from './Nav'
import ScrollView, { ScrollViewProps, ScrollViewRef } from '../scroll-view'
import CustomWrapper from '../custom-wrapper'

export * from './Item'

export interface IndexBarProps extends BaseProps {
  defaultActiveKey?: number | string
  onChange?: (key: number | string) => void
  anchorClass?: string
  anchorStyle?: CSSProperties
  threshold?: number
}

export interface IndexBarRef {
  scrollTo: (key: number | string) => void
}

export interface IndexBarFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<IndexBarProps> & RefAttributes<IndexBarRef>
  > {
  Item: typeof IndexBarItem
}

export const IndexBar: IndexBarFC = forwardRef<IndexBarRef, IndexBarProps>(
  (props, ref) => {
    const {
      className,
      style,
      children,

      defaultActiveKey,
      onChange,
      anchorClass,
      anchorStyle,
      threshold = 150,
      ...restProps
    } = props

    const [bem] = useBem('index-bar')

    const keyList = useMemo(() => {
      return (
        Children.map(
          children,
          (element: ReactElement<IndexBarItemProps>, index) => {
            return (element.key as number | string) ?? index
          },
        ) || []
      )
    }, [children])

    // scroll >>>
    const activeKey = useRef(defaultActiveKey ?? keyList[0])
    const contextId = useSelectorId()
    const indexBarRef = useRef(null)
    const scrollViewRef = useRef<ScrollViewRef>(null)
    const scrollTop = useRef(0)

    const setScrollTop = useCallback((top: number) => {
      scrollTop.current = top
      scrollViewRef.current?.scrollTop(top)
    }, [])

    const scrollThrottleHandler = useThrottle(
      async () => {
        if (lockScroll.current) {
          return
        }

        matchScrollVisible(
          getCurrentItemsRect(),
          (index) => {
            const key = keyList[index]
            if (activeKey.current !== key) {
              activeKey.current = key
              navRef.current?.switchTo(key)
              onChange?.(key)
            }
          },
          {
            isRect: true,
          },
        )
      },
      threshold,
      {
        leading: false,
      },
    )

    const handleScroll = useEvent<Required<ScrollViewProps>['onScroll']>(
      (event) => {
        scrollTop.current = event.y
        scrollThrottleHandler()
      },
    )

    const lockScroll = useRef(false)
    const [unlockLater, cancelUnlock] = useSetTimeout(() => {
      lockScroll.current = false
    }, 300)

    const itemMap = useIndexableMap<
      number | string,
      [element: any, title: ReactNode]
    >([])

    const scrollTo = useEvent(async (key: number | string) => {
      const itemRect = initItemsRect.current[itemMap.getIndexByKey(key)]

      if (itemRect) {
        unlockLater()
        lockScroll.current = true

        activeKey.current = key
        setScrollTop(itemRect.top)
        navRef.current?.switchTo(key)
      }
    })

    const initItemsRect = useRef<{ top: number; bottom: number }[]>([])

    const getInitItemsRect = async () => {
      const indexBarRectTop = (
        await getRectByElement(indexBarRef.current, contextId)
      ).top

      const elements = itemMap.data.map((item) => item[1][0])
      const rects: NodeRect[] = []
      for (let i = 0, l = elements.length; i < l; i++) {
        const rect = await getRectByElement(elements[i], contextId)
        rects.push({
          ...rect,
          top: rect.top - indexBarRectTop,
          bottom: rect.bottom - indexBarRectTop,
        })
      }
      return rects
    }

    const getCurrentItemsRect = () => {
      return initItemsRect.current.map((item) => {
        return {
          ...item,
          top: item.top - scrollTop.current,
          bottom: item.bottom - scrollTop.current,
        }
      })
    }

    const [getRectsLater, cancelGetRects] = useSetTimeout(async () => {
      initItemsRect.current = await getInitItemsRect()
      scrollTo(activeKey.current)
    }, 50)

    useEffect(() => {
      setScrollTop(0)
      if (!isRN) {
        getRectsLater()
      }

      return cancelGetRects
    }, [children])

    useImperativeHandle(
      ref,
      () => ({
        scrollTo,
      }),
      [],
    )
    // <<< scroll

    // >>> nav
    const navRef = useRef<NavRef>(null)

    const handlePanStart = useEvent(() => {
      cancelUnlock()
      lockScroll.current = true
    })

    const handlePanEnd = useEvent(() => {
      unlockLater()
    })

    const handleNavChange = useEvent((key: number | string) => {
      scrollTo(key)
      onChange?.(key)
    })
    // <<< nav

    return (
      <CustomWrapper id={contextId}>
        <View
          {...restProps}
          className={classNames(bem.b(), className)}
          style={style}
          ref={indexBarRef}
        >
          <ScrollView
            contextId={contextId}
            ref={scrollViewRef}
            scrollY
            onScroll={handleScroll}
            className={bem.e('scroll-view')}
          >
            {Children.map(
              children,
              (item: ReactElement<IndexBarItemProps, any>, index: number) => {
                const key = item.key ?? index

                return cloneElement(item, {
                  key,
                  anchorClass: classNames(anchorClass, item.props.anchorClass),
                  anchorStyle: { ...anchorStyle, ...item.props.anchorStyle },
                  ref: (element) => {
                    itemMap.set(key, [element, item.props.title])
                  },
                  ...(isRN
                    ? {
                        onLayout: (event) => {
                          const layout = event.nativeEvent.layout
                          initItemsRect.current[index] = {
                            top: layout.y,
                            bottom: layout.y + layout.height,
                          }
                        },
                      }
                    : null),
                })
              },
            )}
          </ScrollView>

          <IndexBarNav
            ref={navRef}
            items={keyList}
            panStart={handlePanStart}
            panEnd={handlePanEnd}
            onChange={handleNavChange}
          />
        </View>
      </CustomWrapper>
    )
  },
) as IndexBarFC

IndexBar.Item = IndexBarItem

export default IndexBar
