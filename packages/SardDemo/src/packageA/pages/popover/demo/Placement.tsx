import { View } from '@tarojs/components'
import { useState } from 'react'
import { Mesh, Popover, PopoverPlacement } from 'sard'

export default () => {
  const [currentPlacement, setPlacement] = useState<PopoverPlacement>('bottom')

  const [visible, setVisible] = useState(false)

  const handlePlacement = (placement: PopoverPlacement) => {
    setPlacement(placement)
    setVisible(true)
  }

  const renderPlacementButton = (placement: PopoverPlacement) => {
    return (
      <Mesh.Item
        key={placement}
        onClick={() => handlePlacement(placement)}
        style={{
          fontWeight: placement === currentPlacement ? 'bold' : null,
        }}
      >
        {placement
          .split('-')
          .map((word) => word.slice(0, 1).toUpperCase())
          .join('')}
      </Mesh.Item>
    )
  }

  return (
    <>
      <Popover
        visible={visible}
        onVisible={setVisible}
        placement={currentPlacement}
        options={[
          {
            text: '选项1',
          },
          {
            text: '选项2',
          },
          {
            text: '选项3',
          },
        ]}
        reference={
          <View
            style={{
              width: 50,
              height: 50,
              marginTop: 100,
              marginBottom: 100,
              marginLeft: 'auto',
              marginRight: 'auto',
              backgroundColor: 'tomato',
            }}
          />
        }
      />

      <View style={{ marginLeft: 60, marginRight: 60 }}>
        <Mesh columns={3} clickable>
          {renderPlacementButton('top-start')}
          {renderPlacementButton('top')}
          {renderPlacementButton('top-end')}
        </Mesh>
      </View>

      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
        <Mesh columns={1} clickable style={{ width: 60 }}>
          {renderPlacementButton('left-start')}
          {renderPlacementButton('left')}
          {renderPlacementButton('left-end')}
        </Mesh>

        <Mesh columns={1} clickable style={{ width: 60 }}>
          {renderPlacementButton('right-start')}
          {renderPlacementButton('right')}
          {renderPlacementButton('right-end')}
        </Mesh>
      </View>

      <View style={{ marginLeft: 60, marginRight: 60 }}>
        <Mesh columns={3} clickable>
          {renderPlacementButton('bottom-start')}
          {renderPlacementButton('bottom')}
          {renderPlacementButton('bottom-end')}
        </Mesh>
      </View>
    </>
  )
}
