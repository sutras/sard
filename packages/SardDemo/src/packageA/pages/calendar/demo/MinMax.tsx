import { Calendar, List, PopoutInput } from 'sard'

export default () => {
  return (
    <List card>
      <List.Item>
        <PopoutInput
          title="请选择日期"
          inputProps={{ placeholder: '请选择日期' }}
        >
          <Calendar min={new Date(2000, 0, 7)} max={new Date(2000, 0, 21)} />
        </PopoutInput>
      </List.Item>
    </List>
  )
}
