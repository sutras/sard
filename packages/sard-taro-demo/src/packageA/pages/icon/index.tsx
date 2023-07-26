import Demo from '@/components/demo'
import Page from '@/components/page'
import { Icon } from 'sard-taro'
import pic1 from '@/static/pic1.jpg'

import IconShowcase from '@/components/icon-showcase'

// function matchIconName(str: string) {
//   return JSON.stringify(str.match(/(?<=\.sari-)[a-z\-]+/g))
// }

export default () => {
  return (
    <Page>
      <Demo title="基础使用">
        <Icon name="search" />
      </Demo>

      <Demo title="尺寸">
        <Icon name="search" size="24px" />
      </Demo>

      <Demo title="颜色">
        <Icon name="search" color="orange" />
      </Demo>

      <Demo title="图片类型图标">
        <Icon name={pic1} size={48} />
      </Demo>

      <Demo title="内置图标">
        <IconShowcase.Group>
          {[
            'play',
            'caret-down-fill',
            'caret-left-fill',
            'caret-right-fill',
            'caret-up-fill',
            'keyboard-hide',
            'caret-down',
            'backspace',
            'record-circle',
            'file',
            'x-circle-fill',
            'square',
            'check-square-fill',
            'image',
            'star',
            'star-fill',
            'x-circle',
            'circle-fill',
            'empty',
            'warning-fill',
            'info-circle-fill',
            'question-circle-fill',
            'x-octagon-fill',
            'check-circle-fill',
            'person',
            'fail',
            'success',
            'close',
            'question',
            'info',
            'minus',
            'plus',
            'up',
            'down',
            'left',
            'right',
            'search',
            'circle',
          ].map((name) => {
            return <IconShowcase key={name} name={name}></IconShowcase>
          })}
        </IconShowcase.Group>
      </Demo>
    </Page>
  )
}
