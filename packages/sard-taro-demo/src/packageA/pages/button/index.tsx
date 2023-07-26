import Page from '@/components/page'
import Demo from '@/components/demo'
import { Button } from 'sard-taro'

import './index.scss'

export default () => {
  return (
    <Page className="page-button">
      <Demo title="基础按钮">
        <Button>默认按钮</Button>
      </Demo>

      <Demo title="按钮类型">
        <Button type="default">默认</Button>
        <Button type="pale">淡颜色</Button>
        <Button type="mild">温和</Button>
        <Button type="outline">轮廓线</Button>
        <Button type="text">文本</Button>
        <Button type="pale-text">淡文本</Button>
      </Demo>

      <Demo title="按钮颜色">
        <Button theme="primary">primary</Button>
        <Button theme="secondary">secondary</Button>
        <Button theme="success">success</Button>
        <Button theme="info">info</Button>
        <Button theme="warning">warning</Button>
        <Button theme="danger">danger</Button>
      </Demo>

      <Demo title="自定义颜色">
        <Button style={{ background: 'fuchsia' }}>default</Button>
        <Button
          style={{ background: 'rgba(255, 0, 255, 0.2)', color: 'fuchsia' }}
          type="pale"
        >
          pale
        </Button>
        <Button style={{ color: 'fuchsia' }} type="mild">
          mild
        </Button>
        <Button style={{ color: 'fuchsia' }} type="outline">
          outline
        </Button>
        <Button style={{ color: 'fuchsia' }} type="text">
          text
        </Button>
        <Button style={{ color: 'fuchsia' }} type="pale-text">
          pale-text
        </Button>
        <Button
          style={{ background: 'linear-gradient(to right, orange, fuchsia)' }}
        >
          渐变色
        </Button>
      </Demo>

      <Demo title="圆形按钮">
        <Button round>default</Button>
        <Button round type="pale">
          pale
        </Button>
        <Button round type="mild">
          mild
        </Button>
        <Button round type="outline">
          outline
        </Button>
        <Button round type="text">
          text
        </Button>
        <Button round type="pale-text">
          pale-text
        </Button>
      </Demo>

      <Demo title="禁用按钮">
        <Button disabled>default</Button>
        <Button disabled type="pale">
          pale
        </Button>
        <Button disabled type="mild">
          mild
        </Button>
        <Button disabled type="outline">
          outline
        </Button>
        <Button disabled type="text">
          text
        </Button>
        <Button disabled type="pale-text">
          pale-text
        </Button>
      </Demo>

      <Demo title="块级按钮">
        <Button block>按钮</Button>
      </Demo>

      <Demo title="按钮尺寸">
        <Button size="small">小尺寸</Button>
        <Button>默认尺寸</Button>
        <Button size="large">大尺寸</Button>
      </Demo>

      <Demo title="加载中">
        <Button loading>primary</Button>
        <Button loading loadingText="加载中">
          primary
        </Button>
        <Button loading loadingText="加载中" loadingProps={{ type: 'clock' }}>
          primary
        </Button>
      </Demo>
    </Page>
  )
}
