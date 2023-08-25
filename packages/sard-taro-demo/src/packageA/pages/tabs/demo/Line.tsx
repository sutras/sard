import { Icon, Tabs } from 'sard-taro'

export default () => {
  return (
    <Tabs
      defaultActiveKey={0}
      lineStyle={{
        height: 20,
        background: 'transparent',
      }}
      line={
        <Icon
          prefix="demo-icon"
          name="smile-line"
          size={20}
          color="var(--sar-warning)"
        />
      }
    >
      <Tabs.Tab>标签1</Tabs.Tab>
      <Tabs.Tab>标签2</Tabs.Tab>
      <Tabs.Tab>标签3</Tabs.Tab>
    </Tabs>
  )
}
