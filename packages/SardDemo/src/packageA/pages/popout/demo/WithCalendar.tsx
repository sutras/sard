import { useState } from 'react'
import { Calendar, List, Popout } from 'sard'

export default () => {
  const [visible, setVisible] = useState(false)

  return (
    <>
      <List card>
        <List.Item
          linkable
          title="显示弹出框"
          onClick={() => setVisible(true)}
        />
      </List>

      <Popout title="请选择日期" visible={visible} onVisible={setVisible}>
        <Calendar />
      </Popout>
    </>
  )
}
