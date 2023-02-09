/*
### 自定义 content
*/

import { Navbar, Icon, Input } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <Navbar
      flow
      prepend={
        <Navbar.Item>
          <span style={{ marginRight: 2 }}>城市</span>
          <Icon name="bi-chevron-down" size={16}></Icon>
        </Navbar.Item>
      }
      append={<Navbar.Item>搜索</Navbar.Item>}
    >
      <Input placeholder="请输入关键词" />
    </Navbar>
  )
}
