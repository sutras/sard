import { List, Toast } from 'sard-taro'

export default () => {
  return (
    <List card>
      <List.Item
        linkable
        title="显示背景"
        onClick={() => {
          Toast.loading('加载中', {
            mask: true,
          })

          setTimeout(() => {
            Toast.hide()
          }, 1500)
        }}
      />

      <List.Item
        linkable
        title="透明背景"
        onClick={() => {
          Toast.loading('加载中', {
            mask: true,
            transparent: true,
          })

          setTimeout(() => {
            Toast.hide()
          }, 1500)
        }}
      />
    </List>
  )
}
