import { ProgressCircle } from 'sard-taro'

export default () => {
  return (
    <ProgressCircle percent={50} trackColor="fuchsia" color="orange">
      50%
    </ProgressCircle>
  )
}
