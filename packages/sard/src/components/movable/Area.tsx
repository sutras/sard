import {
  CSSProperties,
  ReactNode,
  createContext,
  useEffect,
  useState,
  useRef,
  useCallback,
  forwardRef,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import { BoundingRect } from './useMovable'

export type MovableAreaContext = BoundingRect

export const MovableAreaContext = createContext<MovableAreaContext>({
  x: 0,
  y: 0,
  width: 0,
  height: 0,
})

export interface MovableAreaProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
}

export interface MovableAreaRef {
  updateAreaRect: (rect?: BoundingRect) => void
}

export const MovableArea = forwardRef<MovableAreaRef, MovableAreaProps>(
  (props, ref) => {
    const { className, children, ...restProps } = props

    const areaRef = useRef<HTMLDivElement>(null)
    const [rect, setRect] = useState<MovableAreaContext>({
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    })

    const updateAreaRect = useCallback((boundingRect?: BoundingRect) => {
      if (areaRef.current) {
        const rect: BoundingRect =
          boundingRect ?? (areaRef.current as any).getBoundingClientRect()
        setRect({
          x: rect.x,
          y: rect.y,
          width: rect.width,
          height: rect.height,
        })
      }
    }, [])

    useEffect(() => {
      updateAreaRect()
    }, [])

    useImperativeHandle(ref, () => ({
      updateAreaRect,
    }))

    const areaClass = classNames('s-movable-area', className)

    return (
      <div {...restProps} ref={areaRef} className={areaClass}>
        <MovableAreaContext.Provider value={rect}>
          {children}
        </MovableAreaContext.Provider>
      </div>
    )
  },
)

export default MovableArea
