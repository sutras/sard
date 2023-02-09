/*
### 名称匹配

可以使用 `key` 唯一标识当前 pane，默认 `key` 为当前 pane 在DOM中的位置下标。
*/

import { Tabs, TabPane } from 'sard'

export default function () {
  return (
    <>
      <Tabs>
        <TabPane key="key1" label="标签1">
          内容1
        </TabPane>
        <TabPane key="key2" label="标签2">
          内容2
        </TabPane>
        <TabPane key="key3" label="标签3">
          内容3
        </TabPane>
      </Tabs>
    </>
  )
}
