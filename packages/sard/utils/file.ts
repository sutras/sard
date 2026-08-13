/**
 * @description: 判断url是否为图片url
 * @param url
 */
export function isImageUrl(url: string): boolean {
  const rPicMime = /\.(?:jpg|jpeg|png|gif|svg|bmp|webp|tiff|tif|heic|heif)$/i
  return typeof url === 'string' && (rPicMime.test(url) || url.indexOf('data:image') === 0)
}

/**
 * 判断文件类型是否为图片
 */
export function isImageFile(file: File) {
  return file.type.split('/')[0] === 'image'
}

/**
 * 判断文件类型是否为视频
 */
export function isVideoFile(file: File) {
  return file.type.split('/')[0] === 'video'
}

/**
 * @description: 判断url是否为视频url
 * @param url
 */
export function isVideoUrl(url: string): boolean {
  const rVideoMime =
    /\.(avi|mp4|mov|wmv|flv|mkv|mpeg|mpg|3gp|webm|swf|rmvb|vob|ts|mts|m2ts|divx|asf|ogv|f4v)$/i
  return typeof url === 'string' && (rVideoMime.test(url) || url.indexOf('data:video') === 0)
}

/**
 * @description: 判断url是否为文件url
 * @param url
 */
export function isFileUrl(url: string): boolean {
  return url.includes('/')
}

export type FileReaderResultType = 'file' | 'dataUrl' | 'text'

/**
 * @description 读取文件内容
 * @param file
 * @param resultType
 */
export function readFileContent(
  file: File,
  resultType: FileReaderResultType,
): Promise<string | void> {
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

/**
 * @description 从路径中获取文件名
 * @param path 文件路径
 * @param ext 是否包含扩展名
 */
export function getFileName(path: string, ext = true): string {
  const name = path.match(/\/([^/]+)$/)?.[1] || ''
  return ext ? name : name.replace(/\.[^.]+$/, '')
}

/**
 * @description 加载图片
 * @param src 图片 src
 */
export function loadImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image()
    image.src = src
    image.onload = () => {
      resolve(image)
    }
    image.onerror = (err) => {
      reject(err)
    }
  })
}

/**
 * @description 将 ImageData 转换为 DataURL
 * @param imageData
 * @returns
 */
export function imageDataToDataURL(imageData: ImageData, type?: string, quality?: number) {
  const canvas = document.createElement('canvas')
  canvas.width = imageData.width
  canvas.height = imageData.height

  const ctx = canvas.getContext('2d')!
  ctx.putImageData(imageData, 0, 0)

  return canvas.toDataURL(type, quality)
}

export interface ChooseFileOptions {
  accept?: string[]
  multiple?: boolean
  capture?: 'environment' | 'user'
}

/**
 * 选择文件，如果没有选择文件，会触发 catch
 * @param options
 */
export function chooseFile(options: ChooseFileOptions = {}) {
  const { accept = [], multiple = false, capture } = options

  return new Promise<File[]>((resolve, reject) => {
    const input = document.createElement('input')
    input.type = 'file'
    input.accept = accept.join(',')
    input.multiple = multiple
    if (capture) {
      input.capture = capture
    }

    input.onchange = () => {
      const files = input.files

      input.remove()

      if (!files || files.length === 0) {
        reject()
      } else {
        resolve(Array.from(files))
      }
    }

    input.click()
  })
}
