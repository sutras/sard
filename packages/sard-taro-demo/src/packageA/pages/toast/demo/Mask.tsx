import { Cell, Toast } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell
        linkable
        title="显示背景"
        onClick={() => {
          Toast.loading('加载中', {
            mask: true,
          })

          setTimeout(() => {
            Toast.hide()
          }, 2000)
        }}
      />

      <Cell
        linkable
        title="透明背景"
        onClick={() => {
          Toast.loading('加载中', {
            mask: true,
            transparent: true,
          })

          setTimeout(() => {
            Toast.hide()
          }, 2000)
        }}
      />
    </Cell.Group>
  )
}
