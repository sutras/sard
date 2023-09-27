import { List, Toast } from 'sard-taro'

export default () => {
  return (
    <List card>
      <List.Item
        linkable
        title="顶部位置"
        onClick={() => {
          Toast.show('顶部位置', {
            placement: 'top',
          })
        }}
      />
      <List.Item
        linkable
        title="底部位置"
        onClick={() => {
          Toast.show('底部位置', {
            placement: 'bottom',
          })
        }}
      />
    </List>
  )
}
