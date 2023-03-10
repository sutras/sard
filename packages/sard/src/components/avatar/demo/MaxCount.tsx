/*
### 最大头像个数
*/

import { Avatar } from 'sard'

export default function () {
  return (
    <>
      <Avatar.Group maxCount={4}>
        <Avatar>头</Avatar>
        <Avatar>像</Avatar>
        <Avatar>组</Avatar>
        <Avatar>R</Avatar>
        <Avatar>E</Avatar>
        <Avatar>S</Avatar>
        <Avatar>T</Avatar>
      </Avatar.Group>
    </>
  )
}
