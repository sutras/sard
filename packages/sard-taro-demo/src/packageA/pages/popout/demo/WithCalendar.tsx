import { Calendar, Cell, Popout } from 'sard-taro'

export default () => {
  return (
    <Popout title="请选择日期">
      <Popout.Outlet>
        {({ value, setVisible }) => (
          <Cell.Group card>
            <Cell
              linkable
              title="请选择日期"
              value={value?.toLocaleDateString() || ''}
              onClick={() => setVisible(true)}
            />
          </Cell.Group>
        )}
      </Popout.Outlet>
      <Popout.Target>
        <Calendar />
      </Popout.Target>
    </Popout>
  )
}
