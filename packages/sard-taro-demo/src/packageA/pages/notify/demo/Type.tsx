import { List, Notify } from 'sard-taro'

export default () => {
  return (
    <List card>
      <List.Item
        linkable
        title="成功通知"
        onClick={() => Notify.success('这是一条通知')}
      />
      <List.Item
        linkable
        title="警告通知"
        onClick={() => Notify.warning('这是一条通知')}
      />
      <List.Item
        linkable
        title="错误通知"
        onClick={() => Notify.error('这是一条通知')}
      />
      <List.Item linkable title="隐藏通知" onClick={() => Notify.hide()} />
    </List>
  )
}
