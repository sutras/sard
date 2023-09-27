import { Calendar, List, PopoutInput, Toast } from 'sard-taro'

export default () => {
  return (
    <List card bodyStyle={{ flex: 'none' }}>
      <List.Item>
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
      </List.Item>

      <List.Item>
        <PopoutInput title="选择范围" inputProps={{ placeholder: '选择范围' }}>
          <Calendar
            type="range"
            maxDays={3}
            overMaxDays={() => Toast.show('最多选择3天')}
          />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
