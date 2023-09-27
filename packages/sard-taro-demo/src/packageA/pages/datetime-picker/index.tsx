import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Type from './demo/Type'
import MinMax from './demo/MinMax'
import Filter from './demo/Filter'
import Formatter from './demo/Formatter'
import Alone from './demo/Alone'

export default () => {
  return (
    <Page>
      <Demo title="基础使用" full>
        <Basic />
      </Demo>

      <Demo title="类型" full>
        <Type />
      </Demo>

      <Demo title="自定义日期范围" full>
        <MinMax />
      </Demo>

      <Demo title="过滤器" full>
        <Filter />
      </Demo>

      <Demo title="格式化" full>
        <Formatter />
      </Demo>

      <Demo title="单独使用" full>
        <Alone />
      </Demo>
    </Page>
  )
}
