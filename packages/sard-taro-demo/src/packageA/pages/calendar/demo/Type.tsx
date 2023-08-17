import { Calendar, Cell, PopoutInput } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card>
      <Cell>
        <PopoutInput
          title="选择单个日期"
          inputProps={{ placeholder: '选择单个日期' }}
        >
          <Calendar />
        </PopoutInput>
      </Cell>

      <Cell>
        <PopoutInput
          title="选择多个日期"
          inputProps={{ placeholder: '选择多个日期' }}
        >
          <Calendar type="multiple" />
        </PopoutInput>
      </Cell>

      <Cell>
        <PopoutInput title="选择范围" inputProps={{ placeholder: '选择范围' }}>
          <Calendar type="range" />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
