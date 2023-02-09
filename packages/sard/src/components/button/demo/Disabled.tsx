/*
### 禁用按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Button disabled>default</Button>
      <Button disabled type="pale">
        pale
      </Button>
      <Button disabled type="mild">
        mild
      </Button>
      <Button disabled type="outline">
        outline
      </Button>
      <Button disabled type="text">
        text
      </Button>
      <Button disabled type="pale-text">
        pale-text
      </Button>
    </div>
  )
}
