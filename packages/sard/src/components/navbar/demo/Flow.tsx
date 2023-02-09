/*
### 流动导航

默认 left | right 绝对定位于左右两侧，标题居中；可以使用 flow 使其变为流动布局。
*/

import { Navbar, Icon } from 'sard'
import 'bootstrap-icons/font/bootstrap-icons.css'

export default function () {
  return (
    <Navbar
      flow
      title={<div style={{ textAlign: 'left' }}>发现</div>}
      prepend={
        <Navbar.Item>
          <Icon name="bi-list"></Icon>
        </Navbar.Item>
      }
      append={
        <>
          <Navbar.Item>
            <Icon name="bi-search"></Icon>
          </Navbar.Item>
          <Navbar.Item>
            <Icon name="bi-bell"></Icon>
          </Navbar.Item>
          <Navbar.Item>
            <Icon name="bi-three-dots-vertical"></Icon>
          </Navbar.Item>
        </>
      }
    />
  )
}
