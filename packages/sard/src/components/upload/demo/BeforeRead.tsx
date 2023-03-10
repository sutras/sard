/*
### 上传前置处理
*/

import { useState } from 'react'
import { Upload, UploadPreviewProps, Toast } from 'sard'

export default function () {
  const [list, setList] = useState<UploadPreviewProps[]>([])

  const handleChange = (previewList: UploadPreviewProps[]) => {
    setList(previewList)
  }

  const handleBeforeRead = (file: File) => {
    if (file.type.indexOf('image') !== 0) {
      Toast.show('只能上传图片')
      return false
    }
    return true
  }

  return (
    <>
      <div>请上传图片：</div>
      <Upload
        previewList={list}
        onChange={handleChange}
        beforeRead={handleBeforeRead}
      />
    </>
  )
}
