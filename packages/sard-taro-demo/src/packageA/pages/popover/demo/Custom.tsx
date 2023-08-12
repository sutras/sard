import { useState } from 'react'
import { Button, Mesh, Popover, Toast } from 'sard-taro'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <Popover
      visible={visible}
      onVisible={setVisible}
      direction="horizontal"
      reference={<Button>自定义内容</Button>}
    >
      <Mesh clickable style={{ width: 280 }}>
        {Array(8)
          .fill(0)
          .map((_, index) => (
            <Mesh.Item
              key={index}
              text={`选项${index + 1}`}
              iconProps={{ name: 'image' }}
              onClick={() => {
                Toast.show(`选项${index + 1}`)
                setVisible(false)
              }}
            ></Mesh.Item>
          ))}
      </Mesh>
    </Popover>
  )
}
