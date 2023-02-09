/*
### 自定义选区样式
*/

import { useState } from 'react'
import { Upload, UploadPreviewProps, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  const [list, setList] = useState<UploadPreviewProps[]>([])

  const handleChange = (previewList: UploadPreviewProps[]) => {
    setList(previewList)
  }

  return (
    <>
      <Upload
        previewList={list}
        onChange={handleChange}
        select={
          <>
            <Icon style={{ fontSize: 20 }} name="bi-camera"></Icon>
            <div style={{ fontSize: 12, marginTop: 5 }}>上传图片</div>
          </>
        }
      />
    </>
  )
}
