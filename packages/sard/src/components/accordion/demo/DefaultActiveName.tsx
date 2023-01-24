/*
### 默认展开

使用 defaultActiveKey 指定默认展开的 Item，AccordionItem 可以指定一个 name 属性，默认为 DOM 中子节点位置下标。
*/

import { Accordion } from 'sard'

export default function () {
  return (
    <>
      <Accordion defaultActiveKey={1}>
        <Accordion.Item title="标题1">内容1</Accordion.Item>
        <Accordion.Item title="标题2">内容2</Accordion.Item>
        <Accordion.Item title="标题3">内容3</Accordion.Item>
      </Accordion>
    </>
  )
}
