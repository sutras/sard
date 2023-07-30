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
        <Button className="demo-button" type="default">
          默认
        </Button>
        <Button className="demo-button" type="pale">
          淡颜色
        </Button>
        <Button className="demo-button" type="mild">
          温和
        </Button>
        <Button className="demo-button" type="outline">
          轮廓线
        </Button>
        <Button className="demo-button" type="text">
          文本
        </Button>
        <Button className="demo-button" type="pale-text">
          淡文本
        </Button>
      </Demo>

      <Demo title="按钮颜色">
        <Button className="demo-button" theme="primary">
          primary
        </Button>
        <Button className="demo-button" theme="secondary">
          secondary
        </Button>
        <Button className="demo-button" theme="success">
          success
        </Button>
        <Button className="demo-button" theme="info">
          info
        </Button>
        <Button className="demo-button" theme="warning">
          warning
        </Button>
        <Button className="demo-button" theme="danger">
          danger
        </Button>
      </Demo>

      <Demo title="自定义颜色">
        <Button className="demo-button" style={{ background: 'fuchsia' }}>
          default
        </Button>
        <Button
          className="demo-button"
          style={{ background: 'rgba(255, 0, 255, 0.2)', color: 'fuchsia' }}
          type="pale"
        >
          pale
        </Button>
        <Button
          className="demo-button"
          style={{ color: 'fuchsia' }}
          type="mild"
        >
          mild
        </Button>
        <Button
          className="demo-button"
          style={{ color: 'fuchsia' }}
          type="outline"
        >
          outline
        </Button>
        <Button
          className="demo-button"
          style={{ color: 'fuchsia' }}
          type="text"
        >
          text
        </Button>
        <Button
          className="demo-button"
          style={{ color: 'fuchsia' }}
          type="pale-text"
        >
          pale-text
        </Button>
        <Button
          className="demo-button"
          style={{ background: 'linear-gradient(to right, orange, fuchsia)' }}
        >
          渐变色
        </Button>
      </Demo>

      <Demo title="圆形按钮">
        <Button className="demo-button" round>
          default
        </Button>
        <Button className="demo-button" round type="pale">
          pale
        </Button>
        <Button className="demo-button" round type="mild">
          mild
        </Button>
        <Button className="demo-button" round type="outline">
          outline
        </Button>
        <Button className="demo-button" round type="text">
          text
        </Button>
        <Button className="demo-button" round type="pale-text">
          pale-text
        </Button>
      </Demo>

      <Demo title="禁用按钮">
        <Button className="demo-button" disabled>
          default
        </Button>
        <Button className="demo-button" disabled type="pale">
          pale
        </Button>
        <Button className="demo-button" disabled type="mild">
          mild
        </Button>
        <Button className="demo-button" disabled type="outline">
          outline
        </Button>
        <Button className="demo-button" disabled type="text">
          text
        </Button>
        <Button className="demo-button" disabled type="pale-text">
          pale-text
        </Button>
      </Demo>

      <Demo title="块级按钮">
        <Button className="demo-button" block>
          按钮
        </Button>
      </Demo>

      <Demo title="按钮尺寸">
        <Button className="demo-button" size="small">
          小尺寸
        </Button>
        <Button className="demo-button">默认尺寸</Button>
        <Button className="demo-button" size="large">
          大尺寸
        </Button>
      </Demo>

      <Demo title="加载中">
        <Button className="demo-button" loading>
          primary
        </Button>
        <Button className="demo-button" loading loadingText="加载中">
          primary
        </Button>
        <Button
          className="demo-button"
          loading
          loadingText="加载中"
          loadingProps={{ type: 'clock' }}
        >
          primary
        </Button>
      </Demo>
    </Page>
  )
}
