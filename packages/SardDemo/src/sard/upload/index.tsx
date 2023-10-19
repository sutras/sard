import {
  ForwardRefExoticComponent,
  PropsWithoutRef,
  ReactNode,
  RefAttributes,
  forwardRef,
  useImperativeHandle,
} from 'react'
import classNames from 'classnames'
import { previewImage } from '@tarojs/taro'
import { ImageProps, View } from '@tarojs/components'
import { useBem, useControllableValue, useEvent, useSelectorId } from '../use'
import { getFileName, isFunction, isImageUrl, noop } from '../utils'
import { Icon } from '../icon'

import { UploadPreview, UploadFileItem, UploadFile } from './Preview'
import { AnyFunction, BaseProps } from '../base'
import Pressable from '../pressable'
import { chooseMedia } from './chooseMedia'
import CustomWrapper from '../custom-wrapper'

export * from './Preview'

interface ChainNode {
  (data: any, next: (...args: any[]) => void): void
}

export interface UploadProps extends Omit<BaseProps, 'children'> {
  accept?: 'image' | 'video'
  multiple?: boolean
  sourceType?: ('album' | 'camera')[]
  sizeType?: ('original' | 'compressed')[]
  maxDuration?: number
  camera?: 'back' | 'front'
  fileList?: UploadFileItem[]
  defaultFileList?: UploadFileItem[]
  onChange?: (fileItemList: UploadFileItem[]) => void
  maxCount?: number
  maxSize?: number | ((file: UploadFile) => boolean)
  overSize?: (fileItem: UploadFileItem | UploadFileItem[]) => void
  select?: ReactNode
  disabled?: boolean
  readOnly?: boolean
  beforeRead?: (file: UploadFile) => boolean | Promise<UploadFile>
  afterRead?: (fileItem: UploadFileItem | UploadFileItem[]) => void
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
      style,

      accept = 'image',
      multiple,
      sourceType = ['album', 'camera'],
      sizeType = ['original', 'compressed'],
      maxDuration = 60,
      camera = 'back',
      fileList,
      defaultFileList,
      onChange,
      maxCount = Number.MAX_SAFE_INTEGER,
      maxSize = Number.MAX_SAFE_INTEGER,
      overSize,
      select,
      disabled,
      readOnly,
      beforeRead,
      afterRead,
      removable = true,
      remove,
      beforeRemove,
      onRemove,
      mode = 'aspectFill',
      ...restProps
    } = props

    const [bem] = useBem('upload')

    const contextId = useSelectorId()

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
          name: file.path && getFileName(file.path),
        }
      })

      next(fileList)
    }

    const limitSizeNode: ChainNode = (fileList: UploadFileItem[], next) => {
      const valid: UploadFileItem[] = []
      const invalid: UploadFileItem[] = []

      fileList.forEach((item) => {
        const file = item.file
        const isFunc = isFunction(maxSize)
        if (
          (isFunc && file && maxSize(file)) ||
          (!isFunc && file && file.size && file.size > maxSize)
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

    const handleSelect = useEvent(() => {
      if (disabled || readOnly || innerPreviewList.length >= maxCount) {
        return
      }

      chooseMedia({
        mediaType: accept,
        count: multiple ? 9999 : 1,
        sizeType,
        sourceType,
        maxDuration,
        camera,
        success(result) {
          toChain(
            result.tempFiles.map((file) => {
              return {
                type: file.fileType,
                size: file.size,
                path: file.tempFilePath,
                duration: file.duration,
                width: file.width,
                height: file.height,
                originalFileObj: null,
              }
            }),
          )
        },
        fail: noop,
      }).catch(noop)
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

      previewImage({
        urls,
        current: urls[currentIndex],
      })
    })

    useImperativeHandle(
      ref,
      () => ({
        select: handleSelect,
      }),
      [],
    )

    return (
      <CustomWrapper id={contextId}>
        <View
          {...restProps}
          className={classNames(
            bem.b(),
            bem.m('disabled', disabled),
            bem.m('readonly', readOnly),
            className,
          )}
          style={style}
        >
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
                  contextId={contextId}
                />
              )
            })}
            {!disabled && !readOnly && innerPreviewList.length < maxCount && (
              <Pressable disabled={disabled || readOnly}>
                {({ pressed }) => (
                  <View
                    className={classNames(
                      bem.e('select'),
                      bem.em('select', 'pressed', pressed),
                    )}
                    onClick={handleSelect}
                  >
                    {select ?? (
                      <Icon name="plus" className={bem.e('select-icon')} />
                    )}
                  </View>
                )}
              </Pressable>
            )}
          </View>
        </View>
      </CustomWrapper>
    )
  },
) as UploadFC

Upload.Preview = UploadPreview

export default Upload
