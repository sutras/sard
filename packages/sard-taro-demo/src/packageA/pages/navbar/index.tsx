import Demo from '@/components/demo'
import Page from '@/components/page'
import { View } from '@tarojs/components'
import { Checkbox, Icon, Input, Navbar } from 'sard-taro'

import './index.scss'
import { useState } from 'react'

export default () => {
  const [fixed, setFixed] = useState(false)

  return (
    <Page className="page-navbar">
      <Demo title="基础使用" full>
        <Navbar title="标题" />
      </Demo>

      <Demo title="导航项" full>
        <Navbar
          title="标题"
          left={
            <Navbar.Item onClick={() => console.log('返回')}>
              <Icon name="left" size={16}></Icon>
              <View>返回</View>
            </Navbar.Item>
          }
          right={
            <Navbar.Item onClick={() => console.log('查看信息')}>
              <Icon name="list-task" size={20}></Icon>
            </Navbar.Item>
          }
        />
      </Demo>

      <Demo title="流动导航" full>
        <Navbar
          flow
          left={
            <Navbar.Item>
              <Icon prefix="demo-icon" name="list-task" size={18}></Icon>
            </Navbar.Item>
          }
          title={<View style={{ textAlign: 'left' }}>发现</View>}
          right={
            <>
              <Navbar.Item>
                <Icon prefix="demo-icon" name="share" size={16}></Icon>
              </Navbar.Item>
              <Navbar.Item>
                <Icon prefix="demo-icon" name="star" size={18}></Icon>
              </Navbar.Item>
              <Navbar.Item>
                <Icon prefix="demo-icon" name="heart" size={16}></Icon>
              </Navbar.Item>
            </>
          }
        ></Navbar>
      </Demo>

      <Demo title="自定义 content" full>
        <Navbar
          flow
          left={
            <Navbar.Item>
              <View style={{ marginRight: 2 }}>城市</View>
              <Icon name="down" size={16}></Icon>
            </Navbar.Item>
          }
          right={<Navbar.Item>搜索</Navbar.Item>}
        >
          <Input placeholder="请输入关键词" />
        </Navbar>
      </Demo>

      <Demo title="固定在顶部" full>
        <Checkbox onChange={setFixed} style={{ margin: 20 }}>
          固定到顶部
        </Checkbox>

        <Navbar title="顶部的标题" fixed={fixed} zIndex="1000" />
      </Demo>
    </Page>
  )
}
