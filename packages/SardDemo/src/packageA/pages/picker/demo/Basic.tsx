import { useState } from 'react'
import { List, Picker, PopoutInput } from 'sard'

export default () => {
  const columns = ['北京市', '天津市', '河北省', '山东省']

  const [value, setValue] = useState<string>()

  return (
    <List card>
      <List.Item
        linkable
        title="设置为: 天津市"
        onClick={() => setValue('天津市')}
      />
      <List.Item linkable title="清空" onClick={() => setValue(undefined)} />
      <List.Item>
        <PopoutInput
          title="请选择"
          inputProps={{ placeholder: '请选择' }}
          value={value}
          onChange={setValue}
        >
          <Picker columns={columns} />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
