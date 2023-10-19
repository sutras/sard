import { forwardRef, useImperativeHandle, useRef } from 'react'
import { ScrollView as RNScrollView, StyleProp, ViewStyle } from 'react-native'
import { BaseProps } from '../base'
import { useEvent } from '../use'

export interface ScrollViewProps extends Omit<BaseProps, 'style'> {
  style?: StyleProp<ViewStyle>
  scrollX?: boolean
  scrollY?: boolean
  showScrollbar?: boolean
  onScroll?: (event: { x: number; y: number }) => void
}

export interface ScrollViewRef {
  scrollTop: (top: number) => void
  scrollLeft: (left: number) => void
  setScrollEnabled: (scrollEnabled: boolean) => void
  getElement: () => any
}

export const ScrollView = forwardRef<ScrollViewRef, ScrollViewProps>(
  (props, ref) => {
    const { style, children, scrollX, showScrollbar, onScroll } = props

    const scrollViewRef = useRef<RNScrollView>(null)
    const scrollCoord = useRef({
      x: 0,
      y: 0,
    })

    const handleScroll = useEvent((event) => {
      const x = event.nativeEvent.contentOffset.x
      const y = event.nativeEvent.contentOffset.y
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
        scrollTop(y: number) {
          scrollViewRef.current?.scrollTo({
            y,
            animated: false,
          })
        },
        scrollLeft(x: number) {
          scrollViewRef.current?.scrollTo({
            x,
            animated: false,
          })
        },
        setScrollEnabled(scrollEnabled: boolean) {
          scrollViewRef.current?.setNativeProps({
            scrollEnabled,
          })
        },
        getScrollCoord() {
          return scrollCoord.current
        },
        getElement() {
          return scrollViewRef.current
        },
      }),
      [],
    )

    return (
      <RNScrollView
        ref={scrollViewRef}
        horizontal={scrollX}
        contentContainerStyle={{ flexGrow: 1 }}
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={showScrollbar}
        showsVerticalScrollIndicator={showScrollbar}
        style={style}
        onScroll={handleScroll}
      >
        {children}
      </RNScrollView>
    )
  },
)

export default ScrollView
