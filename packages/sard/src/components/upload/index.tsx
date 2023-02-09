import {
  CSSProperties,
  FC,
  ReactNode,
  useEffect,
  useRef,
  useState,
} from 'react'
import classNames from 'classnames'
import { useControlledValue } from '../../use'
import { CommonComponentProps } from '../../utils/types'
import { readFileContent, FileReaderResultType } from '../../utils'
import { Icon } from '../icon'

import { ImagePreview } from '../image-preview'
import { isImageFile } from './utils'

import { UploadPreview, UploadPreviewProps, UploadFileItem } from './Preview'
import { useEvent } from '../../use'

export * from './Preview'

interface ChainNode {
  (data: any, next: (...args: any[]) => void): void
}

export interface UploadBaseProps extends CommonComponentProps {
  className?: string
  style?: CSSProperties
  children?: ReactNode
  accept?: string
  capture?: boolean | 'user' | 'environment'
  previewList?: UploadPreviewProps[]
  defaultPreviewList?: UploadPreviewProps[]
  maxCount?: number
  maxSize?: number | ((file: File) => boolean)
  select?: ReactNode
  resultType?: FileReaderResultType
  disabled?: boolean
  readOnly?: boolean
  beforeRead?: (file: File) => boolean | Promise<File>
  onChange?: (previewPropsList: UploadPreviewProps[]) => void
  removable?: boolean
  remove?: ReactNode
  beforeRemove?: (...args: any[]) => boolean | Promise<void>
  onRemove?: (index: number) => void
}

export interface UploadSingleProps extends UploadBaseProps {
  multiple?: false
  afterRead?: (previewProps: UploadFileItem) => void
  overSize?: (previewProps: UploadFileItem) => void
}

export interface UploadMutipleProps extends UploadBaseProps {
  multiple: true
  afterRead?: (previewPropsList: UploadFileItem[]) => void
  overSize?: (previewPropsList: UploadFileItem[]) => void
}

export type UploadProps = UploadSingleProps | UploadMutipleProps

export interface UploadFC extends FC<UploadProps> {
  Preview: typeof UploadPreview
}

