import { ProgressBar } from 'sard-taro'

export default () => {
  return (
    <ProgressBar percent={50} thickness="16px">
      50%
    </ProgressBar>
  )
}
