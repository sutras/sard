import { Cell } from 'sard-taro'

export default () => {
  return (
    <Cell.Group>
      <Cell title="标题" />
      <Cell title="标题" value="值" />
      <Cell title="标题" value="值" label="标签" />
      <Cell
        title="很长的标题标题标题标题标题标题标题标题标题标题标题标题"
        value="值值"
      />
      <Cell
        title="标题"
        value="很长的值值值值值值值值值值值值值值值值值值值值值值值值"
      />
      <Cell
        title="很长的标题标题标题标题标题标题标题标题"
        value="很长的值值值值值值值值值值值值值值值值"
        label="很长的标签标签标签标签标签标签标签标签"
      />
    </Cell.Group>
  )
}
