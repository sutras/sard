/*
### 滚动监听
*/

import { Tabs, TabPane } from 'sard'

export default function () {
  return (
    <>
      <Tabs
        scrollspy
        offset={108}
        sticky
        headerStyle={{ top: 60, background: '#fff' }}
      >
        {Array(7)
          .fill(0)
          .map((_, i) => (
            <TabPane
              key={i}
              label={`标签${i + 1}`}
              style={{ border: '1px solid #ddd', margin: 5, padding: 50 }}
            >
              内容{i + 1}
            </TabPane>
          ))}
      </Tabs>
    </>
  )
}
