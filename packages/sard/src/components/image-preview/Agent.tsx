import {
  ImagePreview,
  ImagePreviewProps,
  ImagePreviewRef,
} from './ImagePreview'
import { useAgent, AgentProps, MapIdAgent } from '../../utils/imperative'

export const mapIdAgent: MapIdAgent<ImagePreviewProps, ImagePreviewRef> = {}

export const ImagePreviewAgent = (
  agentProps: AgentProps<ImagePreviewProps>,
) => {
  return useAgent<ImagePreviewProps, ImagePreviewRef>(
    ImagePreview,
    agentProps,
    mapIdAgent,
    'imagePreview',
  )
}

export default ImagePreviewAgent
