import { useState } from 'react'
import { Upload, UploadFileItem } from 'sard-taro'

import pic1 from '@/static/pic1.jpg'
import pic2 from '@/static/pic2.jpg'
import pic3 from '@/static/pic3.jpg'

export default () => {
  const handleAfterRead = (fileItem: UploadFileItem) => {
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
      url: pic1,
    },
    {
      url: pic2,
      status: 'uploading',
      message: '正在上传',
    },
    {
      url: pic3,
      status: 'failed',
      message: '上传失败',
    },
  ])

  return (
    <Upload fileList={list} onChange={setList} afterRead={handleAfterRead} />
  )
}
