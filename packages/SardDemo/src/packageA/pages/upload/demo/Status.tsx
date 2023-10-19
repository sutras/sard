import { useState } from 'react'
import { Upload, UploadFileItem } from 'sard'

export default () => {
  const handleAfterRead = (fileItem: UploadFileItem) => {
    console.log(fileItem)
    fileItem.status = 'uploading'
    fileItem.message = '正在上传'
    setList((list) => [...list])

    setTimeout(() => {
      fileItem.status = 'done'
      setList((list) => [...list])
    }, 1500)
  }

  const [list, setList] = useState<UploadFileItem[]>(() => [
    {
      url: 'https://unpkg.com/@sard/assets@1.2.0/images/pic1.jpg',
    },
    {
      url: 'https://unpkg.com/@sard/assets@1.2.0/images/pic2.jpg',
      status: 'uploading',
      message: '正在上传',
    },
    {
      url: 'https://unpkg.com/@sard/assets@1.2.0/images/pic3.jpg',
      status: 'failed',
      message: '上传失败',
    },
  ])

  return (
    <Upload fileList={list} onChange={setList} afterRead={handleAfterRead} />
  )
}
