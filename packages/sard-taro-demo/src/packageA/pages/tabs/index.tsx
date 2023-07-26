import Demo from '@/components/demo'
import Page from '@/components/page'
import { TabsPane, Tabs, Button, Icon, Badge } from 'sard-taro'
import { useState } from 'react'
import { Text, View } from '@tarojs/components'

import './index.scss'

export default () => {
  const [activeKey, setActiveKey] = useState<number | string>(1)

  return (
    <Page className="page-tabs">
      <Demo title="基础使用">
        <Tabs>
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>
      </Demo>

      <Demo title="胶囊标签">
        <Tabs type="pill">
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>
      </Demo>

      <Demo title="边框标签">
        <Tabs type="border">
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>
      </Demo>

      <Demo title="卡片标签">
        <Tabs
          type="card"
          inactiveLabelStyle={{ background: 'var(--sar-secondary-bg)' }}
        >
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>
      </Demo>

      <Demo title="垂直">
        <Tabs vertical>
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>

        <Tabs vertical type="pill">
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>

        <Tabs vertical type="border">
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>

        <Tabs
          vertical
          type="card"
          inactiveLabelStyle={{ background: 'var(--sar-secondary-bg)' }}
        >
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>
      </Demo>

      <Demo title="自定义样式">
        <Tabs
          headerStyle={{ borderBottom: '1px solid var(--sar-border-color)' }}
          activeLabelStyle={{ fontWeight: 'bold', color: 'orange' }}
          inkbarStyle={{ background: 'orange' }}
        >
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>

        <Tabs type="border" wrapperStyle={{ color: 'orange' }}>
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>

        <Tabs type="pill" line activeLabelStyle={{ backgroundColor: 'orange' }}>
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
          <TabsPane label="标签4">内容4</TabsPane>
          <TabsPane label="标签5">内容5</TabsPane>
          <TabsPane label="标签6">内容6</TabsPane>
        </Tabs>

        <Tabs
          type="card"
          inactiveLabelStyle={{ background: 'var(--sar-secondary-bg)' }}
          lineWidth="15px"
        >
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>
      </Demo>

      <Demo title="自定义标签">
        <Tabs>
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane
            label={(active) => (
              <View>
                <Icon
                  prefix="demo-icon"
                  name={active ? 'heart-fill' : 'heart'}
                />
                <Text>标签1</Text>
              </View>
            )}
          >
            内容2
          </TabsPane>
          <TabsPane label={<Badge value={2}>标签3</Badge>}>内容3</TabsPane>
        </Tabs>
      </Demo>

      <Demo title="禁用标签">
        <Tabs>
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2" disabled>
            内容2
          </TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>
      </Demo>

      <Demo title="名称匹配">
        <Tabs>
          <TabsPane key="key1" label="标签1">
            内容1
          </TabsPane>
          <TabsPane key="key2" label="标签2">
            内容2
          </TabsPane>
          <TabsPane key="key3" label="标签3">
            内容3
          </TabsPane>
        </Tabs>
      </Demo>

      <Demo title="受控组件">
        <Button onClick={() => setActiveKey(2)}>切换到标签3</Button>

        <Tabs activeKey={activeKey} onChange={setActiveKey}>
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
        </Tabs>
      </Demo>

      <Demo title="可滚动的标签栏">
        <Tabs>
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
          <TabsPane label="标签4">内容4</TabsPane>
          <TabsPane label="标签5">内容5</TabsPane>
          <TabsPane label="标签6">内容6</TabsPane>
          <TabsPane label="标签7">内容7</TabsPane>
        </Tabs>
      </Demo>

      <Demo title="插槽">
        <Tabs
          prepend={<View style={{ fontWeight: 'bold' }}>推荐</View>}
          append={<Icon size={20} prefix="demo-icon" name="list-task"></Icon>}
        >
          <TabsPane label="标签1">内容1</TabsPane>
          <TabsPane label="标签2">内容2</TabsPane>
          <TabsPane label="标签3">内容3</TabsPane>
          <TabsPane label="标签4">内容4</TabsPane>
          <TabsPane label="标签5">内容5</TabsPane>
          <TabsPane label="标签6">内容6</TabsPane>
          <TabsPane label="标签7">内容7</TabsPane>
        </Tabs>
      </Demo>

      <Demo title="滑动切换">
        <Tabs swipeable swiperProps={{ style: { height: 100 } }}>
          <TabsPane label="标签1" style={{ padding: 30 }}>
            内容1
          </TabsPane>
          <TabsPane label="标签2" style={{ padding: 30 }}>
            内容2
          </TabsPane>
          <TabsPane label="标签3" style={{ padding: 30 }}>
            内容3
          </TabsPane>
        </Tabs>
      </Demo>

      <Demo title="粘性定位">
        <Tabs
          sticky
          headerStyle={{ top: 0, background: 'var(--sar-emphasis-bg)' }}
        >
          {Array(3)
            .fill(0)
            .map((_, i) => (
              <TabsPane key={i} label={`标签${i + 1}`}>
                {Array(10)
                  .fill(0)
                  .map((_, index) => (
                    <View key={index}>
                      内容 {i + 1}-{index + 1}
                    </View>
                  ))}
              </TabsPane>
            ))}
        </Tabs>
      </Demo>

      <Demo title="滚动监听">
        <Tabs
          scrollspy
          offset={-48 - 5}
          sticky
          headerStyle={{ top: 0, background: 'var(--sar-emphasis-bg)' }}
        >
          {Array(7)
            .fill(0)
            .map((_, i) => (
              <TabsPane
                key={i}
                label={`标签${i + 1}`}
                style={{ border: '1px solid #ddd', margin: 5, padding: 50 }}
              >
                内容{i + 1}
              </TabsPane>
            ))}
        </Tabs>
      </Demo>

      <Demo title="垂直滚动监听" full>
        <Tabs
          type="card"
          vertical
          sticky
          scrollspy
          offset={-5}
          headerStyle={{
            top: 5,
            background: 'var(--sar-secondary-bg)',
          }}
          wrapperStyle={{
            maxHeight: 'calc(100vh - 5px)',
          }}
          contentStyle={{
            paddingBottom: 50,
          }}
          activeLabelStyle={{ background: 'var(--sar-body-bg)' }}
        >
          {Array(20)
            .fill(0)
            .map((_, i) => (
              <TabsPane
                key={i}
                label={`标签${i + 1}`}
                style={{ border: '1px solid #ddd', margin: 5, padding: 70 }}
              >
                内容{i + 1}
              </TabsPane>
            ))}
        </Tabs>
      </Demo>
    </Page>
  )
}
