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
  useState,
  PropsWithoutRef,
  RefAttributes,
  ReactNode,
} from 'react'
import Taro, { usePageScroll } from '@tarojs/taro'
import { View } from '@tarojs/components'
import classNames from 'classnames'

import { IndexBarItem, IndexBarItemProps } from './Item'
import {
  useIndexableMap,
  useScroll,
  useSetTimeout,
  useEvent,
  useControllableValue,
  useSelectorId,
  useBem,
} from '../use'
import { matchScrollVisible, minmax, getRectById } from '../utils'
import { CSSTransition } from '../transition/CSSTransition'
import { BaseProps } from '../base'

export * from './Item'

export interface IndexBarProps extends BaseProps {
  activeKey?: number | string
  defaultActiveKey?: number | string
  onChange?: (key: number | string) => void
  offset?: number
  initialScroll?: boolean
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

// todo: ios老机型在小程序会有性能问题
export const IndexBar: IndexBarFC = forwardRef((props, ref) => {
  const {
    className,
    children,
    activeKey,
    defaultActiveKey,
    onChange,
    offset = 0,
    initialScroll,
    anchorClass,
    anchorStyle,
    threshold = 150,
    ...restProps
  } = props

  const [bem] = useBem('index-bar')

  const pageScrollTop = useRef(0)
  usePageScroll((res) => {
    pageScrollTop.current = res.scrollTop
  })

  const [innerActiveKey, setInnerActiveKey] = useControllableValue({
    value: activeKey,
    defaultValue: defaultActiveKey,
    trigger: onChange,
    initialValue: () => {
      const firstPane = Children.toArray(
        children,
      )[0] as ReactElement<IndexBarItemProps>
      return (firstPane?.key ?? 0) as string | number
    },
  })

  const lockScroll = useRef(false)
  const [reset] = useSetTimeout(() => {
    lockScroll.current = false
  }, 100)

  const itemMap = useIndexableMap<number | string, [string, ReactNode]>([])

  const scrollTo = useEvent((key: number | string) => {
    const [id] = itemMap.get(key)

    if (id) {
      reset()
      lockScroll.current = true

      getRectById(id).then((res) => {
        Taro.pageScrollTo({
          scrollTop: pageScrollTop.current + res.top + offset,
          duration: 0,
        })
      })

      setInnerActiveKey(key)
    }
  })

  useEffect(() => {
    if (initialScroll) {
      scrollTo(innerActiveKey)
    }
  }, [])

  useScroll(
    () => {
      if (lockScroll.current) {
        return
      }
      const srcData = itemMap.data
      matchScrollVisible(
        srcData.map((item) => item[1][0]),
        (index) => {
          setInnerActiveKey(srcData[index][0])
        },
        {
          offset: -offset,
        },
      )
    },
    threshold,
    {
      leading: false,
    },
  )

  // hint
  const [hintIn, setTipsIn] = useState(false)
  const [hintVisible, setHintVisible] = useState(false)
  const [hintTop, setHintTop] = useState('')

  const getTipsTop = () => {
    const index = itemMap.getIndexByKey(innerActiveKey)
    const length = Children.count(children)
    return ((index + 0.5) / length) * 100 + '%'
  }

  useEffect(() => {
    setHintTop(getTipsTop())
  }, [innerActiveKey])

  // 触摸切换
  const navId = useSelectorId()
  const downNavHeight = useRef(0)
  const downNavTop = useRef(0)
  const itemCount = useRef(0)

  const scrollByOffset = (offsetY) => {
    const index = minmax(
      Math.floor((offsetY / downNavHeight.current) * itemCount.current),
      0,
      itemCount.current - 1,
    )

    const key = itemMap.getKeyByIndex(index)
    if (key !== innerActiveKey) {
      scrollTo(key)
    }
  }

  const handleTouchStart = async (event) => {
    setTipsIn(true)

    const touch = event.touches[0]

    itemCount.current = Children.count(children)

    const res = await getRectById(navId)

    downNavHeight.current = res.height || 0
    downNavTop.current = res.top
    scrollByOffset(touch.clientY - res.top)
  }

  const handleTouchMove = async (event) => {
    const touch = event.touches[0]

    scrollByOffset(touch.clientY - downNavTop.current)
  }

  const handleTouchEnd = () => {
    setTipsIn(false)
  }

  useImperativeHandle(ref, () => ({
    scrollTo,
  }))

  return (
    <View {...restProps} className={classNames(bem.b(), className)}>
      {Children.map(
        children,
        (item: ReactElement<IndexBarItemProps>, index: number) => {
          const key = item.key ?? index

          return cloneElement(item, {
            key,
            offset,
            anchorClass: classNames(anchorClass, item.props.anchorClass),
            anchorStyle: { ...anchorStyle, ...item.props.anchorStyle },
            _onMounted(id) {
              itemMap.set(key, [id, item.props.title])
            },
          })
        },
      )}

      <View
        className={bem.e('nav')}
        id={navId}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        onTouchCancel={handleTouchEnd}
      >
        {Children.map(
          children,
          (item: ReactElement<IndexBarItemProps>, index: number) => {
            const key = item.key ?? index
            return (
              <View
                className={classNames(
                  bem.e('nav-item'),
                  bem.em('nav-item', 'active', key === innerActiveKey),
                )}
              >
                {item.props.title}
              </View>
            )
          },
        )}
        <CSSTransition
          in={hintIn}
          timeout={300}
          onEnter={() => setHintVisible(true)}
          onExited={() => setHintVisible(false)}
        >
          <View
            className={bem.e('hint')}
            style={{
              top: hintTop,
              display: hintIn || hintVisible ? 'flex' : 'none',
            }}
          >
            <View className={bem.e('hint-text')}>
              {itemMap.get(innerActiveKey)?.[1]}
            </View>
          </View>
        </CSSTransition>
      </View>
    </View>
  )
}) as IndexBarFC

IndexBar.Item = IndexBarItem

export default IndexBar
