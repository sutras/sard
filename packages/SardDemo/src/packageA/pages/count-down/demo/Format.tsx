import { CountDown } from 'sard'

export default () => {
  return <CountDown time={1000 * 60 * 60 * 2} format="HH 时 mm 分 ss 秒" />
}
