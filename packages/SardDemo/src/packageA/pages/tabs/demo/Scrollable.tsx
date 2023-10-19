import { Tabs } from 'sard'

export default () => {
  return (
    <Tabs defaultActiveKey={1} scrollable>
      {Array(20)
        .fill(0)
        .map((_, i) => {
          return <Tabs.Tab key={i}>{`标签${i + 1}`}</Tabs.Tab>
        })}
    </Tabs>
  )
}
