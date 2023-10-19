import { Badge, Space, Tabs } from 'sard'

export default () => {
  return (
    <Space gap={30}>
      <Tabs defaultActiveKey={0}>
        <Tabs.Tab>标签1</Tabs.Tab>
        <Tabs.Tab>
          标签2
          <Badge value={5} style={{ marginLeft: 5 }} />
        </Tabs.Tab>
        <Tabs.Tab>
          标签3
          <Badge isDot style={{ marginLeft: 5 }} />
        </Tabs.Tab>
        <Tabs.Tab>标签4</Tabs.Tab>
      </Tabs>

      <Tabs
        defaultActiveKey={0}
        showLine={false}
        activeStyle={{
          backgroundColor: 'tomato',
          color: 'white',
          borderRadius: 9999,
        }}
        scrollable
      >
        {Array(8)
          .fill(0)
          .map((_, i) => {
            return (
              <Tabs.Tab style={{ height: 30 }} key={i}>{`标签${
                i + 1
              }`}</Tabs.Tab>
            )
          })}
      </Tabs>

      <Tabs
        defaultActiveKey={0}
        showLine={false}
        activeStyle={{
          backgroundColor: 'tomato',
          color: 'white',
        }}
      >
        {Array(3)
          .fill(0)
          .map((_, i) => {
            return (
              <Tabs.Tab
                style={{
                  height: 30,
                  borderWidth: 1,
                  borderColor: 'tomato',
                  borderStyle: 'solid',
                  borderLeftWidth: i > 0 ? 0 : 1,
                  borderTopLeftRadius: i === 0 ? 6 : 0,
                  borderBottomLeftRadius: i === 0 ? 6 : 0,
                  borderTopRightRadius: i === 2 ? 6 : 0,
                  borderBottomRightRadius: i === 2 ? 6 : 0,
                  color: 'tomato',
                }}
                key={i}
              >{`标签${i + 1}`}</Tabs.Tab>
            )
          })}
      </Tabs>
    </Space>
  )
}
