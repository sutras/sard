import Demo from '@/components/demo'
import Page from '@/components/page'
import { Checkbox, Icon } from 'sard-taro'
import { useState } from 'react'
import { View } from '@tarojs/components'

import './index.scss'

export default () => {
  const [checked, setChecked] = useState(false)

  const [value2, setValue2] = useState(['apple'])

  return (
    <Page className="page-checkbox">
      <Demo title="基础使用">
        <Checkbox>复选框</Checkbox>
      </Demo>

      <Demo title="受控">
        <Checkbox checked={checked} onChange={setChecked}>
          {checked ? '已选中' : '未选中'}
        </Checkbox>
      </Demo>

      <Demo title="禁用">
        <Checkbox disabled checked style={{ marginRight: 10 }}>
          复选框
        </Checkbox>
        <Checkbox disabled>复选框</Checkbox>
      </Demo>

      <Demo title="复选框组">
        <View>
          <Checkbox.Group value={value2} onChange={setValue2}>
            <Checkbox value="apple">苹果</Checkbox>
            <Checkbox value="banana">香蕉</Checkbox>
          </Checkbox.Group>
          {JSON.stringify(value2)}
        </View>
        <View style={{ marginTop: 20 }}>
          <View>垂直：</View>
          <Checkbox.Group vertical value={value2} onChange={setValue2}>
            <Checkbox value="apple">苹果</Checkbox>
            <Checkbox value="banana">香蕉</Checkbox>
          </Checkbox.Group>
        </View>
      </Demo>

      <Demo title="图标大小">
        <Checkbox size="24px">复选框</Checkbox>
      </Demo>

      <Demo title="自定义颜色">
        <Checkbox checkedColor="orange" defaultChecked>
          复选框
        </Checkbox>
      </Demo>

      <Demo title="图标类型">
        <Checkbox type="circle">复选框</Checkbox>
      </Demo>

      <Demo title="自定义图标">
        <Checkbox
          icon={(checked) => (
            <Icon prefix="demo-icon" name={checked ? 'heart-fill' : 'heart'} />
          )}
        >
          复选框
        </Checkbox>
      </Demo>
    </Page>
  )
}
