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
            url: new URL('../../../../public/logo.svg', import.meta.url).href,
          },
        ]}
        disabled
      />
    </>
  )
}
