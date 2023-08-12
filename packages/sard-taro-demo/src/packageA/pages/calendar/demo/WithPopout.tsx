import { Calendar, Cell, Popout } from 'sard-taro'

export default () => {
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
            ></Cell>
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Calendar />
        </Popout.Target>
      </Popout>

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
            ></Cell>
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Calendar type="multiple" />
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
            ></Cell>
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Calendar type="range" />
        </Popout.Target>
      </Popout>
    </Cell.Group>
  )
}
