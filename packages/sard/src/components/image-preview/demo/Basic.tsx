/*
### 基础使用
*/

import { ImagePreview, Button } from 'sard'
import { useState } from 'react'

export default function () {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)}>图片预览</Button>
      <ImagePreview
        visible={visible}
        onVisible={setVisible}
        images={[
          new URL('../../../../public/pic1.jpg', import.meta.url).href,
          new URL('../../../../public/pic2.jpg', import.meta.url).href,
          new URL('../../../../public/pic3.jpg', import.meta.url).href,
        ]}
      />
    </>
  )
}
