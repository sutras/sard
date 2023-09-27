import { Calendar, List, PopoutInput } from 'sard-taro'

export default () => {
  return (
    <List card>
      <List.Item>
        <PopoutInput
          title="请选择日期"
          inputProps={{ placeholder: '请选择日期' }}
        >
          <Calendar weekStartsOn={1} />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
