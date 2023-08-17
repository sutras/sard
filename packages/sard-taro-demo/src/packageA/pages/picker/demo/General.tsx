import { Cell, Picker, Toast } from 'sard-taro'

export default () => {
  const array = ['北京市', '天津市', '河北省', '山东省']

  const handleChange = (value, selectedOptions, selectedIndex) => {
    console.log('change: ', value, selectedOptions, selectedIndex)
    Toast.show(JSON.stringify(value))
  }

  return (
    <Cell.Group card>
      <Cell>
        <Picker
          columns={array}
          onChange={(value, ...restArgs) => {
            handleChange(value, ...restArgs)
          }}
        />
      </Cell>
    </Cell.Group>
  )
}
