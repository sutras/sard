import { type DefaultProps } from '../config'

export type UploadStatus = 'pending' | 'uploading' | 'failed' | 'done'

export interface UploadFileItem {
  file?: File
  url?: string
  isImage?: boolean
  isVideo?: boolean
  status?: UploadStatus
  name?: string
  message?: string
  [key: PropertyKey]: any
}

export interface UploadSelectOptions {
  capture?: 'environment' | 'user'
}

export interface UploadProps {
  mediaType?: 'image' | 'video' | ('image' | 'video')[]
  multiple?: boolean
  capture?: 'environment' | 'user'
  modelValue?: UploadFileItem[]
  maxCount?: number
  maxSize?: number | ((file: File) => boolean)
  overSize?: (fileItem: UploadFileItem[]) => void
  disabled?: boolean
  readonly?: boolean
  beforeChoose?: (
    fileList: UploadFileItem[],
    next: (allowed: boolean | UploadSelectOptions) => void,
  ) => void
  beforeRead?: (file: File) => boolean | Promise<File>
  afterRead?: (fileItem: UploadFileItem) => void
  removable?: boolean
  beforeRemove?: (index: number, fileItem: UploadFileItem) => boolean | Promise<void>
  validateEvent?: boolean
}

export const defaultUploadProps: DefaultProps<UploadProps> = {
  mediaType: 'image',
  maxCount: Number.MAX_SAFE_INTEGER,
  maxSize: Number.MAX_SAFE_INTEGER,
  removable: true,
  validateEvent: true,
}

export interface UploadSlots {
  default?(props: {
    list: UploadFileItem[]
    onSelect: () => void
    onRemove: (index: number, item: UploadFileItem) => void
    onImageClick: (index: number) => void
  }): any
  select?(props: Record<string, never>): any
}

export interface UploadEmits {
  (e: 'update:modelValue', value: UploadFileItem[]): void
  (e: 'change', value: UploadFileItem[]): void
  (e: 'remove', index: number, item: UploadFileItem): void
  (e: 'item-click', item: UploadFileItem, index: number): void
}

export interface UploadExpose {
  select: () => void
}

export interface ChainNode {
  (data: any, next: (...args: any[]) => void): void
}

export interface UploadPreviewProps {
  file?: File
  url?: string
  isImage?: boolean
  isVideo?: boolean
  status?: UploadStatus
  name?: string
  message?: string
  removable?: boolean
  index: number
  disabled?: boolean
  readonly?: boolean
}

export const defaultUploadPreviewProps: DefaultProps<UploadPreviewProps> = {
  status: 'pending',
}

export interface UploadPreviewEmits {
  (e: 'image-click'): void
  (e: 'remove'): void
  (e: 'click'): void
}
