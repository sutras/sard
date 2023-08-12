import { Cell, Notify } from 'sard-taro'

export default () => {
  return (
    <>
      <Notify.Agent />
      <Cell.Group card>
        <Cell
          linkable
          title="显示通知"
          onClick={() => Notify.show('这是一条通知')}
        />
        <Cell linkable title="隐藏通知" onClick={() => Notify.hide()} />
      </Cell.Group>{' '}
    </>
  )
}
