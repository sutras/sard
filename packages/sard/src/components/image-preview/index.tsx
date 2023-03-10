import { ImagePreview as ImagePreviewOrigin } from './ImagePreview'
import type {
  ImagePreviewFC as ImagePreviewOriginFC,
  ImagePreviewProps,
  ImagePreviewRef,
} from './ImagePreview'
import { ImagePreviewAgent } from './Agent'
import { show } from './imperative'

interface ImagePreviewFC extends ImagePreviewOriginFC {
  show: typeof show
  Agent: typeof ImagePreviewAgent
}

const ImagePreview = ImagePreviewOrigin as ImagePreviewFC

ImagePreview.show = show
ImagePreview.Agent = ImagePreviewAgent

export {
  ImagePreview,
  ImagePreviewFC,
  ImagePreviewProps,
  ImagePreviewRef,
  ImagePreviewAgent,
}

export default ImagePreview
