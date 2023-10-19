import { useState } from 'react'
import { Upload, UploadFileItem } from 'sard'

export default () => {
  const uploadFile = () => {
    return new Promise((resolve) => {
      setTimeout(resolve, 1500)
    })
  }

  const handleAfterRead = (fileItem: UploadFileItem) => {
    fileItem.status = 'uploading'
    fileItem.message = '正在上传'
    setFileList((fileList) => [...fileList])

    uploadFile()
      .then(() => {
        fileItem.status = 'done'
        setFileList((fileList) => [...fileList])
      })
      .catch(() => {
        fileItem.status = 'failed'
        setFileList((fileList) => [...fileList])
      })
  }

  const [fileList, setFileList] = useState<UploadFileItem[]>(() => [])

  return (
    <Upload
      fileList={fileList}
      onChange={setFileList}
      afterRead={handleAfterRead}
    />
  )
}
