/*
### 自定义上传样式
*/

import { useState } from 'react'
import { Upload, UploadPreviewProps, Icon, Button } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  const [list, setList] = useState<UploadPreviewProps[]>([])

  const handleChange = (previewList: UploadPreviewProps[]) => {
    setList(previewList)
  }

  return (
    <>
      <Upload previewList={list} onChange={handleChange}>
        <Button>
          <Icon name="bi-upload"></Icon>
          <span style={{ marginLeft: 5 }}>文件上传</span>
        </Button>
      </Upload>
    </>
  )
}
