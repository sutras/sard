import { Calendar, Cell, PopoutInput, Toast } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card bodyStyle={{ flex: 'none' }}>
      <Cell>
        <PopoutInput
          title="选择多个日期"
          inputProps={{ placeholder: '选择多个日期' }}
        >
          <Calendar
            type="multiple"
            maxDays={3}
            overMaxDays={() => Toast.show('最多选择3天')}
          />
        </PopoutInput>
      </Cell>

      <Cell>
        <PopoutInput title="选择范围" inputProps={{ placeholder: '选择范围' }}>
          <Calendar
            type="range"
            maxDays={3}
            min={new Date(2000, 0, 15)}
            max={new Date(2000, 0, 20)}
            overMaxDays={() => Toast.show('最多选择3天')}
          />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
