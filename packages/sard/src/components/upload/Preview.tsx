import { CSSProperties, FC, ReactNode, SyntheticEvent } from 'react'
import classNames from 'classnames'
import { Icon } from '../icon'
import { Loading } from '../loading'
import { isImageFile } from './utils'

export type UploadStatus = 'uploading' | 'failed' | 'done'

export interface UploadPreviewProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  index?: number
  imageFit?: 'contain' | 'cover'
  removable?: boolean
  remove?: ReactNode
  beforeRemove?: (index: number) => boolean | Promise<void>
  onRemove?: (index: number) => void
  disabled?: boolean
  readOnly?: boolean
  file?: File
  name?: string
  url?: string
  isImage?: boolean
  status?: UploadStatus
  message?: string
  content?: string
  onClick?: (index: number) => void
}

// export type UploadFileItem = Pick<
//   UploadPreviewProps,
//   'file' | 'name' | 'url' | 'isImage' | 'status' | 'message' | 'content'
// >

export interface UploadFileItem extends UploadPreviewProps {
  file: File
}

export const UploadPreview: FC<UploadPreviewProps> = (props) => {
  const {
    className,
    children,
    index,
    imageFit,
    removable = true,
    remove,
    beforeRemove,
    onRemove,
    disabled,
    readOnly,
    file,
    name,
    url,
    isImage,
    status,
    message,
    content,
    onClick,
    ...restProps
  } = props

  const handleRemove = (event: SyntheticEvent) => {
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

  const previewClass = classNames('s-upload-preview', className)

  return (
    <div
      {...restProps}
      className={previewClass}
      onClick={() => onClick?.(index as number)}
    >
      {isImageFile(props) ? (
        <img className="s-upload-preview-image" src={url || content} />
      ) : (
        <div className="s-upload-preview-file">
          <Icon
            className="s-upload-preview-file-icon"
            prefix="si"
            name="file-earmark-text"
          ></Icon>
          <div className="s-upload-preview-file-name">{name || file?.name}</div>
        </div>
      )}
      {(status === 'uploading' || status === 'failed') && (
        <div className="s-upload-preview-status">
          <div className="s-upload-preview-status-icon">
            {status === 'uploading' && <Loading></Loading>}
            {status === 'failed' && <Icon prefix="si" name="x-circle"></Icon>}
          </div>
          {message && (
            <div className="s-upload-preview-status-message">{message}</div>
          )}
        </div>
      )}
      {removable && !disabled && !readOnly && status !== 'uploading' && (
        <button
          type="button"
          className="s-upload-preview-remove"
          onClick={handleRemove}
        >
          {remove ?? (
            <div className="s-upload-preview-close">
              <Icon prefix="si" name="close"></Icon>
            </div>
          )}
        </button>
      )}
    </div>
  )
}

export default UploadPreview
