import { ImagePreview, ImagePreviewProps, ImagePreviewRef } from './index'
import { useAgent, AgentProps, MapIdAgent } from '../../utils/imperative'

export const mapIdAgent: MapIdAgent<ImagePreviewProps, ImagePreviewRef> = {}

export const ImagePreviewAgent = (
  agentProps: AgentProps<ImagePreviewProps>,
) => {
  return useAgent<ImagePreviewProps, ImagePreviewRef>(
    ImagePreview,
    agentProps,
    mapIdAgent,
    'image-preview',
  )
}

export default ImagePreviewAgent
