import Demo from '@/components/demo'
import Page from '@/components/page'
import { Avatar, Badge, Icon } from 'sard-taro'

import './index.scss'

import pic1 from '@/static/pic1.jpg'
import { View } from '@tarojs/components'

export default () => {
  return (
    <Page className="page-loading">
      <Demo title="基础使用">
        <Avatar />
      </Demo>

      <Demo title="形状">
        <Avatar shape="square" />
      </Demo>

      <Demo title="图标大小">
        <Avatar iconSize={24} />
      </Demo>

      <Demo title="头像尺寸">
        <Avatar size={48} />
      </Demo>

      <Demo title="图片类型">
        <Avatar src={pic1} />
      </Demo>

      <Demo title="自定义内容">
        <Avatar>
          <Icon name="question"></Icon>
        </Avatar>

        <Avatar>字</Avatar>
      </Demo>

      <Demo title="自定义样式">
        <Avatar style={{ background: 'orange', color: 'white' }} />
      </Demo>

      <Demo title="额外内容">
        <View>
          <Avatar
            shape="square"
            extra={<Badge fixed value={5}></Badge>}
          ></Avatar>
        </View>

        <View style={{ marginTop: 20 }}>
          <Avatar
            extra={
              <Badge
                fixed
                value={5}
                style={{ top: '14.6447%', right: '14.6447%' }}
              ></Badge>
            }
          ></Avatar>
        </View>
      </Demo>

      <Demo title="头像组">
        <Avatar.Group>
          <Avatar>头</Avatar>
          <Avatar>像</Avatar>
          <Avatar>组</Avatar>
        </Avatar.Group>
      </Demo>

      <Demo title="间距">
        <Avatar.Group gap={-30}>
          <Avatar>头</Avatar>
          <Avatar>像</Avatar>
          <Avatar>组</Avatar>
        </Avatar.Group>
      </Demo>

      <Demo title="方向">
        <Avatar.Group direction="left">
          <Avatar>头</Avatar>
          <Avatar>像</Avatar>
          <Avatar>组</Avatar>
        </Avatar.Group>
      </Demo>

      <Demo title="最大头像个数">
        <Avatar.Group maxCount={4}>
          <Avatar>头</Avatar>
          <Avatar>像</Avatar>
          <Avatar>组</Avatar>
          <Avatar>R</Avatar>
          <Avatar>E</Avatar>
          <Avatar>S</Avatar>
          <Avatar>T</Avatar>
        </Avatar.Group>
      </Demo>
    </Page>
  )
}
