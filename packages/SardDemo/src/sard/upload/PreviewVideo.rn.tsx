import { useRef } from 'react'
import { Video, ResizeMode } from 'expo-av'
import { BaseProps } from '../base'
import { View } from '@tarojs/components'
import { useBem } from '../use'
import Icon from '../icon'

export interface CustomVideoProps extends BaseProps {
  src?: string
}

export const CustomVideo = (props) => {
  const { src = '' } = props

  const [bem] = useBem('upload')

  const videoRef = useRef<Video>(null)

  const handlePlayClick = () => {
    videoRef.current?.presentFullscreenPlayer()
    videoRef.current?.playAsync()
  }

  const handleFullscreenUpdate = (event) => {
    if (event.fullscreenUpdate === 2) {
      videoRef.current?.stopAsync()
    }
  }

  return (
    <View className={bem.e('video-wrapper')}>
      <Video
        ref={videoRef}
        style={{ width: '100%', height: '100%' }}
        resizeMode={ResizeMode.CONTAIN}
        source={{
          uri: src,
        }}
        onFullscreenUpdate={handleFullscreenUpdate}
      />
      <View className={bem.e('video-play')} onClick={handlePlayClick}>
        <Icon name="play" size={40} className={bem.e('video-play-icon')} />
      </View>
    </View>
  )
}

export default CustomVideo
