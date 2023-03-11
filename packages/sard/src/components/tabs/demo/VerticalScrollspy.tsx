/*
### 垂直滚动监听
*/

import { Tabs, TabPane } from 'sard'

export default function () {
  return (
    <>
      <Tabs
        vertical
        scrollspy
        offset={55}
        sticky
        headerStyle={{ top: 55 }}
        type="card"
        style={{ padding: 10, background: 'var(--s-secondary-bg)' }}
        bodyStyle={{ background: 'var(--s-emphasis-bg)' }}
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
