/*
### 包含子组件
*/

import { Skeleton, Icon, Switch } from 'sard'
import { useState } from 'react'

export default function () {
  const [loading, setLoading] = useState(true)

  return (
    <>
      <Switch
        defaultChecked={!loading}
        onChange={(check) => setLoading(!check)}
      ></Switch>
      <br />
      <br />

      <Skeleton avatar title animated loading={loading}>
        <div style={{ display: 'flex' }}>
          <div style={{ flex: 'none', marginRight: 15 }}>
            <Icon prefix="si" name="person" size={32}></Icon>
          </div>
          <div style={{ flex: 1 }}>
            <div style={{ marginBottom: 10, fontSize: '1.2em' }}>
              我是一个标题
            </div>
            <div>
              我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落我是一个段落
            </div>
          </div>
        </div>
      </Skeleton>
    </>
  )
}
