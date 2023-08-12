import { Cell, Notify } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell
        linkable
        title="在底部显示通知"
        onClick={() =>
          Notify.show('这是一条通知', {
            placement: 'bottom',
          })
        }
      />
      <Cell linkable title="隐藏通知" onClick={() => Notify.hide()} />
    </Cell.Group>
  )
}
