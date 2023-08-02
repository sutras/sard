import Demo from '@/components/demo'
import Page from '@/components/page'
import { Button, Mesh, Popover, PopoverPlacement, Toast } from 'sard-taro'
import { View } from '@tarojs/components'
import { useState } from 'react'

import './index.scss'

export default () => {
  const [customVisible, setCustomVisible] = useState(false)

  const [currentPlacement, setPlacement] = useState<PopoverPlacement>('bottom')

  const [visible, setVisible] = useState(false)

  const handlePlacement = (placement: PopoverPlacement) => {
    setPlacement(placement)
    setVisible(true)
  }

  const renderPlacementButton = (placement: PopoverPlacement) => {
    return (
      <Mesh.Item
        onClick={() => handlePlacement(placement)}
        style={{
          fontWeight: placement === currentPlacement ? 'bold' : '',
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
    <Page className="page-popover">
      <Toast />
      <Demo title="基础使用">
        <Popover
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
          reference={<Button>基础使用</Button>}
          onSelect={({ text }) => Toast.show(text)}
        />
      </Demo>

      <Demo title="暗黑模式">
        <Popover
          theme="dark"
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
          reference={<Button>自定义颜色</Button>}
          onSelect={({ text }) => Toast.show(text)}
        />
      </Demo>

      <Demo title="展示图标">
        <Popover
          options={[
            {
              text: '选项1',
              iconProps: {
                prefix: 'demo-icon',
                name: 'upc-scan',
              },
            },
            {
              text: '选项2',
              iconProps: {
                prefix: 'demo-icon',
                name: 'camera',
              },
            },
            {
              text: '选项3',
              iconProps: {
                prefix: 'demo-icon',
                name: 'bell',
              },
            },
          ]}
          reference={<Button>展示图标</Button>}
          onSelect={({ text }) => Toast.show(text)}
        />
      </Demo>

      <Demo title="禁用选项">
        <Popover
          options={[
            {
              text: '选项1',
              disabled: true,
            },
            {
              text: '选项2',
              disabled: true,
            },
            {
              text: '选项3',
            },
          ]}
          reference={<Button>禁用选项</Button>}
          onSelect={({ text }) => Toast.show(text)}
        />
      </Demo>

      <Demo title="水平排列">
        <Popover
          direction="horizontal"
          options={[
            {
              text: '选项1',
              iconProps: {
                prefix: 'demo-icon',
                name: 'upc-scan',
              },
            },
            {
              text: '选项2',
            },
            {
              text: '选项3',
            },
          ]}
          reference={<Button>水平排列</Button>}
          onSelect={({ text }) => Toast.show(text)}
        />
      </Demo>

      <Demo title="自定义内容">
        <Popover
          visible={customVisible}
          onVisible={setCustomVisible}
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
                    setCustomVisible(false)
                  }}
                ></Mesh.Item>
              ))}
          </Mesh>
        </Popover>
      </Demo>

      <Demo title="弹出位置">
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
                margin: '100px auto',
                background: 'var(--sar-primary)',
              }}
            ></View>
          }
        ></Popover>

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
      </Demo>
    </Page>
  )
}
