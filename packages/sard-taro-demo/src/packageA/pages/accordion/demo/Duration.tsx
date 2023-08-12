import { Accordion } from 'sard-taro'

export default () => {
  return (
    <Accordion duration={0}>
      <Accordion.Item title="标题1">内容1</Accordion.Item>
      <Accordion.Item title="标题2">内容2</Accordion.Item>
      <Accordion.Item title="标题3">内容3</Accordion.Item>
    </Accordion>
  )
}
