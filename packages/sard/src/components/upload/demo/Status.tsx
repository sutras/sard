/*
### 上传状态
*/

import { useState } from 'react'
import { Upload, UploadPreviewProps } from 'sard'

const logoHref = new URL('../../../../public/logo.svg', import.meta.url).href

export default function () {
  const [list, setList] = useState<UploadPreviewProps[]>(() => [
    {
      url: logoHref,
    },
    {
      url: logoHref,
      status: 'uploading',
      message: '正在上传',
    },
    {
      url: logoHref,
      status: 'failed',
      message: '上传失败',
    },
  ])

  const handleChange = (previewList: UploadPreviewProps[]) => {
    setList(previewList)
  }

  const handleAfterRead = (fileItem: UploadPreviewProps) => {
    fileItem.status = 'uploading'
    fileItem.message = '正在上传'
    setList((list) => [...list])

    setTimeout(() => {
      fileItem.status = 'failed'
      fileItem.message = '上传失败'
      setList((list) => [...list])
    }, 1500)
  }

  return (
    <>
      <Upload
        previewList={list}
        onChange={handleChange}
        afterRead={handleAfterRead}
      />
    </>
  )
}
