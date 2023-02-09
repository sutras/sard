/*
### 自定义颜色
*/

import { Button } from 'sard'

export default function () {
  return (
    <>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
        <Button style={{ color: 'rebeccapurple' }}>default</Button>
        <Button style={{ color: 'rebeccapurple' }} type="pale">
          pale
        </Button>
        <Button style={{ color: 'rebeccapurple' }} type="mild">
          mild
        </Button>
        <Button style={{ color: 'rebeccapurple' }} type="outline">
          outline
        </Button>
        <Button style={{ color: 'rebeccapurple' }} type="text">
          text
        </Button>
        <Button style={{ color: 'rebeccapurple' }} type="pale-text">
          pale-text
        </Button>
        <Button
          style={{
            backgroundImage: 'linear-gradient(to right, orange, rebeccapurple)',
          }}
        >
          primary
        </Button>
      </div>
    </>
  )
}
