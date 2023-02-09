import {
  CSSProperties,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { CommonComponentProps } from '../../utils/types'
import { useEvent } from '../../use'
import { Swiper, SwiperRef } from '../swiper'
import { Popup, PopupProps } from '../popup'
import { Icon } from '../icon'
import ImagePreviewItem from './Item'
import { show } from './imperative'

export interface ImagePreviewProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  images?: string[]
  defaultIndex?: number
  visible?: boolean
  defaultVisible?: boolean
  onVisible?: (visible: boolean) => void
  popupProps?: PopupProps
}
export interface ImagePreviewRef {}

export interface ImagePreviewFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<ImagePreviewProps> & RefAttributes<ImagePreviewRef>
  > {
  show: typeof show
}

export const ImagePreview: ImagePreviewFC = forwardRef((props, ref) => {
  const {
    className,
    style,
    children,
    images = [],
    defaultIndex = 0,
    visible,
    defaultVisible,
    onVisible,
    popupProps = {},
    ...restProps
  } = props

  const { placement = 'center-fade', ...restPopupProps } = popupProps

  const [index, setIndex] = useState(defaultIndex)

  const swiperRef = useRef<SwiperRef>()
  const handleChange = (index: number) => {
    setIndex(index)
  }

  const [innerVisible, setInnerVisible] = useControlledValue<boolean>(props, {
    defaultValuePropName: 'defaultVisible',
    valuePropName: 'visible',
    trigger: 'onVisible',
    defaultValue: false,
  })

  const setVisible = useEvent((show: boolean) => {
    setInnerVisible(show)
  })

  useEffect(() => {
    if (innerVisible) {
      swiperRef.current?.swipeTo(defaultIndex, false)
    }
  }, [innerVisible])

  const handleClose = () => {
    setVisible(false)
  }

  const [touchable, setTouchable] = useState(true)
  const handleItemProcessing = (processing: boolean) => {
    setTouchable(!processing)
  }

  const [swiping, setSwiping] = useState(false)
  const handleAnimateStart = useCallback(() => {
    setSwiping(true)
  }, [])
  const handleAnimateEnd = useCallback(() => {
    setSwiping(false)
  }, [])

  const [touching, setTouching] = useState(false)
  const handleTouchMove = useCallback(() => {
    setTouching(true)
  }, [])
  const handleTouchEnd = useCallback(() => {
    setTouching(false)
  }, [])

  useImperativeHandle(ref, () => ({}))

  const imagePreviewClass = classNames('s-image-preview', className)

  return (
    <Popup
      {...restPopupProps}
      placement={placement}
      maskClass="s-image-preview-mask"
      className="s-image-preview-popup"
      visible={innerVisible}
    >
      <div {...(restProps as any)} className={imagePreviewClass}>
        <div className="s-image-preview-header">
          <div className="s-image-preview-counter">
            {index + 1} / {images.length}
          </div>
          <div className="s-image-preview-close" onClick={handleClose}>
            <Icon prefix="si" name="close"></Icon>
          </div>
        </div>
        <div className="s-image-preview-body">
          <Swiper
            className="s-image-preview-swiper"
            defaultIndex={defaultIndex}
            onChange={handleChange}
            duration={300}
            touchable={touchable}
            onAnimateStart={handleAnimateStart}
            onAnimateEnd={handleAnimateEnd}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            ref={swiperRef}
          >
            {images.map((url, i) => (
              <ImagePreviewItem
                key={i}
                url={url}
                onProcessing={handleItemProcessing}
                swiperProcessing={swiping || touching}
                visible={innerVisible}
              ></ImagePreviewItem>
            ))}
          </Swiper>
        </div>
      </div>
    </Popup>
  )
}) as ImagePreviewFC

ImagePreview.show = show

export default ImagePreview
