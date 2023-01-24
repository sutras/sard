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
import { CommonComponentProps } from '../../utils/types'

import { IndexBarItem, IndexBarItemProps } from './Item'
import {
  useMapSet,
  useScroll,
  useSetTimeout,
  useStrike,
  useEvent,
  useSelectorId,
} from '../../use'
import { matchScrollVisible, minmax } from '../../utils'
import { PAN_END, PAN_MOVE, PAN_START, StrikePanEvent } from '../../strike'
import { getBoundingClientRect, pageScrollTop } from '../../utils/dom'
import { CSSTransition } from '../transition/CSSTransition'

export * from './Item'

export interface IndexBarProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  defaultActiveKey?: any
  activeKey?: any
  offset?: number
  anchorClass?: string
  anchorStyle?: CSSProperties
}

export interface IndexBarRef {
  scrollTo(name: any): void
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
    offset = 0,
    anchorClass,
    anchorStyle,
    ...restProps
  } = props

  const offsetRef = useRef(offset)
  const itemSet = useMapSet<any, HTMLElement>([])
  const childrenRef = useRef(children)

  const [innerName, setInnerName] = useState(() => {
    const firstPane = Children.toArray(
      children,
    )[0] as ReactElement<IndexBarItemProps>
    return activeKey ?? defaultActiveKey ?? firstPane?.props.name ?? 0
  })

  const scrollLock = useRef(false)
  const { reset } = useSetTimeout(() => {
    scrollLock.current = false
  }, 250)

  const scrollTo = useEvent((name: any) => {
    const el = itemSet.get(name)

    if (el) {
      const top =
        el.getBoundingClientRect().top + window.scrollY - offsetRef.current

      reset()
      scrollLock.current = true
      pageScrollTop(top, false)

      setInnerName(name)
    }
  })

  useScroll(
    () => {
      if (scrollLock.current) {
        return
      }
      const srcData = itemSet.getData()
      matchScrollVisible(
        srcData.map((item) => item[1]),
        (index) => {
          setInnerName(srcData[index][0])
        },
        offsetRef.current,
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
    const index = itemSet.getIndexByName(innerName)
    const length = Children.count(children)
    return ((index + 0.5) / length) * 100 + '%'
  }

  useEffect(() => {
    setHintTop(getTipsTop())
  }, [innerName])

  // 触摸切换
  const navRef = useRef<HTMLElement>(null)
  const downHeightRef = useRef(0)
  const downRectTopRef = useRef(0)
  const itemCount = useRef(0)

  const scrollByOffset = useEvent((offsetY) => {
    const index = minmax(
      Math.floor((offsetY / downHeightRef.current) * itemCount.current),
      0,
      itemCount.current - 1,
    )

    const name = itemSet.getData()[index][0]
    if (name !== innerName) {
      scrollTo(name)
    }
  })

  const handlePanStart = useEvent((event: StrikePanEvent) => {
    downHeightRef.current = navRef.current?.getBoundingClientRect().height || 0
    itemCount.current = Children.count(childrenRef.current)

    getBoundingClientRect(navId, (rect) => {
      downRectTopRef.current = rect.top
      scrollByOffset(event.y - rect.top)
    })

    setTipsIn(true)
  })

  const handlePanMove = useEvent((event: StrikePanEvent) => {
    scrollByOffset(event.y - downRectTopRef.current)
  })

  const handlePanEnd = useEvent(() => {
    setTipsIn(false)
  })

  const navId = useSelectorId()

  const navBinding = useStrike(
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
        children as ReactElement<IndexBarItemProps>,
        (item: ReactElement<IndexBarItemProps>, index: number) => {
          const name = item.props.name ?? index

          return cloneElement(item, {
            key: name,
            name,
            activeKey: innerName,
            offset,
            ref: (el: any) => itemSet.set(name, el),
            anchorClass: classNames(anchorClass, item.props.anchorClass),
            anchorStyle: { ...anchorStyle, ...item.props.anchorStyle },
          })
        },
      )}

      <div
        className="s-index-bar-nav"
        {...navBinding}
        ref={navRef as any}
        id={navId}
      >
        {Children.map(
          children as ReactElement<IndexBarItemProps>,
          (item: ReactElement<IndexBarItemProps>, index: number) => {
            const name = item.props.name ?? index
            return (
              <div
                className={classNames('s-index-bar-nav-item', {
                  's-index-bar-nav-item-active': name === innerName,
                })}
              >
                {name}
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
            <div className="s-index-bar-hint-text">{innerName}</div>
          </div>
        </CSSTransition>
      </div>
    </div>
  )
}) as IndexBarFC

IndexBar.Item = IndexBarItem

export default IndexBar
