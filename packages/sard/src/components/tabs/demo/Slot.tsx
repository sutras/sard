/*
### 插槽
*/

import { Tabs, TabPane, Icon } from 'sard'

export default function () {
  return (
    <>
      <Tabs
        prepend={<span style={{ fontWeight: 'bold' }}>推荐</span>}
        append={<Icon size={20} name="bi-list"></Icon>}
      >
        <TabPane label="标签1">内容1</TabPane>
        <TabPane label="标签2">内容2</TabPane>
        <TabPane label="标签3">内容3</TabPane>
        <TabPane label="标签4">内容4</TabPane>
        <TabPane label="标签5">内容5</TabPane>
        <TabPane label="标签6">内容6</TabPane>
        <TabPane label="标签7">内容7</TabPane>
      </Tabs>
    </>
  )
}
