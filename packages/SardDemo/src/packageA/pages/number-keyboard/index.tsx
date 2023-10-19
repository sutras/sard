import Demo from '@/components/demo'
import Page from '@/components/page'

import Basic from './demo/Basic'
import Dot from './demo/Dot'
import IdCard from './demo/IdCard'
import Random from './demo/Random'
import WithPasswordInput from './demo/WithPasswordInput'

export default () => {
  return (
    <Page>
      <Demo title="默认键盘" full>
        <Basic />
      </Demo>

      <Demo title="小数点键盘" full>
        <Dot />
      </Demo>

      <Demo title="身份证键盘" full>
        <IdCard />
      </Demo>

      <Demo title="随机数字键盘" full>
        <Random />
      </Demo>

      <Demo title="配合密码输入框使用" full>
        <WithPasswordInput />
      </Demo>
    </Page>
  )
}
