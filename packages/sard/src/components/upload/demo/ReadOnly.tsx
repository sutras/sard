/*
### 只读
*/

import { useState } from 'react'
import { Upload, UploadPreviewProps } from 'sard'

export default function () {
  const [list, setList] = useState<UploadPreviewProps[]>(() => [
    {
      url: new URL('../../../../public/logo.svg', import.meta.url).href,
    },
  ])

  return (
    <>
      <Upload previewList={list} readOnly />
    </>
  )
}
