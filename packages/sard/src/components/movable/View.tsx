import {
  CSSProperties,
  ReactNode,
  forwardRef,
  useImperativeHandle,
  useRef,
  useContext,
  useEffect,
} from 'react'
import classNames from 'classnames'

import { UseMovableOptions, useMovable, BoundingRect } from './useMovable'
import { MovableAreaContext } from './Area'

export interface MovableViewProps extends UseMovableOptions {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface MovableViewRef {
  updateViewRect(rect?: BoundingRect): void
}

export const MovableView = forwardRef<MovableViewRef, MovableViewProps>(
  (props, ref) => {
    const {
      className,
      children,
      defaultX,
      defaultY,
      direction,
      inertia,
      maxSpeed,
      inertiaDuration,
      inertiaTime,
      inertiaMaxOverflow,
      outOfBounds,
      damping,
      reboundDuration,
      lockDirection,
      scale,
      minScale,
      maxScale,
      onChange,
      onWillChange,
      onPanStart,
      onPanMove,
      onPanEnd,
      onMoveEnd,
      ...restProps
    } = props

    const viewRef = useRef<HTMLDivElement>(null)
    const areaRect = useContext(MovableAreaContext)

    const { updateViewRect } = useMovable(viewRef, areaRect, {
      ...props,
      onChange(x, y, scale) {
        viewRef.current.style.transform = `translate3d(${x}px, ${y}px, 0px) scale(${scale})`
        onChange?.(x, y, scale)
      },
      onWillChange(willChange) {
        viewRef.current.style.willChange = willChange
        onWillChange?.(willChange)
      },
    })

    useEffect(() => {
      updateViewRect(viewRef.current?.getBoundingClientRect())
    }, [])

    useImperativeHandle(ref, () => ({
      updateViewRect,
    }))

    const viewClass = classNames('s-movable-view', className)

    return (
      <div {...restProps} ref={viewRef} className={viewClass}>
        {children}
      </div>
    )
  },
)

export default MovableView
