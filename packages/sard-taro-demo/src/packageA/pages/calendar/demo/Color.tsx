import { Calendar, Cell, Popout } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card bodyStyle={{ flex: 'none' }}>
      <Popout
        title="请选择日期"
        style={{
          '--sar-primary': 'var(--sar-danger)',
          '--sar-calendar-day-selected-bg': 'var(--sar-danger)',
          '--sar-calendar-day-today-color': 'var(--sar-danger)',
        }}
      >
        <Popout.Outlet>
          {({ value, setVisible }) => (
            <Cell
              linkable
              title="选择范围"
              value={
                value?.map((date) => date.toLocaleDateString()).join('-') || ''
              }
              onClick={() => setVisible(true)}
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Calendar type="range" />
        </Popout.Target>
      </Popout>
    </Cell.Group>
  )
}
