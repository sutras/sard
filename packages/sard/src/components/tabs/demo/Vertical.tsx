/*
### 垂直
*/

import { Tabs, TabPane } from 'sard'

export default function () {
  return (
    <>
      <Tabs vertical>
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
      </Tabs>

      <br />
      <br />
      <Tabs vertical type="border">
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
      </Tabs>

      <br />
      <br />
      <Tabs vertical type="pill">
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
      </Tabs>

      <br />
      <br />
      <Tabs
        vertical
        type="card"
        style={{ padding: 10, background: 'var(--s-secondary-bg)' }}
        bodyStyle={{ background: 'var(--s-emphasis-bg)' }}
      >
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
      </Tabs>
    </>
  )
}
