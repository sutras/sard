import { Badge } from 'sard-taro'
import BadgeBox from './BadgeBox'

export default () => {
  return (
    <BadgeBox>
      <Badge fixed value={5} />
    </BadgeBox>
  )
}
