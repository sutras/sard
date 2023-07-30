import Demo from '@/components/demo'
import Page from '@/components/page'
import { Cell, Slider } from 'sard-taro'

import './index.scss'
import { useState } from 'react'
import { View } from '@tarojs/components'

export default () => {
  const [value, setValue] = useState(50)

  const [value2, setValue2] = useState([0, 50])

  const [value3, setValue3] = useState(50)

  const [rangeValue3, setRangeValue3] = useState([20, 80])

  const [value4, setValue4] = useState(0)

  const [rangeValue4, setRangeValue4] = useState([0, 30])

  const [value5, setValue5] = useState(0)

  const [rangeValue5, setRangeValue5] = useState([0, 0])

  const buttonStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '30px',
    height: '20px',
    borderRadius: '4px',
    color: '#fff',
  }
  const startStyle = {
    ...buttonStyle,
    backgroundColor: 'orange',
  }
  const endStyle = {
    ...buttonStyle,
    backgroundColor: 'fuchsia',
  }
  const startButton = (value) => <View style={startStyle}>{value}</View>
  const endButton = (value) => <View style={endStyle}>{value}</View>

  return (
    <Page className="page-slider">
      <Demo title="基础使用">
        <Slider defaultValue={value} onChange={setValue} />
        <View>{value}</View>
      </Demo>

      <Demo title="范围选择">
        <Slider range defaultValue={value2} onChange={setValue2} />
        <View>{value2.join(',')}</View>
      </Demo>

      <Demo title="受控" full>
        <Cell.Group card>
          <Cell
            linkable
            title="设置值为：50"
            onClick={() => setValue3(50)}
          ></Cell>
          <Cell>
            <Slider value={value3} onChange={setValue3} />
          </Cell>
        </Cell.Group>

        <Cell.Group card>
          <Cell
            linkable
            title="设置值为：[20, 80]"
            onClick={() => setRangeValue3([20, 80])}
          ></Cell>
          <Cell>
            <Slider range value={rangeValue3} onChange={setRangeValue3} />
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="最大最小值">
        <View>
          <Slider defaultValue={0} min={-50} max={50} onChange={setValue4} />
          <View>{value4}</View>
        </View>

        <View>
          <Slider
            range
            defaultValue={rangeValue4}
            min={-50}
            max={50}
            onChange={setRangeValue4}
          />
          <View>{rangeValue4.join(',')}</View>
        </View>
      </Demo>

      <Demo title="步长">
        <View>
          <Slider defaultValue={50} step={10} onChange={setValue5} />
          <View>{value5}</View>
        </View>

        <View>
          <Slider
            range
            defaultValue={[20, 80]}
            step={12.3}
            onChange={setRangeValue5}
          />
          <View>{rangeValue5.join(',')}</View>
        </View>
      </Demo>

      <Demo title="自定义颜色">
        <View>
          <Slider
            defaultValue={50}
            pieceColor="orange"
            trackColor="fuchsia"
            thumbColor="pink"
          />
        </View>

        <View>
          <Slider
            range
            defaultValue={[20, 80]}
            pieceColor="orange"
            trackColor="fuchsia"
            thumbColor="pink"
          />
        </View>
      </Demo>

      <Demo title="自定义尺寸">
        <View>
          <Slider defaultValue={50} thumbSize="15px" trackSize="5px" />
        </View>

        <View>
          <Slider
            range
            defaultValue={[20, 80]}
            thumbSize="15px"
            trackSize="5px"
          />
        </View>
      </Demo>

      <Demo title="垂直">
        <View style={{ height: 200 }}>
          <Slider defaultValue={50} vertical />
          <Slider range defaultValue={[20, 80]} vertical />
        </View>
      </Demo>

      <Demo title="禁用">
        <Slider defaultValue={50} disabled />
      </Demo>

      <Demo title="只读">
        <Slider defaultValue={50} readOnly />
      </Demo>

      <Demo title="自定义按钮插槽">
        <Slider defaultValue={50} thumb={endButton} />
        <Slider
          range
          defaultValue={[20, 80]}
          startThumb={startButton}
          endThumb={endButton}
        />
      </Demo>
    </Page>
  )
}
