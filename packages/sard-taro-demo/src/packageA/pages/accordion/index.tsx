import Demo from '@/components/demo'
import Page from '@/components/page'
import { useState } from 'react'
import { Text } from '@tarojs/components'
import { Accordion, Icon } from 'sard-taro'

import './index.scss'

export default () => {
  const [activeKey, setActiveName] = useState(0)
  const handleChange = (key: number) => {
    setActiveName(key)
  }

  return (
    <Page className="page-accordion">
      <Demo title="基础使用">
        <Accordion>
          <Accordion.Item title="标题1">内容1</Accordion.Item>
          <Accordion.Item title="标题2">内容2</Accordion.Item>
          <Accordion.Item title="标题3">内容3</Accordion.Item>
        </Accordion>
      </Demo>

      <Demo title="默认展开">
        <Accordion defaultActiveKey={1}>
          <Accordion.Item title="标题1">内容1</Accordion.Item>
          <Accordion.Item title="标题2">内容2</Accordion.Item>
          <Accordion.Item title="标题3">内容3</Accordion.Item>
        </Accordion>
      </Demo>

      <Demo title="展开多个">
        <Accordion multiple defaultActiveKey={[0, 1]}>
          <Accordion.Item title="标题1">内容1</Accordion.Item>
          <Accordion.Item title="标题2">内容2</Accordion.Item>
          <Accordion.Item title="标题3">内容3</Accordion.Item>
        </Accordion>
      </Demo>

      <Demo title="受控">
        <Accordion activeKey={activeKey} onChange={handleChange}>
          <Accordion.Item title="标题1">内容1</Accordion.Item>
          <Accordion.Item title="标题2">内容2</Accordion.Item>
          <Accordion.Item title="标题3">内容3</Accordion.Item>
        </Accordion>
      </Demo>

      <Demo title="禁用">
        <Accordion>
          <Accordion.Item title="标题1">内容1</Accordion.Item>
          <Accordion.Item disabled title="标题2">
            内容2
          </Accordion.Item>
          <Accordion.Item title="标题3">内容3</Accordion.Item>
        </Accordion>
      </Demo>

      <Demo title="插槽">
        <Accordion>
          <Accordion.Item
            title={
              <>
                <Icon prefix="demo-icon" name="emoji-smile"></Icon>
                <Text style={{ marginLeft: 5 }}>标题1</Text>
              </>
            }
            icon={(active) => (
              <Icon name={active ? 'caret-up-fill' : 'caret-down-fill'}></Icon>
            )}
          >
            内容1
          </Accordion.Item>
          <Accordion.Item title="标题2">内容2</Accordion.Item>
          <Accordion.Item title="标题3">内容3</Accordion.Item>
        </Accordion>
      </Demo>

      <Demo title="折叠时间">
        <Accordion duration={0}>
          <Accordion.Item title="标题1">内容1</Accordion.Item>
          <Accordion.Item title="标题2">内容2</Accordion.Item>
          <Accordion.Item title="标题3">内容3</Accordion.Item>
        </Accordion>
      </Demo>
    </Page>
  )
}
