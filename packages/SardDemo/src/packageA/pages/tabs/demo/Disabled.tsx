import { Tabs } from 'sard'

export default () => {
  return (
    <Tabs defaultActiveKey={0}>
      {Array(3)
        .fill(0)
        .map((_, i) => {
          return (
            <Tabs.Tab key={i} disabled={i === 1}>{`标签${i + 1}`}</Tabs.Tab>
          )
        })}
    </Tabs>
  )
}
