import { Tabs } from 'sard-taro'

export default () => {
  return (
    <Tabs defaultActiveKey={0} scrollable>
      {Array(8)
        .fill(0)
        .map((_, i) => {
          return <Tabs.Tab key={i}>{`标签${i + 1}`}</Tabs.Tab>
        })}
    </Tabs>
  )
}
