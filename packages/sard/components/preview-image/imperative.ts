import { createImperativeComponent } from '../../utils/createImperativeComponent'
import { type PreviewImageExpose, type PreviewImageProps } from './common'
import PreviewImage from './preview-image.vue'

export type PreviewImageOptions = Omit<PreviewImageProps, 'urls'> &
  Required<Pick<PreviewImageProps, 'urls'>>

export interface PreviewImageShowFunction {
  (options?: PreviewImageOptions): void
}

export type PreviewImageFunction = PreviewImageShowFunction & {
  hide: () => void
}

export function createPreviewImage(defaultOptions?: PreviewImageOptions): PreviewImageFunction {
  const imperative = createImperativeComponent<PreviewImageOptions, PreviewImageExpose>(
    PreviewImage,
    defaultOptions,
  )

  const show: PreviewImageShowFunction = (options) => {
    imperative.show(options)
  }

  const hide = () => {
    imperative.hide()
  }

  const previewImage: PreviewImageFunction = (options) => {
    show(options)
  }

  previewImage.hide = hide

  return previewImage
}

export const previewImage = createPreviewImage()
