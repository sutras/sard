import { List, Notify } from 'sard'

export default () => {
  return (
    <List card>
      <List.Item
        linkable
        title="显示通知"
        onClick={() =>
          Notify.show('这是一条通知', {
            background: 'tomato',
          })
        }
      />
      <List.Item linkable title="隐藏通知" onClick={() => Notify.hide()} />
    </List>
  )
}
