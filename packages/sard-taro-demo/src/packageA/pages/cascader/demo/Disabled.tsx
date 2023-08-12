import { Cascader, Cell, Popout } from 'sard-taro'

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
    <Cell.Group card bodyStyle={{ flex: 'none' }}>
      <Popout title="请选择">
        <Popout.Outlet>
          {({ triggerArgs: [, options = []], setVisible }) => (
            <Cell
              title="请选择"
              value={options.map((option) => option.label).join('/')}
              onClick={() => setVisible(true)}
              linkable
            />
          )}
        </Popout.Outlet>
        <Popout.Target>
          <Cascader options={disabledOptions} />
        </Popout.Target>
      </Popout>
    </Cell.Group>
  )
}
