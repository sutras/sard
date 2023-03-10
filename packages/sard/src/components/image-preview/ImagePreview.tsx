import {
  CSSProperties,
  forwardRef,
  ForwardRefExoticComponent,
  PropsWithoutRef,
  RefAttributes,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { useEvent } from '../../use'
import { Swiper, SwiperRef } from '../swiper'
import { Popup, PopupProps } from '../popup'
import { Icon } from '../icon'
import ImagePreviewItem from './Item'

export interface ImagePreviewProps {
  className?: string
  style?: CSSProperties
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
  > {}

export const ImagePreview: ImagePreviewFC = forwardRef((props, ref) => {
  const {
    className,
    style,
    images = [],
    defaultIndex = 0,
    visible,
    defaultVisible,
    onVisible,
    popupProps = {},
    ...restProps
  } = props

  const { placement = 'center-fade', ...restPopupProps } = popupProps

  const [activeIndex, setActiveIndex] = useState(defaultIndex)
  const swiping = useRef(false)

  const swiperRef = useRef<SwiperRef>()
  const handleChange = (activeIndex: number) => {
    setActiveIndex(activeIndex)
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

  useImperativeHandle(ref, () => ({}))

  const imagePreviewClass = classNames('s-image-preview', className)

  return (
    <Popup
      {...restPopupProps}
      placement={placement}
      maskClass="s-image-preview-mask"
      contentClass="s-image-preview-popup-content"
      visible={innerVisible}
    >
      <div {...(restProps as any)} className={imagePreviewClass}>
        <div className="s-image-preview-header">
          <div className="s-image-preview-counter">
            {activeIndex + 1} / {images.length}
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
            ref={swiperRef}
            onProcessStart={() => {
              swiping.current = true
            }}
            onProcessEnd={() => {
              swiping.current = false
            }}
          >
            {images.map((url, i) => (
              <ImagePreviewItem
                key={i}
                url={url}
                swiping={swiping}
                visible={innerVisible}
                activeIndex={activeIndex}
              ></ImagePreviewItem>
            ))}
          </Swiper>
        </div>
      </div>
    </Popup>
  )
})

export default ImagePreview