export const Upload: UploadFC = (props) => {
  const {
    className,
    children,
    multiple,
    accept,
    capture,
    previewList,
    defaultPreviewList,
    maxCount = Number.MAX_SAFE_INTEGER,
    maxSize = Number.MAX_SAFE_INTEGER,
    overSize,
    select,
    resultType = 'dataUrl',
    disabled,
    readOnly,
    beforeRead,
    afterRead,
    onChange,
    removable = true,
    remove,
    beforeRemove,
    onRemove,
    ...restProps
  } = props

  const inputRef = useRef<HTMLInputElement>(null)

  const [innerPreviewList, setInnerPreviewList] = useControlledValue<
    UploadPreviewProps[]
  >(props, {
    defaultValuePropName: 'defaultPreviewList',
    valuePropName: 'previewList',
    defaultValue: [],
  })

  const resetInput = () => {
    if (inputRef.current) {
      inputRef.current.value = ''
    }
  }

  const limitCountNode: ChainNode = (files: File[], next) => {
    const remainCount = maxCount - innerPreviewList.length
    if (files.length > remainCount) {
      files = files.slice(0, remainCount)
    }
    next(files)
  }

  const beforeReadNode: ChainNode = (files: File[], next) => {
    Promise.allSettled<File>(
      files.map(
        (file) =>
          new Promise((resolve, reject) => {
            if (beforeRead) {
              const ret = beforeRead(file)
              if (!ret) {
                resetInput()
                reject()
                return
              }
              if (ret instanceof Promise) {
                ret
                  .then((mayNewFile) => {
                    resolve(mayNewFile instanceof File ? mayNewFile : file)
                  })
                  .catch(() => {
                    resetInput()
                    reject()
                  })
                return
              }
            }
            resolve(file)
          }),
      ),
    ).then((results) => {
      const fileList = results
        .filter((result) => result.status === 'fulfilled')
        .map((result) => (result as PromiseFulfilledResult<File>).value)
      next(fileList)
    })
  }

  const readFileContentNode: ChainNode = (files: File[], next) => {
    resetInput()

    Promise.all(files.map((file) => readFileContent(file, resultType))).then(
      (contents) => {
        const fileList = files.map((file, index) => {
          const item: UploadPreviewProps = {
            file,
          }
          if (contents[index]) {
            item.content = contents[index] as string
          }
          return item
        })
        next(fileList)
      },
    )
  }

  const limitSizeNode: ChainNode = (fileList: UploadFileItem[], next) => {
    const valid: UploadFileItem[] = []
    const invalid: UploadFileItem[] = []

    fileList.forEach((item) => {
      const file = item.file as File
      if (
        (typeof maxSize === 'function' && maxSize(file)) ||
        file.size > maxSize
      ) {
        invalid.push(item)
      } else {
        valid.push(item)
      }
    })

    if (invalid.length) {
      if (multiple) {
        overSize?.(invalid)
      } else {
        overSize?.(invalid[0])
      }
    }
    if (valid.length) {
      setInnerPreviewList([...innerPreviewList, ...valid])

      next(valid)
    }
  }

  const afterReadNode: ChainNode = (fileList: UploadFileItem[]) => {
    if (multiple) {
      afterRead?.(fileList)
    } else {
      afterRead?.(fileList[0])
    }
  }

  const handleChange = () => {
    const files = inputRef.current?.files

    if (disabled || !files || files.length === 0) {
      return
    }
    const fileList = [...files]

    const chain = [
      limitCountNode,
      beforeReadNode,
      readFileContentNode,
      limitSizeNode,
      afterReadNode,
    ].reduceRight<(...args: any[]) => void>(
      (next, node) => (data: any) => {
        node(data, next)
      },
      () => {
        void 0
      },
    )

    chain(fileList)
  }

  const handleRemove = useEvent((index: number, item: UploadPreviewProps) => {
    const list = innerPreviewList.filter((_, i) => i !== index)
    // 非受控
    if (previewList == null) {
      setInnerPreviewList(list)
    }
    onChange?.(list)
    item.onRemove?.(index)
    onRemove?.(index)
  })

  const handleClick = useEvent((index: number) => {
    const currentItem = innerPreviewList[index]
    if (!isImageFile(currentItem)) {
      return
    }

    const previewList = innerPreviewList.filter((item) => isImageFile(item))
    const previewIndex = previewList.findIndex((item) => item === currentItem)
    const imageList = previewList.map(
      (item) => (item.url || item.content) as string,
    )
    ImagePreview.show({
      images: imageList,
      defaultIndex: previewIndex,
    })
  })

  const uploadClass = classNames(
    's-upload',
    {
      's-upload-disabled': disabled,
      's-upload-readonly': readOnly,
    },
    className,
  )

  const renderInput = () => {
    return (
      !disabled && (
        <input
          ref={inputRef}
          className="s-upload-input"
          type="file"
          multiple={multiple}
          accept={accept}
          capture={capture}
          disabled={disabled}
          onChange={handleChange}
        />
      )
    )
  }

  return (
    <div {...restProps} className={uploadClass}>
      {children && !readOnly && innerPreviewList.length < maxCount && (
        <div className="s-upload-input-wrapper">
          {children}
          {renderInput()}
        </div>
      )}
      <div className="s-upload-wrapper">
        {innerPreviewList.map((item, index) => {
          return (
            <UploadPreview
              {...item}
              key={index}
              index={index}
              disabled={disabled}
              readOnly={readOnly}
              removable={item.removable ?? removable}
              remove={item.remove ?? remove}
              beforeRemove={item.beforeRemove ?? beforeRemove}
              onRemove={(index) => handleRemove(index, item)}
              onClick={handleClick}
            ></UploadPreview>
          )
        })}
        {!children && !readOnly && innerPreviewList.length < maxCount && (
          <div className="s-upload-select">
            {select ?? <Icon prefix="si" name="plus"></Icon>}
            {renderInput()}
          </div>
        )}
      </div>
    </div>
  )
}

Upload.Preview = UploadPreview

export default Upload
