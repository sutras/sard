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
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Calendar weekStartsOn={1} />
        </Popout.Target>
      </Popout>
    </Cell.Group>
  )
}
