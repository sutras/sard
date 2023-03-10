/*
### 禁用
*/

import { Upload } from 'sard'

export default function () {
  return (
    <>
      <Upload
        previewList={[
          {
            url: new URL('../../../../public/pic1.jpg', import.meta.url).href,
          },
        ]}
        disabled
      />
    </>
  )
}
