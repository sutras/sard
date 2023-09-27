import { List, Notify } from 'sard-taro'

export default () => {
  return (
    <List card>
      <List.Item
        linkable
        title="显示不会消失的通知"
        onClick={() =>
          Notify.show('这是一条通知', {
            duration: 0,
          })
        }
      />
      <List.Item linkable title="隐藏通知" onClick={() => Notify.hide()} />
    </List>
  )
}
