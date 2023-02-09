/*
### 块级按钮
*/

import { Button } from 'sard'

export default function () {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
      <Button block>default</Button>
      <Button block type="pale">
        pale
      </Button>
      <Button block type="mild">
        mild
      </Button>
      <Button block type="outline">
        outline
      </Button>
      <Button block type="text">
        text
      </Button>
      <Button block type="pale-text">
        pale-text
      </Button>
    </div>
  )
}
