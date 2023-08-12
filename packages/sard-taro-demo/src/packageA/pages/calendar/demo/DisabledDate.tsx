import { Calendar, Cell, Popout } from 'sard-taro'

export default () => {
  // 禁用周末
  const disabledDate = (date: Date) => {
    return /0|6/.test(String(date.getDay()))
  }

  return (
    <Cell.Group card bodyStyle={{ flex: 'none' }}>
      <Popout title="请选择日期">
        <Popout.Outlet>
          {({ value, setVisible }) => (
            <Cell
              linkable
              title="选择日期"
              value={value?.toLocaleDateString() || ''}
              onClick={() => setVisible(true)}
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Calendar disabledDate={disabledDate} />
        </Popout.Target>
      </Popout>
    </Cell.Group>
  )
}
