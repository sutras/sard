import Demo from '@/components/demo'
import Page from '@/components/page'
import { Cell, Toast } from 'sard-taro'

import DemoPopup from './DemoPopup'

import AntDemo1 from './ant-demo/Demo1'
import AntDemo2 from './ant-demo/Demo2'
import AntDemo3 from './ant-demo/Demo3'
import AntDemo4 from './ant-demo/Demo4'
import AntDemo5 from './ant-demo/Demo5'
import AntDemo6 from './ant-demo/Demo6'
import AntDemo7 from './ant-demo/Demo7'
import AntDemo8 from './ant-demo/Demo8'
import AntDemo9 from './ant-demo/Demo9'
import AntDemo10 from './ant-demo/Demo10'
import AntDemo11 from './ant-demo/Demo11'
import AntDemo12 from './ant-demo/Demo12'
import AntDemo13 from './ant-demo/Demo13'
import AntDemo14 from './ant-demo/Demo14'
import AntDemo15 from './ant-demo/Demo15'
import AntDemo16 from './ant-demo/Demo16'
import AntDemo17 from './ant-demo/Demo17'
import AntDemo18 from './ant-demo/Demo18'
import AntDemo19 from './ant-demo/Demo19'
import AntDemo20 from './ant-demo/Demo20'
import AntDemo21 from './ant-demo/Demo21'
import AntDemo22 from './ant-demo/Demo22'

export default () => {
  return (
    <Page className="page-form">
      <Toast.Agent />

      <Demo title="Ant Demo" full>
        <Cell.Group card>
          <DemoPopup demo={AntDemo1} />
          <DemoPopup demo={AntDemo2} />
          <DemoPopup demo={AntDemo3} />
          <DemoPopup demo={AntDemo4} />
          <DemoPopup demo={AntDemo5} />
          <DemoPopup demo={AntDemo6} />
          <DemoPopup demo={AntDemo7} />
          <DemoPopup demo={AntDemo8} />
          <DemoPopup demo={AntDemo9} />
          <DemoPopup demo={AntDemo10} />
          <DemoPopup demo={AntDemo11} />
          <DemoPopup demo={AntDemo12} />
          <DemoPopup demo={AntDemo13} />
          <DemoPopup demo={AntDemo14} />
          <DemoPopup demo={AntDemo15} />
          <DemoPopup demo={AntDemo16} />
          <DemoPopup demo={AntDemo17} />
          <DemoPopup demo={AntDemo18} />
          <DemoPopup demo={AntDemo19} />
          <DemoPopup demo={AntDemo20} />
          <DemoPopup demo={AntDemo21} />
          <DemoPopup demo={AntDemo22} />
        </Cell.Group>
      </Demo>
    </Page>
  )
}
