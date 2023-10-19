import { List, Picker, Toast } from 'sard'

export default () => {
  const array = ['北京市', '天津市', '河北省', '山东省']

  const handleChange = (value, selectedOptions, selectedIndex) => {
    console.log('change: ', value, selectedOptions, selectedIndex)
    Toast.show(JSON.stringify(value))
  }

  return (
    <List card>
      <List.Item>
        <Picker
          columns={array}
          onChange={(value, ...restArgs) => {
            handleChange(value, ...restArgs)
          }}
        />
      </List.Item>
    </List>
  )
}
