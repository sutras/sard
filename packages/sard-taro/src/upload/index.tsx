import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  forwardRef,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import Taro from '@tarojs/taro'
import { ImageProps, View } from '@tarojs/components'
import { useBem, useControllableValue, useEvent } from '../use'
import { getFileName, isImageUrl } from '../utils'
import { Icon } from '../icon'

import { UploadPreview, UploadFileItem, UploadFile } from './Preview'
import { AnyFunction, BaseProps } from '../base'

export * from './Preview'

interface ChainNode {
  (data: unknown, next: (...args: unknown[]) => void): void
}

export interface UploadProps extends Omit<BaseProps, 'children'> {
  accept?: 'image' | 'video'
  multiple?: boolean
  sourceType?: ('album' | 'camera')[]
  compressed?: boolean
  sizeType?: ('original' | 'compressed')[]
  maxDuration?: number
  camera?: 'back' | 'front'
  fileList?: UploadFileItem[]
  defaultFileList?: UploadFileItem[]
  maxCount?: number
  maxSize?: number | ((file: UploadFile) => boolean)
  overSize?: (previewProps: UploadFileItem | UploadFileItem[]) => void
  select?: ReactNode
  disabled?: boolean
  readOnly?: boolean
  beforeRead?: (file: UploadFile) => boolean | Promise<UploadFile>
  afterRead?: (previewProps: UploadFileItem | UploadFileItem[]) => void
  onChange?: (previewPropsList: UploadFileItem[]) => void
  removable?: boolean
  remove?: ReactNode
  beforeRemove?: (...args: unknown[]) => boolean | Promise<void>
  onRemove?: (index: number) => void
  mode?: ImageProps['mode']
}

export interface UploadRef {
  select: () => void
}

export interface UploadFC
  extends ForwardRefExoticComponent<
    PropsWithoutRef<UploadProps> & RefAttributes<UploadRef>
  > {
  Preview: typeof UploadPreview
}

export const Upload: UploadFC = forwardRef<UploadRef, UploadProps>(
  (props, ref) => {
    const {
      className,
      accept = 'image',
      multiple,
      sourceType = ['album', 'camera'],
      compressed = false,
      sizeType = ['original', 'compressed'],
      maxDuration = 60,
      camera = 'back',
      fileList,
      defaultFileList,
      maxCount = Number.MAX_SAFE_INTEGER,
      maxSize = Number.MAX_SAFE_INTEGER,
      overSize,
      select,
      disabled,
      readOnly,
      beforeRead,
      afterRead,
      onChange,
      removable = true,
      remove,
      beforeRemove,
      onRemove,
      mode = 'aspectFill',
      ...restProps
    } = props

    const [bem] = useBem('upload')

    const [innerPreviewList, setInnerPreviewList] = useControllableValue({
      value: fileList,
      defaultValue: defaultFileList,
      trigger: onChange,
      initialValue: () => [] as UploadFileItem[],
    })

    const limitCountNode: ChainNode = (files: UploadFile[], next) => {
      const remainCount = maxCount - innerPreviewList.length
      if (files.length > remainCount) {
        files = files.slice(0, remainCount)
      }
      next(files)
    }

    const beforeReadNode: ChainNode = (files: UploadFile[], next) => {
      Promise.allSettled<UploadFile>(
        files.map(
          (file) =>
            new Promise((resolve, reject) => {
              if (beforeRead) {
                const ret = beforeRead(file)
                if (!ret) {
                  reject()
                  return
                }
                if (ret instanceof Promise) {
                  ret
                    .then((mayNewFile) => {
                      resolve(mayNewFile ?? file)
                    })
                    .catch(() => {
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
          .map((result) => (result as PromiseFulfilledResult<UploadFile>).value)
        next(fileList)
      })
    }

    const toUploadFileNode: ChainNode = (files: UploadFile[], next) => {
      const fileList = files.map((file) => {
        return {
          file,
          name: getFileName(file.path),
        }
      })

      next(fileList)
    }

    const limitSizeNode: ChainNode = (fileList: UploadFileItem[], next) => {
      const valid: UploadFileItem[] = []
      const invalid: UploadFileItem[] = []

      fileList.forEach((item) => {
        const file = item.file
        const isFunc = typeof maxSize === 'function'
        if ((isFunc && maxSize(file)) || (!isFunc && file.size > maxSize)) {
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

    function toChain(files: UploadFile[]) {
      const chain = [
        limitCountNode,
        beforeReadNode,
        toUploadFileNode,
        limitSizeNode,
        afterReadNode,
      ].reduceRight<AnyFunction>(
        (next, node) => (data: unknown) => {
          node(data, next)
        },
        () => {
          null
        },
      )

      chain(files)
    }

    function makeUpdateFile(
      res: {
        type: 'image' | 'video'
        size?: number
        path?: string
        mime?: string
        originalFileObj?: File
        tempFilePath?: string
        duration?: number
        width?: number
        height?: number
      }[],
    ): UploadFile[] {
      return res.map((item) => {
        return {
          type: item.type,
          size: item.size,
          path: item.path ?? item.tempFilePath,
          mime: item.mime || '',
          originalFileObj: item.originalFileObj || null,
          duration: item.duration || 0,
          width: item.width || 0,
          height: item.height || 0,
        }
      })
    }

    const handleSelect = useEvent(() => {
      if (disabled || readOnly || innerPreviewList.length >= maxCount) {
        return
      }

      if (accept === 'image') {
        Taro.chooseImage({
          count: multiple ? undefined : 1,
          sizeType,
          sourceType,
          success(res) {
            toChain(
              makeUpdateFile(
                res.tempFiles.map((item) => ({
                  ...item,
                  mime: item.type,
                  type: 'image',
                })),
              ),
            )
          },
        })
      } else if (accept === 'video') {
        Taro.chooseVideo({
          sourceType,
          compressed,
          maxDuration,
          camera,
          success(res) {
            toChain(
              makeUpdateFile([
                {
                  type: 'video',
                  ...res,
                },
              ]),
            )
          },
        })
      }
    })

    const handleRemove = useEvent((index: number, item: UploadFileItem) => {
      const list = innerPreviewList.filter((_, i) => i !== index)

      setInnerPreviewList(list)

      item.onRemove?.(index)
      onRemove?.(index)
    })

    const handleImageClick = useEvent((index: number) => {
      const currentFileItem = innerPreviewList[index]

      const fileList = innerPreviewList.filter(
        (item) =>
          (item.url && isImageUrl(item.url)) || item.file?.type === 'image',
      )
      const currentIndex = fileList.findIndex(
        (item) => item === currentFileItem,
      )
      const urls = fileList.map(
        (item) => (item.url || item.file?.path) as string,
      )

      Taro.previewImage({
        urls,
        current: urls[currentIndex],
      })
    })

    const uploadClass = classNames(
      bem.b(),
      bem.m('disabled', disabled),
      bem.m('readonly', readOnly),
      className,
    )

    useImperativeHandle(ref, () => ({
      select: handleSelect,
    }))

    return (
      <View {...restProps} className={uploadClass}>
        <View className={bem.e('wrapper')}>
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
                onImageClick={handleImageClick}
                mode={mode}
              ></UploadPreview>
            )
          })}
          {!disabled && !readOnly && innerPreviewList.length < maxCount && (
            <View
              className={classNames(
                bem.e('select'),
                bem.em('select', 'interactive', !disabled && !readOnly),
              )}
              onClick={handleSelect}
            >
              {select ?? <Icon name="plus"></Icon>}
            </View>
          )}
        </View>
      </View>
    )
  },
) as UploadFC

Upload.Preview = UploadPreview

export default Upload
