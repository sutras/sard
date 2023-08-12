import { Tag } from 'sard-taro'

export default () => {
  return (
    <Tag closable onClose={() => console.log('close')}>
      标签
    </Tag>
  )
}
