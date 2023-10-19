import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Type from './demo/Type'
import MinMax from './demo/MinMax'
import Filter from './demo/Filter'
import Formatter from './demo/Formatter'

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Basic />
      </Demo>

      <Demo title="类型">
        <Type />
      </Demo>

      <Demo title="自定义日期范围">
        <MinMax />
      </Demo>

      <Demo title="过滤器">
        <Filter />
      </Demo>

      <Demo title="格式化">
        <Formatter />
      </Demo>
    </Page>
  )
}
