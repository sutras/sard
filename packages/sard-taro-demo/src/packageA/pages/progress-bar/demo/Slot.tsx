import { ProgressBar } from 'sard-taro'

export default () => {
  return (
    <ProgressBar percent={50} thickness={16}>
      50%
    </ProgressBar>
  )
}
