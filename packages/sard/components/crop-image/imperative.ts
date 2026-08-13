import { createImperativeComponent } from '../../utils/createImperativeComponent'
import { type CropImageExpose, type CropImageProps } from './common'
import CropImage from './crop-image.vue'

export type CropImageOptions = Omit<CropImageProps, 'url'> & Required<Pick<CropImageProps, 'url'>>

export interface CropImageShowFunction {
  (options?: CropImageOptions): void
}

export type CropImageFunction = CropImageShowFunction & {
  hide: () => void
}

export function createCropImage(defaultOptions?: CropImageOptions): CropImageFunction {
  const imperative = createImperativeComponent<CropImageOptions, CropImageExpose>(
    CropImage,
    defaultOptions,
  )

  const show: CropImageShowFunction = (options) => {
    imperative.show(options)
  }

  const hide = () => {
    imperative.hide()
  }

  const cropImage: CropImageFunction = (options) => {
    show(options)
  }

  cropImage.hide = hide

  return cropImage
}

export const cropImage = createCropImage()
