import { FC, ReactNode, useState } from 'react'
import classNames from 'classnames'
import { ITouchEvent, Image, ImageProps, Video, View } from '@tarojs/components'
import { Icon } from '../icon'
import { Loading } from '../loading'
import { BaseProps } from '../base'
import { isVideoUrl, isImageUrl } from '../utils'
import { useBem, useSelectorId } from '../use'
import Taro from '@tarojs/taro'

export type UploadStatus = 'uploading' | 'failed' | 'done'

export interface UploadFile {
  type: 'image' | 'video'
  size: number
  path: string
  mime: string
  originalFileObj: File | null
  duration: number
  width: number
  height: number
}

export interface UploadPreviewProps extends Omit<BaseProps, 'children'> {
  file?: UploadFile
  url?: string
  index?: number
  disabled?: boolean
  readOnly?: boolean
  message?: string
  name?: ReactNode
  status?: UploadStatus
  onImageClick?: (index: number) => void
  removable?: boolean
  remove?: ReactNode
  beforeRemove?: (index: number) => boolean | Promise<void>
  onRemove?: (index: number) => void
  mode?: ImageProps['mode']
}

export type UploadFileItem = Pick<
  UploadPreviewProps,
  | 'className'
  | 'style'
  | 'file'
  | 'name'
  | 'url'
  | 'status'
  | 'message'
  | 'removable'
  | 'remove'
  | 'beforeRemove'
  | 'onRemove'
>

export const UploadPreview: FC<UploadPreviewProps> = (props) => {
  const {
    className,
    index,
    removable = true,
    remove,
    beforeRemove,
    onRemove,
    disabled,
    readOnly,
    file,
    name,
    url,
    status = 'pending',
    message,
    onImageClick,
    mode,
    ...restProps
  } = props

  const [bem] = useBem('upload')

  const handleRemove = (event: ITouchEvent) => {
    if (!removable || disabled || readOnly) return

    event.stopPropagation()

    function remove() {
      onRemove?.(index as number)
    }

    if (beforeRemove) {
      const ret = beforeRemove(index as number)
      if (!ret) {
        return
      }
      if (ret instanceof Promise) {
        ret
          .then(() => {
            remove()
          })
          .catch(() => {
            null
          })
        return
      }
    }
    remove()
  }

  const videoId = useSelectorId()

  const [fullScreen, setFullScreen] = useState(false)

  const onVideoClick = () => {
    if (fullScreen) {
      return
    }
    const videoContext = Taro.createVideoContext(videoId)

    videoContext.requestFullScreen({
      direction: 0,
    })
  }

  const handleFullScreenChange = (event) => {
    const env = process.env.TARO_ENV
    if (env !== 'h5' && env !== 'rn') {
      handleFullscreenChangeImpl(event)
    }
  }

  const handleFullscreenChange = (event) => {
    const env = process.env.TARO_ENV
    if ((env === 'h5' || env === 'rn') && event.detail) {
      handleFullscreenChangeImpl(event)
    }
  }

  const handleFullscreenChangeImpl = (event) => {
    const videoContext = Taro.createVideoContext(videoId)

    setFullScreen(event.detail.fullScreen)

    if (event.detail.fullScreen) {
      videoContext.play()
    } else {
      videoContext.stop()
    }
  }

  const previewClass = classNames(bem.e('preview'), className)

  return (
    <View {...restProps} className={previewClass}>
      {file?.type === 'image' || (url && isImageUrl(url)) ? (
        <Image
          mode={mode}
          className={bem.e('image')}
          src={url || file?.path}
          onClick={() => onImageClick?.(index)}
        />
      ) : file?.type === 'video' || (url && isVideoUrl(url)) ? (
        <>
          <Video
            id={videoId}
            className={bem.e('video')}
            // todo: 退出全屏时需要等下一次渲染才能隐藏播放控件，使后者会有一闪而过的缺陷
            controls={fullScreen}
            showCenterPlayBtn={false}
            src={url || file?.path}
            onClick={onVideoClick}
            onFullScreenChange={handleFullScreenChange}
            onFullscreenChange={handleFullscreenChange}
          ></Video>
          {!fullScreen && (
            <View className={bem.e('video-play')}>
              <Icon name="play" size={40}></Icon>
            </View>
          )}
        </>
      ) : (
        <View className={bem.e('file')}>
          <Icon className={bem.e('file-icon')} name="file"></Icon>
          <View className={bem.e('file-name')}>{name}</View>
        </View>
      )}
      {(status === 'uploading' || status === 'failed') && (
        <View className={bem.e('status')}>
          <View className={bem.e('status-icon')}>
            {status === 'uploading' && <Loading iconClass={bem.e('loading')} />}
            {status === 'failed' && <Icon name="x-circle"></Icon>}
          </View>
          {message && (
            <View className={bem.e('status-message')}>{message}</View>
          )}
        </View>
      )}
      {removable && !disabled && !readOnly && status !== 'uploading' && (
        <View className={bem.e('remove')} onClick={handleRemove}>
          {remove ?? (
            <View className={bem.e('close')}>
              <Icon name="close"></Icon>
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default UploadPreview
