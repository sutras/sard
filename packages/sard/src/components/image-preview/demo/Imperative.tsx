/*
### 命令式
*/

import { ImagePreview, Button } from 'sard'

const logoHref = new URL('../../../../public/logo.svg', import.meta.url).href

export default function () {
  const handleClick = () => {
    ImagePreview.show({
      images: [logoHref, logoHref, logoHref],
    })
  }

  return (
    <>
      <Button onClick={handleClick}>图片预览</Button>
    </>
  )
}
