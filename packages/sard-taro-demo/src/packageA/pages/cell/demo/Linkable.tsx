import { Cell } from 'sard-taro'

export default () => {
  return (
    <Cell.Group>
      <Cell linkable title="标题" />
      <Cell linkable title="标题" value="值" arrowDirection="down" />
    </Cell.Group>
  )
}
