import { FC, ReactNode } from 'react'
import classNames from 'classnames'
import { Image, ImageProps, View } from '@tarojs/components'
import { Icon } from '../icon'
import { Loading } from '../loading'
import { BaseProps } from '../base'
import { isVideoUrl, isImageUrl } from '../utils'
import { useBem, useEvent } from '../use'
import Ellipsis from '../ellipsis'
import PreviewVideo from './PreviewVideo'

export type UploadStatus = 'uploading' | 'failed' | 'done'

export interface UploadFile {
  type: 'image' | 'video'
  size: number
  path: string
  duration: number
  width: number
  height: number
  originalFileObj: File | null
}

export interface UploadPreviewProps extends Omit<BaseProps, 'children'> {
  file?: UploadFile
  url?: string
  isImage?: boolean
  isVideo?: boolean
  index?: number
  disabled?: boolean
  readOnly?: boolean
  message?: string
  name?: string
  status?: UploadStatus
  onImageClick?: (index: number) => void
  removable?: boolean
  remove?: ReactNode
  beforeRemove?: (index: number) => boolean | Promise<void>
  onRemove?: (index: number) => void
  mode?: ImageProps['mode']
  contextId?: string
}

export type UploadFileItem = Pick<
  UploadPreviewProps,
  | 'className'
  | 'style'
  | 'file'
  | 'name'
  | 'url'
  | 'isImage'
  | 'isVideo'
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
    style,

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
    isImage: _isImage,
    isVideo: _isVideo,
    status = 'pending',
    message,
    onImageClick,
    mode = 'aspectFill',
    contextId,
    ...restProps
  } = props

  const [bem] = useBem('upload')

  const handleRemove = useEvent(() => {
    if (!removable || disabled || readOnly) return

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
  })

  const isImage = _isImage || file?.type === 'image' || (url && isImageUrl(url))
  const isVideo = _isVideo || file?.type === 'video' || (url && isVideoUrl(url))

  return (
    <View
      {...restProps}
      className={classNames(
        bem.e('preview'),
        bem.em('preview', 'video', isVideo),
        className,
      )}
      style={style}
    >
      {isImage ? (
        <Image
          mode={mode}
          className={bem.e('image')}
          src={url || file?.path || ''}
          onClick={() => onImageClick?.(index as number)}
        />
      ) : isVideo ? (
        <PreviewVideo contextId={contextId} src={url || file?.path || ''} />
      ) : (
        <View className={bem.e('file')}>
          <Icon className={bem.e('file-icon')} name="file" />
          <Ellipsis className={bem.e('file-name')}>{name}</Ellipsis>
        </View>
      )}
      {(status === 'uploading' || status === 'failed') && (
        <View className={bem.e('status')}>
          {status === 'uploading' && (
            <Loading size={24} className={bem.e('loading-icon')} />
          )}
          {status === 'failed' && (
            <Icon name="x-circle" className={bem.e('failed-icon')} />
          )}
          {message && (
            <Ellipsis className={bem.e('status-message')}>{message}</Ellipsis>
          )}
        </View>
      )}
      {removable && !disabled && !readOnly && status !== 'uploading' && (
        <View className={bem.e('remove')} onClick={handleRemove}>
          {remove ?? (
            <View className={bem.e('close')}>
              <Icon name="close" className={bem.e('close-icon')} />
            </View>
          )}
        </View>
      )}
    </View>
  )
}

export default UploadPreview
