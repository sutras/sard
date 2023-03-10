/*
### 限定上传大小
*/

import { useState } from 'react'
import { Upload, UploadPreviewProps, UploadFileItem, Toast } from 'sard'

export default function () {
  const [list, setList] = useState<UploadPreviewProps[]>([])

  const handleChange = (previewList: UploadPreviewProps[]) => {
    setList(previewList)
  }

  const handleOverSize = (fileItem: UploadFileItem) => {
    console.log(fileItem)
    Toast.show('文件大小不能超过512KB')
  }

  const [list2, setList2] = useState<UploadPreviewProps[]>([])

  const handleChange2 = (previewList: UploadPreviewProps[]) => {
    setList2(previewList)
  }

  const handleMaxSize = (file: File) => {
    if (file.type.indexOf('image') === 0 && file.size > 512 * 1024) {
      Toast.show('图片大小不能超过512KB')
      return true
    }
    return false
  }

  return (
    <>
      <Upload
        previewList={list}
        onChange={handleChange}
        maxSize={512 * 1024}
        overSize={handleOverSize}
      />

      <div style={{ marginTop: 20, marginBottom: 10 }}>
        只对图片文件大小进行限定：
      </div>
      <Upload
        previewList={list2}
        onChange={handleChange2}
        maxSize={handleMaxSize}
      />
    </>
  )
}
