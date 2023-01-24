/*
### 基础使用
*/

import { ImagePreview, Button } from 'sard'
import { useState } from 'react'

const logoHref = new URL('../../../../public/logo.svg', import.meta.url).href

export default function () {
  const [visible, setVisible] = useState(false)
  return (
    <>
      <Button onClick={() => setVisible(true)}>图片预览</Button>
      <ImagePreview
        visible={visible}
        onVisible={setVisible}
        images={[logoHref, logoHref, logoHref]}
      />
    </>
  )
}
