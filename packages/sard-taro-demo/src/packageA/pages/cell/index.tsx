import Demo from '@/components/demo'
import Page from '@/components/page'
import { Cell, Icon, Input, Slider, Switch } from 'sard-taro'

import './index.scss'
import { Image, View } from '@tarojs/components'

import logo from '@/static/logo.svg'

export default () => {
  return (
    <Page className="page-cell">
      <Demo title="基础使用" full>
        <Cell.Group>
          <Cell title="标题" />
          <Cell title="标题" value="值" />
          <Cell title="标题" value="值" label="标签" />
          <Cell
            title="很长的标题标题标题标题标题标题标题标题标题标题标题标题"
            value="值值"
          />
          <Cell
            title="标题"
            value="很长的值值值值值值值值值值值值值值值值值值值值值值值值"
          />
          <Cell
            title="很长的标题标题标题标题标题标题标题标题"
            value="很长的值值值值值值值值值值值值值值值值"
            label="很长的标签标签标签标签标签标签标签标签"
          />
        </Cell.Group>
      </Demo>

      <Demo title="自定义内容" full>
        <Cell.Group>
          <Cell title="无线局域网" value={<Switch defaultChecked></Switch>} />
          <Cell
            title="音量"
            bodyStyle={{ maxWidth: 40 }}
            footer={
              <Slider style={{ width: '100%' }} defaultValue={50}></Slider>
            }
          />
          <Cell>
            <View style={{ padding: 20 }}>
              <View style={{ textAlign: 'center' }}>
                <Image src={logo} style={{ width: 48 }}></Image>
                <View style={{ fontSize: 20 }}>这是一句简洁</View>
              </View>
              <View
                style={{
                  fontSize: 14,
                  marginTop: 10,
                  color: 'var(--sar-secondary-color)',
                }}
              >
                这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述这是一段很长的描述...
              </View>
            </View>
          </Cell>
          <Cell
            bodyStyle={{ maxWidth: 80 }}
            title="用户名"
            footer={<Input inlaid placeholder="请输入用户名" />}
          />
          <Cell
            bodyStyle={{ maxWidth: 80 }}
            title="密码"
            footer={<Input inlaid type="password" placeholder="请输入密码" />}
          />
        </Cell.Group>
      </Demo>

      <Demo title="可点击的" full>
        <Cell.Group>
          <Cell isLink title="标题" />
          <Cell isLink title="标题" value="值" arrowDirection="down" />
        </Cell.Group>
      </Demo>

      <Demo title="图标" full>
        <Cell.Group>
          <Cell
            title="下载"
            isLink
            icon={
              <Icon
                size={24}
                prefix="demo-icon"
                name="arrow-down-square-fill"
                color="#4994EC"
              />
            }
          />
          <Cell
            title="订阅"
            isLink
            icon={
              <Icon
                size={24}
                prefix="demo-icon"
                name="rss-fill"
                color="#E78A3D"
              />
            }
          />
          <Cell
            title="视频"
            isLink
            icon={
              <Icon
                size={24}
                prefix="demo-icon"
                name="caret-left-square-fill"
                color="#C24F4A"
              />
            }
          />
        </Cell.Group>
      </Demo>

      <Demo title="内嵌的图标" full>
        <Cell.Group inset>
          <Cell
            title="下载"
            isLink
            icon={
              <Icon
                size={20}
                prefix="demo-icon"
                name="arrow-down-square-fill"
                color="#4994EC"
              />
            }
          />
          <Cell
            title="订阅"
            isLink
            icon={
              <Icon
                size={20}
                prefix="demo-icon"
                name="rss-fill"
                color="#E78A3D"
              />
            }
          />
          <Cell
            title="视频"
            isLink
            icon={
              <Icon
                size={20}
                prefix="demo-icon"
                name="caret-left-square-fill"
                color="#C24F4A"
              />
            }
          />
        </Cell.Group>
      </Demo>

      <Demo title="分组" full>
        <Cell.Group title="分组标题" label="分组标签">
          <Cell title="标题" value="值" />
          <Cell title="标题" value="值" />
        </Cell.Group>
      </Demo>

      <Demo title="卡片风格" full>
        <Cell.Group title="分组标题" label="分组标签" card>
          <Cell title="标题" value="值" />
          <Cell title="标题" value="值" />
        </Cell.Group>
      </Demo>
    </Page>
  )
}
