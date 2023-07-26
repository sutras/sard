import Demo from '@/components/demo'
import Page from '@/components/page'
import { Icon, Rate, Slider } from 'sard-taro'
import { View } from '@tarojs/components'
import { useState } from 'react'

import './index.scss'

export default () => {
  const [count, setCount] = useState(3)

  return (
    <Page className="page-rate">
      <Demo title="基础使用">
        <Rate defaultValue={3} />
      </Demo>

      <Demo title="半星">
        <Rate defaultValue={2.5} allowHalf />
      </Demo>

      <Demo title="自定义图标">
        <View>
          <Rate
            defaultValue={2.5}
            allowHalf
            icon={<Icon prefix="demo-icon" name="heart-fill"></Icon>}
            voidIcon={<Icon prefix="demo-icon" name="heart"></Icon>}
          />
        </View>

        <View>
          <Rate defaultValue={2.5} allowHalf icon="好" voidIcon="好" />
        </View>
      </Demo>

      <Demo title="自定义颜色">
        <Rate defaultValue={3} color="fuchsia" voidColor="orange" />
      </Demo>

      <Demo title="自定义尺寸和间距">
        <View>
          <Rate defaultValue={3} size={30} />
        </View>

        <View>
          <Rate defaultValue={3} size={30} spacing={20} />
        </View>
      </Demo>

      <Demo title="自定义数量">
        <Slider min={1} max={9} value={count} onChange={setCount}></Slider>
        <Rate count={count} defaultValue={1.5} allowHalf />
      </Demo>

      <Demo title="允许清空">
        <Rate defaultValue={3} allowClear />
      </Demo>

      <Demo title="只读">
        <Rate defaultValue={3} readOnly />
      </Demo>

      <Demo title="禁用">
        <Rate defaultValue={3} disabled />
      </Demo>
    </Page>
  )
}
