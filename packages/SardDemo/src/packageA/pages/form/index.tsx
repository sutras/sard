import Demo from '@/components/demo'
import Page from '@/components/page'
import { List } from 'sard'

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
    <Page>
      <Demo title="Ant Demo">
        <List card>
          <DemoPopup index={1} demo={AntDemo1} />
          <DemoPopup index={2} demo={AntDemo2} />
          <DemoPopup index={3} demo={AntDemo3} />
          <DemoPopup index={4} demo={AntDemo4} />
          <DemoPopup index={5} demo={AntDemo5} />
          <DemoPopup index={6} demo={AntDemo6} />
          <DemoPopup index={7} demo={AntDemo7} />
          <DemoPopup index={8} demo={AntDemo8} />
          <DemoPopup index={9} demo={AntDemo9} />
          <DemoPopup index={10} demo={AntDemo10} />
          <DemoPopup index={11} demo={AntDemo11} />
          <DemoPopup index={12} demo={AntDemo12} />
          <DemoPopup index={13} demo={AntDemo13} />
          <DemoPopup index={14} demo={AntDemo14} />
          <DemoPopup index={15} demo={AntDemo15} />
          <DemoPopup index={16} demo={AntDemo16} />
          <DemoPopup index={17} demo={AntDemo17} />
          <DemoPopup index={18} demo={AntDemo18} />
          <DemoPopup index={19} demo={AntDemo19} />
          <DemoPopup index={20} demo={AntDemo20} />
          <DemoPopup index={21} demo={AntDemo21} />
          <DemoPopup index={22} demo={AntDemo22} />
        </List>
      </Demo>
    </Page>
  )
}
