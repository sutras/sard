/*
### 加载中
*/

import { Button } from 'sard'

export default function () {
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <Button loading>primary</Button>
      <Button loading loadingText="加载中">
        primary
      </Button>
      <Button
        loading
        loadingText="加载中"
        size="small"
        loadingProps={{ type: 'clock' }}
      >
        primary
      </Button>
      <Button loading loadingText="加载中" loadingProps={{ type: 'clock' }}>
        primary
      </Button>
      <Button
        loading
        loadingText="加载中"
        size="large"
        loadingProps={{ type: 'clock' }}
      >
        primary
      </Button>
    </div>
  )
}
