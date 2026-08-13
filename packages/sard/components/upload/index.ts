import { enhanceComponent, type EnhancedComponent } from '../../utils'
import _Upload from './upload.vue'
import _UploadPreview from './upload-preview.vue'

export const Upload: EnhancedComponent<typeof _Upload> = enhanceComponent(_Upload)
export const UploadPreview: EnhancedComponent<typeof _UploadPreview> =
  enhanceComponent(_UploadPreview)
export default Upload

export type {
  UploadStatus,
  UploadFileItem,
  UploadProps,
  UploadSlots,
  UploadEmits,
  UploadPreviewProps,
  UploadPreviewEmits,
} from './common'
