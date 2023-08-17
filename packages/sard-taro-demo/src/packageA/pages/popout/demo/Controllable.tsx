import { useState } from 'react'
import { Calendar, Cell, Popout } from 'sard-taro'

export default () => {
  const [value, setValue] = useState(new Date())
  return (
    <Popout title="请选择日期" value={value} onChange={setValue}>
      <Popout.Outlet>
        {({ outletValue, setVisible }) => (
          <Cell.Group card>
            <Cell
              linkable
              title="请选择日期"
              value={outletValue}
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
