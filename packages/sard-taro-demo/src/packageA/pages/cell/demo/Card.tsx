import { Cell } from 'sard-taro'

export default () => {
  return (
    <Cell.Group title="分组标题" label="分组标签" card>
      <Cell title="标题" value="值" />
      <Cell title="标题" value="值" />
    </Cell.Group>
  )
}
