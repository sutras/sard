import { ImagePreviewProps } from './index'
import { mapIdAgent, ImagePreviewAgent } from './Agent'
import { mountAgent } from '../../utils/imperative'

export interface ImagePreviewOptions extends ImagePreviewProps {
  id?: string
}

export const show = (props: ImagePreviewProps) => {
  const { id = 'image-preview' } = props

  const ref = mapIdAgent[id]

  if (ref) {
    ref.current?.show(props)
  } else {
    mountAgent(id, ImagePreviewAgent, mapIdAgent, props)
  }
}
