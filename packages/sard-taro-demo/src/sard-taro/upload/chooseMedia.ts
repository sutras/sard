import Taro from '@tarojs/taro'

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

export function chooseMedia(options: chooseMediaOptions) {
  const {
    count = 9,
    mediaType = 'image',
    sourceType = ['album', 'camera'],
    maxDuration = 10,
    sizeType = ['original', 'compressed'],
    camera = 'back',
    success,
    fail,
    complete,
  } = options

  if (mediaType === 'image') {
    return Taro.chooseImage({
      count,
      sizeType,
      sourceType,
      success(res) {
        success?.({
          type: 'image',
          tempFiles: res.tempFiles.map((file) => {
            return {
              tempFilePath: file.path,
              size: file.size,
              duration: 0,
              height: 0,
              width: 0,
              thumbTempFilePath: '',
              fileType: 'image',
            }
          }),
        })
      },
      fail,
      complete,
    })
  } else {
    return Taro.chooseVideo({
      sourceType,
      compressed: sizeType.includes('compressed'),
      maxDuration,
      camera,
      success(res) {
        success?.({
          type: 'video',
          tempFiles: [
            {
              tempFilePath: res.tempFilePath,
              size: res.size,
              duration: res.duration,
              height: res.height,
              width: res.width,
              thumbTempFilePath: '',
              fileType: 'video',
            },
          ],
        })
      },
      fail,
      complete,
    })
  }
}
