import { Badge, Space, Tabs } from 'sard-taro'

export default () => {
  return (
    <Space vertical gap={30}>
      <Tabs defaultActiveKey={0}>
        <Tabs.Tab>标签1</Tabs.Tab>
        <Tabs.Tab>
          标签2 <Badge style={{ marginLeft: 3 }} value={5} />
        </Tabs.Tab>
        <Tabs.Tab>
          <Badge isDot>标签3</Badge>
        </Tabs.Tab>
        <Tabs.Tab>标签4</Tabs.Tab>
      </Tabs>

      <Tabs
        defaultActiveKey={0}
        showLine={false}
        activeStyle={{
          backgroundColor: 'var(--sar-primary)',
          color: 'var(--sar-white)',
          borderRadius: 'var(--sar-rounded-full)',
          transition: '0.3s',
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
          backgroundColor: 'var(--sar-primary)',
          color: 'var(--sar-white)',
          transition: '0.3s',
        }}
      >
        {Array(3)
          .fill(0)
          .map((_, i) => {
            return (
              <Tabs.Tab
                style={{
                  height: 30,
                  border: '1px solid var(--sar-primary)',
                  borderLeftWidth: i > 0 ? 0 : 1,
                  borderTopLeftRadius: i === 0 ? 'var(--sar-rounded)' : 0,
                  borderBottomLeftRadius: i === 0 ? 'var(--sar-rounded)' : 0,
                  borderTopRightRadius: i === 2 ? 'var(--sar-rounded)' : 0,
                  borderBottomRightRadius: i === 2 ? 'var(--sar-rounded)' : 0,
                  color: 'var(--sar-primary)',
                }}
                key={i}
              >{`标签${i + 1}`}</Tabs.Tab>
            )
          })}
      </Tabs>
    </Space>
  )
}
