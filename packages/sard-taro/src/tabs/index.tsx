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
} from 'react'
import classNames from 'classnames'
import {
  BaseEventOrig,
  CustomWrapper,
  ScrollView,
  ScrollViewProps,
  View,
} from '@tarojs/components'
import {
  useEvent,
  useSelectorId,
  useBem,
  useControllableValue,
  useSetTimeout,
  useForceRender,
} from '../use'
import { getRectById, getScrollIntoViewValue, isNumber } from '../utils'
import { AnyFunction, BaseProps } from '../base'
import { TabsTab, TabsTabProps } from './Tab'

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

  useEffect(() => {
    setTabStyle(innerActiveKey)
  }, [innerActiveKey])

  const [resetSetLineStyle] = useSetTimeout(() => {
    setTabStyle(innerActiveKey, true)
  }, 150)

  useEffect(() => {
    if (showLine) {
      resetSetLineStyle()
    }
  }, [children])

  const forceRender = useForceRender()

  const scrollLeft = useRef(0)

  const setScrollLeft = useEvent((left: number) => {
    scrollLeft.current = left
    forceRender()
  })

  const handleScroll = useEvent(
    (event: BaseEventOrig<ScrollViewProps.onScrollDetail>) => {
      scrollLeft.current = event.detail.scrollLeft
    },
  )

  const contextId = useSelectorId()
  const scrollId = useSelectorId()
  const wrapperId = useSelectorId()

  const tabKeyIdMap = useRef<Record<string, string>>({})

  const notSetLineStyleYet = useRef(true)

  const stopScroll = useRef<AnyFunction>()

  const [resetTranslate, clearTranslate, translateRunning] = useSetTimeout(
    (scrollLeft: number) => {
      setScrollLeft(scrollLeft)
      clearWrapperStyle()
    },
    duration,
  )

  const [wrapperStyle, setWrapperStyle] = useState({})
  const [innerLineStyle, setLineStyle] = useState({})

  const clearWrapperStyle = () => {
    setWrapperStyle({
      transform: '',
      transition: '',
      touchAction: '',
      paddingRight: '',
    })
  }

  const setTabStyle = async (key: string | number, onlyLine?: boolean) => {
    const tabId = tabKeyIdMap.current[key]
    if (!tabId) {
      return
    }

    await stopScroll.current?.()

    let scrollRect = await getRectById(scrollId, contextId)
    // 开发者工具中，可能出现首次获取不到的情况
    if (!scrollRect) {
      scrollRect = await getRectById(scrollId, contextId)
    }

    // 组件或其父组件被隐藏导致位置尺寸值为0
    if (!scrollRect || scrollRect.width === 0) {
      return
    }
    const wrapperRect = await getRectById(wrapperId, contextId)
    const tabRect = await getRectById(tabId, contextId)

    // 确保要处理的值存在
    if (!wrapperRect || !tabRect) {
      return
    }

    // line
    if (showLine) {
      const lineLeft = tabRect.left - wrapperRect.left + tabRect.width / 2
      setLineStyle({
        transform: `translate3d(${lineLeft}px,0,0) translateX(-50%)`,
        transition: `transform ${
          notSetLineStyleYet.current ? 0 : duration
        }ms ease-out 0s`,
        opacity: 1,
      })
      notSetLineStyleYet.current = false

      if (onlyLine) {
        return
      }
    }

    // scroll
    {
      const originalScrollLeft = scrollRect.left - wrapperRect.left

      const scrollLeft = getScrollIntoViewValue(
        scrollRect.width,
        originalScrollLeft,
        tabRect.width,
        tabRect.left - wrapperRect.left,
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

      setWrapperStyle({
        transform: `translate3d(${offset}px,0,0)`,
        transition: `transform ${duration}ms ease-out 0s`,
        touchAction: 'none',
        // 可以解决部分机型滚到最后半屏时闪烁的问题
        paddingRight: 1000,
      })

      resetTranslate(scrollLeft)

      stopScroll.current = async () => {
        if (translateRunning()) {
          clearTranslate()

          const wrapperRect = await getRectById(wrapperId, contextId)
          const scrollRect = await getRectById(scrollId, contextId)
          const urgentScrollLeft = scrollRect.left - wrapperRect.left

          clearWrapperStyle()
          setScrollLeft(urgentScrollLeft)
        }
      }
    }
  }

  const handleTabSelect = (key: number | string) => {
    setInnerActiveKey(key)
  }

  return (
    <CustomWrapper id={contextId}>
      <View {...restProps} className={classNames(bem.b(), className)}>
        <ScrollView
          scrollX
          scrollWithAnimation={false}
          enablePassive="true"
          enhanced
          showScrollbar={false}
          scrollLeft={scrollLeft.current}
          onScroll={handleScroll}
          className={classNames(bem.e('scroll'))}
          id={scrollId}
        >
          <View className={bem.e('container')}>
            <View
              className={classNames(bem.e('wrapper'))}
              style={wrapperStyle}
              id={wrapperId}
            >
              {Children.map(
                children,
                (element: ReactElement<TabsTabProps>, index: number) => {
                  const key = element.key ?? String(index)
                  const isActive = key === innerActiveKey

                  return cloneElement(element, {
                    privateKey: key,
                    onSelect: handleTabSelect,
                    isActive,
                    scrollable,
                    className: classNames(
                      element.props.className,
                      isActive ? activeClass : inactiveClass,
                    ),
                    style: {
                      ...element.props.style,
                      ...(isActive ? activeStyle : inactiveStyle),
                    },
                    onMounted(id) {
                      tabKeyIdMap.current[key] = id
                    },
                    onUnMounted() {
                      delete tabKeyIdMap.current[key]
                    },
                  })
                },
              )}
              {showLine && (
                <View
                  className={classNames(bem.e('line'), lineClass)}
                  style={{
                    ...innerLineStyle,
                    ...lineStyle,
                  }}
                >
                  {line}
                </View>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </CustomWrapper>
  )
}

Tabs.Tab = TabsTab

export default Tabs
