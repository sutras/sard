import { Text } from '@tarojs/components'
import { Accordion, Icon } from 'sard-taro'

export default () => {
  return (
    <Accordion>
      <Accordion.Item
        title={
          <>
            <Icon prefix="demo-icon" name="emoji-smile"></Icon>
            <Text style={{ marginLeft: 5 }}>标题1</Text>
          </>
        }
        icon={(active) => (
          <Icon name={active ? 'caret-up-fill' : 'caret-down-fill'}></Icon>
        )}
      >
        内容1
      </Accordion.Item>
      <Accordion.Item title="标题2">内容2</Accordion.Item>
      <Accordion.Item title="标题3">内容3</Accordion.Item>
    </Accordion>
  )
}
