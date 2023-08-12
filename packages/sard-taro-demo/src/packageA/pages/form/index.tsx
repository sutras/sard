import Demo from '@/components/demo'
import Page from '@/components/page'
import { Cell, Toast } from 'sard-taro'

import './index.scss'

import DemoPopup from './DemoPopup'

// import Demo1 from './Demo1'
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
        </Cell.Group>
      </Demo>

      {/* <Demo title="Custom Demo" full>
        <Cell.Group card>
          <DemoPopup demo={Demo1} />
        </Cell.Group>
      </Demo> */}
    </Page>
  )
}
