import { List, DatetimePicker, PopoutInput } from 'sard-taro'
import { useState } from 'react'

export default () => {
  const [value, setValue] = useState<Date>()

  return (
    <List card>
      <List.Item
        linkable
        title="设置为当前时间"
        onClick={() => setValue(new Date())}
      />
      <List.Item linkable title="清空" onClick={() => setValue(undefined)} />
      <List.Item>
        <PopoutInput
          title="请选择"
          inputProps={{ placeholder: '请选择' }}
          value={value}
          onChange={setValue}
        >
          <DatetimePicker type="yMd" />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
