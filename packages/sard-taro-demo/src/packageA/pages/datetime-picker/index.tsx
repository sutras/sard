import Demo from '@/components/demo'
import Page from '@/components/page'
import {
  Cell,
  DatetimeColumnOption,
  DatetimeLetter,
  DatetimePicker,
} from 'sard-taro'
import { useState } from 'react'

import './index.scss'

export default () => {
  const [value, setValue] = useState(new Date())

  const filter = (letter: DatetimeLetter, value: number) => {
    if (letter === 'm') {
      return value % 15 === 0
    }
    return true
  }

  const formatter = (letter: DatetimeLetter, option: DatetimeColumnOption) => {
    if (letter === 'y') {
      return option.zerofill + '年'
    }
    if (letter === 'M') {
      return option.zerofill + '月'
    }
    if (letter === 'd') {
      return `${option.zerofill}日`
    }
  }

  return (
    <Page className="page-datetime-picker">
      <Demo title="基础使用" full>
        <Cell.Group card>
          <Cell>
            <DatetimePicker />
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="受控" full>
        <Cell.Group card>
          <Cell
            linkable
            title="设置为当前时间"
            value={value.toLocaleString()}
            onClick={() => setValue(new Date())}
          />
          <Cell>
            <DatetimePicker value={value} onChange={setValue} type="yMd" />
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="类型" full>
        <Cell.Group card style={{ marginBottom: 20 }}>
          <Cell title="年月日" />
          <Cell>
            <DatetimePicker type="yMd" />
          </Cell>
        </Cell.Group>

        <Cell.Group card style={{ marginBottom: 20 }}>
          <Cell title="时分秒" />
          <Cell>
            <DatetimePicker type="hms" />
          </Cell>
        </Cell.Group>

        <Cell.Group card>
          <Cell title="日时分" />
          <Cell>
            <DatetimePicker type="dhm" />
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="最大最小值" full>
        <Cell.Group card style={{ marginBottom: 20 }}>
          <Cell title="年月日" value="2021-04-13, 2023-07-08" />
          <Cell>
            <DatetimePicker
              type="yMd"
              min={new Date(2021, 4, 13)}
              max={new Date(2023, 6, 8)}
            />
          </Cell>
        </Cell.Group>

        <Cell.Group card style={{ marginBottom: 20 }}>
          <Cell title="时分秒" value="09:00:00, 18:30:00" />
          <Cell>
            <DatetimePicker
              type="hms"
              min={new Date(0, 0, 1, 9, 0, 0)}
              max={new Date(0, 0, 1, 18, 30, 0)}
            />
          </Cell>
        </Cell.Group>

        <Cell.Group card>
          <Cell title="日时分" value="01日 09:45, 06日 12:12" />
          <Cell>
            <DatetimePicker
              type="dhm"
              min={new Date(0, 0, 1, 9, 45)}
              max={new Date(0, 0, 6, 12, 12)}
            />
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="过滤器" full>
        <Cell.Group card>
          <Cell title="“分钟”取15的倍数：" />
          <Cell>
            <DatetimePicker type="hm" filter={filter} />
          </Cell>
        </Cell.Group>
      </Demo>

      <Demo title="格式化" full>
        <Cell.Group card>
          <Cell>
            <DatetimePicker type="yMd" formatter={formatter} />
          </Cell>
        </Cell.Group>
      </Demo>
    </Page>
  )
}
