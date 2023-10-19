import { List, Toast } from 'sard'

export default () => {
  return (
    <List card>
      <List.Item
        linkable
        title="图标提示框"
        onClick={() => {
          Toast.show('笑一笑', {
            iconProps: {
              family: 'demo-icons',
              name: 'emoji-smile',
            },
          })
        }}
      />
      <List.Item
        linkable
        title="图片提示框"
        onClick={() => {
          Toast.show('title', {
            iconProps: {
              name: 'https://unpkg.com/@sard/assets@1.2.0/images/pic1.jpg',
            },
          })
        }}
      />
    </List>
  )
}
