import Demo from '@/components/demo'
import Page from '@/components/page'
import { Button, Cell, Icon, Input } from 'sard-taro'
import { useState } from 'react'
import { View } from '@tarojs/components'

import './index.scss'

export default () => {
  const [value, setValue] = useState('受控组件')

  return (
    <Page className="page-input">
      <Demo title="基础使用">
        <Input placeholder="请输入" defaultValue="基础使用" />
      </Demo>

      <Demo title="受控组件">
        <Input placeholder="请输入" value={value} onChange={setValue} />
        <View>{value}</View>
      </Demo>

      <Demo title="自定义样式">
        <Input
          placeholder="请输入"
          style={{
            color: 'orange',
            borderColor: 'orange',
            textAlign: 'center',
            borderRadius: '9999px',
            background: 'rgba(0,0,0,.05)',
          }}
        />
      </Demo>

      <Demo title="类型">
        <Input placeholder="文本" type="text" />
        <Input placeholder="数字" type="number" />
        <Input placeholder="身份证" type="idcard" />
        <Input placeholder="带小数点数字" type="digit" />
        <Input placeholder="密码" type="password" />
        <Input placeholder="文本域" type="textarea" style={{ height: 100 }} />
      </Demo>

      <Demo title="可清除的">
        <Input defaultValue="可清除的" placeholder="可清除的" clearable />
      </Demo>

      <Demo title="聚焦时显示清除按钮">
        <Input
          defaultValue="可清除的"
          placeholder="可清除的"
          clearable
          showClearOnlyFocus
        />
      </Demo>

      <Demo title="禁用">
        <Input placeholder="禁用的" disabled />
      </Demo>

      <Demo title="只读">
        <Input placeholder="只读的" readOnly />
      </Demo>

      <Demo title="插槽">
        <Input
          placeholder="请输入"
          prepend={<Icon name="search" color="var(--sar-tertiary-color)" />}
        />
        <Input
          placeholder="请输入"
          append={
            <Button size="small" onClick={(event) => event.stopPropagation()}>
              发送验证码
            </Button>
          }
          style={{ marginTop: 10 }}
          clearable
        />
      </Demo>

      <Demo title="去除边框">
        <Input borderless placeholder="去除边框" />
      </Demo>

      <Demo title="嵌入的" full>
        <Cell.Group card bodyStyle={{ maxWidth: 80 }}>
          <Cell
            title="用户名"
            footer={<Input inlaid placeholder="嵌入的" />}
          ></Cell>
          <Cell
            title="密码"
            footer={<Input inlaid type="password" placeholder="嵌入的" />}
          ></Cell>
        </Cell.Group>
      </Demo>

      <Demo title="自动高度">
        <Input type="textarea" autoHeight placeholder="autoHeight" />
        <Input
          type="textarea"
          autoHeight
          style={{ maxHeight: 100 }}
          placeholder="{ maxHeight: 100 }"
        />
        <Input
          type="textarea"
          autoHeight
          style={{ minHeight: 100, maxHeight: 200 }}
          placeholder="{ minHeight: 100, maxHeight: 200 }"
        />
      </Demo>

      <Demo title="字数提示">
        <Input showCount maxLength={20} clearable />
        <Input
          type="textarea"
          showCount
          maxLength={100}
          style={{ height: 80 }}
          clearable
        />
      </Demo>
    </Page>
  )
}
