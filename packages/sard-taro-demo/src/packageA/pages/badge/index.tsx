import Demo from '@/components/demo'
import Page from '@/components/page'
import { Badge, Button, Icon } from 'sard-taro'

import './index.scss'

export default () => {
  return (
    <Page className="page-badge">
      <Demo title="基础使用">
        <Badge value={5}>
          <Button>消息</Button>
        </Badge>
      </Demo>

      <Demo title="最大值">
        <Badge value={100}>
          <Button>消息</Button>
        </Badge>
        <Badge value={100} max={200} style={{ marginLeft: '20px' }}>
          <Button>消息</Button>
        </Badge>
      </Demo>

      <Demo title="值为0时不隐藏">
        <Badge value={0}>
          <Button>消息</Button>
        </Badge>
        <Badge value={0} showZero style={{ marginLeft: '20px' }}>
          <Button>消息</Button>
        </Badge>
      </Demo>

      <Demo title="圆点显示">
        <Badge isDot>
          <Button>消息</Button>
        </Badge>
      </Demo>

      <Demo title="自定义颜色">
        <Badge value={5} color="orange">
          <Button>消息</Button>
        </Badge>
        <Badge isDot color="orange" style={{ marginLeft: '20px' }}>
          <Button>消息</Button>
        </Badge>
        <Badge
          value={5}
          color="#eee"
          textColor="#222"
          style={{ marginLeft: '20px' }}
        >
          <Button>消息</Button>
        </Badge>
      </Demo>

      <Demo title="独立展示">
        <Badge value={10}></Badge>
        <Badge isDot style={{ marginLeft: '10px' }}></Badge>
      </Demo>

      <Demo title="自定义内容">
        <Badge value={<Icon name="question"></Icon>}>
          <Button>消息</Button>
        </Badge>
      </Demo>

      <Demo title="不包裹组件">
        <Button style={{ position: 'relative', overflow: 'visible' }}>
          消息 <Badge fixed value={5}></Badge>
        </Button>
      </Demo>
    </Page>
  )
}
