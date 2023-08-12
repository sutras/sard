import { Cell, Toast } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell
        linkable
        title="顶部位置"
        onClick={() => {
          Toast.show('顶部位置', {
            placement: 'top',
          })
        }}
      />
      <Cell
        linkable
        title="底部位置"
        onClick={() => {
          Toast.show('底部位置', {
            placement: 'bottom',
          })
        }}
      />
    </Cell.Group>
  )
}
