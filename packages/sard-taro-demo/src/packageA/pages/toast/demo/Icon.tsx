import { List, Toast } from 'sard-taro'

import pic1 from '@/static/pic1.jpg'

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
              name: pic1,
            },
          })
        }}
      />
    </List>
  )
}
