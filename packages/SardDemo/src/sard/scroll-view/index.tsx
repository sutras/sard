import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react'
import { ScrollView as TaroScrollView } from '@tarojs/components'
import { BaseProps } from '../base'
import { ScrollIntoViewOptions, getElementById, isH5 } from '../utils'
import { createSelectorQuery, ScrollViewContext } from '@tarojs/taro'
import { useEvent, useSelectorId } from '../use'

export interface ScrollViewProps extends BaseProps {
  contextId?: string
  scrollX?: boolean
  scrollY?: boolean
  showScrollbar?: boolean
  onScroll?: (event: { x: number; y: number }) => void
  scrollLeft?: number
  scrollTop?: number
}

export interface ScrollViewRef {
  scrollTop: (top: number) => void
  scrollLeft: (left: number) => void
  setScrollEnabled: (scrollEnabled: boolean) => void
  getElement: () => any
  scrollIntoView: (selector: string, object?: ScrollIntoViewOptions) => void
}

export const ScrollView = forwardRef<ScrollViewRef, ScrollViewProps>(
  (props, ref) => {
    const {
      className,
      style,
      children,
      contextId,
      scrollX,
      scrollY,
      showScrollbar,
      onScroll,
      scrollLeft,
      scrollTop,
    } = props

    const scrollViewId = useSelectorId()
    const scrollViewRef = useRef<any>()
    const scrollViewCtx = useRef<ScrollViewContext>()
    const scrollCoord = useRef({
      x: 0,
      y: 0,
    })

    useEffect(() => {
      createSelectorQuery()
        .in(getElementById(contextId)?.ctx)
        .select(`#${scrollViewId}`)
        .node((res) => {
          scrollViewCtx.current = res.node as ScrollViewContext
        })
        .exec()
    }, [])

    const handleScroll = useEvent((event) => {
      const x = event.detail.scrollLeft
      const y = event.detail.scrollTop
      scrollCoord.current = {
        x,
        y,
      }

      onScroll?.({
        x,
        y,
      })
    })

    useImperativeHandle(
      ref,
      () => ({
        scrollTop(top: number) {
          scrollViewCtx.current?.scrollTo({
            top,
            animated: false,
          })
        },
        scrollLeft(left: number) {
          scrollViewCtx.current?.scrollTo({
            left,
            animated: false,
          })
        },
        setScrollEnabled(scrollEnabled: boolean) {
          if (scrollViewCtx.current) {
            scrollViewCtx.current.scrollEnabled = scrollEnabled
            if (isH5 && scrollViewRef.current) {
              scrollViewRef.current.style.touchAction = scrollEnabled
                ? 'auto'
                : 'none'
            }
          }
        },
        getScrollCoord() {
          return scrollCoord.current
        },
        getElement() {
          return scrollViewRef.current
        },
        scrollIntoView(selector: string) {
          scrollViewCtx.current?.scrollIntoView(selector)
        },
      }),
      [],
    )

    return (
      <TaroScrollView
        id={scrollViewId}
        ref={scrollViewRef}
        enhanced
        enablePassive="true"
        scrollWithAnimation={false}
        showScrollbar={showScrollbar}
        scrollX={scrollX}
        scrollY={scrollY}
        className={className}
        style={style}
        onScroll={handleScroll}
        scrollLeft={scrollLeft}
        scrollTop={scrollTop}
      >
        {children}
      </TaroScrollView>
    )
  },
)

export default ScrollView
