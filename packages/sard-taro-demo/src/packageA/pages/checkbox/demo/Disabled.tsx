import { Checkbox } from 'sard-taro'

export default () => {
  return (
    <>
      <Checkbox disabled checked style={{ marginRight: 10 }}>
        复选框
      </Checkbox>
      <Checkbox disabled>复选框</Checkbox>
    </>
  )
}
