import Demo from '@/components/demo'
import Page from '@/components/page'
import { Calendar, CalendarDay, Cell, Popout, Toast } from 'sard-taro'

import './index.scss'
import { View } from '@tarojs/components'

export default () => {
  const handleChange = (date: Date) => {
    Toast.show(date.toLocaleDateString())
  }

  // 禁用周末
  const disabledDate = (date: Date) => {
    return /0|6/.test(String(date.getDay()))
  }

  const formatter = (day: CalendarDay) => {
    const year = day.date.getFullYear()
    const month = day.date.getMonth() + 1
    const date = day.date.getDate()
    const week = day.date.getDay()

    if (month === 5) {
      if (date === 1) {
        day.bottomInfo = '劳动节'
      }
      if (date <= 3) {
        day.topInfo = <View style={{ color: 'var(--sar-danger)' }}>休</View>
      }
      if (date === 4) {
        day.bottomInfo = '青年节'
      }

      if (week === 0) {
        const weekOnFirstDay = new Date(year, month - 1, 1).getDay()
        const secondSunday = 15 - (weekOnFirstDay || 7)

        if (secondSunday === date) {
          day.bottomInfo = '母亲节'
        }
      }
    }

    if (day.type === 'start') {
      day.bottomInfo = '入店'
    } else if (day.type === 'end') {
      day.bottomInfo = '离店'
    }

    if (week === 0 || week === 6) {
      day.style = {
        fontWeight: 'bold',
        color: 'var(--sar-danger)',
      }
    }
  }

  return (
    <Page className="page-calendar">
      <Toast.Agent />

      <Demo title="基础使用">
        <Calendar onChange={handleChange} />
      </Demo>

      <Demo title="配合弹出框使用" full>
        <Cell.Group card bodyStyle={{ flex: 'none' }}>
          <Popout title="请选择日期">
            <Popout.Outlet>
              {({ value, setVisible }) => (
                <Cell
                  isLink
                  title="选择日期"
                  value={value?.toLocaleDateString() || ''}
                  onClick={() => setVisible(true)}
                ></Cell>
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Calendar />
            </Popout.Target>
          </Popout>

          <Popout title="请选择日期">
            <Popout.Outlet>
              {({ value, setVisible }) => (
                <Cell
                  isLink
                  title="选择多个日期"
                  value={
                    value
                      ?.map((date) => date.toLocaleDateString())
                      .join(', ') || ''
                  }
                  onClick={() => setVisible(true)}
                ></Cell>
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Calendar type="multiple" />
            </Popout.Target>
          </Popout>

          <Popout title="请选择日期">
            <Popout.Outlet>
              {({ value, setVisible }) => (
                <Cell
                  isLink
                  title="选择范围"
                  value={
                    value
                      ?.map((date) => date.toLocaleDateString())
                      .join(' - ') || ''
                  }
                  onClick={() => setVisible(true)}
                ></Cell>
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Calendar type="range" />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>

      <Demo title="自定义日期范围" full>
        <Cell.Group card bodyStyle={{ flex: 'none' }}>
          <Popout title="请选择日期">
            <Popout.Outlet>
              {({ value, setVisible }) => (
                <Cell
                  isLink
                  title="选择日期"
                  value={value?.toLocaleDateString() || ''}
                  onClick={() => setVisible(true)}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Calendar
                min={new Date(2000, 0, 15)}
                max={new Date(2000, 0, 30)}
              />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>

      <Demo title="最多选择天数" full>
        <Cell.Group card bodyStyle={{ flex: 'none' }}>
          <Popout title="请选择日期">
            <Popout.Outlet>
              {({ value, setVisible }) => (
                <Cell
                  isLink
                  title="选择多个日期"
                  value={
                    value
                      ?.map((date) => date.toLocaleDateString())
                      .join(', ') || ''
                  }
                  onClick={() => setVisible(true)}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Calendar
                type="multiple"
                maxDays={3}
                overMaxDays={() => Toast.show('最多选择3天')}
              />
            </Popout.Target>
          </Popout>

          <Popout title="请选择日期">
            <Popout.Outlet>
              {({ value, setVisible }) => (
                <Cell
                  isLink
                  title="选择范围"
                  value={
                    value
                      ?.map((date) => date.toLocaleDateString())
                      .join(' - ') || ''
                  }
                  onClick={() => setVisible(true)}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Calendar
                type="range"
                maxDays={3}
                min={new Date(2000, 0, 15)}
                max={new Date(2000, 0, 20)}
                overMaxDays={() => Toast.show('最多选择3天')}
              />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>

      <Demo title="禁用日期" full>
        <Cell.Group card bodyStyle={{ flex: 'none' }}>
          <Popout title="请选择日期">
            <Popout.Outlet>
              {({ value, setVisible }) => (
                <Cell
                  isLink
                  title="选择日期"
                  value={value?.toLocaleDateString() || ''}
                  onClick={() => setVisible(true)}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Calendar disabledDate={disabledDate} />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>

      <Demo title="自定义颜色" full>
        <Cell.Group card bodyStyle={{ flex: 'none' }}>
          <Popout
            title="请选择日期"
            style={{
              '--sar-primary': 'var(--sar-danger)',
              '--sar-calendar-day-selected-bg': 'var(--sar-danger)',
              '--sar-calendar-day-today-color': 'var(--sar-danger)',
            }}
          >
            <Popout.Outlet>
              {({ value, setVisible }) => (
                <Cell
                  isLink
                  title="选择范围"
                  value={
                    value?.map((date) => date.toLocaleDateString()).join('-') ||
                    ''
                  }
                  onClick={() => setVisible(true)}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Calendar type="range" />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>

      <Demo title="自定义起始周" full>
        <Cell.Group card bodyStyle={{ flex: 'none' }}>
          <Popout title="请选择日期">
            <Popout.Outlet>
              {({ value, setVisible }) => (
                <Cell
                  isLink
                  title="选择日期"
                  value={value?.toLocaleDateString() || ''}
                  onClick={() => setVisible(true)}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Calendar weekStartsOn={1} />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>

      <Demo title="格式化日期" full>
        <Cell.Group card bodyStyle={{ flex: 'none' }}>
          <Popout title="请选择日期">
            <Popout.Outlet>
              {({ value, setVisible }) => (
                <Cell
                  isLink
                  title="选择范围"
                  value={
                    value?.map((date) => date.toLocaleDateString()).join('-') ||
                    ''
                  }
                  onClick={() => setVisible(true)}
                />
              )}
            </Popout.Outlet>
            <Popout.Target>
              <Calendar
                type="range"
                min={new Date(2000, 4, 1)}
                max={new Date(2000, 6, 1)}
                formatter={formatter}
              />
            </Popout.Target>
          </Popout>
        </Cell.Group>
      </Demo>
    </Page>
  )
}
