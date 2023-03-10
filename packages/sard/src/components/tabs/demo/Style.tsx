/*
### 自定义样式
*/

import { Tabs, TabPane } from 'sard'

export default function () {
  return (
    <>
      <Tabs
        headerStyle={{ borderBottom: '1px solid #eee' }}
        activeLabelStyle={{ fontWeight: 'bold', color: 'orange' }}
        inkbarStyle={{ background: 'orange' }}
      >
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
      </Tabs>

      <br />
      <br />
      <Tabs type="border" wrapperStyle={{ color: 'orange' }}>
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
      </Tabs>

      <br />
      <br />
      <Tabs type="pill" activeLabelStyle={{ backgroundColor: 'orange' }}>
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
        <TabPane label="标签4">内容4</TabPane>
        <TabPane label="标签5">内容5</TabPane>
        <TabPane label="标签6">内容6</TabPane>
      </Tabs>
    </>
  )
}
