import { BaseEventOrig, Video, VideoProps } from '@tarojs/components'
import { useEffect, useRef, useState } from 'react'
import { BaseProps } from '../base'
import { View } from '@tarojs/components'
import { useBem, useSelectorId } from '../use'
import Icon from '../icon'
import Taro, { VideoContext } from '@tarojs/taro'
import { getElementById, isBoolean } from '../utils'

export interface CustomVideoProps extends BaseProps {
  src?: string
  contextId?: string
}

export const CustomVideo = (props: CustomVideoProps) => {
  const { src = '', contextId } = props

  const [bem] = useBem('upload')

  const videoId = useSelectorId()

  const videoContext = useRef<VideoContext>()

  const [controlsVisible, setControlsVisible] = useState(false)

  useEffect(() => {
    videoContext.current = Taro.createVideoContext(
      videoId,
      contextId && (getElementById(contextId) as any)?.ctx,
    )
  }, [])

  const handlePlayClick = () => {
    videoContext.current?.requestFullScreen({
      direction: 0,
    })
    videoContext.current?.play()
  }

  const handleFullScreenChange = (
    event: BaseEventOrig<VideoProps.onFullscreenChangeEventDetail>,
  ) => {
    const fullScreen = event.detail?.fullScreen

    if (isBoolean(fullScreen)) {
      if (fullScreen) {
        setControlsVisible(true)
      } else {
        videoContext.current?.pause()
        setControlsVisible(false)
      }
    }
  }

  return (
    <View className={bem.e('video-wrapper')}>
      <Video
        id={videoId}
        objectFit="contain"
        className={bem.e('video')}
        src={src}
        {...{ crossOrigin: 'Anonymous' }}
        controls={controlsVisible}
        showCenterPlayBtn={controlsVisible}
        onFullscreenChange={handleFullScreenChange}
        onFullScreenChange={handleFullScreenChange}
      />
      <View className={bem.e('video-play')} onClick={handlePlayClick}>
        <Icon name="play" size={40} className={bem.e('video-play-icon')} />
      </View>
    </View>
  )
}

export default CustomVideo
