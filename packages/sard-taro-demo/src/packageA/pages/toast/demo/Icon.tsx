import { Cell, Toast } from 'sard-taro'

import pic1 from '@/static/pic1.jpg'

export default () => {
  return (
    <Cell.Group card>
      <Cell
        linkable
        title="图标提示框"
        onClick={() => {
          Toast.show('笑一笑', {
            iconProps: {
              prefix: 'demo-icon',
              name: 'emoji-smile',
            },
          })
        }}
      />
      <Cell
        linkable
        title="图片提示框"
        onClick={() => {
          Toast.show('Sard', {
            iconProps: {
              name: pic1,
            },
          })
        }}
      />
    </Cell.Group>
  )
}
