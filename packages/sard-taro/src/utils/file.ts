import { isString } from './is'

// 判断url是否为图片url
export function isImageUrl(url: string): boolean {
  return (
    /\.(?:jpg|jpeg|png|gif|svg|bmp|webp|tiff|tif|heic|heif)$/i.test(url) ||
    url.indexOf('data:image') === 0
  )
}

// 判断是否为图片，可以有多种校验方式
export function isImageFile(options: {
  isImage?: boolean
  file?: File
  url?: string
  content?: string
}): boolean {
  const { isImage, file, url, content } = options

  return (
    isImage ||
    (file && file.type.indexOf('image') === 0) ||
    (url && isImageUrl(url)) ||
    (isString(content) && content.indexOf('data:image') === 0)
  )
}

// 判断url是否为图片url
export function isVideoUrl(url: string): boolean {
  return (
    /\.(avi|mp4|mov|wmv|flv|mkv|mpeg|mpg|3gp|webm|swf|rmvb|vob|ts|mts|m2ts|divx|asf|ogv|f4v)$/i.test(
      url,
    ) || url.indexOf('data:video') === 0
  )
}

// 判断是否为图片，可以有多种校验方式
export function isVideoFile(options: {
  isVideo?: boolean
  file?: File
  url?: string
  content?: string
}): boolean {
  const { isVideo, file, url, content } = options

  return (
    isVideo ||
    (file && file.type.indexOf('video') === 0) ||
    (url && isImageUrl(url)) ||
    (isString(content) && content.indexOf('data:video') === 0)
  )
}

// 判断url是否为文件url
export function isFileUrl(url: string): boolean {
  return url.includes('/')
}

export type FileReaderResultType = 'file' | 'dataUrl' | 'text'

// 读取文件内容
export function readFileContent(file: File, resultType: FileReaderResultType) {
  return new Promise<void | string>((resolve) => {
    if (resultType === 'file') {
      resolve()
      return
    }

    const reader = new FileReader()
    reader.onload = () => {
      resolve(reader.result as string)
    }
    if (resultType === 'dataUrl') {
      reader.readAsDataURL(file)
    } else if (resultType === 'text') {
      reader.readAsText(file)
    }
  })
}

// 从路径中获取文件名（可以选择是否包含扩展名）
export function getFileName(path: string, ext = true) {
  const name = path.match(/\/([^/]+)$/)?.[1] || ''
  return ext ? name : name.replace(/\.[^.]+$/, '')
}
