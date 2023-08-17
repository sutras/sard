import { useState } from 'react'
import { Cell, Picker, PopoutInput } from 'sard-taro'

export default () => {
  const columns = ['北京市', '天津市', '河北省', '山东省']

  const [value, setValue] = useState<string>()

  return (
    <Cell.Group card>
      <Cell
        linkable
        title="设置为: 天津市"
        onClick={() => setValue('天津市')}
      />
      <Cell linkable title="清空" onClick={() => setValue(undefined)} />
      <Cell>
        <PopoutInput
          title="请选择"
          inputProps={{ placeholder: '请选择' }}
          value={value}
          onChange={setValue}
        >
          <Picker columns={columns} />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
