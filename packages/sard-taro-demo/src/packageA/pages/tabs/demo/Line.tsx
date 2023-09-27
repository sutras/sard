import { Icon, Tabs } from 'sard-taro'

export default () => {
  return (
    <Tabs
      defaultActiveKey={0}
      lineStyle={{
        height: 20,
        backgroundColor: 'transparent',
      }}
      line={
        <Icon family="demo-icons" name="smile-line" size={20} color="tomato" />
      }
    >
      <Tabs.Tab>标签1</Tabs.Tab>
      <Tabs.Tab>标签2</Tabs.Tab>
      <Tabs.Tab>标签3</Tabs.Tab>
    </Tabs>
  )
}
