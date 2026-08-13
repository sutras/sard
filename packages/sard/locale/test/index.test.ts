import { describe, expect, test } from 'vitest'
import { createApp } from 'vue'
import {
  setLocale,
  useTranslate,
  useTranslateWithPrefix,
  provideLocale,
  useLocale,
  currentLocale,
} from '../index'
import zhCN from '../lang/zh-CN'
import enUS from '../lang/en-US'

describe('locale', () => {
  describe('setLocale', () => {
    test('默认语言为 zh-CN', () => {
      expect(currentLocale.value).toBe(zhCN)
    })

    test('切换到 en-US', () => {
      setLocale(enUS)
      expect(currentLocale.value).toBe(enUS)
    })

    test('切换回 zh-CN', () => {
      setLocale(zhCN)
      expect(currentLocale.value).toBe(zhCN)
    })

    test('切换到自定义语言包', () => {
      const custom = { _sard: { hello: '你好' } }
      setLocale(custom)
      expect(currentLocale.value).toBe(custom)
    })
  })

  describe('useTranslate', () => {
    test('无 prefix 时返回顶层数据', () => {
      setLocale({ _sard: { test: '测试' }, app: { title: '标题' } })
      const { t } = useTranslate()
      expect(t('app.title')).toBe('标题')
    })

    test('有 prefix 时拼接路径', () => {
      setLocale({ _sard: { test: '测试' }, app: { title: '标题' } })
      const { t } = useTranslate('app')
      expect(t('title')).toBe('标题')
    })

    test('prefix 为空字符串时与无 prefix 等效', () => {
      setLocale({ _sard: { test: '测试' }, app: { title: '标题' } })
      const { t } = useTranslate('')
      expect(t('app.title')).toBe('标题')
    })

    test('找不到时返回链式路径本身', () => {
      setLocale({ _sard: { test: '测试' } })
      const { t } = useTranslate()
      expect(t('nonexistent.key')).toBe('nonexistent.key')
    })

    test('{key} 占位插值', () => {
      setLocale({ _sard: { greeting: '你好，{name}！' } })
      const { t } = useTranslate('_sard')
      expect(t('greeting', { name: '小明' })).toBe('你好，小明！')
    })

    test('多个占位符插值', () => {
      setLocale({ _sard: { range: '{start} 至 {end}' } })
      const { t } = useTranslate('_sard')
      expect(t('range', { start: '2020', end: '2024' })).toBe('2020 至 2024')
    })

    test('占位符 key 不存在时保留原样', () => {
      setLocale({ _sard: { text: '值是 {value}，未知的 {unknown}' } })
      const { t } = useTranslate('_sard')
      expect(t('text', { value: '42' })).toBe('值是 42，未知的 {unknown}')
    })

    test('文本中包含不用于插值的花括号时保留原样', () => {
      setLocale({ _sard: { code: '使用 { 和 } 包裹代码' } })
      const { t } = useTranslate('_sard')
      expect(t('code')).toBe('使用 { 和 } 包裹代码')
    })

    test('模板字符串不是字符串时返回链式路径', () => {
      setLocale({ _sard: { nums: [1, 2, 3] } })
      const { t } = useTranslate('_sard')
      expect(t('nums')).toBe('_sard.nums')
    })

    test('第一个参数为对象时视为 data（需 prefix 指向字符串模板）', () => {
      setLocale({ _sard: { greeting: '你好，{name}！' } })
      const { t } = useTranslate('_sard.greeting')
      expect(t({ name: '小红' })).toBe('你好，小红！')
    })

    test('默认 zh-CN 语言包的翻译', () => {
      setLocale(zhCN)
      const { t } = useTranslate('_sard')
      expect(t('calendar.start')).toBe('开始')
      expect(t('actionSheet.cancel')).toBe('取消')
    })

    test('默认 zh-CN 带数据插值', () => {
      setLocale(zhCN)
      const { t } = useTranslate('_sard')
      expect(t('calendar.monthTitle', { year: '2000', month: '05' })).toBe('2000年05月')
      expect(t('calendar.multipleOutlet', { count: '3' })).toBe('选择了3个日期')
    })
  })

  describe('select', () => {
    test('获取嵌套对象', () => {
      setLocale({ _sard: { calendar: { weeks: { 0: '日', 1: '一' } } } })
      const { select } = useTranslate('_sard')
      expect(select('calendar.weeks')).toEqual({ 0: '日', 1: '一' })
    })

    test('不传 chain 时返回 prefix 对应对象', () => {
      setLocale({ _sard: { calendar: { start: '开始' } } })
      const { select } = useTranslate('_sard.calendar')
      expect(select()).toEqual({ start: '开始' })
    })

    test('获取字符串值（不强制转换）', () => {
      setLocale({ _sard: { calendar: { start: '开始' } } })
      const { select } = useTranslate('_sard.calendar')
      expect(select('start')).toBe('开始')
    })
  })

  describe('useTranslateWithPrefix', () => {
    test('自动添加 _sard 前缀', () => {
      setLocale(zhCN)
      const { t } = useTranslateWithPrefix('calendar')
      expect(t('start')).toBe('开始')
    })

    test('prefix 为空时不添加 _sard', () => {
      setLocale({ _sard: { hello: '你好' }, hello: 'world' })
      const { t } = useTranslateWithPrefix()
      expect(t('_sard.hello')).toBe('你好')
    })
  })

  describe('provideLocale / useLocale', () => {
    test('注册后 useLocale 返回默认语言', () => {
      let locale: ReturnType<typeof useLocale>
      const TestComp = {
        template: '<div></div>',
        setup() {
          locale = useLocale()
          return {}
        },
      }
      const app = createApp(TestComp)
      provideLocale(app, { zhCN: { _sard: {} }, enUS: { _sard: {} } }, 'zhCN')
      app.mount(document.createElement('div'))

      expect(locale!.value).toBe('zhCN')
    })

    test('切换语言后 currentLocale 同步更新', async () => {
      const customZH = { _sard: { greeting: '你好' } }
      const customEN = { _sard: { greeting: 'Hello' } }
      let locale: ReturnType<typeof useLocale>
      const TestComp = {
        template: '<div></div>',
        setup() {
          locale = useLocale()
          return {}
        },
      }
      const app = createApp(TestComp)
      provideLocale(app, { zhCN: customZH, enUS: customEN }, 'zhCN')
      app.mount(document.createElement('div'))

      locale!.value = 'enUS'
      // watch 回调为异步，需要等待下一次微任务
      await Promise.resolve()
      expect(currentLocale.value).toBe(customEN)
    })

    test('未注册时 useLocale 返回 undefined', () => {
      let locale: ReturnType<typeof useLocale>
      const TestComp = {
        template: '<div></div>',
        setup() {
          locale = useLocale()
          return {}
        },
      }
      const app = createApp(TestComp)
      app.mount(document.createElement('div'))

      expect(locale!).toBeUndefined()
    })
  })
})
