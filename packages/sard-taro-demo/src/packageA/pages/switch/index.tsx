import Demo from '@/components/demo'
import Page from '@/components/page'
import { Switch } from 'sard-taro'
import { View } from '@tarojs/components'
import { useState } from 'react'

import './index.scss'

export default () => {
  const [checked, setChecked] = useState(true)
  const [value, setValue] = useState('on')

  const [checked2, setChecked2] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleChange = (checked: boolean) => {
    setLoading(true)
    setTimeout(() => {
      setChecked2(checked)
      setLoading(false)
    }, 500)
  }

  return (
    <Page className="page-switch">
      <Demo title="基础使用">
        <Switch defaultChecked />
      </Demo>

      <Demo title="自定义尺寸">
        <Switch size="20px" defaultChecked />
      </Demo>

      <Demo title="自定义颜色">
        <Switch checkedColor="orange" uncheckedColor="fuchsia" defaultChecked />
      </Demo>

      <Demo title="不同状态的值">
        <Switch
          checked={checked}
          onChange={(checked, value) => (setChecked(checked), setValue(value))}
          checkedValue="on"
          uncheckedValue="off"
        />
        <View>{value}</View>
      </Demo>

      <Demo title="禁用状态">
        <Switch disabled />
        <Switch defaultChecked disabled />
      </Demo>

      <Demo title="只读状态">
        <Switch readOnly />
        <Switch defaultChecked readOnly />
      </Demo>

      <Demo title="加载状态">
        <Switch loading />
        <Switch defaultChecked loading />
      </Demo>

      <Demo title="异步控制">
        <Switch checked={checked2} loading={loading} onChange={handleChange} />
      </Demo>
    </Page>
  )
}
