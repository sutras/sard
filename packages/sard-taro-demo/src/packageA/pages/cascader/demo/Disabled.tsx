import { Cascader, Cell, PopoutInput } from 'sard-taro'

const disabledOptions = Array(10)
  .fill(0)
  .map((_, i) => {
    return {
      label: `label${i}`,
      value: `${i}`,
      disabled: i < 3,
      children: Array(10)
        .fill(0)
        .map((_, j) => {
          return {
            label: `label${i}-label${j}`,
            value: `${i}-${j}`,
            disabled: j < 3,
          }
        }),
    }
  })

export default () => {
  return (
    <Cell.Group card>
      <Cell>
        <PopoutInput title="请选择" inputProps={{ placeholder: '请选择' }}>
          <Cascader options={disabledOptions} />
        </PopoutInput>
      </Cell>
    </Cell.Group>
  )
}
