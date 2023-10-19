import ActionSheet from '../action-sheet'

interface chooseMediaOptions {
  count?: number
  mediaType?: 'image' | 'video'
  sourceType?: ('album' | 'camera')[]
  maxDuration?: number
  sizeType?: ('original' | 'compressed')[]
  camera?: 'back' | 'front'
  success?: (result: chooseMediaResult) => void
  fail?: (err: any) => void
  complete?: () => void
}

interface chooseMediaResult {
  tempFiles: {
    tempFilePath: string
    size: number
    duration: number
    height: number
    width: number
    thumbTempFilePath: string
    fileType: 'image' | 'video'
  }[]
  type: 'image' | 'video'
}

let input: HTMLInputElement

export async function chooseMedia(options: chooseMediaOptions) {
  const {
    count = 9,
    mediaType = 'image',
    sourceType = ['album', 'camera'],
    camera = 'back',
    success,
    fail,
    complete,
  } = options

  let finalSourceType: 'album' | 'camera' = 'album'

  if (sourceType.length > 1) {
    const { index } = await ActionSheet.show({
      itemList: ['拍摄', '从相册选择'],
      cancel: '取消',
    })
    finalSourceType = index === 0 ? 'camera' : 'album'
  } else if (sourceType.length === 1) {
    finalSourceType = sourceType[0]
  }

  if (!input) {
    input = document.createElement('input')
    input.type = 'file'
    input.style.cssText =
      'position: fixed; z-index: -100; opacity: 0; pointer-events: none'
  }

  input.multiple = count > 1

  if (finalSourceType === 'camera') {
    input.setAttribute('capture', camera === 'back' ? 'environment' : 'user')
  } else {
    input.removeAttribute('capture')
  }

  input.setAttribute('accept', mediaType === 'image' ? 'image/*' : 'video/*')

  try {
    const result = await new Promise<chooseMediaResult>((resolve, reject) => {
      input.onchange = async () => {
        const files = input.files || []

        const tempFiles: chooseMediaResult['tempFiles'] = []

        try {
          for (const file of [...files]) {
            tempFiles.push(await loadMedia(file, mediaType))
          }
        } catch (err) {
          reject(err)
        }

        resolve({
          tempFiles,
          type: mediaType,
        })
        input.value = ''
      }

      input.click()
    })

    success?.(result)

    return result
  } catch (err) {
    if (fail) {
      fail(err)
    } else {
      throw err
    }
  } finally {
    complete?.()
  }
}

async function loadMedia(file: File, type: 'image' | 'video') {
  const url = URL.createObjectURL(file)

  const result = {
    tempFilePath: url,
    size: file.size,
    duration: 0,
    height: 0,
    width: 0,
    thumbTempFilePath: '',
    fileType: type,
  }

  if (type === 'video') {
    await new Promise<void>((resolve, reject) => {
      const video = document.createElement('video')
      video.crossOrigin = 'Anonymous'
      video.preload = 'metadata'
      video.src = url
      video.onloadedmetadata = () => {
        result.duration = video.duration
        result.width = video.videoWidth
        result.height = video.videoHeight
        resolve()
      }
      video.onerror = () => {
        reject()
      }
    })
  } else {
    await new Promise<void>((resolve, reject) => {
      const img = new Image()
      img.crossOrigin = url
      img.src = url

      if (img.complete) {
        result.width = img.width
        result.height = img.height
        resolve()
      } else {
        img.onload = () => {
          result.width = img.width
          result.height = img.height
          resolve()
        }
        img.onerror = () => {
          reject()
        }
      }
    })
  }

  return result
}
