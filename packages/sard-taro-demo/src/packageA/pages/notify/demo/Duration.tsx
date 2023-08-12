import { Cell, Notify } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell
        linkable
        title="显示不会消失的通知"
        onClick={() =>
          Notify.show('这是一条通知', {
            duration: 0,
          })
        }
      />
      <Cell linkable title="隐藏通知" onClick={() => Notify.hide()} />
    </Cell.Group>
  )
}
