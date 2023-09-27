import { Calendar, List, PopoutInput } from 'sard-taro'

export default () => {
  return (
    <List card>
      <List.Item>
        <PopoutInput
          title="选择单个日期"
          inputProps={{ placeholder: '选择单个日期' }}
        >
          <Calendar />
        </PopoutInput>
      </List.Item>

      <List.Item>
        <PopoutInput
          title="选择多个日期"
          inputProps={{
            placeholder: '选择多个日期',
            type: 'textarea',
            autoHeight: true,
          }}
        >
          <Calendar type="multiple" />
        </PopoutInput>
      </List.Item>

      <List.Item>
        <PopoutInput title="选择范围" inputProps={{ placeholder: '选择范围' }}>
          <Calendar type="range" />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
