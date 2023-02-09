/*
### 圆形按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Button round>default</Button>
      <Button round type="pale">
        pale
      </Button>
      <Button round type="mild">
        mild
      </Button>
      <Button round type="outline">
        outline
      </Button>
      <Button round type="text">
        text
      </Button>
      <Button round type="pale-text">
        pale-text
      </Button>
    </div>
  )
}
