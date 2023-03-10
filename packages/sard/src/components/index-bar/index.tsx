import {
  Children,
  CSSProperties,
  ReactNode,
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
} from 'react'
import classNames from 'classnames'

import { IndexBarItem, IndexBarItemProps } from './Item'
import {
  useIndexableMap,
  useScroll,
  useSetTimeout,
  useStrike,
  useEvent,
  useControlledValue,
} from '../../use'
import { matchScrollVisible, minmax } from '../../utils'
import { pageScrollTop } from '../../utils/dom'
import { PAN_END, PAN_MOVE, PAN_START, StrikePanEvent } from '../../strike'
import { CSSTransition } from '../transition/CSSTransition'

export * from './Item'

export interface IndexBarProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  defaultActiveKey?: number | string
  activeKey?: number | string
  onChange?: (key: number | string) => void
  offset?: number
  initialScroll?: boolean
  anchorClass?: string
  anchorStyle?: CSSProperties
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

export const IndexBar: IndexBarFC = forwardRef((props, ref) => {
  const {
    className,
    style,
    children,
    defaultActiveKey,
    activeKey,
    onChange,
    offset = 0,
    initialScroll,
    anchorClass,
    anchorStyle,
    ...restProps
  } = props

  const itemMap = useIndexableMap<number | string, HTMLElement>([])

  const [innerActiveKey, setInnerActiveKey, outerActiveKey] =
    useControlledValue<number | string>(props, {
      valuePropName: 'activeKey',
      defaultValuePropName: 'defaultActiveKey',
      defaultValue() {
        const firstPane = Children.toArray(
          children,
        )[0] as ReactElement<IndexBarItemProps>
        return firstPane?.key ?? 0
      },
    })

  const lockScroll = useRef(false)
  const { reset } = useSetTimeout(() => {
    lockScroll.current = false
  }, 250)

  const scrollTo = useEvent((key: number | string) => {
    const el = itemMap.get(key)

    if (el) {
      const top = el.getBoundingClientRect().top + window.scrollY - offset

      reset()
      lockScroll.current = true
      pageScrollTop(top, false)

      setInnerActiveKey(key)
    }
  })

  if (outerActiveKey) {
    console.log('outerActiveKey: ', outerActiveKey)

    scrollTo(outerActiveKey)
  }

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
  const navRef = useRef<HTMLDivElement>(null)
  const downNavHeightRef = useRef(0)
  const downNavTopRef = useRef(0)
  const itemCount = useRef(0)

  const scrollByOffset = useEvent((offsetY) => {
    const index = minmax(
      Math.floor((offsetY / downNavHeightRef.current) * itemCount.current),
      0,
      itemCount.current - 1,
    )

    const key = itemMap.getKeyByIndex(index)
    if (key !== innerActiveKey) {
      scrollTo(key)
    }
  })

  const handlePanStart = useEvent((event: StrikePanEvent) => {
    itemCount.current = Children.count(children)

    const navRect = navRef.current.getBoundingClientRect()
    downNavHeightRef.current = navRect.height || 0
    downNavTopRef.current = navRect.top
    scrollByOffset(event.y - navRect.top)

    setTipsIn(true)
  })

  const handlePanMove = useEvent((event: StrikePanEvent) => {
    scrollByOffset(event.y - downNavTopRef.current)
  })

  const handlePanEnd = useEvent(() => {
    setTipsIn(false)
  })

  useStrike(
    navRef,
    (strike) => {
      strike.on(PAN_START, handlePanStart)
      strike.on(PAN_MOVE, handlePanMove)
      strike.on(PAN_END, handlePanEnd)
    },
    {
      pan: true,
    },
  )

  useImperativeHandle(ref, () => ({
    scrollTo,
  }))

  const indexBarClass = classNames('s-index-bar', className)

  return (
    <div {...(restProps as any)} className={indexBarClass}>
      {Children.map(
        children,
        (
          item: ReactElement<IndexBarItemProps & { ref: any }>,
          index: number,
        ) => {
          const key = item.key ?? index

          return cloneElement(item, {
            key,
            activeKey: innerActiveKey,
            offset,
            ref: (el: any) => itemMap.set(key, el),
            anchorClass: classNames(anchorClass, item.props.anchorClass),
            anchorStyle: { ...anchorStyle, ...item.props.anchorStyle },
          })
        },
      )}

      <div className="s-index-bar-nav" ref={navRef}>
        {Children.map(
          children,
          (item: ReactElement<IndexBarItemProps>, index: number) => {
            const key = item.key ?? index
            return (
              <div
                className={classNames('s-index-bar-nav-item', {
                  's-index-bar-nav-item-active': key === innerActiveKey,
                })}
              >
                {item.props.title}
              </div>
            )
          },
        )}
        <CSSTransition
          in={hintIn}
          timeout={300}
          onEnter={() => setHintVisible(true)}
          onExited={() => setHintVisible(false)}
        >
          <div
            className={classNames('s-index-bar-hint', {
              's-index-bar-hint-visible': hintIn || hintVisible,
            })}
            style={{ top: hintTop }}
          >
            <div className="s-index-bar-hint-text">{innerActiveKey}</div>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}) as IndexBarFC

IndexBar.Item = IndexBarItem

export default IndexBar
