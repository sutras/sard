import { Calendar, Cell, Popout, Toast } from 'sard-taro'

export default () => {
  return (
    <Cell.Group card bodyStyle={{ flex: 'none' }}>
      <Popout title="请选择日期">
        <Popout.Outlet>
          {({ value, setVisible }) => (
            <Cell
              linkable
              title="选择多个日期"
              value={
                value?.map((date) => date.toLocaleDateString()).join(', ') || ''
              }
              onClick={() => setVisible(true)}
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Calendar
            type="multiple"
            maxDays={3}
            overMaxDays={() => Toast.show('最多选择3天')}
          />
        </Popout.Target>
      </Popout>

      <Popout title="请选择日期">
        <Popout.Outlet>
          {({ value, setVisible }) => (
            <Cell
              linkable
              title="选择范围"
              value={
                value?.map((date) => date.toLocaleDateString()).join(' - ') ||
                ''
              }
              onClick={() => setVisible(true)}
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Calendar
            type="range"
            maxDays={3}
            min={new Date(2000, 0, 15)}
            max={new Date(2000, 0, 20)}
            overMaxDays={() => Toast.show('最多选择3天')}
          />
        </Popout.Target>
      </Popout>
    </Cell.Group>
  )
}
