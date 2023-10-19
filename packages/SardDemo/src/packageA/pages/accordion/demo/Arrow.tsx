import { Accordion, Icon } from 'sard'

export default () => {
  return (
    <Accordion
      arrow={(expanded) => <Icon name={expanded ? 'minus' : 'plus'} />}
    >
      <Accordion.Item title="标题1">内容1</Accordion.Item>
      <Accordion.Item title="标题2">内容2</Accordion.Item>
      <Accordion.Item title="标题3">内容3</Accordion.Item>
    </Accordion>
  )
}
