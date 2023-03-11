/*
### 粘性定位
*/

import { Tabs, TabPane } from 'sard'

export default function () {
  return (
    <>
      <Tabs
        sticky
        headerStyle={{ top: 60, background: 'var(--s-emphasis-bg)' }}
      >
        {Array(3)
          .fill(0)
          .map((_, i) => (
            <TabPane key={i} label={`标签${i + 1}`}>
              {Array(10)
                .fill(0)
                .map((_, index) => (
                  <p key={index}>
                    内容 {i + 1}-{index + 1}
                  </p>
                ))}
            </TabPane>
          ))}
      </Tabs>
    </>
  )
}
