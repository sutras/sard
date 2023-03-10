/*
### 命令式
*/

import { ImagePreview, Button } from 'sard'

export default function () {
  const handleClick = () => {
    ImagePreview.show({
      images: [
        new URL('../../../../public/pic1.jpg', import.meta.url).href,
        new URL('../../../../public/pic2.jpg', import.meta.url).href,
        new URL('../../../../public/pic3.jpg', import.meta.url).href,
      ],
    })
  }

  return (
    <>
      <Button onClick={handleClick}>图片预览</Button>
    </>
  )
}
