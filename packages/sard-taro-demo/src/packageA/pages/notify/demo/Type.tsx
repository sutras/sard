import { Cell, Notify } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell
        linkable
        title="成功通知"
        onClick={() => Notify.success('这是一条通知')}
      />
      <Cell
        linkable
        title="警告通知"
        onClick={() => Notify.warning('这是一条通知')}
      />
      <Cell
        linkable
        title="错误通知"
        onClick={() => Notify.error('这是一条通知')}
      />
      <Cell linkable title="隐藏通知" onClick={() => Notify.hide()} />
    </Cell.Group>
  )
}
