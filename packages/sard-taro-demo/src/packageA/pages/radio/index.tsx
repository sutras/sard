import Demo from '@/components/demo'
import Page from '@/components/page'
import { Icon, Radio } from 'sard-taro'
import { useState } from 'react'

import './index.scss'

export default () => {
  const [value, setValue] = useState('option1')

  return (
    <Page className="page-radio">
      <Demo title="基础使用">
        <Radio.Group defaultValue="option1">
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
        </Radio.Group>
      </Demo>

      <Demo title="受控">
        <Radio.Group value={value} onChange={setValue}>
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
        </Radio.Group>
      </Demo>

      <Demo title="禁用状态">
        <Radio.Group defaultValue="option1" disabled>
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
        </Radio.Group>
      </Demo>

      <Demo title="垂直">
        <Radio.Group defaultValue="option1" vertical>
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
        </Radio.Group>
      </Demo>

      <Demo title="图标大小">
        <Radio.Group defaultValue="option1" size="2em">
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
        </Radio.Group>
      </Demo>

      <Demo title="颜色">
        <Radio.Group defaultValue="option1" checkedColor="orange">
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
        </Radio.Group>
      </Demo>

      <Demo title="图标类型">
        <Radio.Group defaultValue="option1" type="circle">
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
        </Radio.Group>

        <Radio.Group defaultValue="option1" type="square">
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
        </Radio.Group>
      </Demo>

      <Demo title="自定义图标">
        <Radio.Group
          defaultValue="option1"
          icon={(checked) => (
            <Icon prefix="demo-icon" name={checked ? 'heart-fill' : 'heart'} />
          )}
        >
          <Radio value="option1">选项1</Radio>
          <Radio value="option2">选项2</Radio>
        </Radio.Group>
      </Demo>
    </Page>
  )
}
