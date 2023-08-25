import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Type from './demo/Type'
import MinMax from './demo/MinMax'
import Filter from './demo/Filter'
import Formatter from './demo/Formatter'

export default () => {
  return (
    <Page className="page-datetime-picker">
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="类型" full>
        <Type />
      </Demo>

      <Demo title="最大最小值" full>
        <MinMax />
      </Demo>

      <Demo title="过滤器" full>
        <Filter />
      </Demo>

      <Demo title="格式化" full>
        <Formatter />
      </Demo>
    </Page>
  )
}
