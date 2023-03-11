/*
### 自定义颜色
*/

import { Button } from 'sard'

export default function () {
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <Button style={{ color: 'fuchsia' }}>default</Button>
        <Button style={{ color: 'fuchsia' }} type="pale">
          pale
        </Button>
        <Button style={{ color: 'fuchsia' }} type="mild">
          mild
        </Button>
        <Button style={{ color: 'fuchsia' }} type="outline">
          outline
        </Button>
        <Button style={{ color: 'fuchsia' }} type="text">
          text
        </Button>
        <Button style={{ color: 'fuchsia' }} type="pale-text">
          pale-text
        </Button>
        <Button
          style={{
            backgroundImage: 'linear-gradient(to right, orange, fuchsia)',
          }}
        >
          primary
        </Button>
      </div>
    </>
  )
}
