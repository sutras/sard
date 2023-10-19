import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import { View } from '@tarojs/components'
import classNames from 'classnames'
import { BaseProps } from '../base'
import { useBem, useEvent, useSelectorId, useThrottle } from '../use'
import PanGestureDetector from '../pan-gesture-detector'
import { usePan } from '../pan-gesture-detector/usePan'
import { getRectByElement, minmax } from '../utils'
import CSSTransition from '../transition/CSSTransition'
import CustomWrapper from '../custom-wrapper'

export interface IndexBarNavProps extends BaseProps {
  items: (string | number)[]
  panStart: () => void
  panEnd: () => void
  onChange: (key: string | number) => void
}

export interface NavRef {
  switchTo: (key: number | string) => void
}

export const IndexBarNav = forwardRef<NavRef, IndexBarNavProps>(
  (props, ref) => {
    const { items, panStart, panEnd, onChange } = props

    const [bem] = useBem('index-bar')

    const contextId = useSelectorId()

    const [activeKey, setActiveKey] = useState<string | number>(items[0])

    const navRef = useRef()
    const downNavHeight = useRef(0)
    const downNavTop = useRef(0)

    const scrollByOffset = (offsetY: number) => {
      const index = minmax(
        Math.floor((offsetY / downNavHeight.current) * items.length),
        0,
        items.length - 1,
      )

      const key = items[index]
      if (key !== activeKey) {
        setActiveKey(key)
        onChange(key)
      }
    }

    const panThrottleHandler = useThrottle(
      (offsetY: number) => {
        scrollByOffset(offsetY)
      },
      100,
      {
        leading: false,
      },
    )

    const handlers = usePan({
      async start(event) {
        panStart()

        setHintVisible(true)

        const rect = await getRectByElement(navRef.current, contextId)

        downNavHeight.current = rect.height || 0
        downNavTop.current = rect.top
        scrollByOffset(event.y0 - rect.top)
      },

      move(event) {
        panThrottleHandler(event.moveY - downNavTop.current)
      },

      end() {
        panEnd()
        setHintVisible(false)
      },
    })

    // hint >>>
    const [hintVisible, setHintVisible] = useState(false)
    const [hintRealVisible, setHintRealVisible] = useState(false)
    const [hintTop, setHintTop] = useState('0%')

    const getTipsTop = (index: number) => {
      return ((index + 0.5) / items.length) * 100 + '%'
    }

    useEffect(() => {
      if (activeKey) {
        const index = items.indexOf(activeKey)
        setHintTop(getTipsTop(index))
      }
    }, [activeKey])
    // <<< hint

    const switchTo = useEvent((key) => {
      setActiveKey(key)
    })

    useImperativeHandle(
      ref,
      () => ({
        switchTo,
      }),
      [],
    )

    return (
      <CustomWrapper id={contextId}>
        <View className={bem.e('nav-container')}>
          <View className={bem.e('nav-wrapper')}>
            <PanGestureDetector handlers={handlers}>
              <View className={bem.e('nav')} ref={navRef}>
                {items.map((item) => {
                  return (
                    <View
                      key={item}
                      className={classNames(
                        bem.e('nav-item'),
                        bem.em('nav-item', 'active', item === activeKey),
                      )}
                    >
                      {item}
                    </View>
                  )
                })}

                <CSSTransition
                  in={hintVisible}
                  timeout={300}
                  effect="fade"
                  onEnter={() => setHintRealVisible(true)}
                  onExited={() => setHintRealVisible(false)}
                  className={bem.e('hint')}
                  style={{
                    top: hintTop,
                    display: hintVisible || hintRealVisible ? 'flex' : 'none',
                  }}
                >
                  <View className={bem.e('hint-text')}>{activeKey}</View>
                </CSSTransition>
              </View>
            </PanGestureDetector>
          </View>
        </View>
      </CustomWrapper>
    )
  },
)

export default IndexBarNav
