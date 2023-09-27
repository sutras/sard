import { Picker } from 'sard-taro'

export default () => {
  const columns = ['北京市', '天津市', '河北省', '山东省']

  return <Picker columns={columns} />
}
